<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="create-account">
    <el-steps :active="activeStep" align-center finish-status="success" class="steps">
      <el-step title="Credentials" class="title" ></el-step>
      <el-step title="Account Info" class="title"></el-step>
      <el-step title="Details" class="title"></el-step>
    </el-steps>
    <h2 v-if="activeStep === 0">Create Account</h2>
    <h2 v-if="activeStep === 1">Addittional Information</h2>
    <h2 v-if="activeStep === 2">Account Details</h2>
    <div v-if="activeStep === 0" class="create-account_form">
      <font-awesome-icon :icon="['fas','at']" class="login_icons"/>
      <input type="email" v-model="createForm.email" placeholder="Email"/>
      <font-awesome-icon :icon="['fas','lock']" class="login_icons"/>
      <input type="password" v-model="createForm.password" placeholder="Password" />
      <font-awesome-icon :icon="['fas','lock']" class="login_icons"/>
      <input type="password" v-model="createForm.passwordCheck" placeholder="Confirm Password" />
      <p>Already have an account? Sign In</p>
      <button type="submit" @click="nextStep">Next</button>
    </div>
    <!-- Step 2 -->
    <div v-if="activeStep === 1" class="create-account_form2">
      <div class="input">
      <label>Username</label>
      <input type="text" v-model="createForm.username" />
      </div>
      <div class="input">
      <label>Country</label>
      <input type="text" v-model="createForm.country"  />
      </div>
      <div class="input">
      <label>First Name</label>
      <input type="text" v-model="createForm.firstname"  />
      </div>
      <div class="input">
      <label>State</label>
      <input type="text" v-model="createForm.state"  />
      </div>
      <div class="input">
      <label>Last Name</label>
      <input type="text" v-model="createForm.lastname"  />
      </div>
      <div class="block">
      <label>Account Type</label>
      <br>
       <el-radio-group v-model="createForm.account_type" class="radio-group" required="true">
        <el-radio-button label="Developer" class="radio_btn"></el-radio-button>
        <el-radio-button label="Entrepreneur" class="radio_btn"></el-radio-button>
        <el-radio-button label="Both" class="radio_btn"></el-radio-button>
      </el-radio-group>
      </div>
      <button type="submit" class="form2_submit" @click="nextStep">Next</button>
    </div>
    <!-- Step 3 -->
    <div v-if="activeStep === 2 && createForm.account_type === 'Developer'" class="create-account_form3">
      <div class="input">
        <label>Payment Options</label>
        <el-select v-model="createForm.hiring_options" multiple placeholder="Hiring Option" class="details payment-detail">
        <el-option
          v-for="item in ['Shares','Flat Rate']"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
        </el-select>
      </div>
      <div class="input">
        <label>Roles</label>
        <el-select v-model="createForm.roles" multiple placeholder="Skills" class="details roles-detail">
          <el-option
            v-for="item in ['Frontend Developer','Backend Developer', 'Fullstack Developer', 'Graphic Designer', 'UX/UI','Devops', 'Project Manager']"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="input">
        <label>Skills</label>
        <el-select v-model="createForm.skills" multiple placeholder="Skills" class="details skills-detail">
          <el-option
            v-for="item in ['Websites','Mobile Apps', 'Ecommerce Sites','SAAS', 'IOT']"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="input">
        <label>Bio Description</label>
        <el-input type="textarea" class="form3_description" v-model="createForm.description"></el-input>
      </div>
      <button type="submit" class="form3_submit" @click="nextStep">Create Account</button>
      </div>
  </div>
</template>

<script src="./create-account.js"></script>
<style src="./create-account.scss" lang="scss" scoped></style>
