<template>
  <div class="main">
    <div class="user-profile">
      <img :src="require('@/assets/' + $store.state.user.profileImage)" />
      <h4>{{ $store.getters.fullName }}</h4>
      <!-- <button class="btn">Collaborate</button>
      <button class="btn">Message</button> -->
    </div>
    <div class="user-info">
      <div class="user-info_heading">
        <h2>User Information</h2>
        <button>Edit</button>
      </div>
      <div></div>
      <div class="user-info_accounttype">
        <h3>Account Type:</h3>
        <h4>{{ $store.state.user.accountType.join(", ") }}</h4>
      </div>
      <div class="user-info_hiringoptions">
        <h3>Hiring Options:</h3>
        <h4>{{ $store.state.user.availableHireOptions.join(", ") }}</h4>
      </div>
      <div class="user-info_rating">
        <h3>Rating:</h3>
        <ul>
          <li v-for="rate in rating / 2" :key="rate"><font-awesome-icon style="color: #F0DB4F; font-size: 18px;" :icon="['fas', 'star']" /></li>
        </ul>
      </div>
      <div class="user-info_skills">
        <h3>Skills:</h3>
        <h4>{{ skillsFormatted }}</h4>
      </div>
      <div class="user-bio">
        <div class="user-bio_heading" >
          <h3>Bio</h3>
          <button>Edit</button>
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus
          in cum blanditiis ratione ad praesentium nobis voluptates nemo maxime
          beatae, corporis ullam officia dolor consectetur modi eius cumque?
          Rem, earum? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Ipsa rerum aliquam iusto consectetur unde et quos delectus laboriosam
          voluptatibus odio eum deserunt ab, accusamus a. Quasi deleniti neque
          mollitia quia! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Quae asperiores, eius fugiat explicabo, a reiciendis quibusdam
          voluptates ipsum laudantium minima nemo sapiente dicta nostrum nisi
          eum dolore consequuntur debitis ipsa.
        </p>
      </div>

      <div class="user-portfolio">
        <div class="user-portfolio_heading">
          <h3>Portfolio</h3>
          <button>Edit</button>
        </div>
        <div class="user-portfolio_images">
          <img src="images/user_profile.jpg" />
          <img src="images/user_profile.jpg" />
          <img src="images/user_profile.jpg" />
          <img src="images/user_profile.jpg" />
          <img src="images/user_profile.jpg" />
          <img src="images/user_profile.jpg" />
          <img src="images/user_profile.jpg" />
          <img src="images/user_profile.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: "UserProfile",
  props: ['id'],
  data() {
    return {
      accountType: this.$store.state.user.accountType,
      rating: this.$store.state.user.rating || 0,
      skills: this.$store.state.user.skills,
    };
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    skillsFormatted() {
      return this.skills.map((skill) => skill).join(", ");
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.main {
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-template-columns: 1fr 4fr;
  column-gap: 8rem;
  max-width: 1280px;
  // height: 1300px;
  margin: 2rem 7.5rem 0rem 7.5rem;
  overflow: hidden;

  .user-profile {
    text-align: center;
    img {
      width: 15rem;
      height: 15rem;
      padding: 10px;
      background: #e4dddd;
      border: 0.125rem solid #dddddd;
    }
    h4 {
      font-family: inherit;
      font-size: 1.5rem;
      margin-top: 1rem;
    }
    .btn {
      background-color: $button-primary;
      color: white;
      font-size: 1.125rem;
      padding: 0.5rem 2rem;
      margin-top: 1rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
    }
  }

  .user-info {
    height: 250px;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: minmax(300px, 300px);
    gap: 1rem;

    h3 {
      margin-top: 0;
      text-transform: uppercase;
    }
    .btn {
      background-color: $button-primary;
      color: white;
      font-size: 1.125rem;
      padding: 0.25rem 1rem;
      border-radius: 0.5rem;
      border: none;
      margin-top: 1.5rem;
      cursor: pointer;
    }

    &_heading {
      margin-bottom: 1rem;
      h2, button {
        display: inline;
      }
      h2 {
        margin-right: 2rem;
      }
    }

    &_rating {
      ul {
        padding: 0;
      }
      ul li {
        list-style-type: none;
        display: inline;
      }
    }

    .user-bio {
      grid-column: 1 / 3;
      margin-top: 3rem;
      p {
        font-size: 1.25rem;
        line-height: 2rem;
      }
      &_heading {
        h3, button {
          display: inline;
        }
        h3 {
          margin-right: 2rem;
        }
      }
    }

    .user-portfolio {
      margin-top: 3rem;
      h3 {
        font-size: 1.75rem;
        text-decoration: underline;
        text-underline-offset: 0.25rem;
        text-transform: none;
      }
      img {
        width: 200px;
      }
      &_heading {
        margin-bottom: 2rem;
        h3, button {
          display: inline;
        }
        h3 {
          margin-right: 2rem;
        }
      }
      &_images {
        display: grid;
        width: 80%;
        grid-template-columns: repeat(4, 1fr);
        row-gap: 2rem;
        column-gap: 2rem;
      }
    }
  }

  button {
    background-color: $button-primary;
    color: white;
    text-transform: uppercase;
    font-weight: 700;
    border: none;
    outline: none;
    padding: .5rem;
    position: relative;
    bottom: .125rem;
    cursor: pointer;
  }
}
@media (min-width: 1700px)  {
  .main {
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
