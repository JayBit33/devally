import ProjectInfoCollapsable from '@/components/project-info-collapsable';
import UserNotification from '@/components/user-notification'
import UserTask from '@/components/user-task'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions } from 'vuex';

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
      showCompletedTasks: false
    }
  },
  computed: {
    notificationsShown() {
      if (!this.user || !this.user.notifications) return []
      if (this.all_notifications_override) return this.user.notifications

      return this.user.notifications.filter((n, i) => i < 2)
    },
    tasksShown() {
      return (project) => {
        if (this.showCompletedTasks) {
          return project.tasks
        } else {
          return project.tasks.filter(t => t.status == 'active')
        }
      }
    }
  },
  methods: {
    ...mapActions(['updateUser']),
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