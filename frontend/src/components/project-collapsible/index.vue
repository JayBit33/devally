<template>
  <div class="project-collapsible">
    <div class="project-collabsable_header">
      <font-awesome-icon :icon="collapsed ? ['fas','chevron-circle-down'] : ['fas','chevron-circle-up']" class="icon"></font-awesome-icon>
      <h2>DevAlly</h2>
    </div>
    <div class="project-collapsible_sections">
      <div class="general-info_section">
        <h2>General Info</h2>
      </div>
      <div class="current-tasks_section">
        <h2>Current Tasks</h2>
        <div class="current-tasks">
          <div class="task" v-for="task in user.tasks" :key="task.message">
            <font-awesome-icon :icon="['fas','tasks']" class="task-icon"></font-awesome-icon>
            <h2>{{task.message}}</h2>
          </div>
          <p class="expand-section" @click="updateView('tasks')">See More Tasks</p>
        </div>
      </div>
      <div class="members_section">
        <h2>Team Members</h2>
      </div>

    </div>
  </div>
</template>

<script src="./project-collapsible.js" />
<style lang="scss" src="./project-collapsible.scss" />
