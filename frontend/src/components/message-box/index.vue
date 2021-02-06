<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="message-box">
    <font-awesome-icon :icon="['fas','times']" class="message-box_closeBtn" />
    <textarea type="text" v-model="messageText" class="message-box_textarea" />
    <button class="message-box_sendMsgBtn" @click="$emit('messageSent',messageText)">Send</button>
  </div>
</template>

<script src="./message-box.js" ></script>
<style src="./message-box.scss" lang="scss"></style>
