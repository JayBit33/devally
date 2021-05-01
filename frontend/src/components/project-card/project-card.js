// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

export default {
  name: 'ProjectCard',
  props: ['project'],
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
    openPositions() {
      let display = ""
      this.project.members_needed.map((member,idx) => {
        display += member
        if (idx < this.project.members_needed.length-1) {
          display += ',  '
        }
      })
      return display
    }
  }
}
