<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="profile-bio">

    <div class="user-display">
      <div class="user-display_background-overlay" :style="{'background-image': `url(${getImage('bg1.jpg')})`}"></div>
      <img v-if="user && user.profile_image" :src="getImage(user.profile_image)" />
      <h4>{{ user.username }}</h4>
      <h3>{{ user.user_type_id === '1' ? 'Developer' : user.user_type_id === '2' ? 'Visionary' : user.user_type_id === '3' ? 'Developer / Visionary' : ''}}</h3>
      <div class="rating">
        <div class="icon" v-for="i in 5" :key="i">
          <font-awesome-icon v-if="user.rating >= i" :icon="['fas', 'star']" />
          <font-awesome-icon v-else :icon="['far', 'star']" />
        </div>
      </div>
      
    </div>

    <div class="user-info">
      <div class="user-info_background-overlay" :style="{'background-image': `url(${getImage('bg1.jpg')})`}"></div>
      <div class="user-info_info user-info_bio">
        <h3>Bio</h3>
        <h4>{{ user.bio }}</h4>
      </div>
      <div class="user-info_info user-info_roles">
        <h3>Roles</h3>
        <h4>{{ user.roles.join(" | ") }}</h4>
      </div>
      <div class="user-info_info user-info_options">
        <h3>Hiring Options</h3>
        <h4>{{ user.hiring_options.join(" | ") }}</h4>
      </div>
      <div class="user-info_info user-info_categories">
        <h3>Categories</h3>
        <h4>{{ user.categories.join(" | ") }}</h4>
      </div>
    </div>

    <router-link :to="{ name: 'Dev', params: { id: user.id }}" class="learn-more">
      <h4>Learn More</h4>
      <div class="arrow">
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </div>
    </router-link>

  </div>
</template>

<script src="./profile-bio.js" />
<style src="./profile-bio.scss" lang="scss" scoped></style>
