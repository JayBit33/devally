<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="dev" :style="{'background-image': 'url(' + getImage('devs_bg.png') + ')'}">
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
    <div class="user-profile">
      <img v-if="user && user.profile_image" :src="getImage(user.profile_image)" />
      <h4>{{ fullName }}</h4>
      <button class="btn" @click="addContact">Add Contact</button>
      <button class="btn" @click="openMessageBox">Message</button>
    </div>
    <div class="user-info">
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
        <h4>{{ skillsFormatted }}</h4>
      </div>
      <div class="user-bio">
        <h3>Bio</h3>
        <p>{{ user.bio }}</p>
      </div>

      <div class="user-portfolio">
        <h3>Portfolio</h3>
        <div class="user-portfolio_images">
          <img v-for="(image, index) in portfolioImages" :key="image + index" :src="getImage(image)" />
        </div>
      </div>
    </div>
    <message-box v-if="messageBoxOpen" @messageSent="messageUser" @close="toggleMessageBox"></message-box>
  </div>
</template>

<script src="./dev.js"></script>
<style src="./dev.scss" lang="scss" scoped></style>
