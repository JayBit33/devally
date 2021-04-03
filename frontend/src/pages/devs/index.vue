<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="main">
    <!-- <div class="background-overlay_pic" :style="{'background-image': 'url(' + require('@/assets/devs_bg.png') + ')'}"></div> -->
    <div class="background-overlay_color"></div>

    <filter-search class="filter" @applyFilters="updateUsersShown" @reset="showRefresh()" @search-input="searchInputChange" />
    <div class="dev-profiles"  v-loading.fullscreen.lock="isLoading" >
      <div class="profiles">
        <div v-if="refreshUsers" class="loading-users">
          <font-awesome-icon spin :icon="['fas', 'spinner']" />
        </div>
        <div v-else-if="usersShown.length === 0" class="no-users">
          <h2>No users available</h2>
          <font-awesome-icon class="icon" :icon="['fas', 'frown']" />
        </div>
        <div v-else class="users">
          <profile-bio v-for="user in usersShown" :key="user.id" :user="user" class="profile" ></profile-bio>
        </div>
      </div>
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
