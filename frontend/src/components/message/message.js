// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
  methods: {

  }
}
