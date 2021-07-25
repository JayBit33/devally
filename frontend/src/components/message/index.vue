<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="message" :class="{active: isSelected}" @click="isSelected = true">
    <div class="message-header">
      <img :src="avatar" class="profile-img" />
      <span v-if="isOnline" class="is-online">online</span>
      <span v-if="!isOnline" class="is-offline">offline</span>
    </div>
    <div class="message-content">
      <div class="message-content_namedate">
        <h4>{{ recipientName }}</h4>
        <p>{{ (new Date(message.lastMessage.sentAt)).toLocaleTimeString() }}</p>
      </div>
      <p class="message-content_text">{{ message.lastMessage.text }} </p>
    </div>
  </div>
</template>

<script src="./message.js" ></script>
<style src="./message.scss" lang="scss" scoped></style>
