import ProjectInfoCollapsable from '@/components/project-info-collapsable';
import UserNotification from '@/components/user-notification'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions } from 'vuex';

export default {
  name: 'user-home',
  props: ['projects', 'user', 'messages'],
  components: {
    FontAwesomeIcon,
    ProjectInfoCollapsable,
    UserNotification
  },
  data() {
    return {
      all_notifications_override: false
    }
  },
  computed: {
    notificationsShown() {
      if (!this.user || !this.user.notifications) return []
      if (this.all_notifications_override) return this.user.notifications

      if (this.user.notifications.length >= 2) {
        return [this.user.notifications[0], this.user.notifications[1]]
      } else if (this.user.notifications.length == 1) {
        return [this.user.notifications[0]]
      }

      return []
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