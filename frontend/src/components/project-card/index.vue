<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->

<template>
  <div class="project-card" >
    <img v-if="project.is_featured" src="../../assets/featured_project.png" class="featured" />
    <h2>{{ project.name }}</h2>
    <div class="project-card_info">
      <div>
        <h3>Description:</h3>
        <p>{{ project.description }}</p>
      </div>
      <div>
        <h3>Category:</h3>
        <p>{{ project.category }}</p>
        <div>
          <h3>Hiring Options:</h3>
          <p>{{ displayProjectOptions(project.hiring_options) }}</p>
        </div>
        <div>
          <h3>Funding Types:</h3>
          <p>{{ displayProjectOptions(project.funding_types) }}</p>
        </div>
      </div>
      <div>
        <h3>Positions Needed:</h3>
      <p>{{ openPositions }}</p>
      </div>
    </div>

    <button>Learn More</button>
  </div>
</template>

<script src="./project-card.js" ></script>
<style src="./project-card.scss" lang="scss" scoped />
