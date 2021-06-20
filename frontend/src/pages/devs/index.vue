<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="main">
    <div class="background-overlay_pic" :style="{'background-image': 'url(' + require('@/assets/devs_bg.png') + ')'}"></div>
    <!-- <div class="background-overlay_color"></div> -->
    <div class="home-banner">
      <div class="col-1">
        <h1>Build A Team And</h1>
        <h1>Make Your Tech Idea A Reality</h1>
        <h4>Community of developers looking to join a team</h4>
        <h4>and build the next best thing since Jarvis.</h4>
        <button class="btn">
          <router-link to="/devs" class="link">Get Started</router-link>
        </button>
      </div>
      <div class="col-2">
        <img src="images/3593965.jpg" />
      </div>
    </div>

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
          @current-change="updateItemsDisplayed"
        >
        </el-pagination>
    </div>
  </div>
</template>

<script src="./devs.js"></script>
<style src="./devs.scss" lang="scss" scoped></style>
