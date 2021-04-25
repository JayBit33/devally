import { mapActions, mapGetters, mapMutations } from "vuex"

export default {
  name: "user-notification",
  props: ['notification'],
  data() {
    return {
      senderName: '',
      projectName: ''
    }
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
    isConnectionNotification() {
      return this.notification.senderId
    },
    isProjectNotification() {
      return this.notification.projectId != null
    },
  },
  async created() {
    if (this.isConnectionNotification) {
      let user = await this.fetchUserById(this.notification.senderId)
      this.senderName = user.firstname
    }

    if (this.isProjectNotification) {
      let project = await this.fetchProjectById(this.notification.projectId)
      this.projectName = project.name
    }
      
  },
  methods: {
    ...mapActions(['fetchUserById', 'fetchProjectById', 'updateProjectById', 'updateUser', 'sendNotificationToUser']),
    ...mapMutations(['updateLoggedInUser']),
    async notificationAccept() {
      if (this.notification.type == 'received') {
        if (this.isProjectNotification) {
          // Update project and put users Id in team_members_ids
          let { team_member_ids } = await this.fetchProjectById(this.notification.projectId)
          
          // Check if user is already apart of project
          if (!(team_member_ids.includes(this.getLoggedInUser.id))) {
            team_member_ids = JSON.stringify([...team_member_ids, this.getLoggedInUser.id])
            await this.updateProjectById({ id: this.notification.projectId, project: {team_member_ids} })
            // Send notification to senderId user saying we have joined
            let acceptedNotification = { senderId: this.getLoggedInUser.id, projectId: this.notification.projectId, message: 'has joined', type: 'accepted' }
            await this.sendNotificationToUser({ id: this.notification.senderId, notification: acceptedNotification })
          }
        } else {
          // Update user and put users Id in connections
          let { connections: senderConnections } = await this.fetchUserById(this.notification.senderId)
          let { connections: loggedInConnections } = await this.fetchUserById(this.getLoggedInUser.id)
  
          // Update logged in user connections
          if (!loggedInConnections || !(loggedInConnections.includes(this.notification.senderId))) {
            if (loggedInConnections) loggedInConnections = JSON.stringify([...loggedInConnections, this.notification.senderId])
            else loggedInConnections = JSON.stringify([this.notification.senderId])
  
            let u = await this.updateUser({ id: this.getLoggedInUser.id, updates: { connections: loggedInConnections } })
            this.updateLoggedInUser(u)
          }
  
          // Update sender user connections
          if (!senderConnections || !(senderConnections.includes(this.getLoggedInUser.id))) {
            if (senderConnections) senderConnections = JSON.stringify([...senderConnections, this.getLoggedInUser.id])
            else senderConnections = JSON.stringify([this.getLoggedInUser.id])
  
            // Send notification to senderId user saying we have joined
            let acceptedNotification = { senderId: this.getLoggedInUser.id, projectId: null, message: 'is now one of your connections', type: 'accepted' }

            await this.sendNotificationToUser({ id: this.notification.senderId, notification: acceptedNotification})
          }
        }
      } else {
        this.$emit('update-view', 'messages')
      }

      this.$emit('delete-notification', this.notification)
    },
    async notificationDeny() {
      this.$emit('delete-notification', this.notification)
    }
  }
}