// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'Conversation',
  props: {
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
