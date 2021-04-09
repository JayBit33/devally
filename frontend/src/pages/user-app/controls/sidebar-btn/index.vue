<template>
  <div class="sidebar-btn">
    <button class="sidebar-btn_button" @click="$emit('clicked')">{{ displayText }}</button>
  </div>
</template>

<script src="./sidebar-btn.js" />
<style src="./sidebar-btn.scss" lang="scss" scoped />
