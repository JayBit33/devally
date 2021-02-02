<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="create-account">
    <el-steps :active="activeStep" align-center finish-status="success" class="steps">
      <el-step title="Credentials" class="title" ></el-step>
      <el-step title="Account Info" class="title"></el-step>
      <el-step title="Details" class="title"></el-step>
    </el-steps>
    <h2 v-if="activeStep === 0">Create Account</h2>
    <h2 v-if="activeStep === 1">Addittional Information</h2>
    <h2 v-if="activeStep === 2">Account Details</h2>
    <div v-if="activeStep === 0" class="create-account_form">
      <font-awesome-icon :icon="['fas','at']" class="login_icons"/>
      <input type="email" v-model="createForm.email" placeholder="Email"/>
      <font-awesome-icon :icon="['fas','lock']" class="login_icons"/>
      <input type="password" v-model="createForm.password" placeholder="Password" />
      <font-awesome-icon :icon="['fas','lock']" class="login_icons"/>
      <input type="password" v-model="createForm.passwordCheck" placeholder="Confirm Password" />
      <p>Already have an account? Sign In</p>
      <button type="submit" @click="nextStep">Next</button>
    </div>
    <!-- Step 2 -->
    <div v-if="activeStep === 1" class="create-account_form2">
      <div class="input">
      <label>Username</label>
      <input type="text" v-model="createForm.username" />
      </div>
      <div class="input">
      <label>Country</label>
      <input type="text" v-model="createForm.country"  />
      </div>
      <div class="input">
      <label>First Name</label>
      <input type="text" v-model="createForm.firstname"  />
      </div>
      <div class="input">
      <label>State</label>
      <input type="text" v-model="createForm.state"  />
      </div>
      <div class="input">
      <label>Last Name</label>
      <input type="text" v-model="createForm.lastname"  />
      </div>
      <div class="block">
      <label>Account Type</label>
      <br>
       <el-radio-group v-model="createForm.account_type" class="radio-group" required="true">
        <el-radio-button label="Developer" class="radio_btn"></el-radio-button>
        <el-radio-button label="Entrepreneur" class="radio_btn"></el-radio-button>
        <el-radio-button label="Both" class="radio_btn"></el-radio-button>
      </el-radio-group>
      </div>
      <button type="submit" class="form2_submit" @click="nextStep">Next</button>
    </div>
    <!-- Step 3 -->
    <div v-if="activeStep === 2 && createForm.account_type === 'Developer'" class="create-account_form3">
      <div class="input">
        <label>Payment Options</label>
        <el-select v-model="createForm.hiring_options" multiple placeholder="Hiring Option" class="details payment-detail">
        <el-option
          v-for="item in ['Shares','Flat Rate']"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
        </el-select>
      </div>
      <div class="input">
        <label>Roles</label>
        <el-select v-model="createForm.roles" multiple placeholder="Skills" class="details roles-detail">
          <el-option
            v-for="item in ['Frontend Developer','Backend Developer', 'Fullstack Developer', 'Graphic Designer', 'UX/UI','Devops', 'Project Manager']"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="input">
        <label>Skills</label>
        <el-select v-model="createForm.skills" multiple placeholder="Skills" class="details skills-detail">
          <el-option
            v-for="item in ['Websites','Mobile Apps', 'Ecommerce Sites','SAAS', 'IOT']"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="input">
        <label>Bio Description</label>
        <el-input type="textarea" class="form3_description" v-model="createForm.description"></el-input>
      </div>
      <button type="submit" class="form3_submit" @click="nextStep">Create Account</button>
      </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'CreateAccount',
  data() {
    return {
      activeStep: 0,
      step1Complete: false,
      createForm: {
        email: null,
        password: null,
        passwordCheck: null,
        username: null,
        firstname: null,
        lastname: null,
        country: null,
        state: null,
        account_type: null,
        hiring_options: null,
        skills: null,
        roles: null,
        description: null
      }
    }
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    createNewAccount() {
      console.log('account creating!');
      const user = {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        accountType: this.accountType,
        interests: this.interests
      }

      console.log({user})
    },
    nextStep() {
      if (this.activeStep < 3) this.activeStep += 1;
      this.step1Complete = 'success';
    },
    submitForm() {
      const validFormData = this.validateEmail(this.signInForm.email) && this.validatePassword(this.signInForm.password, this.signInForm.passwordCheck)
        if (validFormData) {
          this.login({email: this.signInForm.email, password: this.signInForm.pass });
        } else {
          console.log('error submit!!');
          return false;
        }
    },
    validateEmail(email) {
      // TODO
      return email.trim().length > 0;
    },
    validatePassword(password, passwordCheck) {
      if (password === '') {
        new Error('Please input the password');
      } else if (password.length < 6) {
        new Error('Password length must be 6 characters or more');
      } else {
        if (passwordCheck !== '') {
          if (password !== passwordCheck) {
            new Error('Passwords don\'t match')
          } else {
            return true
          }
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';
.create-account {
  margin: 0 auto;
  height: 1080px;
  // background-color: white;

  .steps {
    margin-top: 8rem;

    .title {
      user-select: none;
    }
  }

  h2 {
    font-size: 2rem;
    text-align: center;
    margin-top: 8rem;
  }

  &_form {
    width: 28rem;
    height: 200px;
    background-color: white;
    display: flex;
    margin: 0 auto;
    margin-top: 5rem;
    flex-direction: column;
    justify-content: center;
    color: black;
    font-weight: bold;
    text-transform: capitalize;
    padding: 10rem 6rem;

    input {
      padding: .5rem;
      padding-left: 4rem;
      margin: 1rem 0;
      font-size: 1.125rem;
      width: 90%;
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
      left: 14rem;
    }

    button {
      font-size: 1.5rem;
      padding: .75rem;
      margin-top: 3rem;
      width: 10rem;
      position: relative;
      left: 18rem;
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

  &_form2 {
    width: 70rem;
    height: 200px;
    background-color: rgb(255, 255, 255);
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 2fr 2fr;
    column-gap: 8rem;
    margin: 0 auto;
    margin-top: 0rem;
    color: black;
    font-weight: bold;
    text-transform: capitalize;
    padding: 10rem 6rem;

    .form2_submit {
      position: relative;
      top: 2rem;
      left: 65rem;
    }

    input {
      padding: .5rem;
      margin: 1rem 0;
      font-size: 1.125rem;
      width: 90%;
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
    button {
      font-size: 1.5rem;
      padding: .75rem;
      margin-top: 3rem;
      width: 10rem;
      position: relative;
      left: 18rem;
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
    .input {
      label {
      display: block;
      font-family: 'Montserrat';
      font-size: 1.125rem;
      font-weight: 400;
      }
    }

    label {
      margin-top: 1rem;
      font-family: 'Montserrat';
      font-size: 1.125rem;
      font-weight: 400;
    }

    .block {
      margin-top: 1rem;
    }

    .radio-group, .radio-btn {
      display: inline;
    }
  }

  &_form3 {
    width: 70rem;
    height: 200px;
    background-color: white;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 2fr 2fr;
    column-gap: 8rem;
    margin: 0 auto;
    margin-top: 0rem;
    color: black;
    font-weight: bold;
    text-transform: capitalize;
    padding: 10rem 6rem;

    .form3_submit {
      height: 3rem;
      width: 14rem;
      padding: 0px;
      margin: 0;
      position: relative;
      top: 4rem;
      left: 58rem;
    }

    input {
      padding: .5rem;
      margin: 1rem 0;
      font-size: 1.125rem;
      width: 90%;
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

    .details {
      width: 90%;
    }
    .payment-detail {
      width: 70%;
    }
    button {
      font-size: 1.5rem;
      padding: .75rem;
      margin-top: 3rem;
      width: 10rem;
      position: relative;
      left: 18rem;
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
    .input {
      label {
      display: block;
      font-family: 'Montserrat';
      font-size: 1.125rem;
      font-weight: 400;
      margin: 1rem 0;
      }
    }

    label {
      margin-top: 1rem;
      font-family: 'Montserrat';
      font-size: 1.125rem;
      font-weight: 400;
    }

    .block {
      margin-top: 1rem;
    }

    .radio-group, .radio-btn {
      display: inline;
    }
  }

  .create-account_submit {
    width: 14rem;
    left: 14rem;
  }
  .skills {
    color: black;
    z-index: 10;
    margin-top: 4rem;
  }
}

</style>
