// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
export default {
  name: 'Pagination',
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 5
    },
    users: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  }
}
