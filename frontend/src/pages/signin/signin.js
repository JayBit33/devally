// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

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
