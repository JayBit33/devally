<template>
  <div class="main">
    <div class="getting-started">
      <h2>Getting Started Is Simple</h2>
      <div class="getting-started_steps">
        <div class="getting-started_steps_create">
          <h4>#1</h4>
          <h2>Create A Project</h2>
          <img src="images/4071498.jpg" />
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
            <button>Create Project</button>
            </div>
        <div class="build-text">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
            <button>Search Devs</button>
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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eveniet itaque earum recusandae quaerat voluptas neque sed nihil odit.
            Officiis animi officia incidunt pariatur suscipit ea esse, hic quia deleniti?</p>
          <button>Start Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Works",
  props: {},
}
</script>

<style lang="scss" scoped>
.main {
  max-width: 1780px;
  margin: 0rem 7.5rem 0rem 7.5rem;

  .home-banner {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr auto;
    column-gap: 12rem;
    align-items: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid #F2F2F2;
    .col-1 {
      h1 {
        font: 500 2rem 'Montserrat';
        color: #294738;
        line-height: 1.5rem;

      }
      h4 {
        font: 1rem 'Montserrat';
        line-height: .5rem;
      }
      button {
        background-color: #294738;
        color: white;
        padding: 1rem 4rem .75rem 4rem;
        font-size: 1.25rem;
        border: none;
        margin-top: 2rem;
      }
    }
    .col-2 {
      margin-right: 4rem;
      img {
        width: 40vw;
      }
    }
  }

  .getting-started {
    h2 {
      font-size: 2.5rem; color: #514E4E;
      text-decoration: underline;
      text-align: center;
    }
    &_steps {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: 4fr 4fr;
      gap: 2rem 4rem;
      align-items: end;
      margin: 0 auto;
      max-width: 1280px;
      h4 { font: bold 2.75rem 'Segoe UI'; color: black;  margin-bottom: 0; margin-right: 1.5rem; }
      h2 { text-align: left; }
      img { width: 400px; }
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
}

@media (min-width: 1700px)  {
  .main {
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
