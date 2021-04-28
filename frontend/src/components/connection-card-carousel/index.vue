<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="connection-card-carousel">
     <font-awesome-icon :icon="['fas','arrow-alt-circle-left']" class="arrow-icon" @click="goLeft"/>
     <div class="connections">
      <connection-card
        v-for="connection in connectionsShown"
        :class="{'movingRight': movingRight, 'movingLeft': movingLeft}"
        :connection="connection"
        :key="connection.id"
        @delete-click="$emit('delete-click', connection)"
      />
    </div>
    <font-awesome-icon :icon="['fas','arrow-alt-circle-right']" class="arrow-icon" @click="goRight"/>
  </div>
</template>

<script src="./connection-card-carousel.js"></script>
<style src="./connection-card-carousel.scss" lang="scss" scoped></style>
