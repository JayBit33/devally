// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import draggable from 'vuedraggable';
import Toast from '@/components/toast';
import UserModal from '@/components/user-modal';
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserTasks',
  data() {
    return {
      collapsed: false,
      dragging: false,
      isChecked: true,
      projects: [],
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
    draggable,
    FontAwesomeIcon,
    Toast,
    UserModal
  },
  async created() {
    let allProjects = await this.fetchProjects()
    console.log('all projects', allProjects)
    this.projects = allProjects.filter(p => p.creator_id === this.getLoggedInUser.id)
    const user = this.getLoggedInUser
    this.projects = allProjects.filter(p => p.creator_id === user.id.toString())
    console.log(this.projects.tasks)
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
  },
  methods: {
    ...mapActions(['fetchProjects', 'fetchUserById', 'updateUser', 'fetchToast']),
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
