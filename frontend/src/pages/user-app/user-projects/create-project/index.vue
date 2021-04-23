<template>
  <div class="create-project">
    <div class="create-project_content">
      <div class="create-project_content_icon">
        <font-awesome-icon :icon="['fas','file-alt']" class="view-icon"></font-awesome-icon>
      </div>

      <div class="create-project_content-grid">

        <div class="fields fields_left">
          <div class="field name">
            <label for="name">Name</label>
            <input class="field_input" type="text" name="name" v-model="project_name" />
          </div>
          <div class="field description">
            <label for="description">Description</label>
            <textarea name="description" cols="30" rows="10" v-model="project_description"></textarea>
          </div>
          <div class="field regions">
            <h3>Viewable Regions</h3>
            <dropdown
              class="field_dropdown regions-dropdown"
              :items="allRegions"
              :isMultiSelect="true"
              :selectedItems="selectedRegions"
              @item-selection="handleRegionsSelection"
            >
            </dropdown>
            </div>
        </div>

        <div class="fields fields_right">
          <div class="field category">
            <h3>Category</h3>
            <dropdown
              class="field_dropdown category-dropdown"
              :items="allCategories"
              :selectedItems="selectedCategory"
              @item-selection="handleCategoriesSelection"
            >
            </dropdown>
          </div>
          <div class="field hiring-options">
            <h3>Hiring Options</h3>
            <dropdown
              class="field_dropdown hiring-options-dropdown"
              :items="allHiringOptions"
              :isMultiSelect="true"
              :selectedItems="selectedHiringOptions"
              @item-selection="handleHiringOptionsSelection"
            >
            </dropdown>
          </div>
          <div class="field funding-types">
            <h3>Funding Types</h3>
            <dropdown
              class="field_dropdown hiring-options-dropdown"
              :items="allFundingTypes"
              :isMultiSelect="true"
              :selectedItems="selectedFundingTypes"
              @item-selection="handleFundingTypesSelection"
            >
            </dropdown>
          </div>
          <div class="field public">
            <h3>Is Public</h3>
            <el-switch class="field_switch" v-model="project_is_public" active-color="#6BA487" inactive-color="#A9AFB5"></el-switch>
          </div>
        </div>

      </div>
    </div>
    <div class="create-button_container">
      <button class="create-button" @click="handleCreateProject">Create</button>
    </div>
  </div>
</template>

<script src="./create-project.js"></script>
<style src="./create-project.scss" lang="scss"></style>