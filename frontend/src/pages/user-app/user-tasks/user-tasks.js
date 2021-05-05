// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import draggable from 'vuedraggable';
import Toast from '@/components/toast';
import UserModal from '@/components/user-modal';
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserTasks',
  props: ['projects'],
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
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
    projectsShown() {
      return this.projects.filter(p => p.creator_id === this.getLoggedInUser.id.toString())
    }
  },
  methods: {
    ...mapActions(['fetchProjects', 'fetchProjectById', 'fetchUserById', 'updateUser', 'fetchToast', 'updateTask']),
    ...mapMutations(['updateLoggedInUser']),
    async completeTask(project, task) {
      await this.updateTask({ projectId: project.id, taskId: task.id, updates: { status: 'complete' } })
      this.$emit('project-change')
    },
    async removeTask(project, task) {
      await this.updateTask({ projectId: project.id, taskId: task.id, isDelete: true })
      this.$emit('project-change')
    },
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
