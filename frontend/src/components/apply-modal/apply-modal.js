// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import Dropdown from '@/components/dropdown';
import { mapActions } from 'vuex';

export default {
  name: 'apply-modal',
  props: ['user', 'project', 'position', 'isSendingApplication', 'extraInfoOverride'],
  components: {
    Dropdown
  },
  data() {
    return {
      extraInfo: ''
    }
  },
  async created() {
    if (!this.isSendingApplication && this.extraInfoOverride) {
      this.extraInfo = this.extraInfoOverride
    }
    setTimeout(() => {
      document.addEventListener('click', this.clickOutsideCheck)
    }, 1)
  },
  methods: {
    ...mapActions(['sendNotificationToUser']),
    clickOutsideCheck(e) {
      if (!(e.path.includes(this.$refs.apply_modal))) this.$emit('apply-modal-close')
    },
    sendApplication() {
      this.sendNotificationToUser({
        notification: { senderId: this.user.id,
          projectId: this.project.id,
          message: 'Project Application:',
          type: 'application',
          info: {
            extraInfo: this.extraInfo,
            position: this.position.position,
            sending: true
          }
        },
        id: this.project.creator_id
      })

      this.$emit('apply-modal-close')
    },
    viewUser() {
      this.$router.push(`/dev/${this.user.id}`)
    }
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutsideCheck)
  }
}
