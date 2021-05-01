// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import { mapActions, mapGetters } from "vuex"

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
  computed: {
    ...mapGetters(['getLoggedInUser'])
  },
  methods: {
    ...mapActions(['updateUser', 'fetchUserById', 'fetchToast']),
    clickOutsideCheck(e) {
      if (!(e.path.includes(this.$refs.rate_user_modal))) this.$emit('rate-modal-close')
    },
    setRating(rating) {
      this.rating = rating
    },
    async sendRate() {
      
      let { ratings } = await this.fetchUserById(this.user.id)
      let rating_ids = ratings.map(r => r.user_rating_id)

      let new_ratings = []
      let alreadyRated = rating_ids.includes(this.getLoggedInUser.id)
      if (alreadyRated) {
        new_ratings = ratings.map(r => {
          if (r.user_rating_id == this.getLoggedInUser.id) {
            return { ...r, rating: this.rating }
          }
          return r
        })
      } else {
        new_ratings = [...ratings, { rating: this.rating, user_rating_id: this.getLoggedInUser.id }]
      }

      let res = await this.updateUser({id: this.user.id, updates: { ratings: JSON.stringify(new_ratings) }})

      let message, toast
      if (res) {
        if (alreadyRated) {
          message = [
            { text: 'This rating has', emphasis: false },
            { text: 'overridden', emphasis: true },
            { text: 'your past rating for', emphasis: false },
            { text: this.user.firstname + " " + this.user.lastname + '.', emphasis: true }
          ]
          toast = await this.fetchToast({ type: 'info', message });
        } else {
          message = [
            { text: 'You have', emphasis: false },
            { text: 'successfully', emphasis: true },
            { text: 'rating', emphasis: false },
            { text: this.user.firstname + " " + this.user.lastname, emphasis: true }
          ]
          toast = await this.fetchToast({ type: 'success', message });
        }
      } else {
        message = [
          { text: 'You have', emphasis: false },
          { text: 'unsuccessfully', emphasis: true },
          { text: 'rating', emphasis: false },
          { text: this.user.firstname + " " + this.user.lastname, emphasis: true }
        ]
        toast = await this.fetchToast({ type: 'error', message });
      }

      this.$emit('toast-update', toast)

      this.$emit('rate-modal-close')
    }
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutsideCheck)
  }
}
