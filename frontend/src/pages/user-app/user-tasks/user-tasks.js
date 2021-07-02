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
      addingTaskProjectIds: [],
      addingTaskMessage: '',
      collapsedProjectIds: [],
      dragging: false,
      editId: null,
      isChecked: true,
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
      return this.projects.filter(p => p.creator_id === this.getLoggedInUser.id.toString()).map(p => {
        return {
          ...p,
          collapsed: this.collapsedProjectIds.includes(p.id),
          addingTask: this.addingTaskProjectIds.includes(p.id),
          addingTaskMessage: ''
        }
      })
    }
  },
  methods: {
    ...mapActions(['fetchProjects', 'fetchProjectById', 'fetchUserById', 'updateUser', 'fetchToast', 'updateTask', 'createTask']),
    ...mapMutations(['updateLoggedInUser']),
    addTask(project) {
      this.editId = 0
      if (!this.addingTaskProjectIds.includes(project.id)) this.addingTaskProjectIds.push(project.id)
      // this.projectsShown = this.projectsShown.map(p => {
      //   return {
      //     ...p,
      //     addingTask: p.id == project.id
      //   }
      // })
    },
    async completeTask(project, task) {
      await this.updateTask({ projectId: project.id, taskId: task.id, updates: { status: 'complete' } })
      this.$emit('project-change')
    },
    async editTask(project, task, updatedMessage) {
      this.editId = null
      await this.updateTask({ projectId: project.id, taskId: task.id, updates: { message: updatedMessage}, isDelete: false })
    },
    makeEditable(task) {
      this.editId = task.id
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
    async saveNewTask(project) {
      this.editId = null
      if (this.addingTaskProjectIds.includes(project.id)) this.addingTaskProjectIds = this.addingTaskProjectIds.filter(p => p != project.id)
      
      if (project.addingTaskMessage) {
        await this.createTask({ projectId: project.id, message: project.addingTaskMessage})
      }
      project.addingTaskMessage = ''
      this.$emit('project-change')
    },
    toggleCollapsed(project) {
      if (this.collapsedProjectIds.includes(project.id)) this.collapsedProjectIds = this.collapsedProjectIds.filter(p => p !== project.id)
      else this.collapsedProjectIds = [...this.collapsedProjectIds, project.id]
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }
}
