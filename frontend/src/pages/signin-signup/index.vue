<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="signin-signup">
    <Toast 
      v-if="toast && toast.isShown"
      :type="toast.type"
      :message="toast.message"
      :hasAction="toast.hasAction"
      :duration="toast.duration"
      @toast-action-click="handleToastAction"
      @toast-close="closeToast"
    />
    
    <div v-if="loggingIn" class="signin">
      <div class="signin_image">
        <img src="../../assets/signin.svg" />
      </div>
      <div class="signin_container">
        <h1>Login</h1>
        <h4>Don't have an account yet?<span id="signup" @click="loggingIn = false">Sign Up</span></h4>
        <form @submit.prevent>
          <label>Email Address</label>
          <input type="email" ref="email_input" v-model="signInForm.email" class="input" required :class="{'error': emailError}" @input="removeEmailError"/>
          <label>Password<span id="forgot_pw">Forgot Password</span></label>
          <input type="password" v-model="signInForm.password" required class="input" :class="{'error': passwordError}" @input="removePasswordError"/>
          <div id="remember">
            <input type="checkbox" id="checkbox" />
            <p>Remember me</p>
          </div>
          <button type="submit" @click="submitForm">LOGIN</button>
        </form>
        <div class="signin-options">
          <span id="login-option_text">or login with</span>
          <div class="options">
            <button id="google" v-google-signin-button="clientId" class="google-signin-button" ><img src="../../assets/google_logo.png" />Google</button>
            <button id="github" ><img src="../../assets/github_logo.png" />Github</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="create-account">
      <div class="create-account_heading">
        <div>
          <h1>Create Account</h1>
          <h4>Find and|or become a technical co-founder</h4>
        </div>
        <div class="image_container">
          <img src="../../assets/createaccount.svg" />
        </div>
      </div>
      <div class="create-account_body">
        <div class="account-options">
          <div class="account-options_visionary" :class="{'active': createForm.accountType === 'visionary'}" @click="selectVisAccountType">
            <h3>visionary account</h3>
            <p> You have an idea and want to find technical co-founders or developers for hire.</p>
          </div>
          <div class="account-options_developer" :class="{'active': createForm.accountType === 'developer'}" @click="selectDevAccountType">
            <h3>developer account</h3>
            <p>you are a creative professional looking for a project to join as a technical co-founder. developer accounts come with visionary accounts by default.</p>
          </div>
        </div>
        <form @submit.prevent>
          <div class="firstname">
            <label>First Name</label>
            <input v-model="createForm.firstName" type="text" class="input" />
          </div>
          <div class="lastname">
            <label>Last Name</label>
            <input v-model="createForm.lastName" type="text" class="input" />
          </div>
          <div class="email">
            <label>Email Address</label>
            <input v-model="createForm.email" type="email" placeholder="youremail@domain.com" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" class="input" />
          </div>
          <div class="password">
            <label>Password</label>
            <input v-model="createForm.password" type="password" class="input" />
          </div>
          <div class="confirm">
            <label>Confirm Password</label>
            <input v-model="createForm.confirmPassword" type="password" class="input" />
          </div>
          <div class="alt-signup">
            <button type="submit" class="signup" @click="validateNewAccount">sign up</button>
            <div id="login-option">
              <span id="login-option_text">or signup with</span>
            </div>
            <div class="options">
              <button id="google" v-google-signin-button="clientId" class="google-signin-button" ><img src="../../assets/google_logo.png" />Google</button>
              <button id="github" ><img src="../../assets/github_logo.png" />Github</button>
            </div>
          </div>
          <div class="already_member">
            <label>Already a member?</label>
            <button type="text" class="login" @click="loggingIn = true">login</button> 
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./signin-signup.js" ></script>
<style src="./signin-signup.scss" lang="scss" scoped ></style>
