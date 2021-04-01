<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="filter-search">
    <div class="filter-search_search">
      <font-awesome-icon :icon="['fas','filter']" class="filter-search_search-filter" :class="{'active': isFilterVisible}" @click="toggleFilterOptions" />
      <font-awesome-icon :icon="['fas','search']" class="filter-search_search-search"  @click="$refs.devSearchInput.focus()"/>
      <input v-model="inputText" @keyup="$emit('search-input', inputText)" class="filter-search_search-input" ref="devSearchInput" :placeholder="placeholderText" />
    </div>
    <br>
    <div v-if="isFilterVisible" class="filter-search_filterOptions" >
      <!-- <dropdown optionTitle="Account Type" :items="['Entrepreneur','Professional']" />
      <dropdown optionTitle="Payment Type" :items="['Shares','Project Fee', 'Hourly']" />
      <dropdown optionTitle="Skills" :items="['Java','Sprint Boot']" />
      <dropdown optionTitle="Rating" :items="['> 3','> 4']" /> -->
      <div class="filter-search_filterOptions_dropdowns">
        <dropdown
          class="filters payment-type_filter"
          :items="allHiringOption"
          :isMultiSelect="false"
          :optionTitle="'Payment Type'"
          :selectedItems="hiringOption"
          @item-selection="hiringOption = $event"
        >
        </dropdown>
        <dropdown
          class="filters skills_filter"
          :collapsedTags="true"
          :items="allSkills"
          :isMultiSelect="true"
          :optionTitle="'Skills'"
          :selectedItems="skills"
          @item-selection="skills = $event"
        >
        </dropdown>
        <dropdown
          class="filters rating_filter"
          :items="allRating"
          :isMultiSelect="false"
          :optionTitle="'Rating'"
          :selectedItems="rating"
          @item-selection="rating = $event"
        >
        </dropdown>
      </div>
      <div class="filter-search_filterOptions_buttons">
        <button id="apply-filters" @click.stop="applyFilters">Apply</button>
        <button class="reset-btn" @click="resetFilters">Clear</button>
      </div>
    </div>
 </div>
</template>

<script src="./filter-search.js" />
<style src="./filter-search.scss" lang="scss" scoped/>
