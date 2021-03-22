// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Toast from '@/components/toast'
import { mapActions, mapGetters } from 'vuex'

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
        actionRedirect: '',
        isShown: false,
        duration: 0
      }
    }
  },
  computed: {
    ...mapGetters(['getLoggedInUser'])
  },
  methods: {
    ...mapActions(['updateUserSettings']),
    closeToast() {
      this.toast.isShown = false
    },
    handleToastAction() {
      console.log()
      this.$router.push(this.toast.actionRedirect)
      this.toast.isShown = false
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
    async saveSettings() {
      let user = await this.getLoggedInUser
      let id, response
      if (user) {
        id = user.id
        let userSettings = {
          notification_settings: JSON.stringify({ messages: this.notify_message_received, added_connection: this.notify_added_connection, project_invitation: this.notify_project_invitation }),
          subscription_settings: JSON.stringify({ featured_projects: this.subscribe_featured_projects, weekly_news: this.subscribe_weekly_newsletter, updates: this.subscribe_devally_updates })
        }
        response = await this.updateUserSettings({id, userSettings})
      }

      if (response && user) {
        this.toast.message = [{ text: 'You have successfully saved your settings', emphasis: false }]
        this.toast.type = 'success'
      } else {
        this.toast.message = [{ text: 'You have', emphasis: false }, { text: 'unsuccessfully', emphasis: true}, {text: 'saved your settings', emphasis: false }]
        this.toast.type = 'error'
      }
      this.toast.duration = 5000
      this.toast.isShown = true
    }
  }
}
