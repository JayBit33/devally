// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Conversation from '@/components/conversation'
import Message from '@/components/message'
import UserModal from '@/components/user-modal'
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'UserMessages',
  data() {
    return {
      isUserModalOpen: true,
      activeConversation: {},
      conversations: []
    }
  },
  components: {
    Conversation,
    Message,
    UserModal,
  },
  async created() {
    this.conversations = this.getConversations

    this.fetchConversationHistoryWithUser('2').then(res => {
      console.log('res', res)
      // filter out messages that have been deleted
      this.activeConversation = res.filter(convo => !convo.deletedAt)
    })
  },
  computed: {
    ...mapGetters(['getConversations'])
  },
  methods: {
    ...mapActions(['fetchConversationWithUserId', 'fetchConversationHistoryWithUser']),
    closeModal() {
      this.isUserModalOpen = false
    },
    handleUserModalButton() {
      this.$router.push({ name: 'Projects' })
    }
  }
}
