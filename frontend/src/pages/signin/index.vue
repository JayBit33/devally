<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="signin">
    <el-alert
      v-if="loginErrorMsg"
      class="signin_error-msg"
      :title="loginErrorMsg"
      type="error"
      center
      effect="dark"
      @close="alertClosed">
    </el-alert>
    <font-awesome-icon :icon="['fas','user-circle']" class="user_icon"/>
    <form @submit.prevent class="signin_form">
      <font-awesome-icon :icon="['fas','user']" class="login_icons"/>
      <input type="email" v-model="signInForm.email" placeholder="Login" required/>
      <font-awesome-icon :icon="['fas','lock']" class="login_icons"/>
      <input type="password" v-model="signInForm.password" placeholder="Password" required/>
      <p>Forgot password?</p>
      <button type="submit" @click="submitForm">Sign In</button>
    </form>
    <p id="or">OR</p>
    <router-link to="/create-account" class="link"><h5>Create Account</h5></router-link>
  </div>
</template>

<script src="./signin.js"></script>
<style src="./signin.scss" lang="scss" scoped></style>
