// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { mapActions, mapGetters, mapMutations } from "vuex"
import ApplyModal from '@/components/apply-modal'

export default {
  name: "user-notification",
  props: ['notification'],
  components: {
    ApplyModal
  },
  data() {
    return {
      senderName: '',
      sender: '',
      projectName: '',
      project: '',
      showingApplyModal: false
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
    isApplicationNotification() {
      return this.notification.type == 'application'
    }
  },
  async created() {
    if (this.isConnectionNotification) {
      this.sender = await this.fetchUserById(this.notification.senderId)
      this.senderName = this.sender.firstname
    }

    if (this.isProjectNotification) {
      this.project = await this.fetchProjectById(this.notification.projectId)
      this.projectName = this.project.name
    }
  },
  methods: {
    ...mapActions(['fetchUserById', 'fetchProjectById', 'updateProjectById', 'updateUser', 'sendNotificationToUser']),
    ...mapMutations(['updateLoggedInUser']),
    getImage(imageName, fromBE = false) {
      if (fromBE) {
        return `http://localhost:3000/${imageName}`;
      } else {
        return require(`@/assets/${imageName}`)
      }
    },
    notificationView() {
      this.showingApplyModal = true
    },
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

          // Check if user has project in there project_ids
          if (!(this.getLoggedInUser.project_ids.includes(this.notification.projectId))) {
            await this.updateUser({ id: this.getLoggedInUser.id, updates: { project_ids: JSON.stringify([...this.getLoggedInUser.project_ids, this.notification.projectId]) } })
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

            await this.updateUser({ id: this.notification.senderId, updates: { connections: senderConnections } })
            await this.sendNotificationToUser({ id: this.notification.senderId, notification: acceptedNotification})
          }
        }
      } else if (this.isApplicationNotification) {
        if (this.isProjectNotification) {
          // Update project and put users Id in team_members_ids
          let { team_member_ids } = await this.fetchProjectById(this.notification.projectId)

          // Check if user is already apart of project
          if (!(team_member_ids.includes(this.notification.senderId))) {
            team_member_ids = JSON.stringify([...team_member_ids, this.notification.senderId])
            await this.updateProjectById({ id: this.notification.projectId, project: { team_member_ids } })
            // Send notification to senderId user saying we have joined
            let acceptedNotification = { senderId: this.notification.senderId, projectId: this.notification.projectId, message: 'has joined', type: 'accepted' }
            await this.sendNotificationToUser({ id: this.notification.senderId, notification: acceptedNotification })
          }

          // Check if user has project in there project_ids
          let sender = await this.fetchUserById(this.notification.senderId)
          if (!(sender.project_ids.includes(this.notification.projectId))) {
            await this.updateUser({ id: sender.id, updates: { project_ids: JSON.stringify([...sender.project_ids, this.notification.projectId]) } })
          }
        }
      } else {
        this.$emit('update-view', 'messages')
      }

      this.$emit('delete-notification', this.notification)
    },
    async notificationDeny() {
      this.$emit('delete-notification', this.notification)
    },
    closeApplyModal() {
      this.showingApplyModal = false
    }
  }
}
