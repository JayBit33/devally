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
      avatar: '',
      isSelected: false
    }
  },
  components: {
    FontAwesomeIcon,
  },
  created() {
    this.recipientAvatar()
  },
  computed: {
    ...mapGetters(['getCurrentUserId']),
    recipientName() {
      return this.message && this.message.conversationWith.name
    }  
  },
  methods: {
    messageSelected() {
      this.isSelected = true
      this.$emit('messageSelected', this.message)
    },
    recipientAvatar() {
      const avatarURL = this.message && this.message.conversationWith.avatar
      
      if (avatarURL) this.avatar = avatarURL
      else {
       const id = this.message && this.message.conversationWith.uid
       this.fetchUserById(id).then(user => {
         this.avatar = `http://localhost:3000/${user.profile_image}`
       })
      }
    }
  }
}
