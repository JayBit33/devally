// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import ProjectCollapsible from '@/components/project-collapsible';
import UserModal from '@/components/user-modal';
import { mapActions } from 'vuex';

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
    this.projects = await this.fetchProjects()
  },
  methods: {
    ...mapActions(['fetchProjects']),
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
  }
}
