// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

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
