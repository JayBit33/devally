import ProjectInfoCollapsable from '@/components/project-info-collapsable';
import UserNotification from '@/components/user-notification'
import UserTask from '@/components/user-task'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'user-home',
  props: ['projects', 'user', 'messages'],
  components: {
    FontAwesomeIcon,
    ProjectInfoCollapsable,
    UserNotification,
    UserTask
  },
  data() {
    return {
      all_notifications_override: false,
      all_tasks_override: true,
      showCompletedTasks: false,
      addingTask: false,
      quote: {}
    }
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
    notificationsShown() {
      if (!this.user || !this.user.notifications) return []
      if (this.all_notifications_override) return this.user.notifications

      return this.user.notifications.filter((n, i) => i < 2)
    },
    projectsShown() {
      return this.projects.filter(p => p.creator_id === this.getLoggedInUser.id.toString())
    },
    tasksShown() {
      return (project) => {
        if (!project.tasks || project.tasks.length == 0) return []
        if (this.showCompletedTasks) {
          if (this.all_tasks_override) return project.tasks
          return project.tasks.filter((n, i) => i < 2)
        } else {
          if (this.all_tasks_override) return project.tasks.filter(t => t.status == 'active')
          return project.tasks.filter(t => t.status == 'active').filter((n, i) => i < 2)
        }
      }
    }
  },
  async created() {
    this.quote = await this.fetchQuote()
  },
  methods: {
    ...mapActions(['updateUser', 'createTask', 'fetchQuote']),
    async newTaskSave(message, project) {
      if (message) await this.createTask({ projectId: project.id, message })
      this.addingTask = false
      this.$emit('project-change')
    },
    newTaskCancel() {
      this.addingTask = false
    },
    async deleteNotification(notification) {
      let newNotifications = this.user.notifications
        .filter(n => !(n.senderId == notification.senderId && n.projectId == notification.projectId && n.message == notification.message))
      this.user.notifications = newNotifications
      await this.updateUser({ id: this.user.id, updates: { notifications: JSON.stringify(newNotifications) } });
    },
    updateView(view) {
      let id = this.$route.params.id
      if (view != this.$route.params.view) {
        this.$router.push(`/profile/${id}/${view}`)
      }
    },
    toggleNotificationsOverride() {
      this.all_notifications_override = !this.all_notifications_override
    }
  }
}