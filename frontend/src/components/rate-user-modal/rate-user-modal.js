export default {
  name: 'rate-user-modal',
  props: ['user'],
  data() {
    return {
      rating: 0
    }
  },
  methods: {
    setRating(rating) {
      this.rating = rating
    },
    sendRate() {
      // TODO
      this.$emit('rate-modal-close')
    }
  }
}