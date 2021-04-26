import Dropdown from '@/components/dropdown';
import { mapActions } from 'vuex';

export default {
  name: 'report-user-modal',
  props: ['user'],
  components: {
    Dropdown
  },
  data() {
    return {
      allReportOptions: [],
      selectedReportOption: '',
      extraInfo: ''
    }
  },
  async created() {
    const { report_options } = await this.getReportOptions()
    this.allReportOptions = report_options
  },
  methods: {
    ...mapActions(['getReportOptions']),
    sendReport() {
      // TODO
      this.$emit('report-modal-close')
    }
  }
}