// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import ConnectionCard from '@/components/connection-card';
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
    ConnectionCard,
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
    ...mapActions(['fetchUserById', 'updateUser']),
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
      let id, response, updates
      let newConnections = this.connections.map((connection) => connection.id).filter(connectionId => connectionId != connectionToRemove.id)
      if (user) {
        id = user.id
        updates = {
          connections: JSON.stringify(newConnections)
        }
        response = await this.updateUser({ id, updates })
      }

      if (response && user) {
        this.toast.message = [
          { text: 'You have successfully removed', emphasis: false },
          { text: connectionToRemove.firstname + " " + connectionToRemove.lastname, emphasis: true },
          { text: 'from your connections', emphasis: false }
        ]
        this.toast.type = 'success'
        this.connections = this.connections.filter(connection => connection.id != connectionToRemove.id)
        user.connections = newConnections
        this.updateLoggedInUser(user)
      } else {
        this.toast.message = [
          { text: 'You have', emphasis: false },
          { text: 'unsuccessfully', emphasis: true },
          { text: 'removed', emphasis: false },
          { text: connectionToRemove.firstname + " " + connectionToRemove.lastname, emphasis: true },
          { text: 'from your connections', emphasis: false }
        ]
        this.toast.type = 'error'
      }
      this.toast.duration = 5000
      this.toast.isShown = true
    }
  },
  mounted() {
    this.connectionIds.forEach(id => {
      this.fetchUserById(id).then(res => this.connections.push(res))
    });
  },
}
