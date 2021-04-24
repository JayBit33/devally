// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Conversation from '@/components/conversation'
import Message from '@/components/message'
import UserModal from '@/components/user-modal'

export default {
  name: 'UserMessages',
  data() {
    return {
      isUserModalOpen: true,
    }
  },
  components: {
    Conversation,
    Message,
    UserModal,
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
