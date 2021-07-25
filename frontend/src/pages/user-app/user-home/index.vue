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
        <h3 class="fade-in"> "{{quote.content}}" -{{quote.author}}</h3>
      </div>
    </div>

    <div class="home_sections">

      <div class="left">
        <div class="home_sections_section active-projects">
          <h2 class="section_title">Active Projects</h2>
          <project-info-collapsable v-for="project in projects.filter((p, i) => i <= 1)" :key="project.id" :project="project"></project-info-collapsable>
          <div v-if="projects && projects.length == 0" class="no-projects">
            <h2>You have no projects!</h2>
            <p @click="$router.push('/projects')">Browse projects</p>
          </div>
          <p class="expand-section" @click="updateView('projects')">View All</p>
        </div>
        <div class="home_sections_section current-tasks">
          <h2 class="title section_title">Current Tasks</h2>
          <div class="project-tasks-container" v-for="project in projectsShown" :key="project.id">
            <div class="task-header-container">
              <div class="task-header">
                <h2>{{project.name}}</h2>
                <font-awesome-icon @click="addingTask = true" :icon="['fas','plus-square']" class="add-icon"></font-awesome-icon>
              </div>
            </div>
            <div v-if="addingTask" class="adding-task">
              <user-task :isNewTask="true" :project="project" @new-task-save="newTaskSave($event, project)" @new-task-cancel="newTaskCancel" />
            </div>
            <div class="task-container" v-for="task in tasksShown(project)" :key="task.message">
              <user-task :task="task" :project="project" @complete-task="$emit('project-change')" @delete-task="$emit('project-change')" />
            </div>
            <div v-if="tasksShown(project).length == 0" class="no-task-container">
              <p>No tasks for this project</p>
            </div>
          </div>
          <p class="expand-section" @click="updateView('tasks')">View All</p>
        </div>
      </div>

      <div class="right">
        <div class="home_sections_section recent-messages">
          <h2 class="section_title">Recent Messages</h2>
          <div class="message" v-for="message in messages" :key="message.message">
            <img class="image-icon" :src="message.image_source" alt="image">
            <h2>{{message.data.text}}</h2>
          </div>
          <div v-if="messages && messages.length == 0" class="no-messages">
            <h2>You have no new messages.</h2>
          </div>
          <p class="expand-section" @click="updateView('messages')">Read More</p>
        </div>
        <div class="home_sections_section notifications">
          <h2 class="section_title">Nofitications</h2>
          <div class="notifications-container">
            <user-notification
              v-for="(notification, i) in notificationsShown"
              :key="notification.message + notification.senderId + notification.type + i"
              :notification="notification"
              @delete-notification="deleteNotification"
              @update-view="updateView"
            />
          </div>
          <div v-if="notificationsShown == 0" class="no-notifications">
            <h2>You have no notifications.</h2>
          </div>
          <p class="expand-section notification_view-all" @click="toggleNotificationsOverride">{{all_notifications_override ? 'View Less' : 'View All'}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./user-home.js"></script>
<style src="./user-home.scss" lang="scss"></style>