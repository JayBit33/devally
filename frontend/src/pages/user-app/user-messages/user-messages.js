// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { CometChat } from "@cometchat-pro/chat";
import Conversation from '@/components/conversation'
import Message from '@/components/message'
import UserModal from '@/components/user-modal'

export default {
  name: 'UserMessages',
  data() {
    return {
      isUserModalOpen: true,
      messages: []
    }
  },
  components: {
    Conversation,
    Message,
    UserModal,
  },
  created() {
    var listenerID = this.$route.params.id;
    const vm = this
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
          console.log("Text message received successfully", textMessage);
          // Handle text message
          vm.messages.push(textMessage)
        },
        onMediaMessageReceived: mediaMessage => {
          console.log("Media message received successfully", mediaMessage);
          // Handle media message
        },
        onCustomMessageReceived: customMessage => {
          console.log("Custom message received successfully", customMessage);
          // Handle custom message
        }
      })
    );
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
