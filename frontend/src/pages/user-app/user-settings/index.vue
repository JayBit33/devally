<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="user-settings">
    <font-awesome-icon class="user-settings_icon" :icon="['fas','cog']" ></font-awesome-icon>
    <h1 class="user-settings_title">Settings</h1>
    <div class="user-settings_grid">
      <div class="user-settings_grid_notifications">
        <h2>Notifications</h2>
        <h4>Notify me by email when</h4>

        <div class="option1">
          <h3>I receive a message</h3>
          <el-switch
            v-model="notify_message_received"
            active-color="#6BA487"
            inactive-color="#A9AFB5"
            @click="updateNotifyMessageReceived">
          </el-switch>
        </div>

        <div class="option2">
          <h3>Someone adds me as a connection</h3>
          <el-switch
            v-model="notify_added_connection"
            active-color="#6BA487"
            inactive-color="#A9AFB5"
            @click="updateNotifyAddedConnection">
          </el-switch>
        </div>

        <div class="option3">
          <h3>I receive an invitation to join a project</h3>
          <el-switch
            v-model="notify_project_invitation"
            active-color="#6BA487"
            inactive-color="#A9AFB5"
            @click="updateNotifyProjectInvite">
          </el-switch>
        </div>
      </div>
      <div class="user-settings_grid_subscriptions">
        <h2>Subscription Emails</h2>
        <h4>Subscribe me to</h4>

        <div class="option1">
          <h3>Featured projects</h3>
          <el-switch
            v-model="subscribe_featured_projects"
            active-color="#6BA487"
            inactive-color="#A9AFB5"
            @click="updateFeaturedProjects">
          </el-switch>
        </div>

        <div class="option2">
          <h3>Weekly newsletters</h3>
          <el-switch
            v-model="subscribe_weekly_newsletter"
            active-color="#6BA487"
            inactive-color="#A9AFB5"
            @click="updateWeeklyNewsletter">
          </el-switch>
        </div>

        <div class="option3">
          <h3>Devally updates</h3>
          <el-switch
            v-model="subscribe_devally_updates"
            active-color="#6BA487"
            inactive-color="#A9AFB5"
            @click="updateDevallyUpdates">
          </el-switch>
        </div>
      </div>
      <div class="user-settings_grid_billing">
        <h2>Billing</h2>
        <h4>Payment information</h4>

        <h5>Billing Address</h5>
        <table>
          <tr>
            <label for="address">Address</label>
          </tr>
          <tr>
            <td colspan="7" style="padding-top: 0; padding-bottom: 2rem;">
              <input type="text" name="address"  class="address" style="width: 500px" />
            </td>
          </tr>
          <tr>
            <td >
            <label for="state" >State</label>
              <input type="text" name="state" />
            </td>
            <td>
              <label for="city">City</label>
              <input type="text" name="city" />
            </td>
            <td>
              <label for="zip">Zip</label>
              <input type="text" name="zip" />
            </td>
          </tr>
          <tr>
            <td>
              <h5>Card Details</h5>
            </td>
          </tr>
          <tr>
            <td>
              <label for="card" >Name as it appears on card</label>
              <input type="text" name="card" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="card">Card #</label>
              <input type="text" name="card" />
            </td>
            <td>
              <label for="exp">Exp. Date</label>
              <input type="text" name="exp" />
            </td>
          </tr>
        </table>
      </div>
      <div class="user-settings_grid_password">
        <h2>Password</h2>
        <h4>change password</h4>
        <button class="update_btn">Update Password</button>
      </div>
    </div>
    <button class="save_settings" >Save Settings</button>
  </div>
</template>

<script src="./user-settings.js"></script>
<style src="./user-settings.scss" lang="scss" scoped></style>
