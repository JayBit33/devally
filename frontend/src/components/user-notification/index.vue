<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="notification">
    <div v-if="showingApplyModal" class="notification_apply-modal">
      <apply-modal
        :user="sender"
        :project="project"
        :position="{position: notification.info.position}"
        :extraInfoOverride="notification.info.extraInfo"
        :isSendingApplication="false"
        @apply-modal-accept="notificationAccept"
        @apply-modal-deny="notificationDeny"
        @apply-modal-close="closeApplyModal"
      />
    </div>

    <div class="notification_background-overlay" :style="{'background-image': `url(${getImage('bg1.jpg')})`}"></div>

    <div v-if="isApplicationNotification" class="notification_application notification_container">
      <img class="image-icon"  :src="notification.image_source" alt="image" @click="$emit('update-view', 'connections')">

      <div class="notification_container_message">
        <h6><span>{{senderName}}</span> would like to apply for a position</h6>
      </div>

      <div v-if="notification.info.sending" class="notification_container_received">
        <font-awesome-icon :icon="['fas','trash']" class="trash-icon" @click.stop="notificationDeny"></font-awesome-icon>
        <div class="notification_container_button button-view" @click.stop="notificationView">View</div>
      </div>

    </div>
    <div v-else-if="isConnectionNotification && !isProjectNotification" class="notification_connection notification_container">
      <img class="image-icon"  :src="notification.image_source" alt="image" @click="$emit('update-view', 'connections')">

      <div class="notification_container_message">
        <h6><span>{{senderName}}</span> {{notification.message}}</h6>
      </div>

      <div v-if="notification.type == 'received'" class="notification_container_received">
        <div class="notification_container_button button-accept" @click.stop="notificationAccept">Accept</div>
        <div class="notification_container_button button-deny" @click.stop="notificationDeny">Deny</div>
      </div>
      <div v-if="notification.type == 'accepted'" class="notification_container_accepted">
        <font-awesome-icon :icon="['fas','trash']" class="trash-icon" @click.stop="notificationDeny"></font-awesome-icon>
        <div class="notification_container_button button-accept" @click.stop="notificationAccept">Say Hi...</div>
      </div>

    </div>
    <div v-else-if="isProjectNotification" class="notification_project notification_container">
      <font-awesome-icon  :icon="['fas','clipboard']" class="clipboard-icon" @click="$emit('update-view', 'projects')"></font-awesome-icon>

      <div class="notification_container_message">
        <h6 v-if="notification.type == 'received'">{{notification.message}} <span>{{projectName}}</span></h6>
        <h6 v-else><span>{{senderName}}</span> {{notification.message}} <span>{{projectName}}</span></h6>
      </div>

      <div v-if="notification.type == 'received'" class="notification_container_received">
        <div class="notification_container_button button-accept" @click.stop="notificationAccept">Accept</div>
        <div class="notification_container_button button-deny" @click.stop="notificationDeny">Deny</div>
      </div>
      <div v-if="notification.type == 'accepted'" class="notification_container_accepted">
        <font-awesome-icon :icon="['fas','trash']" class="trash-icon" @click.stop="notificationDeny"></font-awesome-icon>
        <div class="notification_container_button button-accept" @click.stop="notificationAccept">Say Hi...</div>
      </div>
    </div>

  </div>
</template>

<script src="./user-notification.js"></script>
<style src="./user-notification.scss" lang="scss"></style>
