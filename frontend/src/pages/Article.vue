<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="article">
    <div class="article-image">
      <img :src="imageUrl()" />
    </div>
    <div class="article-body">
      <h1>{{ article.title }}</h1>
      <p>{{ article.body }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Article',
  data() {
    return {
      article: {}
    }
  },
  components: {
  },
  async created() {
    const id = this.$route.params.id
    this.article = await this.fetchArticle(id)
  },
  computed: {
    
  },
  methods: {
    ...mapActions(['fetchArticle']),
    imageUrl() {
      return 'http://localhost:1337' + this.article.image.url
    }
  },

}
</script>

<style lang="scss" scoped>
.article {
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
      padding-bottom: 2rem;
    }
    p {
      font-family: 'Arial';
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 2.25rem;
      text-align: left;
      // padding: 0 18rem;
    }
  }
}
@media (min-width: 1700px)  {
  
}
</style>
