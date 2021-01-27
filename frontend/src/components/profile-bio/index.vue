<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="profile-bio">
    <div class="user-profile">
      <img :src="require('@/assets/' + user.profile_image)" />
      <h4>{{ user.username }}</h4>
      <router-link :to="{ name: 'Dev', params: { id: user.id }}" class="btn">Learn More</router-link>
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
          Rem, earum?
        </p>
      </div>
    </div>
  </div>
</template>

<script src="./profile-bio.js" />
<style src="./profile-bio.scss" lang="scss" scoped></style>
