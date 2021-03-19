<template>
  <div class="toast-container">
    <div class="toast" :class="type">
      <font-awesome-icon v-if="type == 'success'" class="toast-icon" :icon="['fas','check-circle']" />
      <font-awesome-icon v-else-if="type == 'error'" class="toast-icon" :icon="['fas','times-circle']" />
      <font-awesome-icon v-else-if="type == 'info'" class="toast-icon" :icon="['fas','info-circle']" />
      <font-awesome-icon v-else-if="type == 'warning'" class="toast-icon" :icon="['fas','info-circle']" />

      <div class="toast-message">
        <h6 class="toast-message-title">{{type}}!</h6>
        <span v-for="item in message" :key="item.text" :class="{'toast-message-emphasis': item.emphasis}">{{item.text}} </span>
      </div>

      <font-awesome-icon class="toast-close" :icon="['fas','times']" @click="$emit('toast-close')" />

      <div class="toast-action" v-if="hasAction" @click="$emit('toast-action-click')">
        <font-awesome-icon class="toast-action-icon" :icon="['fas','mouse-pointer']" />
      </div>

      <div class="toast-countdown-slider" :style="{width: `${slider}%`}"></div>
    </div>
  </div>
</template>

<script src="./toast.js"></script>
<style src="./toast.scss" lang="scss"></style>