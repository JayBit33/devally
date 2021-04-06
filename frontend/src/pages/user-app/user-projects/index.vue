<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-projects">
    <user-modal
      v-if="isUserModalOpen"
      title="Put your project in the spotlight"
      btnTxt="Get Featured"
      :btnIcon="['fas','clipboard-check']"
      :imageName="'spotlight.png'"
      :styles="{'backgroundColor': '#00B6E4', 'color': 'white', 'buttonBackground': '#005399'}"
      @button-click="handleUserModalButton"
      @close-modal="closeModal"
    />
  </div>
</template>

<script src="./user-projects.js"></script>
<style src="./user-projects.scss" lang="scss" scoped></style>
