// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Dropdown from '../dropdown/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions } from 'vuex';

export default {
  name: 'FilterSearch',
  props: {
    hasFilters: { type: Boolean, default: true },
    placeholderText: { type: String, default: 'Search professionals by username or firstname' }
  },
  data() {
    return {
      isFilterVisible: false,
      inputText: null,
      allHiringOption: null,
      allRating: null,
      allRoles: null,
      allCategories: null,
      hiringOption: null,
      rating: null,
      roles: null,
      categories: null,
    }
  },
  components: {
    Dropdown,
    FontAwesomeIcon
  },
  async created() {
    const {roles, hiring_options, categories} = await this.getDevOptions()
    this.allHiringOption = hiring_options
    this.allRoles = roles
    this.allCategories = categories
    this.allRating = ['>=1','>=2', '>=3','>=4','>=5']
  },
  methods: {
    ...mapActions(['getDevOptions']),
    applyFilters() {
      if (this.hiringOption === null && this.rating === null && (this.roles === null || this.roles.length === 0) && (this.categories === null || this.categories.length === 0)) {
        this.$emit('applyFilters', null)
        this.$emit('reset');
      } else {
        this.$emit('applyFilters', { hiringOption: this.hiringOption, rating: this.rating, roles: this.roles, categories: this.categories})
      }
    },
    resetFilters() {
      this.inputText = null;
      this.hiringOption = null;
      this.roles = [];
      this.categories = [];
      this.rating =  null;
      this.$emit('applyFilters', null)
      this.$emit('reset');
    },
    toggleFilterOptions() {
      this.isFilterVisible = !this.isFilterVisible;
    },
  }
}
