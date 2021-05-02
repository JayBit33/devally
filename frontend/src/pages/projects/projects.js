// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import ProjectCard from '@/components/project-card'
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
        matchingSkills: false,
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
      projects: [],
      projectsShown: [],
    }
  },
  components: {
    ProjectCard,
  },
  async created() {
    this.projects = await this.fetchProjects()
    this.projectsShown = this.projects
  },
  methods: {
    ...mapActions(['fetchProjects']),
    applyFilters() {
      return
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
    searchByName() {
      if (this.filters.searchTerm)
        this.projectsShown = this.projects.filter(project => project.name.toLowerCase() === this.filters.searchTerm.toLowerCase())
    }
  }
}
