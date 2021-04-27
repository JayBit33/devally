// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import ConnectionCardCarousel from '@/components/connection-card-carousel';
import FilterSearch from '@/components/filter-search';
import PaginationMixin from '../../../mixins/paginationMixin';
import Toast from '@/components/toast'
import UserModal from '@/components/user-modal';
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserConnection',
  props: ['connectionIds'],
  data() {
    return {
      allCollapsed: false,
      mostCollapsed: false,
      newCollapsed: false,
      connections: [],
      isUserModalOpen: true,
      isLoading: false,
      toast: {
        type: '',
        message: [{ text: '', emphasis: false }],
        hasAction: false,
        actionRedirect: '',
        isShown: false,
        duration: 0
      }
    }
  },
  components: {
    ConnectionCardCarousel,
    FilterSearch,
    Toast,
    UserModal
  },
  mixins: [PaginationMixin],
  computed: {
    ...mapGetters(['getLoggedInUser']),
    connectionsShown() {
      return this.connections ? this.connections.slice(this.startIdx, this.endIdx) : [];
    }
  },
  methods: {
    ...mapActions(['fetchUserById', 'updateUser']),
    ...mapMutations(['updateLoggedInUser']),
    closeModal() {
      this.isUserModalOpen = false
    },
    closeToast() {
      this.toast.isShown = false
    },
    handleToastAction() {
      this.$router.push(this.toast.actionRedirect)
      this.toast.isShown = false
    },
    handleUserModalButton() {
      this.$router.push({name: 'Devs'})
    },
    toggleAllCollapsed() {
      this.allCollapsed = !this.allCollapsed;
    },
    toggleMostCollapsed() {
      this.mostCollapsed = !this.mostCollapsed;
    },
    toggleNewestCollapsed() {
      this.newCollapsed = !this.newCollapsed;
    }
  },
  mounted() {
    this.connectionIds.forEach(id => {
      this.fetchUserById(id).then(res => this.connections.push(res))
    });
  },
}
