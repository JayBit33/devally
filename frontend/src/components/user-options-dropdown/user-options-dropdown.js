// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters } from 'vuex';

export default {
  name: 'UserOptionsDropdown',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      userId: 0,
      links: [
        { name: 'profile', iconClass: 'user', text: 'Account' },
        { name: 'projects', iconClass: 'clipboard', text: 'My Projects' },
        { name: 'signout', iconClass: 'sign-out-alt', text: 'Sign Out' }
      ]
    }
  },
  created() {
    this.userId = this.getCurrentUserId
    setTimeout(() => {
      document.addEventListener('click', this.clickOutsideCheck)
    }, 1)
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutsideCheck)
  },
  computed: {
    ...mapGetters(['getCurrentUserId'])
  },
  methods: {
    redirect(link) {
      if (link.name === 'profile') {
        this.$emit('optionSelected', 'account')
        this.$router.push({ name: 'Profile', params: { id: this.userId } })
      } else if (link.name === 'projects') {
        this.$emit('optionSelected', 'projects')
        this.$router.push({ path: 'profile/' + this.userId + '/projects' })
      } else if (link.name === 'signout') {
        this.$emit('optionSelected', 'signout')
        this.$router.push({ path: '/' })
      }
    },
    clickOutsideCheck(e) {
      if (!(e.path.includes(this.$refs.user_options_dropdown))) this.$emit('optionSelected', null)
    }
  }
}
