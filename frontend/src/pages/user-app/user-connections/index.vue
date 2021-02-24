<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-connections">
    <font-awesome-icon :icon="['fas','user-friends']" class="icon"></font-awesome-icon>
    <h1 class="title">User Connections</h1>
    <!-- <filter-search /> -->
    <div class="connections">
      <connection-card v-for="connection in connections" :connection="connection" :key="connection.id" />
    </div>
  </div>
</template>

<script src="./user-connections.js"></script>
<style src="./user-connections.scss" lang="scss" scoped></style>
