<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="project-collapsible">
    <div class="project-collapsible_header" @click="toggleCollapsed">
      <div class="project-collapsible_header_left">
        <font-awesome-icon
          :icon="
            collapsed
              ? ['fas', 'chevron-circle-down']
              : ['fas', 'chevron-circle-up']
          "
          class="icon"
        ></font-awesome-icon>
        <h2>{{ project.name }}</h2>
      </div>
      <div class="project-collapsible_header_right">
        <font-awesome-icon
          v-if="isEditable"
          @click.stop="$emit('edit-project', project)"
          :icon="['fas', 'ellipsis-h']"
          class="icon ellipse-icon"
        ></font-awesome-icon>
      </div>
    </div>
    <div v-if="!collapsed" class="project-collapsible_sections">
      <div v-if="isEditable"  class="general-info-section">
        <div class="general-info-section_heading">
          <h2>General Information</h2>
          <font-awesome-icon
            v-if="isEditable"
            id="project-ellipsis"
            :icon="['fas', 'ellipsis-h']"
            @click.stop="$emit('edit-project', project)"
          ></font-awesome-icon>
        </div>
        <div class="row2">
          <div class="section">
            <h2>Name</h2>
            <h3>{{ project.name }}</h3>
          </div>
          <div class="section">
            <h2>Category</h2>
            <h3>{{ project.category }}</h3>
          </div>
          <div class="section">
            <h2>Hiring Options</h2>
            <h3>{{ project.hiring_options }}</h3>
          </div>
          <div class="section">
            <h2>Funding Types</h2>
            <h3>{{ project.funding_types }}</h3>
          </div>
          <div class="section">
            <h2>Viewable Regions</h2>
            <h3>{{ project.viewable_regions }}</h3>
          </div>
        </div>
        <div class="row3">
          <div class="section">
            <h2>Description</h2>
            <h3>{{ project.description }}</h3>
          </div>
        </div>
      </div>
      <div v-if="isEditable" class="stats_section">
        <project-stats :project="project" :extraInformation="true" />
      </div>
      <div v-if="isEditable" class="current-tasks_section">
        <h2 class="current-tasks_section-heading">Current Tasks</h2>
        <div class="current-tasks">
          <div class="task" v-for="task in user.tasks" :key="task.message">
            <font-awesome-icon
              :icon="['fas', 'tasks']"
              class="task-icon"
            ></font-awesome-icon>
            <h2>{{ task.message }}</h2>
          </div>
          <p class="expand-section" @click="updateView('tasks')">
            See More Tasks
          </p>
        </div>
      </div>
      <div v-if="isEditable"  class="members_section">
        <h2>Team Members</h2>
        <connection-card-carousel
          class="members"
          :connections="teamMembers"
          :numberOfCardsDisplayed="2"
          :hasDeleteIcon="project.creator_id == getLoggedInUser.id"
          @delete-click="removeTeamMember"
        />
        <h2 v-if="isEditable" class="tofill-heading">Positions To Fill</h2>
        <connection-card-carousel
          v-if="isEditable"
          class="members"
          :connections="teamMembers"
          :numberOfCardsDisplayed="2"
          :hasDeleteIcon="project.creator_id == getLoggedInUser.id"
          @delete-click="removeTeamMember"
        />
      </div>
    </div>
    <div v-if="!isEditable && !collapsed" class="not-creator_sections">
      <div class="general-info-section">
        <div class="general-info-section_heading">
          <h2>General Information</h2>
          <font-awesome-icon
            v-if="isEditable"
            id="project-ellipsis"
            :icon="['fas', 'ellipsis-h']"
            @click.stop="$emit('edit-project', project)"
          ></font-awesome-icon>
        </div>
        <div class="row2">
          <div class="section">
            <h2>Name</h2>
            <h3>{{ project.name }}</h3>
          </div>
          <div class="section">
            <h2>Category</h2>
            <h3>{{ project.category }}</h3>
          </div>
          <div class="section">
            <h2>Hiring Options</h2>
            <h3>{{ project.hiring_options }}</h3>
          </div>
          <div class="section">
            <h2>Funding Types</h2>
            <h3>{{ project.funding_types }}</h3>
          </div>
          <div class="section">
            <h2>Viewable Regions</h2>
            <h3>{{ project.viewable_regions }}</h3>
          </div>
        </div>
        <div class="row3">
          <div class="section">
            <h2>Description</h2>
            <h3>{{ project.description }}</h3>
          </div>
        </div>
      </div>
      <div class="project-creator">
        <h2>Visionary</h2>
        <connection-card
          class="visionary-card"
          :connection="visionary"
        ></connection-card>
      </div>
      <div class="members_section">
        <h2>Team Members</h2>
        <connection-card-carousel
          class="members"
          :connections="teamMembers"
          :numberOfCardsDisplayed="2"
          :hasDeleteIcon="project.creator_id == getLoggedInUser.id"
          @delete-click="removeTeamMember"
        />
        <connection-card-carousel
          v-if="isEditable"
          class="members"
          :connections="teamMembers"
          :numberOfCardsDisplayed="2"
          :hasDeleteIcon="project.creator_id == getLoggedInUser.id"
          @delete-click="removeTeamMember"
        />
      </div>
    </div>
  </div>
</template>

<script src="./project-collapsible.js" />
<style lang="scss" src="./project-collapsible.scss" />
