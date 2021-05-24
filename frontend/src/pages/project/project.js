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
      visionary: null,
      teamMembers: [],
    }
  },
  components: {
    ConnectionCard,
    ConnectionCardCarousel,
  },
  async created() {
    this.project = await this.fetchProjectById(this.$route.params.id)
    let id = this.project.creator_id
    this.visionary = await this.fetchUserById(id)  
    this.project.team_member_ids.forEach(async id => await this.fetchUserById(id).then(user => this.teamMembers.push(user)))
  },
  computed: {
    hiringOptions() {
      return this.project.hiring_options.reduce((acc, option, idx, arr) => {
        if (idx !== arr.length) return acc += ', ' + option
        acc += option
        return acc
      })
    },
    fundingTypes() {
      return this.project.funding_types.reduce((acc, option, idx, arr) => {
        if (idx !== arr.length) return acc += ', ' + option
        acc += option
        return acc
      })
    },
    positionsNeeded() {
      return this.project.members_needed  
    },
    skills() {
      return (position) => {
        return position.skills.reduce((acc, option, idx, arr) => {
          if (idx !== arr.length) return acc += ', ' + option
          acc += option
          return acc
        })
      } 
    }
  },
  methods: {
    ...mapActions(['fetchProjectById', 'fetchUserById']),
    
  }
}
