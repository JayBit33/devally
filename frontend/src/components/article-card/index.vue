<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="article-card">
      <img :src="imageUrl" />
      <div class="article-card_details">
        <p class="created">{{ articleDate }}</p>
        <p class="category">{{ article.categories[0].name }}</p>
      </div>
      <router-link :to="{ name: 'Article', params: { id: article.id }}" class="link" ><h3 class="title">{{ article.title }}</h3>    </router-link>
      <p class="article-preview">{{ article.article_preview }}</p>
  </div>
</template>

<script src="./article-card.js" />
<style src="./article-card.scss" lang="scss" scoped />
