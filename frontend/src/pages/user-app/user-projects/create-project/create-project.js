import ConnectionCard from '@/components/connection-card'
import Dropdown from '@/components/dropdown'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'create-project',
  components: {
    ConnectionCard,
    Dropdown
  },
  data() {
    return {
      project_name: '',
      project_description: '',
      project_regions: [],
      project_category: '',
      project_options: [],
      project_funding: [],
      project_is_public: true,
      project_is_active: true,
      project_is_seeking: true,
      project_is_featured: true,
      allCategories: [],
      allHiringOptions: [],
      allFundingTypes: [],
      allRegions: [],
      connections: [],
      startIdx: 0,
      endIdx: 4,
      pageSize: 4
    }
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
    isAllProjectFieldsFilled() {
      return (
        this.project_name != '' &&
        this.project_description != '' &&
        this.project_regions.length != 0 &&
        this.project_category != '' &&
        this.project_options.length != 0 &&
        this.project_funding.length != 0
      )
    },
    isFeaturePossible() {
      if (this.getLoggedInUser) {
        return this.getLoggedInUser.subscription_settings.featured_projects
      } 
      return false
    },
    checkedConnectionsIds() {
      return this.connections.filter(c => c.isChecked).map(c => c.id)
    },
    connectionsShown() {
      return this.connections ? this.connections.slice(this.startIdx, this.endIdx) : [];
    }
  },
  async created() {
    let { categories, hiring_options } = await this.getDevOptions()
    let { regions } = await this.getRegions()
    let { funding_types } = await this.getFundingTypes()

    this.allCategories = categories
    this.allHiringOptions = hiring_options
    this.allRegions = regions
    this.allFundingTypes = funding_types
    
    this.connections = await Promise.all(this.getLoggedInUser.connections.map(async id => {
      let user = await this.fetchUserById(id)
      return {...user, isChecked: false }
    }))

    this.updatePageSize()
    window.addEventListener('resize', this.updatePageSize)
  },
  methods: {
    ...mapActions(['getDevOptions', 'getRegions', 'getFundingTypes', 'createProject', 'fetchToast', 'fetchUserById']),
    handleCategoriesSelection(e) {
      this.project_category = e
    },
    handleHiringOptionsSelection(e) {
      this.project_options = e
    },
    handleRegionsSelection(e) {
      this.project_regions = e
    },
    handleFundingTypesSelection(e) {
      this.project_funding = e
    },
    async handleCreateProject() {
      let toast, message
      if (!this.isAllProjectFieldsFilled) {
        message = [{ text: 'Please fill out', emphasis: false }, { text: 'all', emphasis: true }, { text: 'the necessary fields', emphasis: false }]
        toast = await this.fetchToast({ type: 'error', message })
      } else {
        const project = {
          creator_id: this.getLoggedInUser.id,
          team_member_ids: JSON.stringify([]), // 
          name: this.project_name,
          category: this.project_category,
          description: this.project_description,
          hiring_options: JSON.stringify([...this.project_options]),
          viewable_regions: JSON.stringify([...this.project_regions]),
          funding_types: JSON.stringify([...this.project_funding]),
          is_public: this.project_is_public,
          is_seeking_allys: this.project_is_seeking,
          is_active: this.project_is_active,
          is_featured: this.isFeaturePossible ? this.project_is_featured : false
        }
  
        let res = await this.createProject(project)
        if (res) {
          message = [{ text: 'Your project has been', emphasis: false }, { text: 'successfully', emphasis: true }, { text: 'created', emphasis: false }]
          toast = await this.fetchToast({ type: 'success', message, hasAction: true, actionRedirect: `/profile/${this.getLoggedInUser.id}/projects` })
          this.resetFields()
        }

        if (this.checkedConnectionsIds.length > 0) this.notifyConnections()
      }

      this.$emit('toast-update', toast)
    },
    notifyConnections() {
      // TODO
    },
    resetFields() {
      this.project_name = ''
      this.project_category = ''
      this.project_description = ''
      this.project_options = []
      this.project_regions = []
      this.project_funding = []
      this.project_is_public = true
      this.project_is_seeking = true
      this.project_is_active = true
      this.project_is_featured = this.isFeaturePossible
    },
    updateConnections(pageNumber) {
      this.endIdx = this.pageSize * pageNumber
      this.startIdx = this.pageSize * pageNumber - this.pageSize
    },
    updatePageSize() {
      const cardWidth = 225
      const { width } = this.$refs.cards.getBoundingClientRect()
      this.pageSize = Math.floor(width / cardWidth)
      this.endIdx = this.startIdx + this.pageSize
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.updatePageSize)
  }
}