<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="main" :style="{'background-image': 'url(' + require('@/assets/devs_bg.png') + ')'}">
    <filter-search class="filter" @applyFilters="updateUsersShown" @reset="updateDisplayedUsers(1)" />
    <div class="dev-profiles"  v-loading.fullscreen.lock="isLoading" >
      <profile-bio v-for="user in usersShown" :key="user.id" :user="user" class="profile" ></profile-bio>
      <el-pagination
          v-if="!isLoading"
          id="pagination"
          background
          layout="prev, pager, next"
          :pageSize="pageSize"
          :total="users ? users.length : 0"
          @current-change="updateDisplayedUsers"
        >
        </el-pagination>
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
      isLoading: true,
      pageSize: 5,
      currentPageIdx: 1,
      startIdx: 0,
      endIdx: 5,
      filters: null
    }
  },
  components: {
    FilterSearch,
    ProfileBio
  },
  computed: {
    ...mapGetters(['getDevUsers']),
    users() {
      if (!this.filters) {
        return this.getDevUsers;
      } else {
        return this.getDevUsers.filter(user =>
          user.hiring_options.some(option => this.filters.hiringOption.includes(option)) &&
          user.skills.some(skill => this.filters.skills.includes(skill))  &&
          Number(user.rating) >= Number(this.filters.rating.split('')[2]));
      }
    },
    usersShown() {
      return this.users ? this.users.slice(this.startIdx, this.endIdx) : [];
    }
  },
  created() {
    this.fetchDevUsers()
  },
  methods: {
    ...mapActions(['fetchDevUsers']),
    updateDisplayedUsers(page) {
      if (page === 1) {
        this.startIdx = 0;
        this.currentPageIdx = 1
      } else {
        this.startIdx = (page * this.pageSize) - this.pageSize;
        this.currentPageIdx = page
      }
      this.endIdx = this.pageSize * page;
      window.scrollTo(0,0);
    },
    updateUsersShown(filters) {
      this.filters = filters;
      // Make sure to add all possible values for hiringOptin, skills & rating when they are null
      if (this.filters.hiringOption === null) { this.filters.hiringOption = ['Shares','Flat Rate'] }
      if (!filters.skills.length) { this.filters.skills = ['Frontend','Backend','UX/UI']; }
      if (this.filters.rating === null) { this.filters.rating = '>=1'; }
      this.updateDisplayedUsers(1); // send pagination back to page 1 on filter
    },
  },
  watch: {
    users() {
      if (this.users && this.users.length > 0) this.isLoading = false;
    }
  }
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
  .dev-profiles {
    margin: 4rem  auto;
  }
  #pagination {
    float: right;
    margin-right: 2rem;
  }


</style>
