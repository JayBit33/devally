// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import ProjectCollapsible from '@/components/project-collapsible';
import UserModal from '@/components/user-modal';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserProjects',
  components: {
    ProjectCollapsible,
    UserModal
  },
  data() {
    return {
      isUserModalOpen: true,
      projects: []
    }
  },
  async created() {
    if (this.getLoggedInUser) {
      this.projects = await Promise.all(this.getLoggedInUser.project_ids.map(async id => await this.fetchProjectById(id)))
    }
  },
  computed: {
    ...mapGetters(['getLoggedInUser'])
  },
  methods: {
    ...mapActions(['fetchProjects', 'fetchProjectById']),
    closeModal() {
      this.isUserModalOpen = false
    },
    handleUserModalButton() {
      this.$router.push({ name: 'Projects' })
    },
    updateProjects(project) {
      this.projects = this.projects.map(p => {
        if (p.id == project.id) return project
        else return p
      })
    }
  },
  watch: {
    async getLoggedInUser() {
      if (this.getLoggedInUser) {
        this.projects = await Promise.all(this.getLoggedInUser.project_ids.map(async id => await this.fetchProjectById(id)))
      }
    }
  }
}
