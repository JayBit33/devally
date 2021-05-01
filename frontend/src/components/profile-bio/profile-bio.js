// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions } from 'vuex';

export default {
  name: "ProfileBio",
  props: ['user'],
  data() {
    return {
      rating: 0
    };
  },
  components: {
    FontAwesomeIcon
  },
  async created() {
    this.rating = await this.computeRating(this.user.ratings)
  },
  computed: {
    accountType() {
      return this.user.user_type_id === '1' ? 'developer & visionary' : 'visionary'
    },
    skillsFormatted() {
      return this.user.dev_categories.map((c) => c).join(", ");
    },
  },
  methods: {
    ...mapActions(['computeRating']),
    getImage(imageName, fromBE = false) {
      if (fromBE) {
        return `http://localhost:3000/${imageName}`;
      } else {
        return require(`@/assets/${imageName}`)
      }
    }
  }
};
