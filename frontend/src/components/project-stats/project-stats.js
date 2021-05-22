// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
export default {
  name: 'project-stats',
  props: ['project', 'extraInformation'],
  data() {
    return {
    }
  },
  computed: {
    completedTasks() {
      return this.project.tasks.filter(t => (t.status == 'complete'))
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
    getDateFormat(date) {
      let currDate = new Date(date)
      return `${currDate.getMonth() + 1}-${currDate.getDate()}-${currDate.getFullYear()}`
    }
  }
}