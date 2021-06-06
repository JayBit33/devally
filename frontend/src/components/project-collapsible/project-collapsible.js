// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProjectStats from '@/components/project-stats'
import ConnectionCardCarousel from '@/components/connection-card-carousel'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'project-collapsible',
  props: ['project', 'isEditable'],
  components: {
    ConnectionCardCarousel,
    FontAwesomeIcon,
    ProjectStats
  },
  data() {
    return {
      user: {
        tasks: [{ projectId: 3, message: 'Find a front-end developer that has experience with VueJS' }, { projectId: 11, message: 'Create designs. Jen should have them completed by noon today' }, { projectId: 21, message: 'Determine where to host application. Azure, Google Cloud and AWS are some viable options.' }],
      },
      collapsed: false,
      teamMembers: []
    }
  },
  computed: {
    ...mapGetters(['getLoggedInUser'])
  },
  async created() {
    this.teamMembers = await Promise.all(this.project.team_member_ids.map(async id => await this.fetchUserById(id)))
    const creator = await this.fetchUserById(this.project.creator_id)
    this.teamMembers = [creator, ...this.teamMembers]
  },
  methods: {
    ...mapActions(['fetchUserById', 'fetchToast', 'updateProjectById', 'updateUser']),
    async removeTeamMember(memberToRemove) {
      let toast, message, newTeamMemberIds, newCreatorId, project, hasOneMember, user

      let isTeamMember = this.project.team_member_ids.includes(memberToRemove.id)
      if (isTeamMember) {
        newTeamMemberIds = JSON.stringify(this.project.team_member_ids.filter(t_id => t_id != memberToRemove.id))
        project = await this.updateProjectById({ id: this.project.id, project: { team_member_ids: newTeamMemberIds } })
        user = await this.updateUser({ id: this.project.id, updates: { project_ids: JSON.stringify(memberToRemove.project_ids.filter(p => p.id == this.project.id)) } })
      } else {
        hasOneMember = this.project.team_member_ids.length == 0

        if (!(hasOneMember)) {
          newCreatorId = this.project.team_member_ids[0]
          newTeamMemberIds = JSON.stringify(this.project.team_member_ids.filter((_, i) => i > 0))
          project = await this.updateProjectById({ id: this.project.id, project: { creator_id: newCreatorId, team_member_ids: newTeamMemberIds } })
        }
      }

      if (project && user) {
        message = [
          { text: 'You have successfully removed', emphasis: false },
          { text: memberToRemove.firstname + " " + memberToRemove.lastname, emphasis: true },
          { text: 'from', emphasis: false },
          { text: this.project.name, emphasis: true }
        ]
        toast = await this.fetchToast({ type: 'success', message });

        this.$emit('team-member-remove', project)
      } else if (hasOneMember) {
        message = [
          { text: 'You cannot remove', emphasis: false },
          { text: memberToRemove.firstname + " " + memberToRemove.lastname, emphasis: true },
          { text: 'from', emphasis: false },
          { text: this.project.name + '.', emphasis: true },
          { text: 'Each project must have at least 1 member', emphasis: false }
        ]
        toast = await this.fetchToast({ type: 'warning', message });
      } else {
        message = [
          { text: 'You have', emphasis: false },
          { text: 'unsuccessfully', emphasis: true },
          { text: 'removed', emphasis: false },
          { text: memberToRemove.firstname + " " + memberToRemove.lastname, emphasis: true },
          { text: 'from', emphasis: false },
          { text: this.project.name, emphasis: true }
        ]
        toast = await this.fetchToast({ type: 'error', message });
      }

      this.$emit('toast-update', toast)
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    updateView(view) {
      let id = this.$route.params.id
      if (view != this.$route.params.view) {
        this.$router.push(`/profile/${id}/${view}`)
      }
    }
  },
  watch: {
    async project() {
      this.teamMembers = await Promise.all(this.project.team_member_ids.map(async id => await this.fetchUserById(id)))
      const creator = await this.fetchUserById(this.project.creator_id)
      this.teamMembers = [creator, ...this.teamMembers]
    }
  }
}
