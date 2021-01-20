// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
export default {
  name: 'Breadcrumbs',
  data() {
    return {
      // breadcrumbList: ''
    }
  },
  computed: {
    breadcrumbList() {
      return this.$route.meta.breadcrumb.map(b => ({ name: b.name, to: b.to })) || [];
    }
  },
  // watch: {
  //   $route() {
  //     this.breadcrumbList = this.$route.meta.breadcrumb.map(b => ({ name: b.name, to: b.to })) || [];
  //     console.log(this.$route.meta.breadcrumb);
  //   }
  // }
}
