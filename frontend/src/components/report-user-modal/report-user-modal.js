// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

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

    setTimeout(() => {
      document.addEventListener('click', this.clickOutsideCheck)
    }, 1)
  },
  methods: {
    ...mapActions(['getReportOptions']),
    clickOutsideCheck(e) {
      if (!(e.path.includes(this.$refs.report_user_modal))) this.$emit('report-modal-close')
    },
    sendReport() {
      // TODO
      this.$emit('report-modal-close')
    }
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutsideCheck)
  }
}
