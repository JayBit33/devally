<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->

<template>
  <div class="project-card" >
    <img v-if="project.is_featured" src="../../assets/spotlight.png" class="featured" />
    <h2 :class="{'featured_name': featured }">{{ project.name }}</h2>
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
        <h3 id="needed">Positions Needed</h3>
      </div>
      <div v-for="(position,i) in project.members_needed" :key="i" class="position">
        <p>{{ position.position }} <span style="font-weight: 600; padding: 0 1rem;">Skills Needed:</span>{{ openPositions(position) }}  <button>Apply</button></p>
      </div>
    </div>
    
     <router-link :to="{ name: 'Project', params: { id: project.id }}" class="link">
      <button class="learn_more">Learn More</button>
    </router-link>
  </div>
</template>

<script src="./project-card.js" ></script>
<style src="./project-card.scss" lang="scss" scoped />
