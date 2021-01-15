<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="filter-search">
    <font-awesome-icon :icon="['fas','filter']" class="filter-search_filter" @click="toggleFilterOptions" />
    <div class="filter-search_search">
      <font-awesome-icon :icon="['fas','search']" class="filter-search_search-icon" />
      <input type="search" class="filter-search_search-input" :placeholder="placeholderText" />
    </div>
    <br>
    <div v-if="isFilterVisible" class="filter-search_filterOptions" >
      <dropdown optionTitle="Account Type" :items="['Entrepreneur','Professional']" />
      <dropdown optionTitle="Payment Type" :items="['Entrepreneur','Professional']" />
      <dropdown optionTitle="Skills" :items="['Entrepreneur','Professional']" />
      <dropdown optionTitle="Rating" :items="['Entrepreneur','Professional']" />
    </div>
 </div>
</template>

<script src="./filter-search.js" />
<style src="./filter-search.scss" lang="scss" scoped />
