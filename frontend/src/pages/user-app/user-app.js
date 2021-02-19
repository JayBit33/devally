// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import MessageNotifier from '@/components/message-notifier';
import { CometChat } from "@cometchat-pro/chat";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "UserProfile",
  data() {
    return {
      user: {},
      drawerOpen: false,
      drawerDirection: 'rtl',
      id: this.$route.params.id,
      isLoading: true,
      messages: []
    };
  },
  components: {
    FontAwesomeIcon,
    MessageNotifier
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
    }
  },
};