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
      <img v-if="user && user.profile_image" class="user-app_sidebar-avatar" :src="getImage" />
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
        <li @click="updateView('projects')" :class="{'active': $route.params.view == 'projects'}">
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

    <div class="daily-message" v-if="!$route.params.view">
      <h2 class="fade-in">Happy Wednesday!</h2>
      <h3 class="fade-in"> "I'm always doing things I can't do; that's how I get to do them." -Pablo Picasso</h3>
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
      <user-projects />
    </div>
    <div v-if="$route.params.view == 'connections'" class="views">
      <font-awesome-icon :icon="['fas','user-friends']" class="icon"></font-awesome-icon>
      <h1 class="title">User Connections</h1>
      <user-connections :connectionIds="user.connections" />
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
</template>

<script src="./user-app.js"></script>
<style src="./user-app.scss" lang="scss" scoped></style>
