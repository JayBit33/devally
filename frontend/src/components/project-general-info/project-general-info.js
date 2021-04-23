export default {
  name: 'project-general-info',
  props: ['project', 'extraInformation'],
  data() {
    return {
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
      return `${currDate.getMonth()}-${currDate.getDate()}-${currDate.getFullYear()}`
    }
  }
}