<template>
  <div class="main">
      <profile-bio class="profile" ></profile-bio>
      <profile-bio class="profile"></profile-bio>
      <profile-bio class="profile"></profile-bio>
      <profile-bio class="profile"></profile-bio>
  </div>
</template>

<script>
import ProfileBio from '../components/profile-bio';
export default {
  name: "Devs",
  props: {},
  data() {
  },
  components: {
    ProfileBio
  },
  methods: {

  }

};
</script>

<style lang="scss" scoped>
  .main {
    overflow: hidden;
  }
  .profile {
    margin-top: 4rem;
  }

</style>
