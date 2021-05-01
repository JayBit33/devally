<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="project-collapsible">
    <div class="project-collapsible_header" @click="toggleCollapsed">
      <div class="project-collapsible_header_left">
        <font-awesome-icon :icon="collapsed ? ['fas','chevron-circle-down'] : ['fas','chevron-circle-up']" class="icon"></font-awesome-icon>
        <h2>{{project.name}}</h2>
      </div>
      <div class="project-collapsible_header_right">
        <font-awesome-icon v-if="isEditable" @click.stop="$emit('edit-project', project)" :icon="['fas','ellipsis-h']" class="icon ellipse-icon"></font-awesome-icon>
      </div>
    </div>
    <div v-if="!collapsed" class="project-collapsible_sections">
      <div class="general-info_section">
        <project-general-info :project="project" :extraInformation="true" />
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
        <connection-card-carousel class="members" :connections="teamMembers" :numberOfCardsDisplayed="2" :hasDeleteIcon="project.creator_id == getLoggedInUser.id" @delete-click="removeTeamMember" />
        <h2 class='tofill-heading'>Positions To Fill</h2>
        <connection-card-carousel class="members" :connections="teamMembers" :numberOfCardsDisplayed="2" :hasDeleteIcon="project.creator_id == getLoggedInUser.id" @delete-click="removeTeamMember" />
      </div>

    </div>
  </div>
</template>

<script src="./project-collapsible.js" />
<style lang="scss" src="./project-collapsible.scss" />
