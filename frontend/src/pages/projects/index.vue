<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="projects">
    <div class="filters">
      <h2>Filter Projects</h2>
      <div class="search">
        <input type="text" v-model="searchTerm" class="search-box" placeholder="Search by name" />
        <button class="search">Search</button>
      </div>
      <div class="payment-types">
        <h3>Payment Type</h3>
        <input type="checkbox" v-model="equity" />
        <label>Equity (Shares)</label><br/>
        <input type="checkbox" v-model="flatRate" />
        <label>Flat Rate</label>
      </div>
      <div class="categories">
        <h3>Categories</h3>
        <input type="checkbox" v-model="website" />
        <label>Website</label><br/>
        <input type="checkbox" v-model="ecom" />
        <label>Ecommerce</label><br/>
        <input type="checkbox" v-model="mobile" />
        <label>Mobile Application</label><br/>
        <input type="checkbox" v-model="saas" />
        <label>SAAS</label><br/>
        <input type="checkbox" v-model="software" />
        <label>Software</label><br/>
        <input type="checkbox" v-model="other" />
        <label>Other</label>
      </div>
      <div class="dropdowns">
        <input placeholder="roles" />
        <input placeholder="skills" />
      </div>
      <div class="radios">
        <input type="radio" />
        <label>projects seeking allys</label><br>
        <input type="radio" />
        <label>mathcing your skills</label>
      </div>
      <div class="actions">
        <button>Apply</button>
        <button>Clear</button>
      </div>
    </div>
    <div>
      <div v-for="project in projects" :key="project.id" >
        <project-card  :project="project" ></project-card>
      </div>
    </div>
  </div>
</template>

<script src="./projects.js"></script>
<style src="./projects.scss" lang="scss" scoped></style>
