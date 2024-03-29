// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import CreateProject from '@/pages/user-app/user-projects/create-project'
import EditProject from '@/pages/user-app/user-projects/edit-project'
import MessageNotifier from '@/components/message-notifier';
import Toast from '@/components/toast'
import UserConnections from '@/pages/user-app/user-connections';
import UserHome from '@/pages/user-app/user-home';
import UserMessages from '@/pages/user-app/user-messages';
import UserProfile from '@/pages/user-app/user-profile';
import UserProjects from '@/pages/user-app/user-projects';
import UserSettings from '@/pages/user-app/user-settings';
import UserTasks from '@/pages/user-app/user-tasks';
import SidebarButton from '@/pages/user-app/controls/sidebar-btn';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: "UserApp",
  data() {
    return {
      user: {},
      drawerOpen: false,
      drawerDirection: 'rtl',
      id: this.$route.params.id,
      isLoading: true,
      messages: [],
      messagesViewActive: false,
      projects: [],
      projectsViewActive: false,
      connectionsViewActive: false,
      settingsViewActive: false,
      profileViewActive: false,
      profileImageUrl: '',
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
    CreateProject,
    EditProject,
    FontAwesomeIcon,
    MessageNotifier,
    SidebarButton,
    Toast,
    UserConnections,
    UserHome,
    UserMessages,
    UserProfile,
    UserProjects,
    UserSettings,
    UserTasks
  },
  computed: {
    ...mapGetters(['getDevUser', 'getDevUserByUsername', 'isLoggedIn', 'getCurrentUserId', 'getLoggedInUser', 'getIncomingMessages']),
    accountType() {
      return this.user.user_type_id === 1
      ? 'developer'
      : this.user.user_type_id === 2
      ? 'visionary'
      : 'developer | visionary'
    },
    fullName() {
      return `${this.user.firstname} ${this.user.lastname}`;
    },
    categoriesFormatted() {
      return this.user.categories.join(", ");
    }
  },
  async created() {
    setTimeout(() => {
      if (!this.isLoggedIn && this.$route.params.id != this.getCurrentUserId) {
        this.$router.push('/signin')
        return
      }
    }, 1000);

    this.user = await this.fetchUserById(this.$route.params.id)
    if (this.user) this.isLoading = false
    // await this.fetchDevUsers().then(() => {
    //   this.user = this.getDevUser(this.$route.params.id);
    //   this.isLoading = false;
    // });

    this.messages = [...this.getIncomingMessages]
    this.messages = await Promise.all(this.messages.map(async (n) => {
      let imgSrc = null
      if (n.sender.uid) {
        imgSrc = await this.getImageFromId(n.sender.uid)
      }
      return {
        ...n,
        image_source: imgSrc
      }
    }))

    this.user.notifications = await Promise.all(this.user.notifications.map(async (n) => {
      let imgSrc = null
      if (n.senderId) {
        imgSrc = await this.getImageFromId(n.senderId)
      }
      return {
        ...n,
        image_source: imgSrc
      }
    }))

    await this.updateProjects()
  },
  methods: {
    ...mapActions(['logout', 'retrieveRefreshToken', 'fetchDevUsers', 'fetchUserById', 'fetchMessages', 'fetchProjects', 'fetchProjectById', 'updateUser']),
    ...mapMutations(['updateIsLoggedIn']),
    closeToast() {
      this.toast.isShown = false
    },
    handleToastAction() {
      this.$router.push(this.toast.actionRedirect)
      this.toast.isShown = false
    },
    getImageFromId(id) {
      return this.fetchUserById(id).then(user => {
        return this.getImage(user.profile_image)
      })
    },
    getImage(filePath) {
      this.profileImageUrl = `http://localhost:3000/${filePath}`;
      return this.profileImageUrl
    },
    openMessageDrawer() {
      this.drawerOpen = true;
    },
    open1(message) {
        // const h = this.$createElement;

        this.$notify({
          title: 'Message',
          dangerouslyUseHTMLString: true,
          duration: 0,
          message: `
                    <div class="message-header">
                      <el-avatar :size="60" src="https://empty" @error="errorHandler" >
                        <img :src="${require('@/assets/' + this.getProfileImage(message.entities.sender.entity.uid))}" />
                      </el-avatar>
                      <div>
                        <h4 class="username">Waveybits</h4>
                        <h5 v-if="${message.entities.sender.entity.status} === 'available'" class="senderActive">online</h5>
                      </div>
                      <h3 class="date-sent">${this.getMessageDate(message.sentAt)}</h3>
                    </div>
                    <p>${message.text}</p>`
        });
      },
    getMessageDate(epoch) {
      const date = new Date(epoch * 1000);
      return dayjs(date).format('MM/DD h:m')
    },
    getProfileImage(sendersUsername) {
      if (this.messages) {
        console.log(sendersUsername);
        console.log(this.getDevUserByUsername(sendersUsername).profile_image);
        return this.getDevUserByUsername(sendersUsername).profile_image;
      }
    },
    handleClose(done) {
      this.$confirm('Are you sure you want to close this?')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    signout() {
      this.updateIsLoggedIn(false);
      this.logout();
      this.$router.push('/');
    },
    async updateProjects() {
      this.projects = await Promise.all(this.user.project_ids.map(async id => await this.fetchProjectById(id)))
    },
    updateView(view) {
      let id = this.$route.params.id
      if (view != this.$route.params.view) {
        this.$router.push(`/profile/${id}/${view}`)
      }
    }
  },
  watch: {
    getLoggedInUser() {
      this.user = this.getLoggedInUser
    },
    async getIncomingMessages() {
      this.messages = [...this.getIncomingMessages]
      this.messages = await Promise.all(this.messages.map(async (n) => {
        let imgSrc = null
        if (n.sender.uid) {
          imgSrc = await this.getImageFromId(n.sender.uid)
        }
        return {
          ...n,
          image_source: imgSrc
        }
      }))
    }
  }
};
