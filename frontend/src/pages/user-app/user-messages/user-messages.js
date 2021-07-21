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

    // Listener for Real Time Messages
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
    
    // Retrieve all messages with another user
    var UID = "2";
    var limit = 50;

    var messagesRequest = new CometChat.MessagesRequestBuilder()
      .setLimit(limit)
      .setUID(UID)
      .build();

    messagesRequest.fetchPrevious().then(
      messages => {
        console.log("Message list fetched:", messages);
        messages.forEach(msg => this.messages.push(msg));

        // Handle the list of messages
      },
      error => {
        console.log("Message fetching failed with error:", error);
      }
    );

    // Retrieve User Conversations
    // var conversationsRequest = new CometChat.ConversationsRequestBuilder()
    // .setLimit(50)
    // .build();

    // conversationsRequest.fetchNext().then(
    //   conversationList => {
    //     console.log("Conversations list received:", conversationList);
    //     this.messages.push(conversationList)
    //   },
    //   error => {
    //     console.log("Conversations list fetching failed with error:", error);
    //   }
    // );
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
