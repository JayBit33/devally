// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import Dropdown from '@/components/dropdown';
import { mapActions, mapGetters } from "vuex"

export default {
  name: 'invite-to-project-modal',
  props: ['user', 'projects'],
  data() {
    return {
      selectedProject: ''
    }
  },
  components: {
    Dropdown
  },
  created() {
    setTimeout(() => {
      document.addEventListener('click', this.clickOutsideCheck)
    }, 1)
  },
  computed: {
    ...mapGetters(['getLoggedInUser'])
  },
  methods: {
    ...mapActions(['updateUser', 'fetchUserById', 'fetchToast', 'sendNotificationToUser']),
    clickOutsideCheck(e) {
      if (!(e.path.includes(this.$refs.invite_to_project_modal))) this.$emit('modal-close')
    },
    createProject() {
      this.$emit('modal-close')
      this.$router.push(`/profile/${this.getLoggedInUser.id}/create-project`)
    },
    async sendInvitation() {
      let notification = { senderId: this.getLoggedInUser.id, projectId: this.projects.find(p => p.name == this.selectedProject).id, message: 'Project Invitation:', type: 'received' }
      let res = await this.sendNotificationToUser({id: this.user.id, notification})

      let message, toast
      if (res.success) {
        message = [
          { text: 'You have', emphasis: false },
          { text: 'successfully', emphasis: true },
          { text: 'invited', emphasis: false },
          { text: this.user.firstname + " " + this.user.lastname, emphasis: true }
        ]
        toast = await this.fetchToast({ type: 'success', message });
      } 
      else {
        if (res.message && res.message == 'user already has notification') {
          message = [
            { text: 'You have', emphasis: false },
            { text: 'already', emphasis: true },
            { text: 'invited', emphasis: false },
            { text: this.user.firstname + " " + this.user.lastname, emphasis: true },
            { text: 'to', emphasis: false },
            { text: this.selectedProject, emphasis: true }
          ]
          toast = await this.fetchToast({ type: 'info', message });
        } else {
          message = [
            { text: 'You have', emphasis: false },
            { text: 'unsuccessfully', emphasis: true },
            { text: 'invited', emphasis: false },
            { text: this.user.firstname + " " + this.user.lastname, emphasis: true }
          ]
          toast = await this.fetchToast({ type: 'error', message });
        }
      }
      
      this.$emit('toast-update', toast)
      this.$emit('modal-close')
    }
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutsideCheck)
  }
}
