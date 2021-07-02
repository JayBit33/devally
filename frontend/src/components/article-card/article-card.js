// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import dayjs from 'dayjs'

export default {
  name: 'ArticleCard',
  props: ['article'],
  data() {
    return {
     
    }
  },
  computed: {
    articleDate() {
      return dayjs(this.article.created_at).format('MMM D, YYYY')
    },
    imageUrl() {
      return 'http://localhost:1337' + this.article.image.url
    }
  },
  methods: {
    
  }
}
