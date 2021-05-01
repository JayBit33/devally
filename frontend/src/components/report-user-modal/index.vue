<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="report-user-modal" ref="report_user_modal">

    <div class="report-user-modal_close" @click="$emit('report-modal-close')">
      <font-awesome-icon :icon="['fas', 'times']" />
    </div>

    <div class="report-user-modal_heading">
      <h4 class="report-user-modal_heading_report">Report User</h4>
      <h4 class="report-user-modal_heading_name">{{user.firstname}} {{user.lastname}}</h4>
    </div>

    <div class="report-user-modal_report-option">
      <h2>Reason for reporting <span>*</span></h2>
      <dropdown
        class="report-option-dropdown"
        :items="allReportOptions"
        :selectedItems="selectedReportOption"
        @item-selection="selectedReportOption = $event"
      >
      </dropdown>
    </div>

    <div class="report-user-modal_extra-info">
      <h2>Extra information</h2>
      <textarea name="extra-info" id="" cols="30" rows="10" v-model="extraInfo"></textarea>
    </div>

    <div class="report-user-modal_buttons">
      <button class="report-button-send" @click="sendReport">Send report</button>
      <button class="report-button-cancel" @click="$emit('report-modal-close')">Cancel</button>
    </div>

  </div>
</template>

<script src="./report-user-modal.js"></script>
<style src="./report-user-modal.scss" lang="scss"></style>
