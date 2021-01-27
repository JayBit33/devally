<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="signin">
    <font-awesome-icon :icon="['fas','user-circle']" class="user_icon"/>
    <form @submit.prevent class="signin_form">
      <font-awesome-icon :icon="['fas','user']" class="login_icons"/>
      <input type="email" placeholder="Login"/>
      <font-awesome-icon :icon="['fas','lock']" class="login_icons"/>
      <input type="password" placeholder="Password" />
      <p>Forgot password?</p>
      <button type="submit" @click="submitForm">Sign In</button>
    </form>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'Signin',
  data() {
      var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.signInForm.checkPass !== '') {
          this.$refs.signInForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.signInForm.pass) {
        callback(new Error('Two inputs don\'t match!'));
      } else {
        callback();
      }
    };
    return {
      signInForm: {
          pass: '',
          checkPass: '',
          email: ''
      },
      rules: {
        email: [
          { trigger: 'blur' }
        ],
        pass: [
          { required: true, type: 'password', validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, type: 'password', validator: validatePass2, trigger: 'blur' }
        ],
      },
      dynamicValidateForm: {
        domains: [{
          key: 1,
          value: ''
        }],
        email: ''
      }

    }
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        key: Date.now(),
        value: ''
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';
  .signin {
    margin: 0 auto;
    height: 810px;
    background-image: url('../assets/devs_bg.png');
    background-attachment: fixed;
    // background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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
        font-size: .75rem;
        font-family: 'Arial';
        color: $light-grey;
        position: relative;
        left: 21rem;
      }

      button {
        padding: 1rem;
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

  }
  .el-form-item__content, .el-form-item__content::before {

  }
</style>
