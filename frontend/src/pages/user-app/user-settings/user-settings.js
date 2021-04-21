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
      subscribe_devally_updates: true,
      current_password: '',
      confirmed_new_password: '',
      new_password: ''
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
    ...mapGetters(['getLoggedInUser']),
    notMatchingNewPassword() {
      return this.confirmed_new_password != this.new_password
    },
    isNewPasswordEmpty() {
      return this.new_password == ''
    }
  },
  methods: {
    ...mapMutations(['updateLoggedInUser']),
    ...mapActions(['updateUser', 'compareTextToHash']),
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
    async updateUserPassword() {
      let toast, message
      // Check if current password matches users current password
      let res = await this.compareTextToHash({ unhashed_string: this.current_password, hashed_string: this.getLoggedInUser.password})

      if (res && res.match) {
        // Check that new password and confirm new password match and password isnt empty
        if (!(this.notMatchingNewPassword || this.isNewPasswordEmpty)) {
          // Check that new password and current password are different
          if (this.current_password == this.new_password) {
            message = [{ text: 'Your current and new passwords are', emphasis: false }, { text: 'matching.', emphasis: true }, { text: 'Password has not been changed', emphasis: false }]
            toast = this.setToast('info', message)
          } else {
            // Call updateUserById with new password in updates payload
            let response = await this.updateUser({ id: this.getLoggedInUser.id, updates: {password: this.new_password} })
            this.updateLoggedInUser(response)
  
            message = [{ text: 'You have', emphasis: false },{ text: 'successfully', emphasis: true },{ text: 'updated your password', emphasis: false }]
            toast = this.setToast('success', message)
          }

          // Reset input fields
          this.current_password = ''
          this.new_password = ''
          this.confirmed_new_password = ''
        } else {
          if (this.notMatchingNewPassword) message = [{ text: 'Your new password fields', emphasis: false }, { text: 'do not', emphasis: true }, { text: 'match', emphasis: false }]
          else if (this.isNewPasswordEmpty) message = [{ text: 'You', emphasis: false }, { text: 'cannot', emphasis: true }, { text: 'set an empty password', emphasis: false }]
          toast = this.setToast('error', message)
        }

      } else {
        message = [{ text: 'You typed in the', emphasis: false },{ text: 'incorrect', emphasis: true },{ text: 'current password', emphasis: false }]
        toast = this.setToast('error', message)
      }

      this.$emit('toast-update', toast)
    },
    async saveSettings() {
      let user = await this.getLoggedInUser
      let id, response, toast, message
      if (user) {
        id = user.id
        let updates = {
          notification_settings: JSON.stringify({ messages: this.notify_message_received, added_connection: this.notify_added_connection, project_invitation: this.notify_project_invitation }),
          subscription_settings: JSON.stringify({ featured_projects: this.subscribe_featured_projects, weekly_news: this.subscribe_weekly_newsletter, updates: this.subscribe_devally_updates })
        }
        response = await this.updateUser({id, updates})
      }

      if (response && user) {
        message = [{text: 'You have', emphasis: false},{text: 'successfully', emphasis: true},{text: 'saved your settings', emphasis: false }]
        toast = this.setToast('success', message)
        this.updateLoggedInUser(response)
      } else {
        message = [{ text: 'You have', emphasis: false }, { text: 'unsuccessfully', emphasis: true}, {text: 'saved your settings', emphasis: false }]
        toast = this.setToast('error', message)
      }

      this.$emit('toast-update', toast)
    },
    setToast(type, message) {
      let toast = {
        type: '',
        message: [{ text: '', emphasis: false }],
        hasAction: false,
        actionRedirect: '',
        isShown: false,
        duration: 0
      }

      toast.message = message
      toast.type = type

      toast.duration = 5000
      toast.isShown = true

      return toast
    }
  }
}
