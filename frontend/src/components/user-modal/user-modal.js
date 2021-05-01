// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

export default {
  name: 'user-modal',
  props: ['title', 'btnTxt', 'btnIcon', 'imageName', 'styles'],
  methods: {
    getImage(imageName) {
      return require(`@/assets/${imageName}`)
    }
  }
}
