// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import ConnectionCardCarousel from '@/components/connection-card-carousel';
import FilterSearch from '@/components/filter-search';
import PaginationMixin from '../../../mixins/paginationMixin';
import Toast from '@/components/toast'
import UserModal from '@/components/user-modal';
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserConnection',
  props: ['connectionIds'],
  data() {
    return {
      allCollapsed: false,
      mostCollapsed: false,
      newCollapsed: false,
      connections: [],
      isUserModalOpen: true,
      isLoading: false,
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
  components: {
    ConnectionCardCarousel,
    FilterSearch,
    Toast,
    UserModal
  },
  mixins: [PaginationMixin],
  computed: {
    ...mapGetters(['getLoggedInUser']),
    connectionsShown() {
      return this.connections ? this.connections.slice(this.startIdx, this.endIdx) : [];
    }
  },
  methods: {
    ...mapActions(['fetchUserById', 'updateUser', 'fetchToast']),
    ...mapMutations(['updateLoggedInUser']),
    closeModal() {
      this.isUserModalOpen = false
    },
    closeToast() {
      this.toast.isShown = false
    },
    handleToastAction() {
      this.$router.push(this.toast.actionRedirect)
      this.toast.isShown = false
    },
    handleUserModalButton() {
      this.$router.push({name: 'Devs'})
    },
    async removeConnection(connectionToRemove) {
      let user = await this.getLoggedInUser
      let updates, toast, message

      let loggedInUserId = user.id
      let connectionId = connectionToRemove.id

      let newLoggedInUserConnections = this.connections.map((connection) => connection.id).filter(c_id => c_id != connectionToRemove.id)
      let newConnectionToRemoveConnections = this.connections.map((connection) => connection.id).filter(connectionId => connectionId != connectionToRemove.id)

      updates = { connections: JSON.stringify(newLoggedInUserConnections) }
      let user1Response = await this.updateUser({ id: loggedInUserId, updates })

      updates = { connections: JSON.stringify(newConnectionToRemoveConnections) }
      let user2Response = await this.updateUser({ id: connectionId, updates })

      if (user1Response && user2Response && user) {
        message = [
          { text: 'You have successfully removed', emphasis: false },
          { text: connectionToRemove.firstname + " " + connectionToRemove.lastname, emphasis: true },
          { text: 'from your connections', emphasis: false }
        ]
        toast = await this.fetchToast({ type: 'success', message });

        this.connections = this.connections.filter(connection => connection.id != connectionToRemove.id)
        user.connections = newLoggedInUserConnections
        this.updateLoggedInUser(user)
      } else {
        message = [
          { text: 'You have', emphasis: false },
          { text: 'unsuccessfully', emphasis: true },
          { text: 'removed', emphasis: false },
          { text: connectionToRemove.firstname + " " + connectionToRemove.lastname, emphasis: true },
          { text: 'from your connections', emphasis: false }
        ]
        toast = await this.fetchToast({ type: 'error', message });
      }

      this.toast = toast
    },
    toggleAllCollapsed() {
      this.allCollapsed = !this.allCollapsed;
    },
    toggleMostCollapsed() {
      this.mostCollapsed = !this.mostCollapsed;
    },
    toggleNewestCollapsed() {
      this.newCollapsed = !this.newCollapsed;
    }
  },
  mounted() {
    this.connectionIds.forEach(id => {
      this.fetchUserById(id).then(res => this.connections.push(res))
    });
  },
}
