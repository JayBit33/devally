<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="resources">
    <div class="home-banner">
      <div class="col-1">
        <h1>Build A Team And</h1>
        <h1>Make Your Tech Idea A Reality</h1>
        <h4>Community of developers looking to join a team</h4>
        <h4>and build the next best thing since Jarvis.</h4>
        <button class="btn">
          <router-link to="/devs" class="link">Get Started</router-link>
        </button>
      </div>
      <div class="col-2">
        <img src="images/3593965.jpg" />
      </div>
    </div>

    <div class="header">
      <div class="nav">
       <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">Trending</el-menu-item>
        <el-menu-item index="2">Newest</el-menu-item>
        <el-submenu index="3">
          <template #title>Categories</template>
          <el-menu-item index="2-1">Starting a Business</el-menu-item>
          <el-menu-item index="2-2">Project Management</el-menu-item>
          <el-menu-item index="2-3">Software Development Lifecycle Methodology</el-menu-item>
          <el-menu-item index="2-3">Finance</el-menu-item>
        </el-submenu>
      </el-menu>
      </div>
      <div class="filter">
        <filter-search :hasFilters="false" placeholderText="Search Articles" class="search" />
      </div>
    </div>

    <h1 class="heading paths-heading">Learning Paths</h1>
    <div class="article-section">
      <learningpath-card v-for="path in paths" :path="path" :key="path.id" />
    </div>
    <h1 class="heading">Trending Articles</h1>
    <div class="article-section">
      <article-card v-for="article in articles" :article="article" :key="article.id" />
    </div>
    <h1 class="heading">Newest Articles</h1>
    <div class="article-section">
      <article-card v-for="article in articles" :article="article" :key="article.id" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ArticleCard from '@/components/article-card'
import FilterSearch from '@/components/filter-search'
import LearningpathCard from '@/components/learningpath-card'

export default {
  name: 'Resources',
  data() {
    return {
      articles: [],
      paths: []
    }
  },
  components: {
    ArticleCard,
    FilterSearch,
    LearningpathCard
  },
  methods: {
    ...mapActions(['fetchArticles','fetchLearningPaths'])
  },
  async created() {
    this.articles = await this.fetchArticles()
    this.paths = await this.fetchLearningPaths()
  }

}
</script>

<style lang="scss" scoped>
.resources {
  width: 90%;
  display: block;
  margin: 0 auto 8rem auto;
  position: relative;

  .home-banner {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 3fr auto;
      column-gap: 12rem;
      align-items: center;
      margin-bottom: 0rem;
      margin-left: 9rem;
      margin-right: 7rem;
      background-color: white;
      .col-1 {
        margin-left: 2.5rem;
        h1 {
          font: 700 2.125rem "Montserrat";
          color: $primary;
          line-height: 1.5rem;
        }
        h4 {
          font: 1.125rem "Montserrat";
          line-height: 0.5rem;
        }
        button {
          background-color: $button-primary;
          padding: 1rem 4rem 0.75rem 4rem;
          font-size: 1.25rem;
          border: none;
          float: left;
          margin-top: 0rem;
          .link {
            color: white;
          }
  
          &:hover {
            background-color: darken($button-primary, 10%);
          }
        }
      }
      .col-2 {
        margin-right: 2rem;
        img {
          width: 40rem;
        }
      }
    }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search {
    width: 40rem;
    position: absolute;
    top: 1rem;
    right: 6rem;
  }

  .heading {
    font-size: 1.5rem;
    // text-transform: uppercase;
    margin-top: 2rem;
    margin-bottom: 2rem;

    &:nth-of-type(2),&:nth-of-type(3) {
      margin-top: 4rem;
    }
  }

  .paths-heading {
    text-align: center;
  }

  .article-section {
    display: flex;
    flex-wrap: no-wrap;
    justify-content: center;
  }
}
@media (min-width: 1700px)  {
  .about {
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
