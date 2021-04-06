<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-connections">
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
    <user-modal
      v-if="isUserModalOpen"
      title="Want to add more connections?"
      btnTxt="Find people..."
      :btnIcon="['fas','user-friends']"
      :imageName="'201brain-knowledge.png'"
      :styles="{'backgroundColor': '#FF8A85', 'color': 'black', 'buttonBackground': '#123D50'}"
      @button-click="handleUserModalButton"
      @close-modal="closeModal"
    />
    <!-- <filter-search  style="position: relative; left: 615px; top: -1px;" /> -->
    <div class="connections">
      <connection-card v-for="connection in connectionsShown" :connection="connection" :key="connection.id" @delete-click="removeConnection(connection)" />
    </div>

    <el-pagination
      v-if="!isLoading"
      id="pagination"
      background
      layout="prev, pager, next"
      :pageSize="pageSize"
      :total="connections ? connections.length : 0"
      @current-change="updateDisplayedUsers"
    >
    </el-pagination>
  </div>
</template>

<script src="./user-connections.js"></script>
<style src="./user-connections.scss" lang="scss" scoped></style>
