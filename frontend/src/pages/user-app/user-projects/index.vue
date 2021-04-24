<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-projects">
    <user-modal
      v-if="isUserModalOpen"
      title="Get Your Idea In The Spotlight"
      btnTxt="Get Featured"
      :btnIcon="['fas','clipboard-check']"
      :imageName="'spotlight.png'"
      :styles="{'backgroundColor': '#00B6E4', 'color': 'white', 'buttonBackground': '#005399'}"
      @button-click="handleUserModalButton"
      @close-modal="closeModal"
    />

    <div class="projects-header">
      <h2>Active Projects</h2>
      <font-awesome-icon class="add-icon" :icon="['fas','plus-square']" @click="$emit('create-project')"></font-awesome-icon>
    </div>

    <div class="projects-container">
      <project-collapsible class="projects-container_project" v-for="project in projects" :key="project.id" :project="project" @edit-project="$emit('edit-project', $event)" />
    </div>
  </div>
</template>

<script src="./user-projects.js"></script>
<style src="./user-projects.scss" lang="scss" scoped></style>
