import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'project-collapsible',
  props: [],
  data() {
    return {
      user: {
        tasks: [{ projectId: 3, message: 'Find a front-end developer that has experience with VueJS' },{ projectId: 11, message: 'Create designs. Jen should have them completed by noon today' },{ projectId: 21, message: 'Determine where to host application. Azure, Google Cloud and AWS are some viable options.'}],
      }
    }
  },
  components: {
    FontAwesomeIcon
  }
}
