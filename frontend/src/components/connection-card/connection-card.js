// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters } from 'vuex';

export default {
  name: "ConnectionCard",
  props: ['connection', 'hasDeleteIcon', 'isMinimized', 'isChecked', 'isPositionToFill'],
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
      if (!this.connection) return ''
      return this.connection.user_type_id === "1"
      ? 'developer | visionary'
      : 'visionary'
    },
    fullName() {
      if (!this.connection) return ''
      return `${this.connection.firstname} ${this.connection.lastname}`;
    },
    roles() {
      if (!this.connection) return ''
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
    getImage(connection) {
      if (!connection) return ''
      return `http://localhost:3000/${connection.profile_image}`;
    },
    handleCardBtnClick() {
      if (this.isPositionToFill) {
        this.$router.push('/devs')
      } else {
        if (this.getLoggedInUser) {
          this.$router.push(`/profile/${this.getLoggedInUser.id}/messages`)
        }
      }
    }
  }
}
