<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="connection-card" :class="{'minimized': isMinimized, 'isChecked': isChecked}" @click="$emit('check-click')">
    <font-awesome-icon v-if="!isMinimized && hasDeleteIcon && getLoggedInUser.id != connection.id" @click="$emit('delete-click')" :icon="['fas','trash']" class="delete-icon"></font-awesome-icon>
    <font-awesome-icon v-if="isMinimized" @click.stop="$emit('check-click')" :icon="isChecked ? ['fas','check-square'] : ['far','square']" class="check-icon"></font-awesome-icon>
    <div v-if="isMinimized" class="connection-card-overlay" :class="{'hidden': isChecked}"></div>
    <img  v-if="!isPositionToFill" class="connection-card-avatar" :src="getImage(connection.profile_image)" />
    <div  v-if="isPositionToFill" class="connection-card-position-to-fill"  >
      <font-awesome-icon :icon="['fas', 'user-alt']" class="user-avatar"></font-awesome-icon>
    </div>
    <h4 class="connection-card-fullname">{{ !isPositionToFill ? fullName : connection }}</h4>
    <h5 class="connection-card-accountType">{{ !isPositionToFill ? accountType : 'developer' }}</h5>
    <!-- <ul class="roles" v-if="this.connection.user_type_id === '1'">
      <li v-for="(role,i) in roles" :key="i">{{role}}</li>
    </ul> -->
    <div v-if="!isMinimized" class="actions">
      <div class="msg-container btn" @click="handleCardBtnClick">
        <h4 v-if="!isPositionToFill">Message</h4>
        <h4 v-else>Search</h4>
        <font-awesome-icon v-if="!isPositionToFill" :icon="['far','envelope']" class="msg-icon"></font-awesome-icon>
        <font-awesome-icon v-if="isPositionToFill" :icon="['fas','search']" class="msg-icon"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script src="./connection-card.js"></script>
<style src="./connection-card.scss" lang="scss" scoped></style>
