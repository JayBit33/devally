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
    }
  }
}