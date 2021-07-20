<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="learning-path">
    <div class="path-image">
      <img :src="imageUrl()" />
    </div>
    <div class="path-body">
      <div class="path-body_header">
        <img :src="imageIcon()" />
        <h1>{{ path.title }}</h1>
      </div>
      <div>
       {{ path.body }}
      </div>
      <div>
        {{ path.sections }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LearningPath',
  data() {
    return {
      path: {}
    }
  },
  components: {
  },
  async created() {
    const id = this.$route.params.id
    this.path = await this.fetchLearningPath(id)
  },
  computed: {
    
  },
  methods: {
    ...mapActions(['fetchLearningPath']),
    imageIcon() {
      return 'http://localhost:1337' + this.path.icon.url
    },
    imageUrl() {
      return 'http://localhost:1337' + this.path.image.url
    }
  },

}
</script>

<style lang="scss" scoped>
.path {
  width: 75%;
  display: block;
  margin: 0 auto 8rem auto;
  position: relative;

  &-image img {
    width: 100%;
    height: 30rem;
    object-fit: contain;
    margin-top: 4rem;
  }

  &-body {
    width: 55%;
    margin: 0 auto;
    padding-bottom: 4rem;
    h1 {
      text-align: center;
    }
    p {
      font-family: 'Arial';
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 2.25rem;
      text-align: left;
      // padding: 0 18rem;
    }
    &_header {
      display: flex;
      align-items: center;
      margin: 2rem 0;
      img {
        width: 5%;
        height: 5%;
        object-fit: contain;
        margin-right: 1rem;
      }
    }
  }
}
@media (min-width: 1700px)  {
  
}
</style>
