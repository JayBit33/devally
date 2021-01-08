// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: "ProfileBio",
  data() {
    return {
      accountType: this.$store.state.user.accountType,
      rating: this.$store.state.user.rating || 0,
      skills: this.$store.state.user.skills,
    };
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    skillsFormatted() {
      return this.skills.map((skill) => skill).join(", ");
    },
  },
};
