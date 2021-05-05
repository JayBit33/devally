<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-task">
    <div class="user-task_background-overlay" :style="{'background-image': `url(${getImage('bg1.jpg')})`}"></div>

    <div class="user-task_project user-task_container">

      <div class="user-task_container_message">
        <h6 >{{task.message}} </h6>
      </div>

      <div class="user-task_container_received">
        <div class="user-task_container_button button-accept" @click.stop="taskComplete">Complete</div>
        <div class="user-task_container_button button-deny" @click.stop="taskDelete">Remove</div>
      </div>
    </div>

  </div>
</template>

<script src="./user-task.js"></script>
<style src="./user-task.scss" lang="scss"></style>
