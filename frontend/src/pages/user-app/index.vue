<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-app" v-loading.fullscreen.lock="isLoading">
    <div class="user-app_sidebar">
      <img class="user-app_sidebar-avatar" :src="require('../../assets/' + user.profile_image)" />
      <h4 class="user-app_sidebar-fullname">{{ fullName }}</h4>
      <h5 class="user-app_sidebar-accountType">{{ accountType }}</h5>
      <button class="user-app_sidebar-updateProfile">update profile</button>

      <ul class="user-app_sidebar-nav">
        <li @click="updateView('messages')">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','envelope']" ></font-awesome-icon>
          <h4>Messages</h4>
        </li>
        <li @click="updateView('projects')">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','project-diagram']" ></font-awesome-icon>
          <h4>Projects</h4>
        </li>
        <li @click="updateView('connections')">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','address-book']" ></font-awesome-icon> <!-- user-friends -->
          <h4>Connections</h4>
        </li>
        <li @click="updateView('settings')">
          <font-awesome-icon class="sidebar-icon" :icon="['fas','cog']" ></font-awesome-icon>
          <h4>Settings</h4>
        </li>
      </ul>
    </div>

    <div class="daily-message" v-if="false">
      <h2>Happy Wednesday!</h2>
      <h3> "I'm always doing things I can't do; that's how I get to do them." -Pablo Picasso</h3>
    </div>

    <div v-if="messagesViewActive" class="views"><h1>Messages</h1></div>
    <div v-if="projectsViewActive" class="views"><h1>Projects</h1></div>
    <div v-if="connectionsViewActive" class="views"><h1>Connections</h1></div>
    <div v-if="settingsViewActive" class="views"><h1>Settings</h1></div>

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
