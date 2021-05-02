<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="projects">
    <div class="filters">
      <h2>Filter Projects</h2>
      <div class="search">
        <input type="text" v-model="filters.searchTerm" class="search-box" placeholder="Search by name" />
        <button class="search" @click="searchByName">Search</button>
      </div>
      <div class="payment-types">
        <h3>Payment Types</h3>
        <input type="checkbox" v-model="filters.equity" />
        <label>Equity (Shares)</label><br/>
        <input type="checkbox" v-model="filters.flatRate" />
        <label>Flat Rate</label>
      </div>
      <div class="categories">
        <h3>Categories</h3>
        <input type="checkbox" v-model="filters.website" />
        <label>Website</label><br/>
        <input type="checkbox" v-model="filters.ecom" />
        <label>Ecommerce</label><br/>
        <input type="checkbox" v-model="filters.mobile" />
        <label>Mobile Application</label><br/>
        <input type="checkbox" v-model="filters.saas" />
        <label>SAAS</label><br/>
        <input type="checkbox" v-model="filters.software" />
        <label>Software</label><br/>
        <input type="checkbox" v-model="filters.other" />
        <label>Other</label>
      </div>
      <div class="funding-types">
        <h3>Funding Types</h3>
        <input type="checkbox" v-model="filters.bootrapped" />
        <label>Bootsrapped</label><br/>
        <input type="checkbox" v-model="filters.crowdFunding" />
        <label>Crowd Funding</label><br/>
        <input type="checkbox" v-model="filters.fandf" />
        <label>Friends & Family</label><br/>
        <input type="checkbox" v-model="filters.debtCapital" />
        <label>Debt Capital</label><br/>
        <input type="checkbox" v-model="filters.ventureCapital" />
        <label>Venture Capital</label>
      </div>
      <div class="dropdowns">
        <h3>Developer Options</h3>
        <input placeholder="roles" v-model="filters.roles" />
        <input placeholder="skills" v-model="filters.skills" />
      </div>
      <div class="other">
        <h3>Other</h3>
        <input type="checkbox" v-model="filters.seekingAllys" />
        <label>seeking allys</label><br/><br/>
        <input type="checkbox" v-model="filters.matchingSkills" />
        <label>mathcing your skills</label>
      </div>
      <div class="actions">
        <button @click="applyFilters">Apply</button>
        <button @click="clearFilters">Reset</button>
      </div>
    </div>
    <div class="right-side">
      <div class="pagination">
        <h4>Results per page</h4>
        <el-select class="dropdown" size="small" v-model="itemsPerPage" placeholder="25">
          <el-option label="25" value="25"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="100" value="100"></el-option>
        </el-select>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="prev, pager, next"
          :total="1000"
        >
        </el-pagination>
        <h4>1 - 25 out of 2048</h4>
      </div>
      <div v-for="project in projectsShown" :key="project.id" >
        <project-card class="card" :project="project" ></project-card>
      </div>
      <div v-if="projectsShown.length > 0" class="pagination">
        <h4>Results per page</h4>
        <el-select class="dropdown" size="small" v-model="itemsPerPage" placeholder="25">
          <el-option label="25" value="25"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="100" value="100"></el-option>
        </el-select>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="prev, pager, next"
          :total="1000"
        >
        </el-pagination>
        <h4>1 - 25 out of 2048</h4>
      </div>
    </div>
  </div>
</template>

<script src="./projects.js"></script>
<style src="./projects.scss" lang="scss" scoped></style>
