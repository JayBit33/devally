// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

export default {
  name: 'Dropdown',
  props: ['items','optionTitle'],
  data() {
    return {
      optionsShowing: false,
    }
  },
  methods: {
    onSelect() {
      this.toggleDropdown();
    },
    toggleDropdown() {
      this.optionsShowing = !this.optionsShowing;
    }
  }
}
