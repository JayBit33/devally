<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="message-notifier" @click="$emit('openMessageBox')">
    <font-awesome-icon :icon="['fas','envelope']" class="message-notifier_icon"></font-awesome-icon>
    <el-badge v-if="haveMessages" :value="numberOfMessages" class="message-notifier_badge" type="danger">
    </el-badge>
  </div>
</template>

<script src="./message-notifier.js" ></script>
<style src="./message-notifier.scss" lang="scss"></style>
