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
      avatar: '',
      recipient: {},
      reversedConversation: []
    }
  },
  components: {
    FontAwesomeIcon,
  },
  created() {
   this.setRecipient()
  },
  computed: {
    ...mapGetters(['getCurrentUserId']),
    isOnline() {
      const isOn = this.recipient.status
      return isOn === 'online' ? true : false
    }
  },
  methods: {
    ...mapActions(['fetchUserById']),
    recipientAvatar() {
      const id = this.recipient.uid

      console.log('id', id)

      this.fetchUserById(id).then(res => {
        console.log(`http://localhost:3000/${res.profile_image}`)
        this.avatar = `http://localhost:3000/${res.profile_image}`
      })
    },
    setRecipient() {
      if (!this.conversation || this.conversation.length === 0) this.recipient = { name: null, status: null}
      else {
        this.reversedConversation = [ ...this.conversation ].reverse()
        this.recipient =  this.conversation && this.conversation[0].receiver.uid === this.getCurrentUserId 
        ? this.conversation[0].sender
        : this.conversation[0].receiver
        this.recipientAvatar()
      }  
    }
  },
  watch: {
    conversation() {
      this.setRecipient()
    }
  }
}
