export default {
  name: 'user-modal',
  props: ['title', 'btnTxt', 'btnIcon', 'imageName', 'styles'],
  methods: {
    getImage(imageName) {
      return require(`@/assets/${imageName}`)
    }
  }
}