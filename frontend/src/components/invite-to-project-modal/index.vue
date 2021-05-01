<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="invite-to-project-modal" ref="invite_to_project_modal">

    <div class="invite-to-project-modal_close" @click="$emit('modal-close')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>

    <div class="invite-to-project-modal_heading">
      <h4 class="invite-to-project-modal_heading_rate">Invite to project</h4>
      <h4 class="invite-to-project-modal_heading_name">{{user.firstname}} {{user.lastname}}</h4>
    </div>

    <div v-if="projects.length > 0" class="invite-to-project-modal_projects">
      <h2>Which project? <span>*</span></h2>
      <dropdown
        class="project-dropdown"
        :items="projects.map(p => p.name)"
        :selectedItems="selectedProject"
        @item-selection="selectedProject = $event"
      >
      </dropdown>
    </div>
    <div v-else-if="projects.length == 0" class="invite-to-project-modal_no-projects">
      <font-awesome-icon class="no-projects-icon" :icon="['far', 'frown']" />
      <h2>You have no projects to invite a user to</h2>
    </div>

    <div v-if="projects.length > 0" class="invite-to-project-modal_buttons">
      <button class="invite-button-send" @click="sendInvitation">Send Invitation</button>
      <button class="invite-button-cancel" @click="$emit('modal-close')">Cancel</button>
    </div>
    <div v-else-if="projects.length == 0" class="invite-to-project-modal_no-projects-buttons">
      <button class="invite-button-send" @click="createProject">Create a project</button>
      <button class="invite-button-cancel" @click="$emit('modal-close')">Close</button>
    </div>

  </div>
</template>

<script src="./invite-to-project-modal.js"></script>
<style src="./invite-to-project-modal.scss" lang="scss"></style>
