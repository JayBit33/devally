export default {
  name: 'rate-user-modal',
  props: ['user'],
  data() {
    return {
      rating: 0
    }
  },
  created() {
    setTimeout(() => {
      document.addEventListener('click', this.clickOutsideCheck)
    }, 1)
  },
  methods: {
    clickOutsideCheck(e) {
      if (!(e.path.includes(this.$refs.rate_user_modal))) this.$emit('rate-modal-close')
    },
    setRating(rating) {
      this.rating = rating
    },
    sendRate() {
      // TODO
      this.$emit('rate-modal-close')
    }
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutsideCheck)
  }
}