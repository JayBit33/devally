<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="project">
    <div class="project_left">
      <h3>Visionary</h3>
      <connection-card 
        :connection="visionary">
      </connection-card>
    </div>
    <div class="project_right">
      <div class="col1">
        <h4>{{ project.date_created }}</h4>
        <h4>Status: <span class="status">{{ project.is_active ? 'Active' : 'Closed'}}</span></h4>
        <h4>Seeking Allys: <span class="seeking_allys">{{ project.is_seeking_allys  ? 'Yes' : 'No' }}</span></h4>
      </div>
      <div class="col2">
        <div class="name">
          <h3>Name</h3>
          <p>{{ project.name }}</p>
        </div>
        <div class="description">
          <h3>Description</h3>
          <p>{{ project.description }}</p>
        </div>
        <div class="options">
          <div class="options_category">
            <h3>Category</h3>
            <p>{{ project.category }}</p>
        </div>
        <div class="options_hiring-options">
          <h3>Hiring Options</h3>
          <p>{{ project.hiring_options }}</p>
        </div>
        <div class="options_funding-types">
          <h3>Funding Types</h3>
          <p>{{ project.funding_types }}</p>
        </div>
        </div>
        <div class="options_positions">
          <h3>Positions Needed:</h3>
          <div v-for="position in project.members_needed" :key="position.position" class="position">
            <p>{{ position.position }} Skills Required: {{ position.skills }}</p>
          </div>
        </div>
      </div>
      <div class="col3">
        <div class="members">
          <h3>Team Members</h3>
          <connection-card-carousel
            :connections="teamMembers"
            :numberOfCardsDisplayed=2
          >
          </connection-card-carousel>
        </div>
        <div class="members-needed">
          <h3>Positions To Fill</h3>
          <connection-card 
            v-for="position in positionsNeeded"
            :key="position.name"
            :connection="position">
          </connection-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./project.js"></script>
<style src="./project.scss" lang="scss" scoped></style>
