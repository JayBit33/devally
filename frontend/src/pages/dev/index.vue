<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="dev">
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

    <div v-if="isLoggedIn" class="user_actions">
      <font-awesome-icon class="action-icon-main" :icon="['fas', 'ellipsis-h']" @click="toggleActions" />

      <div v-if="isActionsOpen" class="user_actions_content" ref="user_actions_content">
        <div class="user_actions_content-action action-rate" @click="rateUser">
          <div class="action-icon">
            <font-awesome-icon :icon="['fas', 'star-half-alt']" />
          </div>
          <h4>Rate User</h4>
        </div>
        <div class="user_actions_content-action action-report" @click="reportUser">
          <div class="action-icon">
            <font-awesome-icon :icon="['fas', 'exclamation']" />
          </div>
          <h4>Report User</h4>
        </div>
      </div>
    </div>

    <div v-if="isReportAction" class="user_report">
      <report-user-modal :user="user" @report-modal-close="toggleReportUser" />
    </div>
    <div v-if="isRateAction" class="user_rate">
      <rate-user-modal :user="user" @rate-modal-close="toggleRateUser" @toast-update="toast = $event" />
    </div>
    <div v-if="isInviteAction" class="user_invite">
      <invite-to-project-modal :user="user" :projects="inviteProjects" @modal-close="toggleInviteUser" @toast-update="toast = $event" />
    </div>

    <div class="user_profile">

      <div class="user_profile_stars">
        <div v-for="i in 5" :key="'star-' + i" class="star" :class="{'star-s': i == 1 || i == 5, 'star-m': i == 2 || i == 4, 'star-b': i == 3,}">
          <font-awesome-icon v-if="rating >= i" :icon="['fas', 'star']" />
          <font-awesome-icon v-else :icon="['far', 'star']" />
        </div>
      </div>

      <div class="user_profile_identity">
        <img class="user_profile_identity-image" v-if="user && user.profile_image" :src="getImage(user.profile_image, true)" />
        <h2 class="user_profile_identity-name">{{user.firstname}} {{user.lastname}}</h2>
        <h2 class="user_profile_identity-type">{{user.user_type_id == '1' ? 'Developer & Visionary' : 'Visionary'}}</h2>
        <font-awesome-icon v-if="user.dev_github_link" class="user_profile_identity-github" :icon="['fab', 'github']" @click="openLink(user.dev_github_link)" />
      </div>

      <div class="user_profile_buttons" :class="{'disabled-buttons': !isLoggedIn}">
        <div class="user_profile_buttons-button message-button" @click="messageClick">
          <h4>Message</h4>
        </div>
        <div class="user_profile_buttons-button connection-button" @click="addConnection">
          <h4>Add connection</h4>
        </div>
        <div class="user_profile_buttons-button invite-button" @click="inviteToProject">
          <h4>Invite to project</h4>
        </div>
      </div>

      <div v-if="user" class="user_profile_info">
        <div v-if="user.bio" class="user_profile_info-field bio-field">
          <h2>Bio</h2>
          <h4>{{user.bio}}</h4>
        </div>
        <div v-if="user.hiring_options" class="user_profile_info-field hiring-options-field">
          <h2>Hiring Options</h2>
          <h4>{{user.hiring_options.join(' & ')}}</h4>
        </div>
        <div v-if="user.dev_categories" class="user_profile_info-field categories-field">
          <h2>Interested Categories</h2>
          <h4>{{user.dev_categories.join(' | ')}}</h4>
        </div>
        <div v-if="user.dev_roles" class="user_profile_info-field skills-field">
          <h2>Skills</h2>
          <h4>{{user.dev_roles.join(' | ')}}</h4>
        </div>
      </div>

      <div v-if="user.dev_portfolio_link" class="user_profile_portfolio" @click="openLink(user.dev_portfolio_link)">
        <h4>View my portfolio</h4>
        <div class="arrow">
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </div>
      </div>

    </div>
  </div>
</template>

<script src="./dev.js"></script>
<style src="./dev.scss" lang="scss" scoped></style>
