<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="page-not-found">
    <img src="../assets/404_Avatar.png" class="avatar" />
    <h2>Your in the wilderness all alone!</h2><h2> Don't worry, we will get you back to safety</h2>
    <router-link to="/" class="link"><button>Go Home</button></router-link>
  </div>
</template>

<script>

export default {
  name: 'PageNotFound',
   methods: {

   }

}
</script>

<style lang="scss" scoped>
  .page-not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4rem;
    img {
      height: 40vh;
      margin-bottom: 2rem;
    }
    h2 {
      font-family: 'Open Sans';
      font-size: 1.75rem;
      font-weight: bold;
      text-align: center;
      margin: 0;
    }

    .link {
      &:focus, &:hover {
        cursor: pointer;
        outline: none;
        border: none;
      }
      button {
        font-family: 'Open Sans';
        font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
        color: white;
        border: none;
        border-radius: 2rem;
        background-color: $button-secondary-active;
        margin-top: 2rem;
        padding: 1rem 2rem;

        &:focus, &:hover {
          cursor: pointer;
          outline: none;
          border: none;
          background-color: $button-secondary;
          transition: .3s;
        }
      }
    }
  }
</style>
