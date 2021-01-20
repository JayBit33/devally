<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
<div>
  <!-- <div class="dropdown" :class="{ selected: isSet }" @click="onSelect" > -->
    <!-- <select disabled >
      <option disabled>{{ selectedOption }}</option>
    </select>
  </div>
  <div v-if="optionsShowing" class="dropdown_options">
    <ul>
      <li v-for="(item,i) in items" :key="i" @click="onItemSelection">{{ item }}</li>
    </ul>
  </div> -->
  <el-select v-model="value" placeholder="Select">
    <el-option
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>
</template>

<script src="./dropdown.js" />
<style src="./dropdown.scss" lang="scss" scoped />
