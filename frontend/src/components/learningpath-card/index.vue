<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="learningpath-card">
    <img :src="imageUrl" />
    <router-link :to="{ name: 'LearningPath', params: { id: path.id }}" class="link" ><h3 class="title">{{ path.title }}</h3></router-link>
  </div>
</template>

<script src="./learningpath-card.js" />
<style src="./learningpath-card.scss" lang="scss" scoped />
