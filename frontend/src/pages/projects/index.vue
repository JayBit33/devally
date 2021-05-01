<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="projects">
    <div v-for="project in projects" :key="project.id" >
      <project-card  :project="project" ></project-card>
    </div>
  </div>
</template>

<script src="./projects.js"></script>
<style src="./projects.scss" lang="scss" scoped></style>
