<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="connection-card-carousel">
     <font-awesome-icon :icon="['fas','arrow-alt-circle-left']" class="arrow-icon" />
     <div class="connections">
      <connection-card v-for="connection in connectionsShown" :connection="connection" :key="connection.id" @delete-click="removeConnection(connection)" />
    </div>
    <font-awesome-icon :icon="['fas','arrow-alt-circle-right']" class="arrow-icon" />
  </div>
</template>

<script src="./connection-card-carousel.js"></script>
<style src="./connection-card-carousel.scss" lang="scss" scoped></style>
