<template>
  <div class="create-account">
    <form class="create-account_form" @submit.prevent="createNewAccount" >
      <label for="username">Username</label>
      <input v-model="username" name="username" />
      <br>
      <br>
      <label for="firstname">First Name</label>
      <input v-model="firstname" name="firstname" />
      <br/>
      <br/>
      <br/>
      <label for="lastname">Last Name</label>
      <input v-model="lastname" name="lastname" />
      <br>
      <br>
      <label for="accountType">Account Type</label>
      <select v-model="accountType" name="accountType" >
          <option value="entrepreneur">Entrepreneur</option>
          <option value="professional">Professional</option>
      </select>
      <br>
      <br>
      <label for="browser">Choose your interests:</label>
      <br>
      <br>
      <select id="browsers" v-model="interests" multiple>
        <option value="Website">Website</option>
        <option value="Software As A Service">Software As A Service</option>
        <option value="Mobile Application">Mobile Application</option>
        <option value="Software">Software</option>
        <option value="Ecommerce">Ecommerce</option>
        <option value="Other">Other</option>
      </select>
      <br>
      <br>
      <button class="submit-btn" >Create Account</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateAccount',
  data() {
    return {
      username: null,
      firstname: null,
      lastname: null,
      accountType: null,
      interests: []
    }
  },
  methods: {
    createNewAccount() {
      console.log('account creating!');
      const user = {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        accountType: this.accountType,
        interests: this.interests
      }

      console.log({user})
    }
  }
}
</script>

<style lang="scss" scoped>
.create-account {
  display: block;
  height: 900px;
  &_form {
      text-align: center;
  }
}
  label {
    padding: 0 1rem;
  }

</style>
