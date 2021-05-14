// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import ProjectStats from '@/components/project-stats'

export default {
  name: 'project-info-collapsable',
  props: ['project'],
  components: {
    ProjectStats
  },
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    getDayCount(date) {
      let currDate = new Date(Date.now());
      let projectDate = new Date(date)

      let timeDifference = currDate.getTime() - projectDate.getTime();
      let dayDifference = timeDifference / (1000 * 3600 * 24);
      return Math.ceil(dayDifference)
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
}
