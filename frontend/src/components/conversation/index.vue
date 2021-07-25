<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="conversation">
    <div class="conversation-header-outer"><h2>Message History</h2></div>
    <div class="conversation-header">
      <img :src="avatar" class="profile-img" />
      <span>
        <span v-if="isOnline" class="is-online">online</span>
        <span v-else class="is-offline">offline</span>
        <h3>{{recipient.name}}</h3>
      </span>
    </div>
    <div class="conversation-text">
      <p v-for="msg in reversedConversation" :key="msg.id" class="conversation-content_text">{{msg.text}}</p>
    </div>
    <div class="conversation-footer">
      <font-awesome-icon :icon="['fas', 'paperclip']" class="icons" ></font-awesome-icon>
      <font-awesome-icon :icon="['fas', 'camera']" class="icons"></font-awesome-icon>
      <textarea class="write-message" rows="2" />
      <font-awesome-icon :icon="['fas', 'paper-plane']" class="icons"></font-awesome-icon>
    </div>
  </div>
</template>

<script src="./conversation.js" ></script>
<style src="./conversation.scss" lang="scss" scoped></style>
