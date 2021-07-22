<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="projects">

    <div class="home-banner">
      <div class="col-1">
        <h1>Build A Team And</h1>
        <h1>Make Your Tech Idea A Reality</h1>
        <h4>Community of developers looking to join a team</h4>
        <h4>and build the next best thing since Jarvis.</h4>
        <button class="btn">
          <router-link to="/devs" class="link">Get Started</router-link>
        </button>
      </div>
      <div class="col-2">
        <img src="images/3593965.jpg" />
      </div>
    </div>
    <div class="projects-list">
      <div class="filters">
        <!-- <h2>Filter Projects</h2> -->
        <div class="search filters_filter">
          <input type="text" v-model="filters.searchTerm" class="search-box" placeholder="Search by name" @keydown.enter.prevent="applyFilters" />
          <button class="search" @click="applyFilters">Search</button>
        </div>
        <div class="payment-types filters_filter">
          <h3>Payment Types</h3>
          <div v-for="(option, i) in filters.paymentTypes" :key="option.type" class="checkbox-container">
            <input type="checkbox" :name="option.type" v-model="filters.paymentTypes[i].isChecked"/>
            <label @click.stop="updateFilterCheckBox('paymentTypes', option)">{{option.type}}</label>
          </div>
        </div>
        <div class="categories filters_filter">
          <h3>Categories</h3>
          <div v-for="(option, i) in filters.categories" :key="option.type" class="checkbox-container">
            <input type="checkbox" :name="option.type" v-model="filters.categories[i].isChecked"/>
            <label @click.stop="updateFilterCheckBox('categories', option)">{{option.type}}</label>
          </div>
        </div>
        <div class="funding-types filters_filter">
          <h3>Funding Types</h3>
          <div v-for="(option, i) in filters.fundingTypes" :key="option.type" class="checkbox-container">
            <input type="checkbox" :name="option.type" v-model="filters.fundingTypes[i].isChecked" />
            <label @click.stop="updateFilterCheckBox('fundingTypes', option)">{{option.type}}</label>
          </div>
        </div>
        <div class="roles filters_filter">
          <h3>Roles</h3>
          <div v-for="(option, i) in filters.roles" :key="option.type" class="checkbox-container">
            <input type="checkbox" :name="option.type" v-model="filters.roles[i].isChecked" />
            <label @click.stop="updateFilterCheckBox('roles', option)">{{option.type}}</label>
          </div>
        </div>
        <div class="dropdowns filters_filter">
          <h3>Skills</h3>
          <input placeholder="skills" v-model="filters.skills" />
        </div>
        <div class="other filters_filter">
          <h3>Other</h3>
          <input type="checkbox" v-model="filters.seekingAllys" />
          <label @click.stop="updateFilterCheckBox('seekingAllys')">Seeking allys</label>
        </div>
        <div class="actions">
          <button @click="applyFilters">Apply</button>
          <button @click="clearFilters">Reset</button>
        </div>
      </div>

      <div class="right-side">
        <div v-if="projectsShown.length > 0" class="pagination">
          <!-- <h4>Results per page</h4>
          <el-select class="dropdown" size="small" :value="itemsPerPage" @change="handleSizeChange">
            <el-option label="5" :value="5"></el-option>
            <el-option label="25" :value="25"></el-option>
            <el-option label="50" :value="50"></el-option>
            <el-option label="100" :value="100"></el-option>
          </el-select>
          <el-pagination
            :current-page.sync="currentPageIdx"
            :page-size="itemsPerPage"
            :total="projects.length"
            layout="prev, pager, next"
            @current-change="updateItemsDisplayed"
            @size-change="handleSizeChange"
          >
          </el-pagination> -->
          <!-- <h4>{{ startIdx + 1 }} - {{ endIdx > projects.length ? projects.length : endIdx }} out of {{ projects.length }}</h4> -->
        </div>
        <div v-for="project in projectsShown" :key="project.id" >
          <project-card class="card" :project="project" ></project-card>
        </div>
        <div v-if="projectsShown.length == 0" class="no-projects-container">
          <h2>No projects available</h2>
          <font-awesome-icon class="icon" :icon="['fas', 'frown']" />
        </div>
        <div v-if="projectsShown.length > 0" class="pagination">
          <h4>Results per page</h4>
          <el-select class="dropdown" size="small" :value="itemsPerPage" placeholder="25" @change="handleSizeChange">
            <el-option label="5" :value="5"></el-option>
            <el-option label="25" :value="25"></el-option>
            <el-option label="50" :value="50"></el-option>
            <el-option label="100" :value="100"></el-option>
          </el-select>
          <el-pagination
            :current-page.sync="currentPageIdx"
            :page-size="itemsPerPage"
            :total="projects.length"
            layout="prev, pager, next"
            @current-change="updateItemsDisplayed"
            @size-change="handleSizeChange"
          >
          </el-pagination>
          <h4>{{ startIdx + 1 }} - {{ endIdx > projects.length ? projects.length : endIdx }} out of {{ projects.length }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./projects.js"></script>
<style src="./projects.scss" lang="scss" scoped></style>
