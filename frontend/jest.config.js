module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
