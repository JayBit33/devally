<template>
<div class="pagination">
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
</template>

<script src="./pagination.js" />
<style src="./pagination.scss" lang="scss" scoped />
