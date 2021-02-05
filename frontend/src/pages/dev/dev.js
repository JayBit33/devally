// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

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
    };
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    ...mapGetters(['getDevUsers', 'getDevUser','getLoggedInUser']),
    fullName() {
      return `${this.user.firstname} ${this.user.lastname}`;
    },
    skillsFormatted() {
      return this.user.skills.join(", ");
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
    messageUser() {
      // let apiKey = "7550adcf70e27f56b88bf5e46295aabf32f49403";
      // var uid = this.username;
      // var name = this.getLoggedInUser.firstname;
      // var user = new CometChat.User(uid);
      // user.setName(name);

      // CometChat.createUser(user, apiKey).then(
      //     user => {
      //         console.log("user created", user);
      //     },error => {
      //         console.log("error", error);
      //     }
      // )
      var receiverID = this.user.username;
      var messageText = "Hello World!";
      var receiverType = CometChat.RECEIVER_TYPE.USER;

      var textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);

      CometChat.sendMessage(textMessage).then(
        message => {
          console.log("Message sent successfully:", message);
          // Do something with message
        },
        error => {
          console.log("Message sending failed with error:", error);
          // Handle any error
        }
      );
    }
  }
};
