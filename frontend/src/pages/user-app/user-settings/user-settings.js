// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserSettings',
  data() {
    return {
      notify_message_received: true,
      notify_added_connection: true,
      notify_project_invitation: true,
      subscribe_featured_projects: true,
      subscribe_weekly_newsletter: true,
      subscribe_devally_updates: true
    }
  },
  async created() {
    let user = await this.getLoggedInUser
    this.notify_message_received = user.notification_settings.messages
    this.notify_added_connection = user.notification_settings.added_connection
    this.notify_project_invitation = user.notification_settings.project_invitation

    this.subscribe_featured_projects = user.subscription_settings.featured_projects
    this.subscribe_weekly_newsletter = user.subscription_settings.weekly_newsletter
    this.subscribe_devally_updates = user.subscription_settings.devally_updates
  },
  computed: {
    ...mapGetters(['getLoggedInUser'])
  },
  methods: {
    ...mapMutations(['updateLoggedInUser']),
    ...mapActions(['updateUser']),
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
        let updates = {
          notification_settings: JSON.stringify({ messages: this.notify_message_received, added_connection: this.notify_added_connection, project_invitation: this.notify_project_invitation }),
          subscription_settings: JSON.stringify({ featured_projects: this.subscribe_featured_projects, weekly_news: this.subscribe_weekly_newsletter, updates: this.subscribe_devally_updates })
        }
        response = await this.updateUser({id, updates})
      }
      let toast = {
        type: '',
        message: [{ text: '', emphasis: false }],
        hasAction: false,
        actionRedirect: '',
        isShown: false,
        duration: 0
      }
      if (response && user) {
        toast.message = [{ text: 'You have successfully saved your settings', emphasis: false }],
        toast.type = 'success'
        this.updateLoggedInUser(response)
      } else {
        toast.message = [{ text: 'You have', emphasis: false }, { text: 'unsuccessfully', emphasis: true}, {text: 'saved your settings', emphasis: false }]
        toast.type = 'error'
      }
      toast.duration = 5000
      toast.isShown = true
      this.$emit('toast-update', toast)
    }
  }
}
