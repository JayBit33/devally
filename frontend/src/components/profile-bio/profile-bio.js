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
    skillsFormatted() {
      return this.user.skills.map((skill) => skill).join(", ");
    },
  },
};
