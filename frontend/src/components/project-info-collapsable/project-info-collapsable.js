export default {
  name: 'project-info-collapsable',
  props: ['project'],
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
}