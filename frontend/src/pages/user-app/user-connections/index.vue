<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-connections">
    <ul class="nav">
      <div class="home-link">
        <router-link to="/" class="link" >
          <li>
            <font-awesome-icon :icon="['fas','home']" class="nav-icon"></font-awesome-icon>
            <span>Site Home</span>
          </li>
        </router-link>
      </div>
      <div class="sign-out-link">
        <li @click="$emit('optionSelected', 'signout')">
          <font-awesome-icon :icon="['fas','power-off']" class="nav-icon"></font-awesome-icon>
          <span>Sign Out</span>
        </li>
      </div>
    </ul>
    <font-awesome-icon :icon="['fas','user-friends']" class="icon"></font-awesome-icon>
    <h1 class="title">User Connections</h1>
    <user-modal
      v-if="isUserModalOpen"
      title="Want to add more connections?"
      btnTxt="Find people..."
      :btnIcon="['fas','user-friends']"
      @button-click="handleUserModalButton"
      @close-modal="closeModal"
    />
    <!-- <filter-search  style="position: relative; left: 615px; top: -1px;" /> -->
    <div class="connections">
      <connection-card v-for="connection in connections" :connection="connection" :key="connection.id" />
    </div>
  </div>
</template>

<script src="./user-connections.js"></script>
<style src="./user-connections.scss" lang="scss" scoped></style>
