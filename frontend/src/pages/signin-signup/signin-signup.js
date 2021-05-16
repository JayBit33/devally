// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Toast from '@/components/toast'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions } from 'vuex';

export default {
  name: 'SigninSignup',
  props: [],
  data() {
    return {
      loggingIn: true,
      visionaryAccount: false,
      developerAccount: false,
      loginErrorMsg: '',
      signInForm: {
          password: '',
          email: ''
      },
      toast: {},
      emailError: false,
      passwordError: false
    }
  },
  components: {
    Toast,
    FontAwesomeIcon
  },
  methods: {
    ...mapActions(['login' ,'fetchToast']),
    alertClosed() {
      console.log('closed alert')
      this.loginErrorMsg = '';
    },
    closeToast() {
      this.toast.isShown = false
    },
    handleToastAction() {
      this.$router.push(this.toast.actionRedirect)
      this.toast.isShown = false
    },
    selectDevAccountType() {
      if (this.visionaryAccount) {
        this.visionaryAccount = false
      }
      this.developerAccount = true
    },
    selectVisAccountType() {
      if (this.developerAccount) {
        this.developerAccount = false
      }
      this.visionaryAccount = true
    },
    async submitForm() {
      this.toast.isShown = false
      let errorMessage = [{ text: 'There was a problem logging you in. Try again.', emphasis: false }]
      const validFormData = this.validateEmail(this.signInForm.email) && this.validatePassword(this.signInForm.password)
      if (validFormData) {
        this.login({email: this.signInForm.email, password: this.signInForm.password }).then(res => {
          this.loginErrorMsg = res.message != 'login successful' ? res.message : '';
          this.$router.push({ name: 'Profile', params: { id: res.user.id }})
        }).catch(async (err) => {
          console.log('Login error 400. See FE', err)
          errorMessage[0].text = 'No account matches this email and password.'
          this.toast = await this.fetchToast({ type: 'error', message: errorMessage });
        })
      } else {
        errorMessage[0].text = 'Invalid Email or Password! Please try again.'
        this.toast = await this.fetchToast({ type: 'error', message: errorMessage });
        return false;
      }
    },
    toggleLogIn() {
      this.loggingIn = !this.loggingIn
    },
    removeEmailError() {
      this.emailError = false
    },
    removePasswordError() {
      this.passwordError = false
    },
    validateEmail(email) {
      if (!this.$refs.email_input.checkValidity()) this.emailError = true
      return (this.$refs.email_input.checkValidity() && email.trim().length > 0)
    },
    validatePassword(password) {
      if (password === '' || password == null) {
        new Error('Please input the password');
        this.passwordError = true
      } else if (password.length < 6) {
        new Error('Password length must be 6 characters or more');
        this.passwordError = true
      } else {
          return true
      }
    },
  }
}
