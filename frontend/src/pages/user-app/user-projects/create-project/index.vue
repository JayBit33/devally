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
          <div class="field add-position">
            <h3>Positions to fill</h3>
            <div class="add-position_adding">
              <div class="add-position_adding-grid">
                <div class="add-position_adding_role">
                  <label for="Role">Role</label>
                  <dropdown
                    class="field_dropdown add-position_adding-dropdown"
                    :items="allRoles"
                    :isMultiSelect="false"
                    :selectedItems="currentPositionRole"
                    @item-selection="handlePositionSelection"
                  >
                  </dropdown>
                </div>
                <div class="add-position_adding_skills">
                  <label for="skills">Skills</label>
                  <div class="add-position_adding_skills_input">
                    <input type="text" name="skills" v-model="currentPositionSkill" @keydown.enter.prevent="addSkill">
                    <font-awesome-icon class="add-position_adding_skills_input-icon" :class="{'disabled': !currentPositionSkill}" :icon="['fas', 'plus-circle']" @click="addSkill"></font-awesome-icon>
                  </div>
                </div>
              </div>
              
              <div class="add-position_adding_skills-added">
                <div v-for="skill in currentPositionSkills" :key="skill" class="add-position_adding_skills-added_input" @dblclick="removeSkill(skill)">
                  <input type="text" name="skills" readonly :value="skill">
                  <font-awesome-icon class="add-position_adding_skills-added_input-icon" :icon="['fas', 'minus-circle']" @click="removeSkill(skill)"></font-awesome-icon>
                </div>
              </div>
              <button class="add-position-button" :class="{'disabled': !currentPositionRole}" @click="handleAddPosition">Add Position</button>
            </div>

            <div v-if="project_positions && project_positions.length > 0" class="add-position_added">
              <h3>Positions added</h3>
              <div class="add-position_added_positions">
                <div v-for="position in project_positions" :key="position.position" class="add-position_added_position" @dblclick="handleDeletePosition(position)">
                  <p class="add-position_added_position-role">{{position.position}}</p>
                  <h6 v-if="position.skills.length > 0"> | </h6>
                  <p v-if="position.skills.length > 0" class="add-position_added_position-skills">{{position.skills.join(', ')}}</p>
                  <font-awesome-icon class="add-position_added_position-delete-icon" :icon="['fas', 'minus-circle']" @click="handleDeletePosition(position)"></font-awesome-icon>
                </div>
              </div>
            </div>
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
            <filter-search class="filter" :hasFilters="false" :placeholderText="'Search your connections'" @search-input="searchInputChange" />
            <div class="cards" :class="{'no-cards': connectionsShown.length === 0}" ref="cards" :style="{'grid-template-columns': 'repeat(' + pageSize + ', 1fr)'}">
              <connection-card
                v-for="connection in connectionsShown"
                :key="connection.id"
                :connection="connection"
                :isMinimized="true"
                :isChecked="connection.isChecked"
                @check-click="connection.isChecked = !connection.isChecked"
              >
              </connection-card>
              <div v-if="connectionsShown.length === 0" class="no-cards_no-cards">
                <h1>No connections</h1>
                <font-awesome-icon class="icon" :icon="['fas', 'frown']"></font-awesome-icon>
              </div>
            </div>
            <el-pagination
              v-if="connectionsShown.length !== 0"
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