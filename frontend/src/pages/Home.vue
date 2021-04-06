<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="main">
    <div class="home-banner">
      <div class="col-1">
        <h1>Build A Team And</h1>
        <h1> Make Your Tech Idea A Reality</h1>
        <h4>Community of developers looking to join a team</h4>
        <h4>and build the next best thing since Jarvis.</h4>
        <button class="btn"><router-link to="/devs" class="link">Get Started</router-link></button>
      </div>
      <div class="col-2">
        <img src="images/3593965.jpg" />
      </div>
    </div>

    <div class="getting-started">
      <h1>Getting Started Is Simple</h1>
      <div class="getting-started_steps">
        <div>
          <img src="images/4071498.jpg" style="width: 300px" />
          <h2>Create A Project</h2>
          <p>The path to making your idea a reality starts here! In 5 minutes or less you can create an account, a project and start searching for the people you need to bring it to life.
          Don't let someone beat you to the finish line. Get started on your project today!</p>
          <router-link to="/devs" class="link"><button>Create Project</button></router-link>
        </div>
        <div>
          <img src="images/team.png" style="width: 300px" />
          <h2>Build A Team</h2>
          <p>Great teams build great products. Search our community to find the professionals you need. Whether you are in need of a graphic designer, web developer, mobile app dev, project manager, dev-ops or all of the above, you can find them all here. </p>
          <router-link to="/devs" class="link"><button>Search Devs</button></router-link>
        </div>
        <div>
          <img src="images/4309857.jpg" style="width: 300px" />
          <h2>Bring Your Idea To Life</h2>
          <p>As you and your new team begin the journey of designing and creating your product we will still be here for you. We know it is a lot to accomplish and you will have questions along the way.
           We have articles that help to guide you on your journey.</p>
          <router-link to="/devs" class="link"><button>View Articles</button></router-link>
        </div>
      </div>
    </div>

    <div class="join-devs">
      <div>
        <img src="images/programmer-man.png" style="width:500px" />
      </div>
      <div class="join-devs_col2">
        <h2>Want To Build Something From the Ground Up?</h2>
        <p>Are you a web, mobile or software developer, graphic designer or project manager? Join DevAlly and find paid jobs or work for part ownership in tech startups.</p>
        <router-link to="/signin" class="link"><button>Join Now</button></router-link>
      </div>
    </div>

    <div class="start-learning">
      <div>
        <h2>Need Guidance on how to start and run a tech startup?</h2>
        <p>We got you covered. Read up on software development methodologies, how to start a business and much more.</p>
        <router-link to="/signin" class="link"><button>Start Learning</button></router-link>
      </div>
      <div>
        <img :src="getImage('201brain-knowledge.png')" style="width:350px" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  props: [],
  created() {
  },
  methods: {
    getImage(imageName) {
      return require(`@/assets/${imageName}`)
    }
  }
}
</script>

<style lang="scss" scoped>

.main {
  // max-width: 1780px;
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
    border-bottom: 1px solid #F2F2F2;
    background-color: white;
    .col-1 {
      margin-left: 2.5rem;
      h1 {
        font: 700 2.125rem 'Montserrat';
        color: $primary;
        line-height: 1.5rem;
      }
      h4 {
        font: 1.125rem 'Montserrat';
        line-height: .5rem;
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
        width: 40rem;
      }
    }
  }

  .getting-started {
    margin: 5rem 0;
    h1 {
      font-size: 2.5rem; color: #514E4E;
      text-decoration: underline;
      text-align: center;
      margin-bottom: 7rem;
    }
    h2 {
      font-size: 2.5rem; color: #514E4E;
      text-decoration: underline;
      text-align: center;
    }
    &_steps {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 4fr 4fr 4fr;
      gap: 2rem 4rem;
      align-items: end;
      margin: 0 4rem;

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      h2 {
        font-family: 'Montserrat';
        font-size: 2rem;
        text-decoration: none;
        color: black;
        text-align: center;
      }
      p {
        width: 30rem;
        font-family: 'Segoe UI';
        font-size: 1.25rem;
        line-height: 2rem;
        text-align: center;
      }
      img { width: 400px; }
      .link {
          color: white;
        button {
          display: block;
          background-color: $button-secondary;
          color: white;
          font: 1.25rem 'Montserrat';
          text-transform: uppercase;
          margin-top: 2rem;
          padding: 1rem 2rem;
          border: none;
          border-radius: 1rem;
          margin: 2rem auto;
          cursor: pointer;
        }
      }
    }
  }

  .join-devs {
    background-color: $home-page-section-bg;
    display: grid;
    grid-template-columns: 4fr 5fr;
    align-items: center;
    padding: 4rem;
    div {
      margin: 0 4rem;
    }
    div:nth-child(2) {
      margin-right: 9rem;
    }
    h2 {
      font-family:'Montserrat';
      font-size: 2rem;
      text-align: center;
      color: black;
    }
    p {
      font-family: 'Segoe UI';
      font-size: 1.25rem;
      line-height: 2rem;
      text-align: center;
      color: $text;
    }
    .link {
      color: white;
      button {
        display: block;
        background-color: $button-secondary;
        color: white;
        font: 1.25rem 'Montserrat';
        text-transform: uppercase;
        margin-top: 2rem;
        padding: 1rem 2rem;
        border: none;
        border-radius: 2rem;
        margin: 2rem auto;
        cursor: pointer;
      }
    }
  }

  .start-learning {
    display: grid;
    grid-template-columns: 4fr 3fr;
    align-items: center;
    padding: 4rem;
    div {
      margin: 0 4rem;
    }
    div:nth-child(2) {
      margin-right: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h2 {
      font-family:'Montserrat';
      font-size: 2rem;
      line-height: 3rem;
      text-align: left;
      max-width: 40rem;
      color: black;
    }
    p {
      font-family: 'Segoe UI';
      font-size: 1.25rem;
      line-height: 2rem;
      text-align: left;
      color: $text;
    }
    .link {
      color: white;
      button {
        display: block;
        background-color: $button-secondary;
        color: white;
        font: 1.25rem 'Montserrat';
        text-transform: uppercase;
        margin-top: 2rem;
        padding: 1rem 2rem;
        border: none;
        border-radius: 1rem;
        margin: 1rem auto;
        float: left;
        cursor: pointer;
      }
    }
  }

  // remove after inserting <router-link> for all buttons
  button {
    display: block;
    background-color: #6B8BA4;
    color: white;
    font: 1.25rem 'Montserrat';
    text-transform: uppercase;
    margin-top: 2rem;
    padding: 1rem 2rem;
    border: none;
    margin: 2rem auto;
    cursor: pointer;
  }
}


// current header issues below 1652
@media (min-width: 1652px)  {
  .main {
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
