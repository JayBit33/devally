// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { mapActions, mapGetters, mapMutations } from "vuex"

export default {
  name: "user-task",
  props: ['task', 'project', 'isNewTask'],
  data() {
    return {
      newTaskMessage: ''
    }
  },
  computed: {
    ...mapGetters(['getLoggedInUser'])
  },
  async mounted() {
    setTimeout(() => {
      if (this.isNewTask) {
        document.addEventListener('click', this.clickOutsideCheck)
        this.$refs.user_task_container_input.focus()
      }
    }, 1)
  },
  methods: {
    ...mapActions(['updateTask']),
    ...mapMutations(['updateLoggedInUser']),
    clickOutsideCheck(e) {
      if (!(e.path.includes(this.$refs.user_task_container))) this.$emit('new-task-cancel')
    },
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
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutsideCheck)
  }
}
