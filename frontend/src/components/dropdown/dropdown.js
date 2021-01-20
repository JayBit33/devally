// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

export default {
  name: 'Dropdown',
  props: ['items','optionTitle'],
  data() {
    return {
      optionsShowing: false,
      selectedOption: this.optionTitle,
      isSet: false,
    }
  },
  methods: {
    onSelect() {
      this.toggleDropdown();
    },
    onItemSelection(e) {
      e.target.classList.add('selected');
      this.toggleDropdown();
      this.selectedOption = e.target.innerText;
      this.isSet = true;
    },
    toggleDropdown() {
      this.optionsShowing = !this.optionsShowing;
    }
  }
}
