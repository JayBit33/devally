// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import ConnectionCard from '@/components/connection-card';
import FilterSearch from '@/components/filter-search';
import PaginationMixin from '../../../mixins/paginationMixin';
import UserModal from '@/components/user-modal';
import { mapActions } from 'vuex'

export default {
  name: 'UserConnection',
  props: ['connectionIds'],
  data() {
    return {
      connections: [],
      isUserModalOpen: true
    }
  },
  components: {
    ConnectionCard,
    FilterSearch,
    UserModal
  },
  mixins: [PaginationMixin],
  computed: {
    connectionsShown() {
      return this.connections ? this.connections.slice(this.startIdx, this.endIdx) : [];
    }
  },
  methods: {
    ...mapActions(['fetchUserById']),
    closeModal() {
      this.isUserModalOpen = false
    },
    handleUserModalButton() {
      this.$router.push({name: 'Devs'})
    }
  },
  created() {
    this.connectionIds.forEach(id => { console.log('this id', id); this.fetchUserById(id).then(res => this.connections.push(res))});
  },
}
