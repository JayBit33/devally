import { mapMutations } from 'vuex';

export default {
  name: 'toast',
  props: ['type', 'hasAction', 'message'],
  data() {
    return {
      timer: null,
      slider: 100
    }
  },
  created() {
    let intervalRate = 10
    this.timer = setInterval(() => {
      this.slider -= 100 / (5000 / intervalRate)
    }, intervalRate)
  },
  methods: {
    ...mapMutations(['hideToast'])
  },
  unMounted() {
    clearInterval(this.timer)
  }
}