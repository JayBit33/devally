<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="project-stats">
    <h2>Project Stats</h2>
    <div class="project-stats__information">
      <div class="extra_information">
        <div v-if="extraInformation" class="info created">
          <h4>Created</h4>
          <h2 class="info-total">{{ getDateFormat(project.date_created) }}</h2>
        </div>
        <div
          v-if="extraInformation"
          class="info status"
          :class="project.is_active ? 'positive_info' : 'negative_info'"
        >
          <h4>Status</h4>
          <h2 class="info-total info-total-with-circle">
            <span class="info-total-circle"></span
            >{{ project.is_active ? "Active" : "Inactive" }}
          </h2>
        </div>
        <div
          v-if="extraInformation"
          class="info viewable"
          :class="project.is_public ? 'positive_info' : 'negative_info'"
        >
          <h4>Viewable</h4>
          <h2 class="info-total info-total-with-circle">
            <span class="info-total-circle"></span
            >{{ project.is_public ? "Public" : "Private" }}
          </h2>
        </div>
      </div>

      <div class="default_information">
        <div class="info days-active">
          <h4>Days Active</h4>
          <font-awesome-icon
            :icon="['fas', 'clock']"
            class="icon"
          ></font-awesome-icon>
          <h2 class="info-total">{{ getDayCount(project.date_created) }}</h2>
        </div>
        <div class="info tasks">
          <h4>Tasks Complete</h4>
          <font-awesome-icon
            :icon="['fas', 'tasks']"
            class="icon"
          ></font-awesome-icon>
          <h2 class="info-total">{{ completedTasks.length }}</h2>
        </div>
        <div class="info members">
          <h4>Members</h4>
          <font-awesome-icon
            :icon="['fas', 'users']"
            class="icon"
          ></font-awesome-icon>
          <h2 class="info-total">{{ project.team_member_ids.length + 1 }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./project-stats.js"></script>
<style src="./project-stats.scss" lang="scss"></style>
