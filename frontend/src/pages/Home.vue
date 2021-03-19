<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="main">
    <div class="home-banner">
      <div class="col-1">
        <h1>Build A Team And</h1>
        <h1> Make Your Tech Idea A Reality</h1>
        <h4>great community of developers willing to join a team</h4>
        <h4>for pay or ownership</h4>
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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
            <button>Create Project</button>
            </div>
        <div class="build-text">
          <h3 style="text-align:center; font-size: 1.75rem;">Find Passionate People</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
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
        font: 500 2rem 'Montserrat';
        color: $primary;
        line-height: 1.5rem;
      }
      h4 {
        font: 1rem 'Montserrat';
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
      font-size: 1.125rem;
      line-height: 1.75rem;
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
