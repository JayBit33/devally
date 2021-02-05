<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="profile" v-loading.fullscreen.lock="isLoading">
    <div class="user-profile">
      <img :src="require('@/assets/' + user.profile_image)" />
      <h4>{{ fullName }}</h4>
      <!-- <button class="btn">Collaborate</button>
      <button class="btn">Message</button> -->
    </div>
    <div class="user-info" >
      <div class="user-info_heading">
        <h2>User Information</h2>
        <button>Edit</button>
      </div>
      <div></div>
      <div class="user-info_accounttype">
        <h3>Account Type:</h3>
        <h4>{{ user.account_types.join(", ") }}</h4>
      </div>
      <div class="user-info_hiringoptions">
        <h3>Hiring Options:</h3>
        <h4>{{ user.hiring_options.join(", ") }}</h4>
      </div>
      <div class="user-info_rating">
        <h3>Rating:</h3>
        <ul>
          <li v-for="rate in user.rating" :key="rate"><font-awesome-icon style="color: #F0DB4F; font-size: 18px;" :icon="['fas', 'star']" /></li>
        </ul>
      </div>
      <div class="user-info_skills">
        <h3>Skills:</h3>
        <h4>{{ skillsFormatted }}</h4>
      </div>
      <div class="user-bio">
        <div class="user-bio_heading" >
          <h3>Bio</h3>
          <button>Edit</button>
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus
          in cum blanditiis ratione ad praesentium nobis voluptates nemo maxime
          beatae, corporis ullam officia dolor consectetur modi eius cumque?
          Rem, earum? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Ipsa rerum aliquam iusto consectetur unde et quos delectus laboriosam
          voluptatibus odio eum deserunt ab, accusamus a. Quasi deleniti neque
          mollitia quia! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Quae asperiores, eius fugiat explicabo, a reiciendis quibusdam
          voluptates ipsum laudantium minima nemo sapiente dicta nostrum nisi
          eum dolore consequuntur debitis ipsa.
        </p>
      </div>

      <div class="user-portfolio">
        <div class="user-portfolio_heading">
          <h3>Portfolio</h3>
          <button>Edit</button>
        </div>
        <div class="user-portfolio_images">
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
        </div>
      </div>
    </div>
    <el-drawer
      title="Messages"
      :append-to-body="true"
      :visible.sync="drawerOpen"
      :direction="drawerDirection"
      size="20%"
    >
      <div class="messages">
        <ul>
          <li v-for="(message,idx) in messages" :key="idx" class="message">
            <div class="message-header">
              <el-avatar :size="60" src="https://empty" @error="errorHandler" >
                <img :src="require('@/assets/' + getProfileImage(message.entities.sender.entity.uid))" />
              </el-avatar>
              <div>
                <h4 class="username">Waveybits</h4>
                <h5 v-if="message.entities.sender.entity.status === 'available'" class="senderActive">online</h5>
              </div>
              <h3 class="date-sent">{{getMessageDate(message.sentAt)}}</h3>
            </div>
              <p>{{message.text}}</p>
          </li>
        </ul>
      </div>
    </el-drawer>
    <message-notifier :numberOfMessages="messages.length" :haveMessages="messages.length > 0" @openMessageBox="openMessageDrawer"></message-notifier>
  </div>
</template>

<script>
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
    fullName() {
      return `${this.user.firstname} ${this.user.lastname}`;
    },
    skillsFormatted() {
      return this.user.skills.join(", ");
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
          if (!alreadyExists.length) {
            this.messages.push({...message.data, sentAt: message.sentAt, receiverType: message.receiverType});
          }
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
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.profile {
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-template-columns: 1fr 4fr;
  column-gap: 8rem;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 7rem;
  overflow: hidden;

  .user-profile {
    text-align: center;
    img {
      width: 15rem;
      height: 15rem;
      padding: 10px;
      background: #e4dddd;
      border: 0.125rem solid #dddddd;
    }
    h4 {
      font-family: inherit;
      font-size: 1.5rem;
      margin-top: 1rem;
    }
    .btn {
      background-color: $button-primary;
      color: white;
      font-size: 1.125rem;
      padding: 0.5rem 2rem;
      margin-top: 1rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
    }
  }

  .user-info {
    height: 250px;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: minmax(300px, 300px);
    gap: 1rem;

    h3 {
      margin-top: 0;
      text-transform: uppercase;
    }
    .btn {
      background-color: $button-primary;
      color: white;
      font-size: 1.125rem;
      padding: 0.25rem 1rem;
      border-radius: 0.5rem;
      border: none;
      margin-top: 1.5rem;
      cursor: pointer;
    }

    &_heading {
      margin-bottom: 1rem;
      h2, button {
        display: inline;
      }
      h2 {
        margin-right: 2rem;
      }
    }

    &_rating {
      ul {
        padding: 0;
      }
      ul li {
        list-style-type: none;
        display: inline;
      }
    }

    .user-bio {
      grid-column: 1 / 3;
      margin-top: 3rem;
      p {
        font-size: 1.25rem;
        line-height: 2rem;
      }
      &_heading {
        h3, button {
          display: inline;
        }
        h3 {
          margin-right: 2rem;
        }
      }
    }

    .user-portfolio {
      margin-top: 3rem;
      h3 {
        font-size: 1.75rem;
        text-decoration: underline;
        text-underline-offset: 0.25rem;
        text-transform: none;
      }
      img {
        width: 200px;
      }
      &_heading {
        margin-bottom: 2rem;
        h3, button {
          display: inline;
        }
        h3 {
          margin-right: 2rem;
        }
      }
      &_images {
        display: grid;
        width: 80%;
        grid-template-columns: repeat(4, 1fr);
        row-gap: 2rem;
        column-gap: 2rem;
      }
    }
  }

  button {
    background-color: $button-primary;
    color: white;
    text-transform: uppercase;
    font-weight: 700;
    border: none;
    outline: none;
    padding: .5rem;
    position: relative;
    bottom: .125rem;
    cursor: pointer;
  }
}

.messages {
  margin: 0;
  padding: 0;
  display: inline;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    .message {
      padding: 1rem;
      background: $message_bg;
      color: black;
      border-bottom: 1px solid $border;

      &-header {
        display: flex;

        .username {
          padding-left: 1rem;
        }

        .date-sent {
          padding-left: 5rem;
        }

        .senderActive {
          color: green;
          position: relative;
          bottom: 1.25rem;
          left: 1rem;
        }
      }

      p {
        margin-top: 0;
        padding-left: 2rem;
      }
    }
  }
}

@media (min-width: 1700px)  {
  .main {
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
