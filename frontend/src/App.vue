<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div id="main-component" :class="{'offwhite-background': $route.name == 'Dev' }">
    <div v-if="showHeaderFooter" class="header">
      <nav>
        <router-link to="/" class="logo link">DevAlly</router-link>
        <ul>
          <!-- <li><router-link to="/works" class="link">how it works</router-link><span>/</span></li> -->
          <li><router-link to="/devs" class="link">find developers</router-link><span>/</span></li>
          <li><router-link to="/projects" class="link">browse projects</router-link><span>/</span></li>
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

    <div v-if="showHeaderFooter" class="footer">
      <div class="footer_stay-connected">
        <h3>Stay Connected</h3>
        <p>Join our newsletter and get advice and tips on how to run a tech startup.</p>
        <div class="subscribe">
          <input type="email" id="email" placeholder="Email Address" />
          <button>Sign Up</button>
          <div class="social-icons">
            <font-awesome-icon :icon="['fab','facebook']" class="social-icon"></font-awesome-icon>
            <font-awesome-icon :icon="['fab','linkedin']" class="social-icon"></font-awesome-icon>
            <font-awesome-icon :icon="['fab','twitter-square']" class="social-icon"></font-awesome-icon>
          </div>
        </div>
      </div>
      <div class="footer_mission">
        <h3>Mission</h3>
        <p>Help visionaries find technical co-founders so they can bring their ideas to life. Support our users in their journey as a startup.</p>
      </div>
      <div class="footer_nav">
        <h3>Navigation</h3>
        <div class="links">
          <div class="links-col1">
           <p>Search Developers</p>
           <p>Search Projects</p>
           <p>Read Articles</p>
          </div>
          <div class="links-col2">
           <p>Support</p>
           <p>Careers</p>
           <p>Contact Us</p>
          </div>
        </div>
      </div>
      <div class="footer_policies">
        <p>Privacy Policy</p>
        <p>@copy devally 2021</p>
        <p>Terms & Conditions</p>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import UserOptionsDropdown from './components/user-options-dropdown/';
import Breadcrumbs from './components/breadcrumbs/';
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
    UserOptionsDropdown
  },
  created() {
    this.retrieveRefreshToken().then(res => {
      console.log('token refreshed', res);
      if (res.ok) this.updateIsLoggedIn(true);
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
    ...mapActions(['logout','retrieveRefreshToken']),
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

<style lang="scss">

* {
  font-family: 'Montserrat';
}

body,
html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#main-component {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: $max-screen-width;
  margin: 0 auto;

  &.offwhite-background {
    // background-color: $sidebar_bg;
    .page-content {
      background-color: unset;
    }
  }
}

.link { text-decoration: none; color: black; }

.header {
  width: 100%;
  padding: 3rem 1rem 2rem 3rem;
  color: black;
  display: flex;
  align-items: flex-start;
  justify-content:space-between;
  position: relative;
  top: 0;
  left: 0;
  z-index: 3;

  .logo {
    font: bold 1.5rem 'Montserrat';
    margin-top: 0;
    margin-right: 2rem;
  }
  nav {
    overflow: hidden;
    display: flex;
    position: relative;

    ul {
      list-style-type: none;
      margin-top: .425rem;
      padding: 0;
      li {
        display: inline;
        .link {
          display: inline;
          text-decoration: none;
          padding: 1rem 1.5rem;
          font: 400 1rem 'Montserrat';
          color: #514E4E;
          span {
            padding-left: 1.5rem;
          }
        }
      }
    }
  }

  .nav-btns {
    position: relative;
    .signin {
      text-decoration: unset;
      font-family: 'Montserrat';
      font-size: 1rem;
      color: $navy-blue;
    }

    button {
      margin-right: 7.5rem;
      border: none;
      outline: none;
      background-color: white;
      .user-icon {
        color: $navy-blue;
        font-size: 1.5rem;
        cursor: pointer;
      }
      &.signin-button {
        background-color: transparent;
      }
    }
    .user-options-container {
      position: absolute;
      top: 2.25rem;
      left: calc(50% + 2rem);
      transform: translate(-100%, 0);
      width: max-content;
    }
  }

  #username {
    font-size: .875rem;
    font-weight: 700;
    margin-right: 1rem;
    color: $navy-blue;
  }
}

.page-content {
  // background-image: url('./assets/devs_bg.png');
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 80vh;
  z-index: 3;
  .breadcrumbs {
    z-index: 3;
  }
}

.footer {
  background-color: $footer-bg;
  color: white;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: $max-screen-width;
  margin: 0 auto;
  padding: 3rem  0 1rem 0;
  z-index: 3;
  display: grid;
  justify-content: space-between;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto auto;

  h3 {
    font-family: 'Open Sans';
    font-size: 1.25rem;
    font-weight: 600;
    text-align: left;
    text-transform: uppercase;
  }

  p {
    font-family: 'Open Sans';
    text-align: center;
  }

  &_stay-connected {
    margin: 0 7rem;
    margin-right: 8rem;
    p {
      max-width: 20rem;
      text-align: left;
      line-height: 1.75rem;
    }

    #email {
      width: 12.5rem;
      padding: .6rem;
    }

    button {
      background-color: #9794E1;
      color: white;
      font-family: 'Montserrat';
      font-size: 1.125rem;
      font-weight: 600;
      border: none;
      padding: .5rem;
      margin-left: .5rem;
    }

    .social-icons {
      .social-icon {
       font-size: 2rem;
       margin-top: 1rem;
       margin-right: 1rem;
      }
    }
  }

  &_mission {
    margin: 0 8rem;
    p {
      text-align: left;
      max-width: 30rem;
      line-height: 1.75rem;

    }
  }

  &_nav {
    margin: 0 0 0 8rem;
    margin-right: 7rem;

    .links {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 4rem;

      p {
        text-align: left;
      }
    }

  }

  &_policies {
    display: flex;
    justify-content: space-between;
    grid-column-start: 1;
    grid-column-end: 4;
    padding-top: 7rem;
    padding-left: 18rem;
    padding-right: 18rem;
    text-align: center;
    p {
      display: inline;
    }
  }

}

.fade-in {
animation: fadeIn ease 7s;
-webkit-animation: fadeIn ease 7s;
-moz-animation: fadeIn ease 7s;
-o-animation: fadeIn ease 7s;
-ms-animation: fadeIn ease 7s;
}
@keyframes fadeIn {
0% {opacity:0;}
100% {opacity:1;}
}

@-moz-keyframes fadeIn {
0% {opacity:0;}
100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
0% {opacity:0;}
100% {opacity:1;}
}

@-o-keyframes fadeIn {
0% {opacity:0;}
100% {opacity:1;}
}

@-ms-keyframes fadeIn {
0% {opacity:0;}
100% {opacity:1;}
}
</style>
