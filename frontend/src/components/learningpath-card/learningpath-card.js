// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

export default {
  name: 'LearningpathCard',
  props: ['path'],
  data() {
    return {
     
    }
  },
  computed: {
    imageUrl() {
      return 'http://localhost:1337' + this.path.image.url
    }
  },
  methods: {
    
  }
}
