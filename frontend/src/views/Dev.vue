<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="dev" :style="{'background-image': 'url(' + require('@/assets/devs_bg.png') + ')'}">
    <div class="user-profile">
      <img :src="require('../assets/' + user.profile_image)" />
      <h4>{{ fullName }}</h4>
      <button class="btn">Collaborate</button>
      <button class="btn" @click="messageUser">Message</button>
    </div>
    <div class="user-info">
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
        <h3>Bio</h3>
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
        <h3>Portfolio</h3>
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
  </div>
</template>

<script>
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
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.dev {
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr 4fr;
  column-gap: 8rem;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 7rem;
  background-repeat: no-repeat;
  background-size: initial;
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

      &:hover {
        border: none;
        background-color:$button-primary_focus;
      }
    }
  }

  .user-info {
    height: 250px;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: minmax(200px, 300px);
    gap: 1rem;

    h3 {
      margin-top: 0;
      text-transform: uppercase;
    }
    .btn {
      background-color: green;
      color: white;
      font-size: 1.125rem;
      padding: 0.25rem 1rem;
      border-radius: 0.5rem;
      border: none;
      margin-top: 1.5rem;
      cursor: pointer;
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
    }

    .user-portfolio {
      margin-top: 3rem;
      h3 {
        font-size: 1.75rem;
        text-decoration: underline;
        text-underline-offset: 0.25rem;
        text-transform: none;
        margin-bottom: 2rem;
      }
      img {
        width: 200px;
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
}
@media (min-width: 1700px)  {
  .main {
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
