module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  // collectCoverageFrom: [
  //   "**/*.{js,jsx}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**"
  // ],
  coverageThreshold: {
    "global": {
      "branches": 50,
      "functions": 50,
      "lines": 50,
      "statements": 50
    },
    "../frontend/src/components/*/*.js": {
      "branches": 80,
      "statements": 80
    },
    // "../frontend/src/pages/*/*.js": {
    //   "statements": 90
    // },
    // "./src/api/very-important-module.js": {
    //   "branches": 100,
    //   "functions": 100,
    //   "lines": 100,
    //   "statements": 100
    // }
  }
}
