<template>
  <div class="home">
    <div class="greeting">
      <div class="greeting__text">
        <h2 class="fade-in">Welcome Back</h2>
        <h2 class="fade-in greeting__text__name">{{user.firstname}}</h2>
      </div>
      <div class="greeting__image">
        <img src="@/assets/programmer-man.png" alt="programmer-man">
      </div>
      <div class="greeting__quote">
        <h3 class="fade-in"> "I'm always doing things I can't do; that's how I get to do them." -Pablo Picasso</h3>
      </div>
    </div>

    <div class="home_sections">
      <div class="home_sections_section active-projects">
        <h2 class="section_title">Active Projects</h2>
        <project-info-collapsable v-for="project in projects.filter((p, i) => i <= 1)" :key="project.id" :project="project"></project-info-collapsable>
        <div v-if="projects.length == 0" class="no-projects">
          <h2>You have no projects!</h2>
          <p @click="$router.push('/projects')">Browse projects</p>
        </div>
        <p class="expand-section" @click="updateView('projects')">View All</p>
      </div>
      <div class="home_sections_section recent-messages">
        <h2 class="section_title">Recent Messages</h2>
        <div class="message" v-for="message in messages" :key="message.message">
          <img class="image-icon" :src="message.image_source" alt="image">
          <h2>{{message.message}}</h2>
        </div>
        <div v-if="messages.length == 0" class="no-messages">
          <h2>You have no new messages.</h2>
        </div>
        <p class="expand-section" @click="updateView('messages')">Read More</p>
      </div>
      <div class="home_sections_section current-tasks">
        <h2 class="title section_title">Current Tasks</h2>
        <div class="task" v-for="task in user.tasks" :key="task.message">
          <font-awesome-icon :icon="['fas','tasks']" class="task-icon"></font-awesome-icon>
          <h2>{{task.message}}</h2>
        </div>
        <div v-if="user.tasks.length == 0" class="no-tasks">
          <h2>You have no tasks.</h2>
        </div>
        <p class="expand-section" @click="updateView('tasks')">View All</p>
      </div>
      <div class="home_sections_section notifications">
        <h2 class="section_title">Nofitications</h2>
        <div class="notifications-container">
          <user-notification
            v-for="(notification, i) in user.notifications"
            :key="notification.message + notification.senderId + notification.type + i"
            :notification="notification"
            @delete-notification="deleteNotification"
            @update-view="updateView"
          />
        </div>
        <div v-if="user.notifications.length == 0" class="no-notifications">
          <h2>You have no notifications.</h2>
        </div>
        <p class="expand-section notification_view-all">View All</p>
      </div>
    </div>

  </div>
</template>

<script src="./user-home.js"></script>
<style src="./user-home.scss" lang="scss"></style>