<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-profile">
    <font-awesome-icon :icon="['fas','id-card']" class="icon"></font-awesome-icon>
    <h1 class="title">User Profile</h1>

    <div class="profile-content">

      <file-upload
        :fileTitle="'Profile Image'"
        :fileType="'image'"
        :selectedFile="selectedFile"
        @file-clear="selectedFile = null"
        @file-change="selectedFile = $event"
      ></file-upload>

      <div class="interested-categories">
        <h4>Interested Categories</h4>
        <dropdown
          class="profile-dropdown"
          :items="allCategories"
          :isMultiSelect="true"
          :selectedItems="selectedCategories"
          @item-selection="handleCategoriesSelection"
        >
        </dropdown>
      </div>
      <div v-if="isDevUser" class="roles">
        <h4>Roles</h4>
        <dropdown
          class="profile-dropdown"
          :items="allRoles"
          :isMultiSelect="true"
          :selectedItems="selectedRoles"
          @item-selection="handleRolesSelection"
        >
        </dropdown>
      </div>
      <div v-if="isDevUser" class="hiring-options">
        <h4>Hiring Options</h4>
        <dropdown
          class="profile-dropdown"
          :items="allHiringOptions"
          :isMultiSelect="true"
          :selectedItems="selectedHiringOptions"
          @item-selection="handleHiringOptionsSelection"
        >
        </dropdown>
      </div>

      <div class="bio">
        <h4>Bio</h4>
        <textarea v-model="bio" name="bio" cols="30" rows="10"></textarea>
      </div>

      <div class="update-btn" @click="updateProfile">Update</div>
    </div>

  </div>
</template>

<script src="./user-profile.js"></script>
<style src="./user-profile.scss" lang="scss" scoped></style>
