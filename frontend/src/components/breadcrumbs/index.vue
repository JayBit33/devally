<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="breadcrumbs">
    <h4 v-for="(crumb,i) in breadcrumbList" :key="i"><router-link :to="crumb.to" class="crumb">{{ crumb.name }}</router-link><span>/</span></h4>
  </div>
</template>

<script src="./breadcrumbs.js" />
<style src="./breadcrumbs.scss" lang="scss" scoped />
