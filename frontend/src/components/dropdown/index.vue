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
  <el-select :value="selectedItems" :multiple="isMultiSelect" placeholder="Select" @change="$emit('item-selection', $event)">
    <el-option
      v-for="item in items"
      :key="item"
      :label="item"
      :value="item"
    >
    </el-option>
  </el-select>
</div>
</template>

<script src="./dropdown.js" />
<style src="./dropdown.scss" lang="scss" scoped />
