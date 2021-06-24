// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import { mapGetters } from 'vuex'

export default {
    name: "Home",
    props: [],
    data() {
      return {
        visonaryCopywrite: true,
        developerCopywrite: false
  
      }
    },
    created() {},
    computed: {
      ...mapGetters(['getLoggedInUser', 'isLoggedIn']),
    },
    methods: {
      getImage(imageName) {
        return require(`@/assets/${imageName}`);
      },
      toggleContent(view) {
        if (view === 'visionary') {
          this.visonaryCopywrite = true
          this.developerCopywrite = false 
        } else {
          this.developerCopywrite = true 
          this.visonaryCopywrite = false
        }
      }
    },
  };