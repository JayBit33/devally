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
    this.timer = setInterval(() => {
      this.slider -= .3333
    }, 10)
  },
  methods: {
    ...mapMutations(['hideToast'])
  },
  unMounted() {
    clearInterval(this.timer)
  }
}