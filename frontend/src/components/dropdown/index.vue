<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
<div>
  <div class="dropdown" @click="onSelect">
    <select disabled>
      <option>{{ optionTitle }}</option>
    </select>
  </div>
  <div v-if="optionsShowing" class="dropdown_options">
    <ul>
      <li v-for="(item,i) in items" :key="i" >{{ item }}</li>
    </ul>
  </div>
</div>
</template>

<script src="./dropdown.js" />
<style src="./dropdown.scss" lang="scss" scoped />
