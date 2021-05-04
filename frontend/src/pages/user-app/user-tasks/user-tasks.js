// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toast from '@/components/toast'
import UserModal from '@/components/user-modal';
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserTasks',
  data() {
    return {
      collapsed: false,
      isChecked: true,
      connections: [],
      isUserModalOpen: true,
      isLoading: false,
      toast: {
        type: '',
        message: [{ text: '', emphasis: false }],
        hasAction: false,
        actionRedirect: '',
        isShown: false,
        duration: 0
      }
    }
  },
  components: {
    FontAwesomeIcon,
    Toast,
    UserModal
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
  },
  methods: {
    ...mapActions(['fetchUserById', 'updateUser', 'fetchToast']),
    ...mapMutations(['updateLoggedInUser']),
    closeModal() {
      this.isUserModalOpen = false
    },
    closeToast() {
      this.toast.isShown = false
    },
    handleToastAction() {
      this.$router.push(this.toast.actionRedirect)
      this.toast.isShown = false
    },
    handleUserModalButton() {
      this.$router.push({name: 'Devs'})
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  },
}
