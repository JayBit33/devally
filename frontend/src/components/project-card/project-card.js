// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


export default {
  name: 'ProjectCard',
  props: ['project'],
  components: {
    FontAwesomeIcon
  },
  computed: {
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
  }
}
