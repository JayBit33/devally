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
        bootrapped: false,
        crowdFunding: false,
        debtCapital: false,
        ecom: false,
        equity: false,
        fandf: false,
        flatRate: false,
        itemsPerPage: 25,
        mobile: false,
        saas: false,
        software: false,
        other: false,
        roles: null,
        searchTerm: null,
        seekingAllys: false,
        skills: null,
        ventureCapital: false,
        website: false,
      },
      currentPage1: null,
      itemsPerPage: 25,
      projects: [],
      projectsShown: [],
    }
  },
  components: {
    ProjectCard,
  },
  mixins: [PaginationMixin],
  async created() {
    this.projects = await this.fetchProjects()
    this.projectsShown = this.projects
  },
  methods: {
    ...mapActions(['fetchProjects']),
    applyFilters() {
      const filters = this.buildSelectedFilters()
      console.log('not empty filters', filters)

      let shiftFilters = (filters, key) => {
        console.log('shifty', filters)
        if (filters.length > 2) {
          delete filters[key]
          console.log(filters)
          return filters
        } else {
          return 'done'
        }
      }

      let results = this.projects.filter(p => {
        function filterProjects(filters) {
          if (filters === 'done') return true
          for (let [key,value] of Object.entries(filters)) {
            console.log('value', key, value)
            return p[key].some(o => filters[key].includes(o)) && filterProjects(shiftFilters(filters, key))
          }
        }
         return filterProjects(filters)
      })
      console.log('results', results)
      this.projectsShown = Array.from(new Set(results))
    },
    buildSelectedFilters() {
      let selectedFilters = {}

      // if one or more of the project properties exist create empty array to store values
      if (this.filters.equity || this.filters.flatRate) selectedFilters['hiring_options'] = []
      if (this.filters.ecom || this.filters.mobile || this.filters.other || this.filters.saas || this.filters.software || this.filters.website) selectedFilters['category'] = []
      if (this.filters.bootrapped || this.filters.crowdFunding || this.filters.fandf || this.filters.debtCapital || this.filters.ventureCapital) selectedFilters['funding_types'] = []
      if (this.filters.roles) selectedFilters['roles'] = []
      if (this.filters.skills) selectedFilters['skills'] = []
      if (this.filters.seekingAllys) selectedFilters['seeking_allys'] = []
      if (this.filters.searchTerm) selectedFilters['name'] = []
      // add all checked filter options to array's accordingly
      if (this.filters.equity) selectedFilters['hiring_options'].push('Shares')
      if (this.filters.flatRate) selectedFilters['hiring_options'].push('Flat Rate')

      if (this.filters.ecom) selectedFilters['category'].push('Ecommerce')
      if (this.filters.mobile) selectedFilters['category'].push('Mobile Application')
      if (this.filters.other) selectedFilters['category'].push('Other')
      if (this.filters.saas) selectedFilters['category'].push('SAAS')
      if (this.filters.software) selectedFilters['category'].push('Software')
      if (this.filters.website) selectedFilters['category'].push('Website')

      if (this.filters.bootrapped) selectedFilters['funding_types'].push('Bootstrapped')
      if (this.filters.crowdFunding) selectedFilters['funding_types'].push('CrowdFunding')
      if (this.filters.fandf) selectedFilters['funding_types'].push('Friends & Family')
      if (this.filters.debtCapital) selectedFilters['funding_types'].push('Debt Capital')
      if (this.filters.ventureCapital) selectedFilters['funding_types'].push('Venture Capital')

      if (this.filters.roles) selectedFilters['roles'] = this.filters.roles.split(',')
      if (this.filters.skills) selectedFilters['skills'] = this.filters.skills.split(',')

      if (this.filters.seekingAllys) selectedFilters['seeking_allys'].push(true)
      if (this.filters.searchTerm) selectedFilters['name'].push(this.filters.searchTerm.toLowerCase())

      return selectedFilters
    },
    clearFilters() {
      const keys = Object.keys(this.filters)
      keys.forEach(key => {
        this.filters[key] = false
      })
      this.filters.roles = null
      this.filters.skills = null
      this.filters.searchTerm = null

      this.projectsShown = this.projects
    },
    handleSizeChange() {

    },
    searchByName() {
      if (this.filters.searchTerm)
        this.projectsShown = this.projects.filter(project => project.name.toLowerCase() === this.filters.searchTerm.toLowerCase())
    }
  }
}
