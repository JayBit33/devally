<template>
  <div class="rate-user-modal">
    
    <div class="rate-user-modal_close" @click="$emit('rate-modal-close')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>

    <div class="rate-user-modal_heading">
      <h4 class="rate-user-modal_heading_rate">Rate User</h4>
      <h4 class="rate-user-modal_heading_name">{{user.firstname}} {{user.lastname}}</h4>
    </div>

    <div class="rate-user-modal_stars">
      <div v-for="i in 5" :key="'star-' + i" class="star" :class="{'star-s': i == 1 || i == 5, 'star-m': i == 2 || i == 4, 'star-b': i == 3,}">
        <font-awesome-icon v-if="rating >= i" :icon="['fas', 'star']" @click="setRating(i)" />
        <font-awesome-icon v-else :icon="['far', 'star']" @click="setRating(i)" />
      </div>
    </div>

    <div class="rate-user-modal_buttons">
      <button class="report-button-send" @click="sendRate">Send Rating</button>
      <button class="report-button-cancel" @click="$emit('rate-modal-close')">Cancel</button>
    </div>

  </div>
</template>

<script src="./rate-user-modal.js"></script>
<style src="./rate-user-modal.scss" lang="scss"></style>