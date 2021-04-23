// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import ConnectionCard from '@/components/connection-card';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapMutations } from 'vuex'

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
    connectionsShown() {
      return this.connections ? this.connections.slice(this.startIdx, this.endIdx) : [];
    }
  },
  methods: {
    ...mapActions(['fetchUserById', 'updateUser']),
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
  }
}
