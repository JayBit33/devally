<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-settings">
    
      <div class="user-settings_notifications-subscriptions user-settings_content" >
        <div class="user-settings_content_icon">
          <font-awesome-icon :icon="['fas','envelope']" class="view-icon"></font-awesome-icon>
        </div>
        <h2>Notification and Subscriptions</h2>
        <p>Notify me by email when</p>

        <div class="options">
          <div class="user-settings_notifications">
            <div class="option1">
              <h3>I receive a message</h3>
              <el-switch
                v-model="notify_message_received"
                active-color="#4B687E"
                inactive-color="#A9AFB5"
                @click="updateNotifyMessageReceived">
              </el-switch>
            </div>

            <div class="option2">
              <h3>Someone adds me as a connection</h3>
              <el-switch
                v-model="notify_added_connection"
                active-color="#4B687E"
                inactive-color="#A9AFB5"
                @click="updateNotifyAddedConnection">
              </el-switch>
            </div>

            <div class="option3">
              <h3>I receive an invitation to join a project</h3>
              <el-switch
                v-model="notify_project_invitation"
                active-color="#4B687E"
                inactive-color="#A9AFB5"
                @click="updateNotifyProjectInvite">
              </el-switch>
            </div>
          </div>
          <div class="user-settings_subscriptions">

            <div class="option1">
              <h3>Featured projects</h3>
              <el-switch
                v-model="subscribe_featured_projects"
                active-color="#4B687E"
                inactive-color="#A9AFB5"
                @click="updateFeaturedProjects">
              </el-switch>
            </div>

            <div class="option2">
              <h3>Weekly newsletters</h3>
              <el-switch
                v-model="subscribe_weekly_newsletter"
                active-color="#4B687E"
                inactive-color="#A9AFB5"
                @click="updateWeeklyNewsletter">
              </el-switch>
            </div>

            <div class="option3">
              <h3>Devally updates</h3>
              <el-switch
                v-model="subscribe_devally_updates"
                active-color="#4B687E"
                inactive-color="#A9AFB5"
                @click="updateDevallyUpdates">
              </el-switch>
            </div>
          </div>
        </div>
      </div>

      <div class="user-settings_billing user-settings_content">
        <div class="user-settings_content_icon">
          <font-awesome-icon :icon="['fas','credit-card']" class="view-icon"></font-awesome-icon>
        </div>

        <h2>Billing</h2>
        <p>Payment information</p>

        <div class="columns">
          <div class="billing-address-column column">
            <h5>Billing Address</h5>

            <div class="row">
              <div class="field">
                <label for="address">Address</label>
                <input type="text" name="address"  class="address" style="width: 500px" />
              </div>
            </div>

            <div class="row">
              <div class="field">
                <label for="state" >State</label>
                <input type="text" name="state" />
              </div>
              <div class="field">
                <label for="city">City</label>
                <input type="text" name="city" />
              </div>
              <div class="field">
                <label for="zip">Zip</label>
                <input type="text" name="zip" />
              </div>
            </div>

          </div>
          <div class="card-details-column column">
            <h5>Card Details</h5>

            <div class="row">
              <div class="field">
                <label for="card" >Name as it appears on card</label>
                <input type="text" name="card" />
              </div>
            </div>

            <div class="row">
              <div class="field">
                <label for="card">Card #</label>
                <input type="text" name="card" />
              </div>
              <div class="field">
                <label for="exp">Exp. Date</label>
                <input type="text" name="exp" />
              </div>
            </div>


          </div>
        </div>
      </div>

      <div class="user-settings_password user-settings_content">
        <div class="user-settings_content_icon">
          <font-awesome-icon :icon="['fas','lock']" class="view-icon"></font-awesome-icon>
        </div>

        <h2>Password</h2>

        <div class="fields">
          <div class="field current-password">
            <label for="current-password">Current Password</label>
            <input type="password" name="current-password" v-model="current_password" />
          </div>
          <div class="field new-password" :class="{'not-matching': notMatchingNewPassword, 'matching': !(notMatchingNewPassword || isNewPasswordEmpty)}">
            <label for="new-password">New Password</label>
            <input type="password" name="new-password" v-model="new_password"/>
          </div>
          <div class="field confirm-new-password" :class="{'not-matching': notMatchingNewPassword, 'matching': !(notMatchingNewPassword || isNewPasswordEmpty)}">
            <label for="confirm-new-password">Confirm New Password</label>
            <input type="password" name="confirm-new-password" v-model="confirmed_new_password" @keypress.enter.prevent="updateUserPassword" />
          </div>
          <p v-if="notMatchingNewPassword" class="not-matching-message">* New password fields do not match *</p>
        </div>

        <button class="update_btn" @click="updateUserPassword">Update</button>
      </div>

      <div class="save_settings_container">
          <button class="save_settings" @click="saveSettings">Save Settings</button>
      </div>
  </div>
</template>

<script src="./user-settings.js"></script>
<style src="./user-settings.scss" lang="scss" scoped></style>
