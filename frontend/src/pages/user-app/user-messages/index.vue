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
      :styles="{'backgroundColor': '#6D6BA4', 'color': 'white', 'buttonBackground': 'black'}"
      @button-click="handleUserModalButton"
      @close-modal="closeModal"
    />
    <div class="user-messages_area">
      <div class="messages-area">
        <div class="user-messages_area-header"><h2>Chats</h2></div>
        <div class="messages">
          <message v-for="message in messages" :key="message.id" :message="message" :isOnline="message.sender.status === 'online'"  />
        </div>
        <div class="user-messages_area-footer"></div>
      </div>
      <div class="conversation">
        <conversation class="conversation_area"/>
      </div>
    </div>
  </div>
</template>

<script src="./user-messages.js"></script>
<style src="./user-messages.scss" lang="scss" scoped></style>
