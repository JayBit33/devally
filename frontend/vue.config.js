module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@/scss/variables.scss";
          @import "~@/scss/user-app-variables.scss";
        `
      }
    }
  }
}