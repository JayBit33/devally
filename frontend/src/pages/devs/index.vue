<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="main">
    <!-- <div class="background-overlay_pic" :style="{'background-image': 'url(' + require('@/assets/devs_bg.png') + ')'}"></div> -->
    <div class="background-overlay_color"></div>

    <filter-search class="filter" @applyFilters="updateUsersShown" @reset="updateDisplayedUsers(1)" @search-input="searchInputChange" />
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

<script src="./devs.js"></script>
<style src="./devs.scss" lang="scss" scoped></style>
