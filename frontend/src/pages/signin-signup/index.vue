<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="signin-signup">
    <div v-if="loggingIn" class="signin">
      <div class="signin_image">
        <img src="../../assets/signin.svg" />
      </div>
      <div class="signin_container">
        <h1>Login</h1>
        <h4>Don't have an account yet?<span id="signup" @click="loggingIn = false">Sign Up</span></h4>
        <form @submit.prevent>
          <label>Email Address</label>
          <input type="email" v-model="signInForm.email" class="input" />
          <label>Password<span id="forgot_pw">Forgot Password</span></label>
          <input type="password" v-model="signInForm.password" class="input" />
          <div id="remember">
            <input type="checkbox" id="checkbox" />
            <p>Remember me</p>
          </div>
          <button type="submit" @click="submitForm">LOGIN</button>
        </form>
        <div class="signin-options">
          <span id="login-option_text">or login with</span>
          <div class="options">
            <button id="google" ><img src="../../assets/google_logo.png" />Google</button>
            <button id="github" ><img src="../../assets/github_logo.png" />Github</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="create-account">
      <div class="create-account_heading">
        <div>
          <h1>Create Account</h1>
          <h4>Find and|or become technical co-founders</h4>
        </div>
        <div class="image_container">
          <img src="../../assets/createaccount.svg" />
        </div>
      </div>
      <div class="create-account_body">
        <div class="account-options">
          <div class="account-options_visionary" :class="{'active': visionaryAccount}" @click="selectVisAccountType">
            <h3>visionary account</h3>
            <p> You have ideas and want to find technical co-founders</p>
          </div>
          <div class="account-options_developer" :class="{'active': developerAccount}" @click="selectDevAccountType">
            <h3>developer account</h3>
            <p>you are a creative professional looking for a project to join as a technical co-founder. developer accounts come with visionary accounts by default.</p>
          </div>
        </div>
        <form @submit.prevent>
          <div class="firstname">
            <label>First Name</label>
            <input type="text" class="input" />
          </div>
          <div class="lastname">
            <label>Last Name</label>
            <input type="text" class="input" />
          </div>
          <div class="email">
            <label>Email Address</label>
            <input type="text" class="input" />
          </div>
          <div class="password">
            <label>Password</label>
            <input type="password" class="input" />
          </div>
          <div class="confirm">
            <label>Confirm Password</label>
            <input type="password" class="input" />
            <button type="text" class="signup">sign up</button>
          </div>
          <div class="already_member">
            <label>Already a member?</label>
            <button type="text" class="login" @click="loggingIn = true">login</button>
            <span id="login-option_text">or login with</span>
            <div class="options">
              <button id="google" ><img src="../../assets/google_logo.png" />Google</button>
              <button id="github" ><img src="../../assets/github_logo.png" />Github</button>
          </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./signin-signup.js" ></script>
<style src="./signin-signup.scss" lang="scss" scoped ></style>
