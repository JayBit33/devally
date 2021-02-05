<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="signin">
    <el-alert
      v-if="loginErrorMsg"
      class="signin_error-msg"
      :title="loginErrorMsg"
      type="error"
      center
      effect="dark"
      @close="alertClosed">
    </el-alert>
    <font-awesome-icon :icon="['fas','user-circle']" class="user_icon"/>
    <form @submit.prevent class="signin_form">
      <font-awesome-icon :icon="['fas','user']" class="login_icons"/>
      <input type="email" v-model="signInForm.email" placeholder="Login" required/>
      <font-awesome-icon :icon="['fas','lock']" class="login_icons"/>
      <input type="password" v-model="signInForm.password" placeholder="Password" required/>
      <p>Forgot password?</p>
      <button type="submit" @click="submitForm">Sign In</button>
    </form>
    <p id="or">OR</p>
    <router-link to="/create-account" class="link"><h5>Create Account</h5></router-link>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions } from 'vuex';

export default {
  name: 'Signin',
  data() {
    return {
      loginErrorMsg: '',
      signInForm: {
          password: '',
          email: ''
      },
    }
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
  },
  methods: {
    ...mapActions(['login']),
    alertClosed() {
      console.log('closed alert')
      this.loginErrorMsg = '';
    },
    submitForm() {
      const validFormData = this.validateEmail(this.signInForm.email) && this.validatePassword(this.signInForm.password)
        if (validFormData) {
          this.login({email: this.signInForm.email, password: this.signInForm.password }).then(res => {
            this.loginErrorMsg = res.message != 'login successful' ? res.message : '';
            this.$router.push({ name: 'Profile', params: { id: res.user.id }})
          }).catch(err => console.log('login error 400. See FE', err))
        } else {
          console.log('error submit!!');
          return false;
        }
    },
    validateEmail(email) {
      // TODO
      return email.trim().length > 0;
    },
    validatePassword(password) {
      if (password === '') {
        new Error('Please input the password');
      } else if (password.length < 6) {
        new Error('Password length must be 6 characters or more');
      } else {
          return true
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';
  .signin {
    margin: 0 auto;
    height: 1080px;
    background-image: url('../assets/devs_bg.png');
    background-attachment: fixed;
    // background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &_error-msg {
      position: absolute;
      width: 70%;
      margin: 0 auto;
      transform: translateX(22%);
      padding: 1rem;
    }
    .user_icon {
      font-size: 5rem;
      display: block;
      margin: 0 auto;
      z-index: 10;
      position: relative;
      top: 6rem;
      // border: 2px solid white;
      border-radius: 50%;
      background-color: white;
    }
    &_form {
      width: 28rem;
      height: 200px;
      // background-color: white;
      display: flex;
      margin: 0 auto;
      margin-top: 4rem;
      flex-direction: column;
      justify-content: center;
      color: black;
      font-weight: bold;
      text-transform: capitalize;
      padding: 8rem 2rem;

      input {
        padding: .5rem;
        padding-left: 4rem;
        margin: 1rem 0;
        font-size: 1.125rem;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid $form_border;
        background-color: transparent;

        &:focus {
          border: none;
          outline: none;
          border-bottom: 1px solid $secondary;
        }
      }

      .login_icons {
        font-size: 1.5rem;
        color: $light-grey;
        position: relative;
        top: 2.75rem;
        left: 1rem;
      }

      p {
        font-size: .825rem;
        font-family: 'Arial';
        color:black;
        position: relative;
        left: 20rem;
      }

      button {
        font-size: 1.5rem;
        padding: .75rem;
        margin-top: 3rem;
        color: white;
        background-color: $button-secondary;
        border: none;
        box-shadow: 2px 4px 8px 1px rgba(199, 193, 193, 0.8);

        &:focus {
          border: none;
          outline: none;
        }

        &:hover {
          background-color: lighten($button-secondary, 10%);
        }
      }
    }
    #or, .link {
      text-align: center;
    }
    .link h5 {
      font-family: 'Montserrat';
      font-size: 1.25rem;
    }
  }

</style>
