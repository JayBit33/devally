// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Toast from '@/components/toast'

export default {
  name: 'UserSettings',
  components: {
    Toast
  },
  data() {
    return {
      notify_message_received: true,
      notify_added_connection: true,
      notify_project_invitation: true,
      subscribe_featured_projects: true,
      subscribe_weekly_newsletter: true,
      subscribe_devally_updates: true,
      toast: {
        type: '',
        message: [{ text: '', emphasis: false }],
        hasAction: false,
        actionRedirect: '/',
        isShown: false,
        duration: 0
      }
    }
  },
  methods: {
    closeToast() {
      this.toast.isShown = false
    },
    handleToastAction() {
      this.$router.push(this.toast.actionRedirect)
      this.hideToast()
    },
    updateNotifyMessageReceived() {
      this.notify_message_received = !this.notify_message_received;
    },
    updateNotifyAddedConnection() {
      this.notify_added_connection = !this.notify_added_connection;
    },
    updateNotifyProjectInvite() {
      this.notify_project_invitation = !this.notify_project_invitation;
    },
    updateFeaturedProjects() {
      this.subscribe_featured_projects = !this.subscribe_featured_projects;
    },
    updateWeeklyNewsletter() {
      this.subscribe_weekly_newsletter = !this.subscribe_weekly_newsletter;
    },
    updateDevallyUpdates() {
      this.subscribe_devally_updates = !this.subscribe_devally_updates;
    },
    saveSettings() {
      // TODO
      // Build the toast off of the response from an updateUserSettings route
      this.toast = {
        type: 'success',
        message: [
          { text: 'You have successfully saved your settings', emphasis: false }
        ],
        isShown: true,
        duration: 5000
      }
    }
  }
}
