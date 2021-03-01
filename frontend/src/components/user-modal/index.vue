<template>
  <div class="user-modal">
    <div class="user-modal__title">
      <h4>{{title}}</h4>
    </div>
    <div class="user-modal__button" @click="$emit('button-click')">
      <font-awesome-icon :icon="btnIcon" class="icon"></font-awesome-icon>
      <h4>{{btnTxt}}</h4>
    </div>

    <div class="user-modal__close" @click="$emit('close-modal')">
      <font-awesome-icon :icon="['fas','times']" class="icon"></font-awesome-icon>
    </div>
  </div>
</template>

<script src="./user-modal.js"></script>
<style src="./user-modal.scss" lang="scss"></style>