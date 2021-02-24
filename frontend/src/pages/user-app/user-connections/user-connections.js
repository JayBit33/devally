// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import ConnectionCard from '@/components/connection-card';
import FilterSearch from '@/components/filter-search';
import { mapActions } from 'vuex'

export default {
  name: 'UserConnection',
  props: ['connectionIds'],
  data() {
    return {
      connections: [],
    }
  },
  components: {
    ConnectionCard,
    FilterSearch,
  },
  methods: {
    ...mapActions(['fetchUserById']),
  },
  created() {
    this.connectionIds.forEach(id => { console.log('this id', id); this.fetchUserById(id).then(res => this.connections.push(res))});
  },
}
