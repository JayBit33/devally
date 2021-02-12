<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="profile" v-loading.fullscreen.lock="isLoading">
    <div class="user-profile">
      <img :src="require('@/assets/' + user.profile_image)" />
      <h4>{{ fullName }}</h4>
      <!-- <button class="btn">Collaborate</button>
      <button class="btn">Message</button> -->
    </div>
    <div class="user-info" >
      <div class="user-info_heading">
        <h2>User Information</h2>
        <button>Edit</button>
      </div>
      <div></div>
      <div class="user-info_accounttype">
        <h3>Roles:</h3>
        <h4>{{ user.roles.join(", ") }}</h4>
      </div>
      <div class="user-info_hiringoptions">
        <h3>Hiring Options:</h3>
        <h4>{{ user.hiring_options.join(", ") }}</h4>
      </div>
      <div class="user-info_rating">
        <h3>Rating:</h3>
        <ul>
          <li v-for="rate in user.rating" :key="rate"><font-awesome-icon style="color: #F0DB4F; font-size: 18px;" :icon="['fas', 'star']" /></li>
        </ul>
      </div>
      <div class="user-info_skills">
        <h3>Categories:</h3>
        <h4>{{ categoriesFormatted }}</h4>
      </div>
      <div class="user-bio">
        <div class="user-bio_heading" >
          <h3>Bio</h3>
          <button>Edit</button>
        </div>
        <p>{{ user.bio }}</p>
      </div>

      <div class="user-portfolio">
        <div class="user-portfolio_heading">
          <h3>Portfolio</h3>
          <button>Edit</button>
        </div>
        <div class="user-portfolio_images">
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
          <img :src="require('@/assets/project.png')" />
        </div>
      </div>
    </div>
    <el-drawer
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
                <!-- TODO this needs updated and pulled from user db to determine wether the user is online or logged off -->
                <h5 v-if="message.entities.sender.entity.status === 'available'" class="senderActive">online</h5>
              </div>
              <h3 class="date-sent">{{getMessageDate(message.sentAt)}}</h3>
            </div>
              <p>{{message.text}}</p>
          </li>
        </ul>
      </div>
    </el-drawer>
    <message-notifier :numberOfMessages="messages.length" :haveMessages="messages.length > 0" @openMessageBox="openMessageDrawer"></message-notifier>
  </div>
</template>

<script src="./user-profile.js"></script>
<style src="./user-profile.scss" lang="scss" scoped></style>
