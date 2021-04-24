import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'Message',
  props: {
    'isActive': {
      type: Boolean,
      default: false
    },
    'isOnline': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      messageText: ''
    }
  },
  components: {
    FontAwesomeIcon,
  },
  methods: {

  }
}
