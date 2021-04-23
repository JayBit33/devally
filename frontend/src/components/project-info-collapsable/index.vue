<template>
  <div class="project-info-collapsable">

    <div class="project-info-collapsable__header" @click="toggleCollapsed()">
      <font-awesome-icon :icon="collapsed ? ['fas','chevron-circle-down'] : ['fas','chevron-circle-up']" class="icon"></font-awesome-icon>
      <h2>{{project.name}}</h2>
    </div>

    <div v-if="!collapsed" class="project-info-collapsable__content">
      <project-general-info :project="project" />
    </div>

  </div>
</template>

<script src="./project-info-collapsable.js"></script>
<style src="./project-info-collapsable.scss" lang="scss"></style>
