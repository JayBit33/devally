<template>
  <div id="main-component">
    <div class="header">
      <nav>
        <router-link to="/" class="logo link">DevAlly</router-link>
        <ul>
          <li><router-link to="/works" class="link">how it works</router-link><span>/</span></li>
          <li><router-link to="/devs" class="link">find developers</router-link><span>/</span></li>
          <li><router-link to="/projects" class="link">browse projects</router-link><span>/</span></li>
          <li><router-link to="/about" class="link">about</router-link></li>
        </ul>
      </nav>
      <button class="logon" >Sign In</button>
    </div>

    <div class="page-content">
      <router-view />
    </div>

    <div class="footer">
      <p>&copy; DevAlly 2021</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {

  },
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
#main-component {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.link { text-decoration: none; color: black; }

.header {
  width: 100%;
  margin: 2rem 0rem 5rem 2rem;
  color: black;
  display: flex;
  align-items:baseline;
  justify-content:space-between;

  .logo {
    font: bold 1.5rem 'Montserrat';
    margin-top: 0;
    margin-right: 2rem;
  }
  nav {
    overflow: hidden;
    display: flex;
    ul {
      list-style-type: none;
      margin-top: .425rem;
      padding: 0;
      li {
        display: inline;
        .link {
          display: inline;
          text-decoration: none;
          padding: 1rem 1.5rem;
          font: 400 1rem 'Montserrat';
          color: #514E4E;
          span {
            padding-left: 1.5rem;
          }
        }
      }
    }
  }
  .logon {
    background-color: #294738;
    color: white;
    padding: .25rem 1rem;
    font-family: inherit;
    font-size: 1rem;
    margin-right: 4rem;
  }
}

.page-content {
  margin-left: 7rem;
}

.footer {
  background-color: #3f5e75;
  color: white;
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
  padding-top: 11rem;
  margin-top: 3rem;
}
</style>
