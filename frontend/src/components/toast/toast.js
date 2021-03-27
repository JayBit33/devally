export default {
  name: 'toast',
  props: ['type', 'hasAction', 'message', 'duration'],
  data() {
    return {
      timer: null,
      slider: 100
    }
  },
  created() {
    let intervalRate = 10
    this.timer = setInterval(() => {
      this.slider -= 100 / (this.duration / intervalRate)
      if (this.slider <= 0) {
        this.$emit('toast-close')
      }
    }, intervalRate)
  },
  destroyed() {
    clearInterval(this.timer)
    this.$emit('toast-close')
  }
}