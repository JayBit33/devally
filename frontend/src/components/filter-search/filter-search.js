// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Dropdown from '../dropdown/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'FilterSearch',
  data() {
    return {
      isFilterVisible: false,
      placeholderText: 'Search professionals by username',
      hiringOption: null,
      rating: null,
      skills: null,
    }
  },
  components: {
    Dropdown,
    FontAwesomeIcon
  },
  methods: {
    applyFilters() {
      this.$emit('applyFilters', { hiringOption: this.hiringOption, rating: this.rating, skills: this.skills})
    },
    resetFilters() {
      this.hiringOption = null;
      this.skills = [];
      this.rating =  null;
      this.$emit('applyFilters', { hiringOption: this.hiringOption, rating: this.rating, skills: this.skills})
      this.$emit('reset');
    },
    toggleFilterOptions() {
      this.isFilterVisible = !this.isFilterVisible;
    },
  }
}
