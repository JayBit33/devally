<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="connection-card-carousel">

    <div class="arrows">
      <font-awesome-icon :icon="['fas','arrow-alt-circle-left']" class="arrow-icon" @click="goLeft"/>
      <font-awesome-icon :icon="['fas','arrow-alt-circle-right']" class="arrow-icon" @click="goRight"/>
    </div>

    <div class="connections">
      <connection-card
        v-for="connection in connectionsShown"
        :class="{'movingRight': movingRight, 'movingLeft': movingLeft}"
        :connection="connection"
        :key="connection.id"
        :hasDeleteIcon="hasDeleteIcon"
        @delete-click="$emit('delete-click', connection)"
      />
    </div>
  </div>
</template>

<script src="./connection-card-carousel.js"></script>
<style src="./connection-card-carousel.scss" lang="scss" scoped></style>
