<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="message" :class="{active: isOnline}">
    <div class="message-header">
      <img src="http://localhost:3000/uploads/profile3.jpg" class="profile-img" />
      <span v-if="isOnline" class="is-online">online</span>
      <span v-if="!isOnline" class="is-offline">offline</span>
    </div>
    <div class="message-content">
      <div class="message-content_namedate">
        <h4>{{ message.sender.name }}</h4>
        <p>{{ (new Date(message.sentAt)).toLocaleTimeString() }}</p>
      </div>
      <p class="message-content_text">{{ message.text }} </p>
    </div>
  </div>
</template>

<script src="./message.js" ></script>
<style src="./message.scss" lang="scss" scoped></style>
