<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-options-dropdown">
    <ul>
      <router-link :to="{ name: 'Profile', params: { id: userId }}" class="link" ><li @click="$emit('optionSelected')"><font-awesome-icon class="icon accountIcon" :icon="['fas','user']" />Account</li></router-link>
      <router-link to="/projects" class="link" ><li @click="$emit('optionSelected')"><font-awesome-icon class="icon" :icon="['fas','bookmark']" />Projects</li></router-link>
      <router-link to="/" class="link" ><li @click="$emit('optionSelected')"><font-awesome-icon class="icon signoutIcon" :icon="['fas','sign-out-alt']" />Sign Out</li></router-link>
    </ul>
  </div>
</template>

<script src="./user-options-dropdown.js" />
<style src="./user-options-dropdown.scss" lang="scss" scoped />
