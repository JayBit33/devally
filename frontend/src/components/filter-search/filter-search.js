// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Dropdown from '../dropdown/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'FilterSearch',
  data() {
    return {
      isFilterVisible: false,
      placeholderText: 'Search professionals by username'
    }
  },
  components: {
    Dropdown,
    FontAwesomeIcon
  },
  methods: {
    toggleFilterOptions() {
      this.isFilterVisible = !this.isFilterVisible;
    },
  }
}
