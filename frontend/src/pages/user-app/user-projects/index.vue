<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-projects">
    <h1 class="title">User Projects</h1>
    <user-modal
      v-if="isUserModalOpen"
      title="Want to find new projects?"
      btnTxt="Search here..."
      :btnIcon="['fas','search']"
      @button-click="handleUserModalButton"
      @close-modal="closeModal"
    />
  </div>
</template>

<script src="./user-projects.js"></script>
<style src="./user-projects.scss" lang="scss" scoped></style>
