import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProjectGeneralInfo from '@/components/project-general-info'
import ConnectionCardCarousel from '@/components/connection-card-carousel'
import { mapActions } from 'vuex'

export default {
  name: 'project-collapsible',
  props: ['project'],
  components: {
    ConnectionCardCarousel,
    FontAwesomeIcon,
    ProjectGeneralInfo
  },
  data() {
    return {
      user: {
        tasks: [{ projectId: 3, message: 'Find a front-end developer that has experience with VueJS' },{ projectId: 11, message: 'Create designs. Jen should have them completed by noon today' },{ projectId: 21, message: 'Determine where to host application. Azure, Google Cloud and AWS are some viable options.'}],
      },
      collapsed: false,
      teamMembers: []
    }
  },
  async created() {
    this.teamMembers = await Promise.all(this.project.team_member_ids.map(async id => await this.fetchUserById(id)))
  },
  methods: {
    ...mapActions(['fetchUserById']),
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
}
