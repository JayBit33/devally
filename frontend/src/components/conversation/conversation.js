// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Conversation',
  props: {
    'conversation': {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapGetters(['getCurrentUserId']),
    isOnline() {
     const isOn = this.conversation && this.conversation[0].receiver.uid === this.getCurrentUserId 
      ? this.conversation[0].sender.status 
      : this.conversation[0].receiver.status

      return isOn === 'online' ? true : false
    },
    recipientName() {
      return this.conversation && this.conversation[0].receiver.uid === this.getCurrentUserId 
      ? this.conversation[0].sender.name 
      : this.conversation[0].receiver.name
    },
    async recipientAvatar() {
      const id = this.conversation && this.conversation[0].receiver.uid === this.getCurrentUserId 
      ? this.conversation[0].sender.uid 
      : this.conversation[0].receiver.uid

      const user = await this.fetchUserById(id)
      console.log(`http://localhost:3000/${user.profile_image}`)
      return `http://localhost:3000/${user.profile_image}`
    }
  },
  methods: {
    ...mapActions(['fetchUserById'])
  }
}
