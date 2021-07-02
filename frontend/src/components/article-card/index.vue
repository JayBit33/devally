<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="article-card">
    <img :src="imageUrl" />
    <div class="article-card_details">
      <p class="created">{{ articleDate }}</p>
      <p class="category">{{ article.categories[0].name }}</p>
    </div>
    <h3 class="title">{{ article.title }}</h3>
    <p class="article-preview">{{ article.article_preview }}</p>
    <!-- <h4 v-for="(crumb,i) in breadcrumbList" :key="i"><router-link :to="crumb.to" class="crumb">{{ crumb.name }}</router-link><span>></span></h4> -->
  </div>
</template>

<script src="./article-card.js" />
<style src="./article-card.scss" lang="scss" scoped />
