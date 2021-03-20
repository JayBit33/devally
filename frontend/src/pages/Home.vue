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
        <button class="btn"><router-link to="/devs" class="link">GET STARTED</router-link></button>
      </div>
      <div class="col-2">
        <img src="images/3593965.jpg" />
      </div>
    </div>

    <div class="getting-started">
      <h2>Getting Started Is Simple</h2>
      <div class="getting-started_steps">
        <div class="getting-started_steps_create">
          <h4>#1</h4>
          <h2>Create A Project</h2>
          <img src="images/4071498.jpg" />
        </div>
        <div>
          <h3 style="text-align:center; font-size: 1.75rem;">All Starts Here</h3>
          <p>The path to making your idea a reality starts here! In less than 7 minutes you can create an account, create a project and start looking for the people you need to bring it to life.</p>
          <p>Don't let someone beat you to finish line. Get started on your project today and make the future brighter.</p>
            <button>Create Project</button>
            </div>
        <div class="build-text">
          <h3 style="text-align:center; font-size: 1.75rem;">Find Passionate People</h3>
          <p>Search from thousands of profiles to find the professionals you need. Wether you are in need of a graphic designer, web developer, mobile app dev, project manager or dev-ops you can find them all here. </p>
            <router-link to="/devs" class="link"><button>Search Devs</button></router-link>
        </div>
        <div class="getting-started_steps_build">
          <h4>#2</h4>
          <h2>Build A Team</h2>
          <img src="images/4367890.png" />
        </div>

        <div class="getting-started_steps_life">
          <h4>#3</h4>
          <h2>Bring Your Idea To Life</h2>
          <img src="images/4309857.jpg" />
        </div>
        <div class="life-text">
          <h3 style="text-align:center; font-size: 1.75rem;">Make it A Reality</h3>
          <p>This is step where the magic happens! You and your new team begin the journey of design and creation. We know it is a lot to accomplish and you will have questions along the way.</p>
          <p>This is why we will still be here for you. We have articles and newsletters that help to guide you on your entrepreneurial journey!</p>
          <button>Start Here</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  props: [],
  created() {
  }
}
</script>

<style lang="scss" scoped>

.main {
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
    border-bottom: 1px solid #F2F2F2;
    background-color: white;
    .col-1 {
      margin-left: 2.5rem;
      h1 {
        font: 500 2.125rem 'Montserrat';
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
    h2 {
      font-size: 2.5rem; color: #514E4E;
      text-decoration: underline;
      text-align: center;
    }
    p {
      font-family: 'Arial';
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 500;
      text-align: center;
    }
    &_steps {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: 8fr 4fr;
      gap: 2rem 4rem;
      align-items: end;
      margin: 0 auto;
      max-width: 1280px;
      h4 { font: bold 2.75rem 'Segoe UI'; color: black;  margin-bottom: 0; margin-right: 1.5rem; }
      h2 { text-align: left; }
      img { width: 400px; }
      .link {
          color: white;
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

      &_create, &_build, &_life {
      display: flex;
      flex-direction: column;
      align-items: center;
      }
      &_build {

        img { width: 700px;  }
      }

      .build-text {
        text-align: center;
        margin-bottom: 3rem;
      }
      .life-text {
        text-align: center;
        margin-bottom: 5rem;
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
