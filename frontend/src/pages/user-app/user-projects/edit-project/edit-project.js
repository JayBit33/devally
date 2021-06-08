
import ConnectionCard from '@/components/connection-card'
import Dropdown from '@/components/dropdown'
import FilterSearch from '@/components/filter-search'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'edit-project',
  components: {
    ConnectionCard,
    Dropdown,
    FilterSearch
  },
  data() {
    return {
      project: {},
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
      pageSize: 4,
      searchValue: ''
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
    projectId() {
      return this.$route.params.projectId
    },
    checkedConnectionsIds() {
      return this.connections.filter(c => c.isChecked).map(c => c.id)
    },
    connectionsShown() {
      if (!this.connections || this.connections.length === 0) return []

      if (this.searchValue) {
        return this.connections.filter(c => {
          const name = c.firstname + ' ' + c.lastname
          return (name.slice(0, this.searchValue.length).toLowerCase() === this.searchValue.toLowerCase())
        }).slice(this.startIdx, this.endIdx)
      } else {
        return this.connections.slice(this.startIdx, this.endIdx)
      }
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

    this.project = await this.fetchProjectById(this.projectId)
    if (this.project.creator_id != this.getLoggedInUser.id) this.$router.push(`/profile/${this.getLoggedInUser.id}/projects`)
    this.setFields()

    this.connections = await Promise.all(this.getLoggedInUser.connections.map(async id => {
      let user = await this.fetchUserById(id)
      return { ...user, isChecked: false }
    }))
    this.connections = this.connections.filter(c => !this.project.team_member_ids.includes(c.id))

    this.updatePageSize()
    window.addEventListener('resize', this.updatePageSize)

  },
  methods: {
    ...mapActions(['getDevOptions', 'getRegions', 'getFundingTypes', 'fetchToast', 'fetchProjectById', 'fetchUserById', 'updateProjectById', 'sendNotificationToUser']),
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
    async handleEditProject() {
      let toast, message
      if (!this.isAllProjectFieldsFilled) {
        message = [{ text: 'Please fill out', emphasis: false }, { text: 'all', emphasis: true }, { text: 'the necessary fields', emphasis: false }]
        toast = await this.fetchToast({ type: 'error', message })
      } else {
        const project = {
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
  
        this.project = await this.updateProjectById({ id: this.projectId, project})
        if (this.project) {
          message = [{ text: 'Your project has been', emphasis: false }, { text: 'successfully', emphasis: true }, { text: 'updated', emphasis: false }]
          toast = await this.fetchToast({ type: 'success', message, hasAction: true, actionRedirect: `/profile/${this.getLoggedInUser.id}/projects` })
          this.setFields()
        }

        if (this.checkedConnectionsIds.length > 0 && this.project) await this.notifyConnections()
      }

      this.$emit('toast-update', toast)
    },
    async notifyConnections() {
      let acceptedNotification = { senderId: this.getLoggedInUser.id, projectId: this.projectId ? this.projectId : null, message: 'Project Invitation:', type: 'received' }
      
      this.checkedConnectionsIds.forEach(async id => {
        let res = await this.sendNotificationToUser({ id, notification: acceptedNotification })
        console.log(res)
      })
    },
    searchInputChange(e) {
      this.searchValue = e
    },
    setFields() {
      this.project_name = this.project.name
      this.project_category = this.project.category
      this.project_description = this.project.description
      this.project_options = this.project.hiring_options
      this.project_regions = this.project.viewable_regions
      this.project_funding = this.project.funding_types
      this.project_is_public = this.project.is_public
      this.project_is_seeking = this.project.is_seeking_allys
      this.project_is_active = this.project.is_active
      this.project_is_featured = this.isFeaturePossible ? this.project.is_featured : false
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