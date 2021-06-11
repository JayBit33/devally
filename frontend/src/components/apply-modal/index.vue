<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="apply-modal" ref="apply_modal">

    <div class="apply-modal_close" @click="$emit('apply-modal-close')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>

    <div class="apply-modal_heading">
      <h4 class="apply-modal_heading_name">{{user.firstname}} {{user.lastname}}</h4>
    </div>

    <div class="apply-modal_project">
      <h2>Project I want to apply to...</h2>
      <p>{{project.name}}</p>
    </div>

    <div class="apply-modal_position">
      <h2>Position I want to apply to...</h2>
      <p>{{position.position}}</p>
    </div>

    <div class="apply-modal_extra-info">
      <h2>Extra information</h2>
      <textarea name="extra-info" id="" cols="30" rows="10" v-model="extraInfo" :disabled="!isSendingApplication"></textarea>
    </div>

    <div v-if="isSendingApplication" class="apply-modal_buttons-sending">
      <button class="apply-button-send" @click="sendApplication">Send</button>
      <button class="apply-button-cancel" @click="$emit('apply-modal-close')">Cancel</button>
    </div>
    <div v-if="!isSendingApplication" class="apply-modal_buttons-receiving">
      <button class="apply-button-view" @click="viewUser">View user</button>
      <button class="apply-button-accept" @click="$emit('apply-modal-accept')">Accept</button>
      <button class="apply-button-deny" @click="$emit('apply-modal-deny')">Deny</button>
    </div>

  </div>
</template>

<script src="./apply-modal.js"></script>
<style src="./apply-modal.scss" lang="scss"></style>
