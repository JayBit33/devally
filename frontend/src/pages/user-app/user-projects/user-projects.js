// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import ProjectCollapsible from '@/components/project-collapsible';
import UserModal from '@/components/user-modal';

export default {
  name: 'UserProjects',
  components: {
    ProjectCollapsible,
    UserModal
  },
  data() {
    return {
      isUserModalOpen: true
    }
  },
  methods: {
    closeModal() {
      this.isUserModalOpen = false
    },
    handleUserModalButton() {
      this.$router.push({ name: 'Projects' })
    }
  }
}
