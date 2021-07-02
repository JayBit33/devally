<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="resources">
    <!-- <div class="home-banner">
      <div class="col-1">
        <h1>Everything You Need to Know</h1>
        <h4>articles on managing a team, development methodologies, </h4>
        <h4>starting a bussiness & more.</h4>
         <button class="btn"><router-link to="/create-account" class="link">GET STARTED</router-link></button> 
       </div>
    </div> --> 
    <div class="article-section">
      <article-card v-for="article in articles" :article="article" :key="article.id" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ArticleCard from '@/components/article-card'

export default {
  name: 'Resources',
  data() {
    return {
      articles: []
    }
  },
  components: {
    ArticleCard
  },
  methods: {
    ...mapActions(['fetchArticles'])
  },
  async created() {
    this.articles = await this.fetchArticles()
  }

}
</script>

<style lang="scss" scoped>
.resources {
  display: block;
  padding: 4rem;
  .article-section {
    display: flex;
    flex-wrap: wrap;

  }
}
@media (min-width: 1700px)  {
  .about {
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
