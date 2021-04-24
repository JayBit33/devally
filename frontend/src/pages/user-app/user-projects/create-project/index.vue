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
              :selectedItems="project_regions"
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
              :selectedItems="project_category"
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
              :selectedItems="project_options"
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
              :selectedItems="project_funding"
              @item-selection="handleFundingTypesSelection"
            >
            </dropdown>
          </div>
          <div class="switches">
            <div class="field public">
              <h3>Is Public</h3>
              <el-switch class="field_switch" v-model="project_is_public" active-color="#6BA487" inactive-color="#A9AFB5"></el-switch>
            </div>
            <div class="field active">
              <h3>Is Active</h3>
              <el-switch class="field_switch" v-model="project_is_active" active-color="#6BA487" inactive-color="#A9AFB5"></el-switch>
            </div>
            <div class="field featured" v-if="isFeaturePossible">
              <h3>Is Featured</h3>
              <el-switch class="field_switch" v-model="project_is_featured" active-color="#6BA487" inactive-color="#A9AFB5"></el-switch>
            </div>
            <div class="field allys">
              <h3>Is Seeking Allys</h3>
              <el-switch class="field_switch" v-model="project_is_seeking" active-color="#6BA487" inactive-color="#A9AFB5"></el-switch>
            </div>
          </div>
        </div>

      </div>

      <div class="create-project_content-block">
        <div class="fields">
          <div class="field">
            <h3>Invite some of your connections</h3>
            <div v-if="checkedConnectionsIds.length > 0" class="total-cards-checked"><span>{{checkedConnectionsIds.length}}</span></div>
            <div class="cards" ref="cards" :style="{'grid-template-columns': 'repeat(' + pageSize + ', 1fr)'}">
              <connection-card
                v-for="connection in connectionsShown"
                :key="connection.id"
                :connection="connection"
                :isMinimized="true"
                :isChecked="connection.isChecked"
                @check-click="connection.isChecked = !connection.isChecked"
              >
              </connection-card>
            </div>
            <el-pagination
              class="cards-pagination"
              layout="prev, pager, next"
              :pageSize="pageSize"
              :total="connections ? connections.length : 0"
              @current-change="updateConnections"
            >
            </el-pagination>
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