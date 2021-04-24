<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-messages">
     <user-modal
      v-if="isUserModalOpen"
      title="Get Your Idea In The Spotlight"
      btnTxt="Get Featured"
      :btnIcon="['fas','clipboard-check']"
      :imageName="'spotlight.png'"
      :styles="{'backgroundColor': '#00B6E4', 'color': 'white', 'buttonBackground': '#005399'}"
      @button-click="handleUserModalButton"
      @close-modal="closeModal"
    />
    <div class="user-messages_area">
      <div class="messages">
        <message :isOnline="true" />
        <message  />
        <message  />
        <message :isActive="true" :isOnline="true" />
        <message :isOnline="true" />
        <message  :isOnline="true"/>
        <message  />
      </div>
      <div class="conversation">
        <conversation class="conversation_area"/>
        <textarea class="write-message" rows="11" />
      </div>
    </div>
  </div>
</template>

<script src="./user-messages.js"></script>
<style src="./user-messages.scss" lang="scss" scoped></style>
