// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: "ProfileBio",
  props: ['user'],
  data() {
    return {

    };
  },
  components: {
    FontAwesomeIcon
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
    getImage(imageName) {
      return require(`@/assets/${imageName}`)
    }
  }
};
