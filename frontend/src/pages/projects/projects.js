// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import ProjectCard from '@/components/project-card'
import PaginationMixin from '../../mixins/paginationMixin';
import { mapActions } from 'vuex'

export default {
  name: 'Projects',
  data() {
    return {
      filters: {
        searchTerm: null,
        seekingAllys: false,
        skills: null,
        roles: [],
        paymentTypes: [],
        categories: [],
        fundingTypes: []
      },
      itemsPerPage: 5,
      allProjects: [],
      projects: [],
      startIdx: 0,
      endIdx: 5
    }
  },
  components: {
    ProjectCard,
  },
  mixins: [PaginationMixin],
  async created() {
    this.allProjects = await this.fetchProjects()
    this.projects = this.allProjects

    // Fill in filter search panel
    const { roles, hiring_options, categories } = await this.getDevOptions()
    const { funding_types } = await this.getFundingTypes()

    funding_types.forEach(f => {
      this.filters.fundingTypes.push({
        type: f,
        isChecked: false
      })
    })
    hiring_options.forEach(f => {
      this.filters.paymentTypes.push({
        type: f,
        isChecked: false
      })
    })
    categories.forEach(f => {
      this.filters.categories.push({
        type: f,
        isChecked: false
      })
    })
    roles.forEach(f => {
      this.filters.roles.push({
        type: f,
        isChecked: false
      })
    })
  },
  computed: {
    projectsShown() {
      return this.projects ? this.projects.slice(this.startIdx, this.endIdx) : [];
    }
  },
  methods: {
    ...mapActions(['fetchProjects', 'getFundingTypes', 'getDevOptions']),
    applyFilters() {
      this.startIdx = 0
      this.endIdx = this.itemsPerPage
      const filters = this.buildSelectedFilters()
      if (filters == {}) return

      // If a filter is applied and a search filter was previously applied, apply search filter first then filter on new panel options
      // Otherwise filter on all the projects from the initial fetchProjects call
      let projectsToFilterOn = this.allProjects
      if (this.filters.searchTerm) projectsToFilterOn = this.searchByName()

      // Pull off type from the types/name from the options objects
      const filterKeys = Object.keys(filters)
      let filtersNames = {}
      filterKeys.forEach(key => {
        if (key == 'seeking_allys') {
          filtersNames[key] = filters[key]
        } else if (key == 'skills') {
          filtersNames[key] = filters[key]
        } else {
          if (key == 'hiring_options') filters[key].map(f => {
            if (f.type == 'Equity (Shares)') f.type = 'Shares'
            return f
          })
          filtersNames[key] = filters[key].map(f => f.type)
        }
      })
      // Filter out the projectsToFilter on with the options in the filter panel (excluding the search)
      this.projects = projectsToFilterOn.filter(project => {
        let unmatchingFilterKeys = filterKeys.filter(key => {
          if (key == 'seeking_allys') { // String Keys on project
            if (filtersNames[key] && !project['is_seeking_allys']) return true
            return false
          } else if (key == 'category') { // Boolean Keys on project
            return !filtersNames[key].includes(project[key])
          } else { // Array Keys on project
            if (key == 'skills') {
              return !project['members_needed'].reduce((acc, m) => [...acc, ...m.skills], []).some(value => filtersNames[key].includes(value))
            } else if (key == 'roles') {
              return !project['members_needed'].map(m => m.position).some(value => filtersNames[key].includes(value))
            }
            return !project[key].some(value => filtersNames[key].includes(value))
          }
        })
        return (unmatchingFilterKeys.length === 0) // If the project does not match any one or more of the filters
      })
    },
    buildSelectedFilters() {
      let selectedFilters = {}

      if (this.filters.paymentTypes.filter(o => o.isChecked).length > 0) selectedFilters['hiring_options'] = this.filters.paymentTypes.filter(o => o.isChecked)
      if (this.filters.categories.filter(o => o.isChecked).length > 0) selectedFilters['category'] = this.filters.categories.filter(o => o.isChecked)
      if (this.filters.fundingTypes.filter(o => o.isChecked).length > 0) selectedFilters['funding_types'] = this.filters.fundingTypes.filter(o => o.isChecked)
      if (this.filters.roles.filter(o => o.isChecked).length > 0) selectedFilters['roles'] = this.filters.roles.filter(o => o.isChecked)

      if (this.filters.skills) selectedFilters['skills'] = this.filters.skills.split(', ')

      if (this.filters.seekingAllys) selectedFilters['seeking_allys'] = true

      return selectedFilters
    },
    clearFilters() {
      const arrayFilters = ['paymentTypes', 'categories', 'fundingTypes']
      arrayFilters.forEach(key => {
        this.filters[key] = this.filters[key].map(o => {
          return {
            type: o.type,
            isChecked: false
          }
        })
      })

      this.filters.roles = null
      this.filters.skills = null
      this.filters.searchTerm = null
      this.filters.seekingAllys = false

      this.projects = this.allProjects
    },
    updateItemsDisplayed(e) {
      this.startIdx = (this.itemsPerPage * (e - 1))
      this.endIdx = (this.itemsPerPage * e)
    },
    handleSizeChange(e) {
      this.itemsPerPage = e
    },
    updateFilterCheckBox(section, option) {
      if (section == 'seekingAllys') {
        this.filters.seekingAllys = !this.filters.seekingAllys
      } else {
        this.filters[section] = this.filters[section].map(o => {
          if (o.type == option.type) o.isChecked = !o.isChecked
          return o
        })
      }
    },
    searchByName() {
      let searchFilterProjects = this.allProjects
      if (this.filters.searchTerm) {
        searchFilterProjects = searchFilterProjects.filter(project => {
          let filterBool = true
          let letters = [...this.filters.searchTerm]
          letters.forEach((letter, i) => {
            let projectName = project.name
            if (letter.toLowerCase() != projectName[i].toLowerCase() && letter.toLowerCase() != projectName[i].toLowerCase()) {
              filterBool = false
            }
          });
          return filterBool
        })
      }
      return searchFilterProjects
    }
  }
}
