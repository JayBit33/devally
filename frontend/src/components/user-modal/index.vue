<template>
  <div class="user-modal" :style="styles ? {'background-color': styles.backgroundColor, 'color': styles.color} : {}">

    <div class="user-modal__text">
      <div class="user-modal__title">
        <h4>{{title}}</h4>
      </div>

      <div class="user-modal__button" :style="styles ? {'background-color': styles.buttonBackground} : {}" @click="$emit('button-click')">
        <font-awesome-icon :icon="btnIcon" class="icon"></font-awesome-icon>
        <h4>{{btnTxt}}</h4>
      </div>
    </div>

    <img v-if="imageName" class="user-modal__image" :src="getImage(imageName)" alt="image">

    <div class="user-modal__close" @click="$emit('close-modal')">
      <font-awesome-icon :icon="['fas','times']" class="icon"></font-awesome-icon>
    </div>
  </div>
</template>

<script src="./user-modal.js"></script>
<style src="./user-modal.scss" lang="scss"></style>