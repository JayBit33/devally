<template>
  <div class="user-options-dropdown">
    <ul>
      <li @click="$emit('optionSelected')"><router-link to="/profile" class="link" >Account Profile</router-link></li>
      <li @click="$emit('optionSelected')"><router-link to="/profile" class="link" >Projects</router-link></li>
      <li @click="$emit('optionSelected')"><router-link to="/" class="link" >Sign Out</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserOptionsDropdown',
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
@import "../scss/variables";

  .user-options-dropdown {
    ul {
      list-style-type: none;
      padding: 0;
      width: 10rem;
      background-color: $secondary;
      color: white;
      position: absolute;
      right: 1.4%;
      top: 3.75rem;
      &:before {
        display: block;
        content: '';
        transform: rotate(-45deg);
        width: 20px;
        height: 20px;
        background-color: $secondary;
        margin: 0 auto;
        position: relative;
        bottom: .5rem;
      }
      li {
        text-align: center;
        text-decoration: none;
        padding: 1rem 0;
        border-top: .125rem solid white;
        .link {
          font: 400 1rem 'Montserrat';
          color: white;
        }
      }
    }
  }

</style>
