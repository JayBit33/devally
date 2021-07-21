// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import MessageBox from '../../components/message-box';
import RateUserModal from '@/components/rate-user-modal'
import ReportUserModal from '@/components/report-user-modal'
import InviteToProjectModal from '@/components/invite-to-project-modal'
import Toast from '@/components/toast'
// import COMETCHAT_CONSTANTS from '@/chat/constants.js';
import { CometChat } from "@cometchat-pro/chat";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Dev",
  data() {
    return {
      user: {},
      id: this.$route.params.id,
      isActionsOpen: false,
      messageBoxOpen: false,
      messageSentSuccessful: false,
      portfolioImages: [
        'project.png',
        'project.png',
        'project.png',
        'project.png',
        'project.png',
        'project.png',
        'project.png',
        'project.png'
      ],
      rating: 0,
      isReportAction: false,
      isRateAction: false,
      isInviteAction: false,
      inviteProjects: [],
      toast: {
        type: '',
        message: [{ text: '', emphasis: false }],
        hasAction: false,
        actionRedirect: '',
        isShown: false,
        duration: 0
      }
    };
  },
  components: {
    FontAwesomeIcon,
    MessageBox,
    RateUserModal,
    ReportUserModal,
    InviteToProjectModal,
    Toast
  },
  computed: {
    ...mapGetters(['getDevUsers', 'getDevUser', 'getLoggedInUser', 'isLoggedIn']),
    fullName() {
      return `${this.user.firstname} ${this.user.lastname}`;
    },
    skillsFormatted() {
      if (this.user && this.user.dev_categories) return this.user.dev_categories.join(", ");
      else return ''
    },
    username() {
      return this.getLoggedInUser.username;
    }
  },
  async created() {
    await this.fetchDevUsers()
    this.user = await this.getDevUser(this.$route.params.id)

    if (!this.isLoggedIn) {
      let message = [
        { text: 'Sign in', emphasis: true },
        { text: 'or', emphasis: false },
        { text: 'Sign up', emphasis: true },
        { text: 'to collaborate with developers', emphasis: false }
      ]
      this.toast = await this.fetchToast({ type: 'info', message, hasAction: true, actionRedirect: '/signin'});
    }

    this.rating = await this.computeRating(this.user.ratings)
  },
  methods: {
    ...mapActions(['fetchDevUsers', 'updateUser', 'fetchToast', 'sendNotificationToUser', 'computeRating', 'fetchProjectById']),
    async addConnection() {
      let message
      
      if (this.user.connections && this.user.connections.some(connection => connection == this.id)) {
        message = [{ text: 'You already have', emphasis: false }, { text: this.user.firstname + " " + this.user.lastname, emphasis: true }, { text: 'added to your connections', emphasis: false }]
        this.toast = await this.fetchToast({type: 'info', message});
        return
      }

      let notification = { senderId: this.getLoggedInUser.id, projectId: null, message: 'wants to add you as a connection', type: 'received' }
      let res = await this.sendNotificationToUser({ id: this.user.id, notification })
      
      if (res.success) {
        message = [{ text: 'You have successfully requested', emphasis: false }, { text: this.user.firstname + " " + this.user.lastname, emphasis: true }, { text: 'to join your connections', emphasis: false }]
        this.toast = await this.fetchToast({type: 'success', message});
      } else {
        message = [
          { text: 'You have', emphasis: false },
          { text: 'already', emphasis: true },
          { text: 'requested', emphasis: false },
          { text: this.user.firstname + " " + this.user.lastname, emphasis: true },
          { text: 'to join your connections', emphasis: false }
        ]
        this.toast = await this.fetchToast({type: 'warning', message});
      }
    },
    clickOutsideCheck(e) {
      if (!(e.path.includes(this.$refs.user_actions_content))) this.isActionsOpen = false
    },
    closeToast() {
      this.toast.isShown = false
    },
    handleToastAction() {
      this.$router.push(this.toast.actionRedirect)
      this.toast.isShown = false
    },
    getImage(filePath) {
      return `http://localhost:3000/${filePath}`;
    },
    messageUser(messageText) {
      this.messageBoxOpen = true;
      var receiverID = String(this.user.id);
      var receiverType = CometChat.RECEIVER_TYPE.USER;

      var textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);

      CometChat.sendMessage(textMessage).then(
        message => {
          console.log("Message sent successfully:", message);
          // TODO Do something with message
          // Should create a toast component that is on main page and recieves events when it needs triggered
          this.messageSentSuccessful = true;
        },
        error => {
          console.log("Message sending failed with error:", error);
          // Handle any error
        }
      );
        this.toggleMessageBox();
    },
    async inviteToProject() {
      this.toggleInviteUser()
      document.querySelector('html').style.overflowY = 'hidden'

      
      if (this.getLoggedInUser.project_ids && this.getLoggedInUser.project_ids.length > 0) {
        this.inviteProjects = await Promise.all(this.getLoggedInUser.project_ids.map(async id => await this.fetchProjectById(id)))
      }

      // Filter inviteProjects to only have ones with creator id as our logged in user
      this.inviteProjects = this.inviteProjects.filter(p => p.creator_id == this.getLoggedInUser.id)
      
      // Filter inviteProjects to only have projects where user to be invited isnt already a member
      this.inviteProjects = this.inviteProjects.filter(p => {
        let notAlreadyInProject = true
        p.team_member_ids.forEach(id => {
          if (id == this.user.id) notAlreadyInProject = false
        })
        return notAlreadyInProject
      })


      console.log(this.inviteProjects)
    },
    openLink(link) {
      if (link.includes('http')) window.open(link, "_blank");
      else window.open("http://" + link, "_blank");
    },
    messageClick() {
      // if (this.getLoggedInUser) {
      //   this.$router.push(`/profile/${this.getLoggedInUser.id}/messages`)
      // }
      this.messageBoxOpen = true
    },
    rateUser() {
      this.toggleActions()
      this.toggleRateUser()
      document.querySelector('html').style.overflowY = 'hidden'
    },
    reportUser() {
      this.toggleActions()
      this.toggleReportUser()
      document.querySelector('html').style.overflowY = 'hidden'
    },
    toggleInviteUser() {
      this.isInviteAction = !this.isInviteAction
      if (!(this.isInviteAction)) document.querySelector('html').style.overflowY = 'scroll'
    },
    async toggleRateUser() {
      this.isRateAction = !this.isRateAction
      if (!(this.isRateAction)) {
        document.querySelector('html').style.overflowY = 'scroll'
        await this.fetchDevUsers()
        this.user = this.getDevUser(this.$route.params.id)
        this.rating = await this.computeRating(this.user.ratings)
      }
    },
    toggleReportUser() {
      this.isReportAction = !this.isReportAction
      if (!(this.isReportAction)) document.querySelector('html').style.overflowY = 'scroll'
    },
    toggleActions() {
      setTimeout(() => {
        this.isActionsOpen = !this.isActionsOpen
        if (this.isActionsOpen) {
          document.addEventListener('click', this.clickOutsideCheck)
        } else {
          document.removeEventListener('click', this.clickOutsideCheck)
        }
      }, 1)
    },
    toggleMessageBox() {
      this.messageBoxOpen = !this.messageBoxOpen;
    }
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutsideCheck)
  }
};
