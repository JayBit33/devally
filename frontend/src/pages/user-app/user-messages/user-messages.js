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
      activeConversationId: '',
      isUserModalOpen: true,
      activeConversation: [],
      conversations: [],
    }
  },
  components: {
    Conversation,
    Message,
    UserModal,
  },
  created() {
    this.conversations = this.getConversations
    const initialConversationHistoryId = this.$route.query.activeConversationId ? this.$route.query.activeConversationId : this.conversations[0].conversationWith.uid
    this.fetchConversationHistoryWithUser(initialConversationHistoryId).then(res => {
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
    },
    setRecipientId(conversation) {
      const recipientId = conversation.conversationWith.uid
      this.fetchConversationHistoryWithUser(recipientId).then(conversation => {
        // filter out messages that have been deleted
        this.activeConversation = conversation.filter(convo => !convo.deletedAt)
        this.activeConversationId = conversation[0].conversationId
      })


    }
  },
  watch: {
    getConversations() {
      this.conversations = this.getConversations
    }
  }
}
