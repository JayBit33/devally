// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import MessageBox from '../../components/message-box';
import Toast from '@/components/toast'
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
      messageSentSuccessful: false,
      portfolioImages: [
        'project.png',
        'project.png',
        'project.png',
        'project.png',
        'project.png',
        'project.png',
        'project.png',
        'project.png'
      ],
      toast: {
        type: '',
        message: [{ text: '', emphasis: false }],
        hasAction: false,
        actionRedirect: '',
        isShown: false,
        duration: 0
      }
    };
  },
  components: {
    FontAwesomeIcon,
    MessageBox,
    Toast
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
    ...mapActions(['fetchDevUsers', 'updateUser']),
    async addContact() {
      let user = await this.getLoggedInUser
      let id, response

      if (user.connections.some(connection => connection == this.id)) {
        this.toast.message = [
          { text: 'You already have', emphasis: false },
          { text: this.user.firstname + " " + this.user.lastname, emphasis: true },
          { text: 'added to your connections', emphasis: false }
        ]
        this.toast.type = 'warning'
      } else {
        if (user) {
          id = user.id
          let updates = {
            connections: JSON.stringify([...user.connections, this.id])
          }
          response = await this.updateUser({ id, updates })
        }
  
        if (response && user) {
          this.toast.message = [
            { text: 'You have successfully added', emphasis: false },
            { text: this.user.firstname + " " + this.user.lastname, emphasis: true },
            { text: 'to your connections', emphasis: false }
          ]
          this.toast.type = 'success'
        } else {
          this.toast.message = [
            { text: 'You have', emphasis: false },
            { text: 'unsuccessfully', emphasis: true },
            { text: 'added', emphasis: false },
            { text: this.user.firstname + " " + this.user.lastname, emphasis: true },
            { text: 'to your connections', emphasis: false }
          ]
          this.toast.type = 'error'
        }
      }
      this.toast.duration = 5000
      this.toast.isShown = true
    },
    closeToast() {
      this.toast.isShown = false
    },
    handleToastAction() {
      this.$router.push(this.toast.actionRedirect)
      this.toast.isShown = false
    },
    getImage(imageName) {
      return require(`@/assets/${imageName}`)
    },
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
