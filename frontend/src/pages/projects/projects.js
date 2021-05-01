// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import ProjectCard from '@/components/project-card'
import { mapActions } from 'vuex'

export default {
  name: 'Projects',
  data() {
    return {
      projects: [],
    }
  },
  components: {
    ProjectCard,
  },
  async created() {
    this.projects = await this.fetchProjects()
    console.log('projects', this.projects)
  },
  methods: {
    ...mapActions(['fetchProjects']),
  }
}
