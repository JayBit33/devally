// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import ConnectionCard from '@/components/connection-card'
import ConnectionCardCarousel from '@/components/connection-card-carousel'
import { mapActions } from 'vuex'

export default {
  name: 'Project',
  data() {
    return {
      project: {},
    }
  },
  components: {
    ConnectionCard,
    ConnectionCardCarousel,
  },
  async created() {
    this.project = await this.fetchProjectById(this.$route.params.id)
  },
  computed: {
    async visionary() {
      let id = this.project.creator_id
      return await this.fetchUserById(id)  
    },
    teamMembers() {
      const members = this.project.team_member_ids.map(async id => await this.fetchUserById(id))
      return members  
    },
    async positionsNeeded() {
      return this.project.members_needed  
    }
  },
  methods: {
    ...mapActions(['fetchProjectById', 'fetchUserById']),
    
  }
}
