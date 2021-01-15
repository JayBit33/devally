<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="main" :style="{'background-image': 'url(' + require('@/assets/devs_bg.png') + ')'}">
    <filter-search class="filter" />
    <div v-for="user in users" :key="user.id" >
      <profile-bio :user="user" class="profile"></profile-bio>
    </div>
  </div>
</template>

<script>
import ProfileBio from '../components/profile-bio/';
import FilterSearch from '../components/filter-search/';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Devs",
  data() {
    return {
      users: null
    }
  },
  components: {
    FilterSearch,
    ProfileBio
  },
  computed: {
    ...mapGetters(['getUsers']),
  },
  created() {
    this.fetchUsers()
    this.users = this.getUsers;
  },
  methods: {
    ...mapActions(['fetchUsers'])
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

  .main {
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  // background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  }
  .filter {
  }
  .profile {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }

</style>
