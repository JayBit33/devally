<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="connection-card">
    <font-awesome-icon @click="$emit('delete-click')" :icon="['fas','trash']" class="delete-icon"></font-awesome-icon>
    <img class="connection-card-avatar" :src="getImage(connection.profile_image)" />
    <h4 class="connection-card-fullname">{{ fullName }}</h4>
    <h5 class="connection-card-accountType">{{ accountType }}</h5>
    <ul class="roles" v-if="this.connection.user_type_id === '1'">
      <li v-for="(role,i) in roles" :key="i">{{role}}</li>
    </ul>
    <div class="actions">
      <div class="msg-container btn">
        <h4>Message</h4>
        <font-awesome-icon :icon="['fas','envelope']" class="msg-icon"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script src="./connection-card.js"></script>
<style src="./connection-card.scss" lang="scss" scoped></style>
