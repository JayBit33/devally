// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import MessageNotifier from '@/components/message-notifier';
import Toast from '@/components/toast'
import UserConnections from '@/pages/user-app/user-connections';
import UserMessages from '@/pages/user-app/user-messages';
import UserProfile from '@/pages/user-app/user-profile';
import UserProjects from '@/pages/user-app/user-projects';
import UserSettings from '@/pages/user-app/user-settings';
import { CometChat } from "@cometchat-pro/chat";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "UserApp",
  data() {
    return {
      user: {},
      drawerOpen: false,
      drawerDirection: 'rtl',
      id: this.$route.params.id,
      isLoading: true,
      messages: [],
      messagesViewActive: false,
      projectsViewActive: false,
      connectionsViewActive: false,
      settingsViewActive: false,
      profileViewActive: false,
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
    MessageNotifier,
    Toast,
    UserConnections,
    UserMessages,
    UserProfile,
    UserProjects,
    UserSettings
  },
  computed: {
    ...mapGetters(['getDevUser', 'getDevUserByUsername']),
    accountType() {
      return this.user.user_type_id === 1
      ? 'developer'
      : this.user.user_type_id === 2
      ? 'visionary'
      : 'developer | visionary'
    },
    fullName() {
      return `${this.user.firstname} ${this.user.lastname}`;
    },
    categoriesFormatted() {
      return this.user.categories.join(", ");
    }
  },
  async created() {
    await this.fetchDevUsers().then(() => {
      this.user = this.getDevUser(this.$route.params.id);
      this.isLoading = false;
    });

    var listenerID = this.user.username;

    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: message => {
          console.log("Message received successfully:", {message});
          // Handle text message
          const alreadyExists = this.messages.filter(msg => msg.resource === message.data.resource);
          console.log(alreadyExists)
          // if (!alreadyExists.length) {
            this.messages.push({...message.data, sentAt: message.sentAt, receiverType: message.receiverType});
          //}
        }
      })
    );
  },
  methods: {
    ...mapActions(['fetchDevUsers']),
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
    openMessageDrawer() {
      this.drawerOpen = true;
    },
    open1(message) {
        // const h = this.$createElement;

        this.$notify({
          title: 'Message',
          dangerouslyUseHTMLString: true,
          duration: 0,
          message: `
                    <div class="message-header">
                      <el-avatar :size="60" src="https://empty" @error="errorHandler" >
                        <img :src="${require('@/assets/' + this.getProfileImage(message.entities.sender.entity.uid))}" />
                      </el-avatar>
                      <div>
                        <h4 class="username">Waveybits</h4>
                        <h5 v-if="${message.entities.sender.entity.status} === 'available'" class="senderActive">online</h5>
                      </div>
                      <h3 class="date-sent">${this.getMessageDate(message.sentAt)}</h3>
                    </div>
                    <p>${message.text}</p>`
        });
      },
    getMessageDate(epoch) {
      const date = new Date(epoch * 1000);
      return dayjs(date).format('MM/DD h:m')
    },
    getProfileImage(sendersUsername) {
      if (this.messages) {
        console.log(sendersUsername);
        console.log(this.getDevUserByUsername(sendersUsername).profile_image);
        return this.getDevUserByUsername(sendersUsername).profile_image;
      }
    },
    handleClose(done) {
      this.$confirm('Are you sure you want to close this?')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    updateView(view) {
      this.messagesViewActive = false;
      this.projectsViewActive = false;
      this.connectionsViewActive = false;
      this.settingsViewActive = false;
      this.profileViewActive = false;

      switch (view) {
        case 'messages':
          this.messagesViewActive = true;
          break;
        case 'projects':
          this.projectsViewActive = true;
          break;
        case 'connections':
          this.connectionsViewActive = true;
          break;
        case 'settings':
          this.settingsViewActive = true;
          break;
        case 'profile':
          this.profileViewActive = true;
          break;
        default:
          break;
      }
    }
  },
};
