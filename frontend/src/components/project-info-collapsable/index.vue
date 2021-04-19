<template>
  <div class="project-info-collapsable">

    <div class="project-info-collapsable__header" @click="toggleCollapsed()">
      <font-awesome-icon :icon="collapsed ? ['fas','chevron-circle-down'] : ['fas','chevron-circle-up']" class="icon"></font-awesome-icon>
      <h2>{{project.name}}</h2>
    </div>

    <div v-if="!collapsed" class="project-info-collapsable__content">
      <h2>General Information</h2>
      <div class="project-info-collapsable__content__information">
        <div class="info days-active">
          <h4>Days Active</h4>
          <font-awesome-icon :icon="['fas','clock']" class="icon"></font-awesome-icon>
          <h2 class="info-total">{{getDayCount(project.date_created)}}</h2>
        </div>
        <div class="info tasks">
          <h4>Tasks Complete</h4>
          <font-awesome-icon :icon="['fas','tasks']" class="icon"></font-awesome-icon>
          <h2 class="info-total">{{project.tasks_completed}}</h2>
        </div>
        <div class="info members">
          <h4>Members</h4>
          <font-awesome-icon :icon="['fas','users']" class="icon"></font-awesome-icon>
          <h2 class="info-total">{{project.team_member_ids.length}}</h2>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./project-info-collapsable.js"></script>
<style src="./project-info-collapsable.scss" lang="scss"></style>
