<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="main" :style="{'background-image': 'url(' + require('@/assets/devs_bg.png') + ')'}">
    <div v-for="user in users" :key="user.id" >
      <profile-bio :user="user" class="profile"></profile-bio>
    </div>
  </div>
</template>

<script>
import ProfileBio from '../components/profile-bio/';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Devs",
  data() {
    return {
      users: null
    }
  },
  components: {
    ProfileBio
  },
  async created() {
   await this.fetchUsers()
   this.users = this.getUsers;
  },
  methods: {
    ...mapActions(['fetchUsers'])
  },
  computed: {
    ...mapGetters(['getUsers']),
  }

};
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

  .main {
    overflow: hidden;
    height: 100%;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  // background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  }
  .profile {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }

</style>
