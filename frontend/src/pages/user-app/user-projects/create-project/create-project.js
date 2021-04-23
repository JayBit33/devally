import Dropdown from '@/components/dropdown'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'create-project',
  components: {
    Dropdown
  },
  data() {
    return {
      project_name: '',
      project_description: '',
      project_regions: [],
      project_category: [],
      project_options: [],
      project_funding: [],
      project_is_public: true,
      allCategories: [],
      allHiringOptions: [],
      allFundingTypes: [],
      allRegions: [],
      selectedCategory: '',
      selectedHiringOptions: [],
      selectedFundingTypes: [],
      selectedRegions: []
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
  },
  methods: {
    ...mapActions(['getDevOptions', 'getRegions', 'getFundingTypes', 'createProject']),
    handleCategoriesSelection(e) {
      this.selectedCategories = e
    },
    handleHiringOptionsSelection(e) {
      this.selectedCategories = e
    },
    handleRegionsSelection(e) {
      this.selectedRegions = e
    },
    handleFundingTypesSelection(e) {
      this.selectedFundingTypes = e
    },
    async handleCreateProject() {
      // TODO
      if (!this.isAllProjectFieldsFilled) return

      const project = {
        creator_id: this.getLoggedInUser.id,
        team_member_ids: JSON.stringify([]),
        name: this.project_name,
        category: this.selectedCategory,
        description: this.project_description,
        hiring_options: JSON.stringify([...this.selectedHiringOptions]),
        viewable_regions: JSON.stringify([...this.selectedRegions]),
        funding_types: JSON.stringify([...this.selectedFundingTypes]),
        is_public: this.is_public,
        is_active: true,
        is_featured: true
      }

      let res = await this.createProject(project)
      console.log(res)
    }
  }
}