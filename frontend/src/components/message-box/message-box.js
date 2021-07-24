import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapGetters } from 'vuex'

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
    closeTextBox() {
      this.replyMessage = null
      this.isTextBoxOpen = false
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
      this.sendMessageToUserById({ messageText: this.messageText })
      this.closeTextBox()
    },
    toggleTextBoxOpen() {
      this.isTextBoxOpen = !this.isTextBoxOpen
    }
  }
}
