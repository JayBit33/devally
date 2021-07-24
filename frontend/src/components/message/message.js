// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters } from 'vuex'

export default {
  name: 'Message',
  props: {
    'message': {
      type: Object,
      default: () => {}
    },
    'isOnline': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      messageText: '',
      isSelected: false
    }
  },
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapGetters(['getCurrentUserId']),
    recipientName() {
      return this.message && this.message.conversationWith.name
    },
    
  },
  methods: {
    async recipientAvatar() {
      const avatarURL = this.message && this.message.conversationWith.avatar
      
      if (avatarURL) return avatarURL
      else {
       const id = this.message && this.message.conversationWith.uid
       const user = await this.fetchUserById(id)
       console.log(`http://localhost:3000/${user.profile_image}`)
       return `http://localhost:3000/${user.profile_image}`
      }
    }
  }
}
