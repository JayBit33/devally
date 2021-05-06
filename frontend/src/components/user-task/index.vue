<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-task" ref="user_task_container">
    <div class="user-task_background-overlay" :style="{'background-image': `url(${getImage('bg1.jpg')})`}"></div>

    <div class="user-task_project user-task_container">

      <div v-if="!isNewTask" class="user-task_container_message">
        <h6 >{{task.message}} </h6>
      </div>
      <div v-else-if="isNewTask" class="user-task_container-input">
        <input ref="user_task_container_input" type="text" placeholder="New task..." v-model="newTaskMessage">
      </div>

      <div class="user-task_container_buttons">
        <div v-if="!isNewTask" class="user-task_container_button button-accept" @click.stop="taskComplete">Complete</div>
        <div v-if="!isNewTask" class="user-task_container_button button-deny" @click.stop="taskDelete">Remove</div>

        <div v-if="isNewTask" class="user-task_container_button button-accept" @click.stop="$emit('new-task-save', newTaskMessage)">Save</div>
        <div v-if="isNewTask" class="user-task_container_button button-deny" @click.stop="$emit('new-task-cancel')">Cancel</div>
      </div>
    </div>

  </div>
</template>

<script src="./user-task.js"></script>
<style src="./user-task.scss" lang="scss"></style>
