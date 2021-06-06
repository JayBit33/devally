
// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

export default {
  data() {
    return {
      pageSize: 5,
      currentPageIdx: 1,
      startIdx: 0,
      endIdx: 5,
    }
  },
  methods: {
    updateItemsDisplayed(page) {
      if (page === 1) {
        this.startIdx = 0;
        this.currentPageIdx = 1
      } else {
        this.startIdx = (page * this.pageSize) - this.pageSize;
        this.currentPageIdx = page
      }
      this.endIdx = this.pageSize * page;
      window.scrollTo(0,0);
    }
  }
}
