// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Dropdown from '../dropdown/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions } from 'vuex';

export default {
  name: 'FilterSearch',
  data() {
    return {
      isFilterVisible: false,
      placeholderText: 'Search professionals by username',
      allHiringOption: null,
      allRating: null,
      allSkills: null,
      hiringOption: null,
      rating: null,
      skills: null,
    }
  },
  components: {
    Dropdown,
    FontAwesomeIcon
  },
  async created() {
    const {roles, hiring_options} = await this.getDevOptions()
    this.allHiringOption = hiring_options
    this.allSkills = roles
    this.allRating = ['>=1','>=2', '>=3','>=4','>=5']
  },
  methods: {
    ...mapActions(['getDevOptions']),
    applyFilters() {
      if (this.hiringOption === null && this.rating === null && (this.skills === null || this.skills.length === 0)) {
        this.$emit('applyFilters', null)
        this.$emit('reset');
      } else {
        this.$emit('applyFilters', { hiringOption: this.hiringOption, rating: this.rating, skills: this.skills})
      }
    },
    resetFilters() {
      this.hiringOption = null;
      this.skills = [];
      this.rating =  null;
      this.$emit('applyFilters', null)
      this.$emit('reset');
    },
    toggleFilterOptions() {
      this.isFilterVisible = !this.isFilterVisible;
    },
  }
}
