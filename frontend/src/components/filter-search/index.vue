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
      <!-- <dropdown optionTitle="Account Type" :items="['Entrepreneur','Professional']" />
      <dropdown optionTitle="Payment Type" :items="['Shares','Project Fee', 'Hourly']" />
      <dropdown optionTitle="Skills" :items="['Java','Sprint Boot']" />
      <dropdown optionTitle="Rating" :items="['> 3','> 4']" /> -->
      <h5>Payment Type</h5>
      <el-select v-model="hiringOption" placeholder="Hiring Option" class="filters payment-type_filter">
        <el-option
          v-for="item in ['Shares','Flat Rate']"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <h5>Skills Needed</h5>
      <el-select v-model="skills" multiple placeholder="Skills" class="filters skills-filter">
        <el-option
          v-for="item in ['Frontend','Backend', 'UX/UI','Devops', 'Project Manager']"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <h5>Rating</h5>
      <el-select v-model="rating" placeholder="Rating" class="filters rating-filter">
        <el-option
          v-for="item in ['>=1','>=2', '>=3','>=4','>=5']"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <button type="submit" id="apply-filters" @click.stop="applyFilters">Apply Filters</button>
      <el-button class="reset-btn" @click="resetFilters">Reset</el-button>
    </div>
 </div>
</template>

<script src="./filter-search.js" />
<style src="./filter-search.scss" lang="scss" scoped />
