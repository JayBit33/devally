<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="about">
    <div class="home-banner">
      <div class="col-1">
        <h1>Everything You Need to Know</h1>
        <h4>articles on managing a team, development methodologies, </h4>
        <h4>starting a bussiness & more.</h4>
        <!-- <button class="btn"><router-link to="/create-account" class="link">GET STARTED</router-link></button> -->
      </div>
    </div>

    <div class="about-body">
      <h1>Resources</h1>
      <p>show articles, have categories listed, search capability.</p>
      <ul>
        <li v-for="article in articles" :key="article.id" >
          <h3>{{ article.title }}</h3>
          <p>{{ article.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Resources',
  data() {
    return {
      articles: []
    }
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
  .about {
  max-width: 1780px;
  background-color: white;

  .home-banner {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr auto;
    column-gap: 12rem;
    align-items: center;
    margin-bottom: 3rem;
    margin-left: 9rem;
    margin-right: 7rem;
    background-color: white;
    background-image: url('../../public/images/resources.jpg');
    background-size: cover;
    background-position-y: -150px;
    background-repeat: no-repeat;
    height: 350px;

    .col-1 {
      margin-left: 2.5rem;
      margin-top: 3rem;

      h1 {
        font: 500 2.125rem 'Montserrat';
        color: white;
        line-height: 1.5rem;
      }
      h4 {
        font: 1.125rem 'Montserrat';
        line-height: .5rem;
        color: white;
      }
      button {
        background-color: $button-primary;
        padding: 1rem 4rem .75rem 4rem;
        font-size: 1.25rem;
        border: none;
        float: left;
        margin-top: 0rem;
        .link {
          color: white;
        }
      }
    }
    .col-2 {
      margin-right: 2rem;
      img {
        width: 30rem;
      }
    }
  }

  .about-body {
    display: block;
    margin: 0 10rem;
    h1 {
      font-size: 2.25rem; color: #514E4E;
    }
    p {
      font-family: 'Montserrat';
      font-size: 1.125rem;
      line-height: 2rem;
    }
  }
}

@media (min-width: 1700px)  {
  .about {
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
