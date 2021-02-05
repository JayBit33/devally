<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div id="main-component">
    <div class="header">
      <nav>
        <router-link to="/" class="logo link">DevAlly</router-link>
        <ul>
          <li><router-link to="/works" class="link">how it works</router-link><span>/</span></li>
          <li><router-link to="/devs" class="link">find developers</router-link><span>/</span></li>
          <li><router-link to="/projects" class="link">browse projects</router-link><span>/</span></li>
          <li><router-link to="/about" class="link">about</router-link></li>
        </ul>
      </nav>
      <button v-if="!signedIn"><router-link to="/signin" class="signin">Sign In</router-link></button>
      <button v-else ><span id="username">{{ username }}</span><font-awesome-icon class="user-icon" :icon="['fas','user']" @click="onOptionsClick" /></button>
    </div>
    <user-options-dropdown v-if="optionsViewable" @optionSelected="closeOptions" />

    <div class="page-content">
      <breadcrumbs />
      <router-view />
    </div>

    <div class="footer">
      <p>&copy; DevAlly 2021</p>
    </div>
  </div>
</template>

<script>
import UserOptionsDropdown from './components/user-options-dropdown/';
import Breadcrumbs from './components/breadcrumbs/';
import { mapGetters, mapMutations } from 'vuex';

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
    UserOptionsDropdown
  },
  computed: {
    ...mapGetters(['getLoggedInUser','isLoggedIn']),
    signedIn() {
      return this.isLoggedIn;
    },
    username() {
      return this.getLoggedInUser.username;
    }
  },
  methods: {
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
        this.$router.push({ name: 'Home' })
      }
      this.optionsViewable = false;
    }
  }
};
</script>

<style lang="scss">
@import "scss/variables";

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
}

.link { text-decoration: none; color: black; }

.header {
  width: 100%;
  margin: 2rem 0rem 2rem 2rem;
  color: black;
  display: flex;
  align-items: flex-start;
  justify-content:space-between;

  .logo {
    font: bold 1.5rem 'Montserrat';
    margin-top: 0;
    margin-right: 2rem;
  }
  nav {
    overflow: hidden;
    display: flex;

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
  .signin {
  text-decoration: unset;
  font-family: 'Montserrat';
  font-size: 1rem;
  color: $button-secondary;
  }

  button {
    margin-right: 7.5rem;
    border: none;
    outline: none;
    background-color: white;
    .user-icon {
      color: $primary;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }

  #username {
    font-size: .875rem;
    font-weight: 700;
    margin-right: 1rem;
  }
}

.page-content {
  background-image: url('./assets/devs_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  // margin-left: 7rem;
  // margin-right: 7rem;
  // max-width: 1960px;
}

.footer {
  background-color: #3f5e75;
  color: white;
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
  padding-top: 11rem;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
