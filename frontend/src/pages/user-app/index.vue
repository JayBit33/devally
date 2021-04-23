<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-app" v-loading.fullscreen.lock="isLoading">
    <Toast
      v-if="toast && toast.isShown"
      :type="toast.type"
      :message="toast.message"
      :hasAction="toast.hasAction"
      :duration="toast.duration"
      @toast-action-click="handleToastAction"
      @toast-close="closeToast"
    >
    </Toast>
    <div class="user-app_sidebar">
      <img v-if="user && user.profile_image" class="user-app_sidebar-avatar" :src="getImage(user.profile_image)" @click="updateView('')" />
      <h4 class="user-app_sidebar-fullname">{{ fullName }}</h4>
      <h5 class="user-app_sidebar-accountType">{{ accountType }}</h5>
      <sidebar-button
        displayText="update profile"
        :class="{'active': $route.params.view == 'profile'}"
        @clicked="updateView('profile')"
      >
      </sidebar-button>

      <ul class="user-app_sidebar-nav">
        <li @click="updateView('messages')" :class="{'active': $route.params.view == 'messages'}">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','comment-alt']" ></font-awesome-icon>
          <h4>Messages</h4>
        </li>
        <li @click="updateView('projects')" :class="{'active': $route.params.view == 'projects' || $route.params.view == 'create-project'}">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','clipboard']" ></font-awesome-icon>
          <h4>Projects</h4>
        </li>
        <li @click="updateView('connections')" :class="{'active': $route.params.view == 'connections'}">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','users']" ></font-awesome-icon> <!-- user-friends -->
          <h4>Connections</h4>
        </li>
        <li @click="updateView('settings')" :class="{'active': $route.params.view == 'settings'}">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','cog']" ></font-awesome-icon>
          <h4>Settings</h4>
        </li>
        <li @click="updateView('tasks')" :class="{'active': $route.params.view == 'tasks'}">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','tasks']" ></font-awesome-icon>
          <h4>Tasks</h4>
        </li>
      </ul>
      <sidebar-button
        displayText="sign out"
        class="signout-btn"
        @clicked="signout"
      ></sidebar-button>
    </div>

    <div class="user-app_content">

      <div class="home" v-if="!$route.params.view">

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
            <p class="expand-section" @click="updateView('tasks')">View All</p>
          </div>
          <div class="home_sections_section notifications">
            <h2 class="section_title">Nofitications</h2>
            <div class="notifications-container">
              <div class="notification" v-for="notification in user.notifications" :key="notification.message">
                <img class="image-icon" v-if="notification.senderId && !notification.projectId" :src="notification.image_source" alt="image" @click="updateView('connections')">
                <font-awesome-icon v-else-if="notification.projectId" :icon="['fas','clipboard']" class="clipboard-icon" @click="updateView('projects')"></font-awesome-icon>
                <h2>{{notification.message}}</h2>
                <font-awesome-icon :icon="['fas','trash']" class="trash-icon" @click="deleteNotification(notification)"></font-awesome-icon>
              </div>
            </div>
            <p class="expand-section notification_view-all">View All</p>
          </div>
        </div>

      </div>

      <div class="nav" v-if="$route.params.view">
        <div class="home-link">
          <router-link to="/" class="link" >
            <li>
              <font-awesome-icon :icon="['fas','long-arrow-alt-left']" class="nav-icon back"></font-awesome-icon>
              <span>Back To Site</span>
            </li>
          </router-link>
        </div>
      </div>

      <div v-if="$route.params.view == 'profile'" class="views">
        <font-awesome-icon :icon="['fas','id-card']" class="icon"></font-awesome-icon>
        <h1 class="title">User Profile</h1>
        <user-profile @toast-update="toast = $event">
          <font-awesome-icon :icon="['fas','id-card']" class="view-icon"></font-awesome-icon>
        </user-profile>
      </div>
      <div v-if="$route.params.view == 'messages'" class="views">
        <font-awesome-icon :icon="['fas','envelope']" class="icon"></font-awesome-icon>
        <h1 class="title">User Messages</h1>
        <user-messages />
      </div>
      <div v-if="$route.params.view == 'projects'" class="views">
        <font-awesome-icon :icon="['fas','clipboard']" class="icon"></font-awesome-icon>
        <h1 class="title">User Projects</h1>
        <user-projects @create-project="updateView('create-project')" />
      </div>
      <div v-if="$route.params.view == 'create-project'" class="views">
        <font-awesome-icon :icon="['fas','folder-open']" class="icon"></font-awesome-icon>
        <h1 class="title">New Project</h1>
        <create-project @toast-update="toast = $event" />
      </div>
      <div v-if="$route.params.view == 'connections'" class="views">
        <font-awesome-icon :icon="['fas','users']" class="icon"></font-awesome-icon>
        <h1 class="title">Connections</h1>
        <user-connections v-if="user.connections && user.connections.length > 0" :connectionIds="user.connections" />
      </div>
      <div v-if="$route.params.view == 'settings'" class="views">
        <font-awesome-icon class="icon" :icon="['fas','cog']" ></font-awesome-icon>
        <h1 class="title">Settings</h1>
        <user-settings @toast-update="toast = $event" />
      </div>
      <div v-if="$route.params.view == 'tasks'" class="views">
        <font-awesome-icon class="icon" :icon="['fas','tasks']" ></font-awesome-icon>
        <h1 class="title">Tasks</h1>
      </div>

      <!--el-drawer
        title="Messages"
        :append-to-body="true"
        :visible.sync="drawerOpen"
        :direction="drawerDirection"
        size="20%"
      >
        <div class="messages">
          <ul>
            <li v-for="(message,idx) in messages" :key="idx" class="message">
              <div class="message-header">
                <el-avatar :size="60" class="avatar" src="https://empty" @error="errorHandler" >
                  <img :src="require('@/assets/' + getProfileImage(message.entities.sender.entity.uid))" />
                </el-avatar>
                <div class="user-date">
                  <h4 class="username">Waveybits</h4>
                  TODO this needs updated and pulled from user db to determine wether the user is online or logged off
                  <h5 v-if="message.entities.sender.entity.status === 'available'" class="senderActive">online</h5>
                </div>
                <h3 class="date-sent">{{getMessageDate(message.sentAt)}}</h3>
              </div>
                <p>{{message.text}}</p>
            </li>
          </ul>
        </div>
      </!--el-drawer>
      <message-notifier :numberOfMessages="messages.length" :haveMessages="messages.length > 0" @openMessageBox="openMessageDrawer"></message-notifier>
    -->

    </div>
  </div>

</template>

<script src="./user-app.js"></script>
<style src="./user-app.scss" lang="scss" scoped></style>
