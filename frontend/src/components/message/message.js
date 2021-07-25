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
      avatar: ''
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
    recipientAvatar() {
      const avatarURL = this.message && this.message.conversationWith.avatar
      
      if (avatarURL) this.avatar = avatarURL
      else {
       const id = this.message && this.message.conversationWith.uid
       this.fetchUserById(id).then(user => {
         console.log(`http://localhost:3000/${user.profile_image}`)
         this.avatar = `http://localhost:3000/${user.profile_image}`
       })
      }
    }
  }
}
