<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div ref="user_options_dropdown" class="user-options-dropdown">
    <div class="user-options-dropdown_arrow"></div>
    <div class="user-options-dropdown_links">
      <div v-for="link in links" :key="link.name" class="user-options-dropdown_links_link" @click="redirect(link)">
        <font-awesome-icon class="icon" :icon="['fas', link.iconClass]" />
        <p>{{link.text}}</p>
      </div>
    </div>

  </div>
</template>

<script src="./user-options-dropdown.js" />
<style src="./user-options-dropdown.scss" lang="scss" scoped />
