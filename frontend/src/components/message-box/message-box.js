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
  created() {
    setTimeout(() => {
      window.addEventListener('click', this.clickOutsideCheck)
    })
  },
  destroyed() {
    this.replyMessage = null
    window.removeEventListener('click', this.clickOutsideCheck)
  },
  methods: {
    ...mapActions(['sendMessageToUserById']),
    ...mapMutations(['deleteIncomingMessage']),
    clickOutsideCheck(e) {
      if (!(e.path.includes(this.$refs.message_box_content))) this.closeTextBox()
    },
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
      setTimeout(() => {
        this.isTextBoxOpen = !this.isTextBoxOpen
      }, 1)
    }
  }
}
