<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="dev" :style="{'background-image': 'url(' + require('@/assets/devs_bg.png') + ')'}">
    <div class="user-profile">
      <img :src="require('../../assets/' + user.profile_image)" />
      <h4>{{ fullName }}</h4>
      <button class="btn">Collaborate</button>
      <button class="btn" @click="messageUser">Message</button>
    </div>
    <div class="user-info">
      <div class="user-info_accounttype">
        <h3>Account Type:</h3>
        <h4>{{ user.account_types.join(", ") }}</h4>
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
        <h3>Skills:</h3>
        <h4>{{ skillsFormatted }}</h4>
      </div>
      <div class="user-bio">
        <h3>Bio</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus
          in cum blanditiis ratione ad praesentium nobis voluptates nemo maxime
          beatae, corporis ullam officia dolor consectetur modi eius cumque?
          Rem, earum? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Ipsa rerum aliquam iusto consectetur unde et quos delectus laboriosam
          voluptatibus odio eum deserunt ab, accusamus a. Quasi deleniti neque
          mollitia quia! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Quae asperiores, eius fugiat explicabo, a reiciendis quibusdam
          voluptates ipsum laudantium minima nemo sapiente dicta nostrum nisi
          eum dolore consequuntur debitis ipsa.
        </p>
      </div>

      <div class="user-portfolio">
        <h3>Portfolio</h3>
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
  </div>
</template>

<script src="./dev.js"></script>
<style src="./dev.scss" lang="scss" scoped></style>
