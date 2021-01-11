// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters } from 'vuex';

export default {
  name: 'UserOptionsDropdown',
  data() {
    return {
      userId: 0,
    }
  },
  created() {
    this.userId = this.getCurrentUserId;
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    ...mapGetters(['getCurrentUserId'])
  }
}
