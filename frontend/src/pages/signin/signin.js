// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Toast from '@/components/toast'
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
      toast: {
        type: '',
        message: [{ text: '', emphasis: false }],
        hasAction: false,
        actionRedirect: '',
        isShown: false,
        duration: 5000
      }
    }
  },
  components: {
    Toast,
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
    closeToast() {
      this.toast.isShown = false
    },
    handleToastAction() {
      this.$router.push(this.toast.actionRedirect)
      this.toast.isShown = false
    },
    submitForm() {
      this.toast.isShown = false
      const validFormData = this.validateEmail(this.signInForm.email) && this.validatePassword(this.signInForm.password)
        if (validFormData) {
          this.login({email: this.signInForm.email, password: this.signInForm.password }).then(res => {
            this.loginErrorMsg = res.message != 'login successful' ? res.message : '';
            this.$router.push({ name: 'Profile', params: { id: res.user.id }})
          }).catch(err => {
            console.log('login error 400. See FE', err)
            this.toast.type = 'error'
            this.toast.message = [{ text: 'There was a problem logging you in. Try again', emphasis: false }]
            this.toast.isShown = true
          })
        } else {
          console.log('error submit!!');
          this.toast.type = 'error'
          this.toast.message = [{text: 'There was a problem logging you in. Try again', emphasis: false}]
          this.toast.isShown = true
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
