import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MessageBox',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      composingMessage: false,
      messageText: '',
      isTextBoxOpen: false,
      replyMessage: null
    }
  },
  computed: {
    ...mapGetters(['getIncomingMessages']),
    hasIncomingMessages() {
      return this.getIncomingMessages && this.getIncomingMessages.length > 0
    }
  },
  destroyed() {
    this.replyMessage = null
  },
  methods: {
    ...mapActions(['sendMessageToUserById']),
    ...mapMutations(['deleteIncomingMessage']),
    closeTextBox() {
      this.replyMessage = null
      this.isTextBoxOpen = false
    },
    deleteMessage(message) {
      this.deleteIncomingMessage(message)
    },
    openTextBox() {
      this.isTextBoxOpen = true
    },
    replyToMessage(message) {
      this.composingMessage = true
      this.replyMessage = message
      this.openTextBox()
    },
    sendMessage() {
      this.sendMessageToUserById({ messageText: this.messageText, receiverId: this.replyMessage.sender.uid })
      this.deleteIncomingMessage(this.replyMessage)
      this.closeTextBox()
    },
    toggleTextBoxOpen() {
      this.isTextBoxOpen = !this.isTextBoxOpen
    }
  }
}
