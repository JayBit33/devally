// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import MessageBox from '../../components/message-box';
// import COMETCHAT_CONSTANTS from '@/chat/constants.js';
import { CometChat } from "@cometchat-pro/chat";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Dev",
  data() {
    return {
      user: {},
      id: this.$route.params.id,
      messageBoxOpen: false,
      messageSentSuccessful: false
    };
  },
  components: {
    FontAwesomeIcon,
    MessageBox
  },
  computed: {
    ...mapGetters(['getDevUsers', 'getDevUser','getLoggedInUser']),
    fullName() {
      return `${this.user.firstname} ${this.user.lastname}`;
    },
    skillsFormatted() {
      return this.user.categories.join(", ");
    },
    username() {
      return this.getLoggedInUser.username;
    }
  },
  async created() {
    await this.fetchDevUsers().then(() => this.user = this.getDevUser(this.$route.params.id));
  },
  methods: {
    ...mapActions(['fetchDevUsers']),
    messageUser(messageText) {
      this.messageBoxOpen = true;
      var receiverID = this.user.username;
      var receiverType = CometChat.RECEIVER_TYPE.USER;

      var textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);

      CometChat.sendMessage(textMessage).then(
        message => {
          console.log("Message sent successfully:", message);
          // TODO Do something with message
          // Should create a toast component that is on main page and recieves events when it needs triggered
          this.messageSentSuccessful = true;
        },
        error => {
          console.log("Message sending failed with error:", error);
          // Handle any error
        }
      );
        this.toggleMessageBox();
    },
    openMessageBox() {
      this.toggleMessageBox();
      if (this.messageBoxOpen) {
        setTimeout(() => {
          document.querySelector('.message-box_textarea').focus();
        }, 1000);
      }
    },
    toggleMessageBox() {
      this.messageBoxOpen = !this.messageBoxOpen;
    }
  }
};
