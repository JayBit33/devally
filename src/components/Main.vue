<template>
  <div class="main">
    <div class="user-profile">
      <img :src="$store.state.user.profileImage" />
      <h4>{{ $store.getters.fullName }}</h4>
      <button class="btn">Collaborate</button>
      <button class="btn">Message</button>
    </div>
    <div class="user-info">
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
        <h4>{{ rating }}</h4>
      </div>
      <div class="user-info_skills">
        <h3>Skills:</h3>
        <h4>{{ skillsFormatted }}</h4>
      </div>
      <div class="user-bio">
        <h3>Bio</h3>
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
        <h3>Portfolio</h3>
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
export default {
  name: "Main",
  props: {},
  data() {
    return {
      accountType: this.$store.state.user.accountType,
      rating: this.$store.state.user.rating || 0,
      skills: this.$store.state.user.skills,
    };
  },
  computed: {
    skillsFormatted() {
      return this.skills.map((skill) => skill).join(", ");
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr 4fr;
  column-gap: 2rem;
  margin-top: 4rem;
  margin: 2rem 7.5rem 0 7.5rem;
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
      background-color: green;
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
    margin-top: 3rem;
    display: grid;
    grid-template-columns: minmax(200px, 300px);
    gap: 1rem;

    h3 {
      margin-top: 0;
      text-transform: uppercase;
    }
    .btn {
      background-color: green;
      color: white;
      font-size: 1.125rem;
      padding: 0.25rem 1rem;
      border-radius: 0.5rem;
      border: none;
      margin-top: 1.5rem;
      cursor: pointer;
    }

    .user-bio {
      grid-column: 1 / 3;
      margin-top: 3rem;
      p {
        font-size: 1.25rem;
        line-height: 2rem;
      }
    }

    .user-portfolio {
      margin-top: 3rem;
      h3 {
        font-size: 1.75rem;
        text-decoration: underline;
        text-underline-offset: 0.25rem;
        text-transform: none;
        margin-bottom: 2rem;
      }
      img {
        width: 200px;
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
}
</style>
