<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="message" :class="{active: isActive}">
    <div class="message-header">
      <img src="http://localhost:3000/uploads/profile3.jpg" class="profile-img" />
      <span v-if="isOnline" class="is-online">online</span>
      <span v-if="!isOnline" class="is-offline">offline</span>
    </div>
    <div class="message-content">
      <div class="message-content_namedate">
        <h4>Cindy Summers</h4>
        <p>Feb 3, 10:12pm</p>
      </div>
      <p class="message-content_text">Hey, be interested in joining your team. 3 years as a UI/UX designer.</p>
    </div>
  </div>
</template>

<script src="./message.js" ></script>
<style src="./message.scss" lang="scss"></style>
