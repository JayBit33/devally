<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="learningpath-card">
    <img :src="imageUrl" />
    <h3 class="title">{{ path.title }}</h3>
    <!-- <h4 v-for="(crumb,i) in breadcrumbList" :key="i"><router-link :to="crumb.to" class="crumb">{{ crumb.name }}</router-link><span>></span></h4> -->
  </div>
</template>

<script src="./learningpath-card.js" />
<style src="./learningpath-card.scss" lang="scss" scoped />
