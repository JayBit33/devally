// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters } from 'vuex';

export default {
  name: "ConnectionCard",
  props: ['connection', 'isMinimized', 'isChecked', 'hasDeleteIcon'],
  data() {
    return {

    }
  },
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
    accountType() {
      return this.connection.user_type_id === "1"
      ? 'developer | visionary'
      : 'visionary'
    },
    fullName() {
      return `${this.connection.firstname} ${this.connection.lastname}`;
    },
    roles() {
      return this.connection.dev_roles.map(role => {
        if (role === "Graphic Designer") return "GD";
        if (role === "UX/UI") return "UI";
        if (role === "Frontend") return "FE";
        if (role === "Backend") return "BE";
        if (role === "Devops") return "DO";
        if (role === "Project Manager") return "PM";
      });
    }
  },
  methods: {
    getImage(filePath) {
      return `http://localhost:3000/${filePath}`;
    }
  }
}
