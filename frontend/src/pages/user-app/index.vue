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
      <img v-if="user && user.profile_image" class="user-app_sidebar-avatar" :src="getImage(user.profile_image)" />
      <h4 class="user-app_sidebar-fullname">{{ fullName }}</h4>
      <h5 class="user-app_sidebar-accountType">{{ accountType }}</h5>
      <button class="user-app_sidebar-updateProfile" @click="updateView('profile')" :class="{'active': profileViewActive}">Update Profile</button>

      <ul class="user-app_sidebar-nav">
        <li @click="updateView('messages')" :class="{'active': messagesViewActive}">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','envelope']" ></font-awesome-icon>
          <h4>Messages</h4>
        </li>
        <li @click="updateView('projects')" :class="{'active': projectsViewActive}">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','project-diagram']" ></font-awesome-icon>
          <h4>Projects</h4>
        </li>
        <li @click="updateView('connections')" :class="{'active': connectionsViewActive}">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','address-book']" ></font-awesome-icon> <!-- user-friends -->
          <h4>Connections</h4>
        </li>
        <li @click="updateView('settings')" :class="{'active': settingsViewActive}">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','cog']" ></font-awesome-icon>
          <h4>Settings</h4>
        </li>
      </ul>
    </div>

    <div class="daily-message" v-if="!profileViewActive && !messagesViewActive && !projectsViewActive && !connectionsViewActive && !settingsViewActive">
      <h2 class="fade-in">Happy Wednesday!</h2>
      <h3 class="fade-in"> "I'm always doing things I can't do; that's how I get to do them." -Pablo Picasso</h3>
    </div>

    <div class="nav" v-if="profileViewActive || messagesViewActive || projectsViewActive || connectionsViewActive || settingsViewActive">
      <div class="home-link">
        <router-link to="/" class="link" >
          <li>
            <font-awesome-icon :icon="['fas','long-arrow-alt-left']" class="nav-icon back"></font-awesome-icon>
            <span>Back To Site</span>
          </li>
          <li @click="$emit('optionSelected', 'signout')">
            <font-awesome-icon :icon="['fas','power-off']" class="nav-icon"></font-awesome-icon>
            <span id="signout">Sign Out</span>
          </li>
        </router-link>
      </div>
    </div>

    <div v-if="profileViewActive" class="views">
      <user-profile @toast-update="toast = $event" />
    </div>
    <div v-if="messagesViewActive" class="views">
      <user-messages />
    </div>
    <div v-if="projectsViewActive" class="views">
      <user-projects />
    </div>
    <div v-if="connectionsViewActive" class="views">
      <user-connections :connectionIds="user.connections" />
    </div>
    <div v-if="settingsViewActive" class="views">
      <user-settings @toast-update="toast = $event" />
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
