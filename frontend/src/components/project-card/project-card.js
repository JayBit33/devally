// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import ApplyModal from '@/components/apply-modal'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters } from 'vuex'


export default {
  name: 'ProjectCard',
  props: ['project'],
  components: {
    ApplyModal,
    FontAwesomeIcon
  },
  data() {
    return {
      selectedPosition: null,
      showingApplyModal: false
    }
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
    displayProjectOptions() {
      return (projectField) => {
        let displayOptions = ""
        projectField.map((type,idx) => {
          displayOptions += type
          if (idx < projectField.length-1) {
            displayOptions += ',  '
          }
        })
        return displayOptions
      }
    },
    featured() {
      return this.project.is_featured
    },
    openPositions() {
      return (position) => {
        let display = ''
        if (position.skills.length) {
          position.skills.map((skill, idx) => {
            display +=  skill
            if (idx < position.skills.length-1) display += ',  '
          })
        }
        return display
      }
    }
  },
  methods: {
    applyToPosition(position) {
      this.showingApplyModal = true
      this.selectedPosition = position
    },
    closeApplyModal() {
      this.showingApplyModal = false
    }
  }
}
