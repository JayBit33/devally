// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { mapActions, mapGetters, mapMutations } from "vuex"

export default {
  name: "user-task",
  props: ['task', 'project'],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['getLoggedInUser'])
  },
  async created() {
  },
  methods: {
    ...mapActions(['updateTask']),
    ...mapMutations(['updateLoggedInUser']),
    getImage(imageName, fromBE = false) {
      if (fromBE) {
        return `http://localhost:3000/${imageName}`;
      } else {
        return require(`@/assets/${imageName}`)
      }
    },
    async taskComplete() {
      await this.updateTask({ projectId: this.project.id, taskId: this.task.id, updates: { status: 'complete' }})
      this.$emit('complete-task', this.task)
    },
    async taskDelete() {
      await this.updateTask({ projectId: this.project.id, taskId: this.task.id, isDelete: true})
      this.$emit('delete-task', this.task)
    }
  }
}
