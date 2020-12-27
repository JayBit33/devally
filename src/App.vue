<template>
  <div id="main-component">
    <div class="header">
      <img alt="Vue logo" src="./assets/logo.png" id="img_logo" />
      <nav>
        <ul>
          <li>Home</li>
          <li>Browse Projects</li>
          <li>Search Devs</li>
        </ul>
      </nav>
    </div>
    <Main />
    <div class="footer">
      <p>&copy; DevAlly 2021</p>
    </div>
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}
#main-component {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 1rem 0 0 0;
}

.header {
  width: 100%;
  padding: 1rem;
  margin: 0 2rem;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  nav {
    overflow: hidden;
    padding-right: 4rem;
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      li {
        display: inline;
        float: right;
        text-decoration: none;
        padding: 1rem 2rem;
      }
    }
  }
}

#img_logo {
  width: 3.75rem;
}

.footer {
  background-color: #39c99d;
  color: white;
  text-align: center;
  padding: 3rem 0 1.5rem 0;
  margin-top: 2rem;
}
</style>
