// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import ConnectionCard from '@/components/connection-card';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: "ConnectionCardCarousel",
  props: {
    connections: {
      type: Array,
      required: true
    },
    numberOfCardsDisplayed: {
      type: Number,
      default: 5
    },
    hasDeleteIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      startIdx: 0,
      endIdx: this.numberOfCardsDisplayed,
      movingRight: false,
      movingLeft: false
    }
  },
  components: {
    ConnectionCard,
    FontAwesomeIcon
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
    connectionsShown() {
      return this.connections ? this.connections.slice(this.startIdx, this.endIdx) : [];
    }
  },
  methods: {
    ...mapActions(['fetchUserById', 'updateUser', 'fetchToast']),
    ...mapMutations(['updateLoggedInUser']),
    goRight() {
        this.startIdx += 1;
        this.endIdx += 1;
        this.movingRight = true;
    },
    goLeft() {
        this.startIdx -= 1;
        this.endIdx -= 1;
        this.movingLeft = true;
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
        
        this.$emit('connections-update', this.connections.filter(connection => connection.id != connectionToRemove.id))
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
      
      if (toast) this.$emit('toast-update', toast)
    }
  }
}
