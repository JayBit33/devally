<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div id="main-component" :class="{'offwhite-background': $route.name == 'Dev' }">
    <div v-if="showHeaderFooter" class="header">
      <nav>
        <router-link to="/" class="logo link">DevAlly</router-link>
        <ul>
          <!-- <li><router-link to="/works" class="link">how it works</router-link><span>/</span></li> -->
          <li><router-link to="/devs" class="link">find developers</router-link></li>
          <li><router-link to="/projects" class="link">Browse Projects</router-link></li>
          <li><router-link to="/resources" class="link">resources</router-link><span></span></li>
          <!-- <li><router-link to="/about" class="link">about</router-link></li> -->
        </ul>
      </nav>

      <div class="nav-btns">
        <button v-if="!signedIn" class="signin-button"><router-link to="/signin" class="signin">Sign In</router-link></button>
        <button v-else class="signin-button"><span id="username">{{ username }}</span><font-awesome-icon class="user-icon" :icon="['fas','user']" @click="onOptionsClick" /></button>
        <div class="user-options-container">
          <user-options-dropdown v-if="optionsViewable" @optionSelected="closeOptions" />
        </div>
      </div>
    </div>

    <div class="page-content">
      <breadcrumbs v-if="showHeaderFooter && this.$route.name !== 'Projects'" />
      <router-view />
    </div>

    <div v-if="isLoggedIn" class="messaging-container">
      <message-box />
    </div>

    <div v-if="showHeaderFooter" class="footer">
      <div class="footer_stay-connected">
        <h3>Stay Connected</h3>
        <p>Join our newsletter and get advice and tips on how to run a tech startup.</p>
        <div class="subscribe">
          <input type="email" id="email" placeholder="Email Address" />
          <button>Subscribe</button>
        </div>
          <div class="social-icons">
            <font-awesome-icon :icon="['fab','facebook']" class="social-icon"></font-awesome-icon>
            <font-awesome-icon :icon="['fab','linkedin']" class="social-icon"></font-awesome-icon>
            <font-awesome-icon :icon="['fab','twitter-square']" class="social-icon"></font-awesome-icon>
          </div>
      </div>
      <div class="footer_mission">
        <h3>Mission</h3>
        <p>We help those with software, website and app ideas find technical co-founders, therefore, minimizing the number of ideas that are lost and forgoten because thier creators didn't have the resources to bring them to life. We also support our users in their journey as a tech startup by making pertinent knowledge easily available.</p>
      </div>
      <div class="footer_nav">
        <h3>Navigation</h3>
        <div class="links">
          <div class="links-col1">
            <p><router-link to="/devs" class="link">Find Developers</router-link></p>
            <p><router-link to="/projects" class="link">Search Projects</router-link></p>
            <p><router-link to="/resources" class="link">Read Articles</router-link></p>
          </div>
          <div class="links-col2">
           <p><router-link to="/support" class="link">FAQ</router-link></p>
           <p><router-link to="/careers" class="link">Careers</router-link></p>
           <p><router-link to="/contact" class="link">Contact Us</router-link></p>
          </div>
        </div>
      </div>
      <div class="footer_policies">
        <p><router-link to="/policy" class="link">Privacy Policy</router-link></p>
        <p>&copy; devally 2021</p>
        <p><router-link to="/terms" class="link">Terms & Conditions</router-link></p>
      </div>
    </div>
  </div>
</template>
<style src="./App.scss" lang="scss"></style>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import UserOptionsDropdown from './components/user-options-dropdown/';
import Breadcrumbs from './components/breadcrumbs/';
import MessageBox from './components/message-box/';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: "App",
  data() {
    return {
      background: false,
      optionsViewable: false,
      loggedInUser: null
    }
  },
  components: {
    Breadcrumbs,
    FontAwesomeIcon,
    MessageBox,
    UserOptionsDropdown
  },
  created() {
    this.retrieveRefreshToken().then(res => {
      console.log('token refreshed', res);
      if (res.ok) {
        this.updateIsLoggedIn(true);
        this.initializeCometChat().then(() => {
          this.fetchConversations()
        })
      }
    })
  },
  computed: {
    ...mapGetters(['getLoggedInUser','isLoggedIn']),
    signedIn() {
      return this.isLoggedIn;
    },
    username() {
      return this.getLoggedInUser.username;
    },
    showHeaderFooter() {
      return this.$route.name === 'Profile' || this.$route.name === 'SignIn' ? false : true
    }
  },
  methods: {
    ...mapActions(['logout','retrieveRefreshToken', 'initializeCometChat', 'fetchConversations']),
    ...mapMutations(['updateIsLoggedIn']),
    backgroundOn(isOn) {
      this.background = isOn;
    },
    onOptionsClick() {
      if (!this.optionsViewable) this.optionsViewable = true;
      else this.optionsViewable = false;
    },
    closeOptions(opt) {
      if (opt === 'signout') {
        this.updateIsLoggedIn(false);
        this.logout();
        this.$router.push({ name: 'Home' })
      }
      this.optionsViewable = false;
    }
  }
};
</script>
