<template>
  <div class="notification">

    <div v-if="isConnectionNotification && !isProjectNotification" class="notification_connection notification_container">
      <img class="image-icon"  :src="notification.image_source" alt="image" @click="$emit('update-view', 'connections')">

      <div class="notification_container_message">
        <h6><span>{{senderName}}</span> {{notification.message}}</h6>
      </div>

      <div v-if="notification.type == 'received'" class="notification_container_received">
        <div class="notification_container_button button-accept" @click="notificationAccept">Accept</div>
        <div class="notification_container_button button-deny" @click="notificationDeny">Deny</div>
      </div>
      <div v-if="notification.type == 'accepted'" class="notification_container_accepted">
        <font-awesome-icon :icon="['fas','trash']" class="trash-icon" @click="$emit('delete-notification', notification)"></font-awesome-icon>
        <div class="notification_container_button button-accept" @click="notificationAccept">Say Hi...</div>
      </div>

    </div>
    <div v-else-if="isProjectNotification" class="notification_project notification_container">
      <font-awesome-icon  :icon="['fas','clipboard']" class="clipboard-icon" @click="$emit('update-view', 'projects')"></font-awesome-icon>

      <div class="notification_container_message">
        <h6 v-if="notification.type == 'received'">{{notification.message}} <span>{{projectName}}</span></h6>
        <h6 v-else><span>{{senderName}}</span> {{notification.message}} <span>{{projectName}}</span></h6>
      </div>

      <div v-if="notification.type == 'received'" class="notification_container_received">
        <div class="notification_container_button button-accept" @click="notificationAccept">Accept</div>
        <div class="notification_container_button button-deny" @click="notificationDeny">Deny</div>
      </div>
      <div v-if="notification.type == 'accepted'" class="notification_container_accepted">
        <font-awesome-icon :icon="['fas','trash']" class="trash-icon" @click="$emit('delete-notification', notification)"></font-awesome-icon>
        <div class="notification_container_button button-accept" @click="notificationAccept">Say Hi...</div>
      </div>
    </div>
    
    

  </div>
</template>

<script src="./user-notification.js"></script>
<style src="./user-notification.scss" lang="scss"></style>