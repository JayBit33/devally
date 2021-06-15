<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="main">
    <div class="home-banner">
      <div class="col-1">
        <h1>Build A Team And</h1>
        <h1>Make Your Tech Idea A Reality</h1>
        <h4>Community of developers looking to join a team</h4>
        <h4>and build the next best thing since Jarvis.</h4>
        <button class="btn">
          <router-link to="/devs" class="link">Get Started</router-link>
        </button>
      </div>
      <div class="col-2">
        <img src="images/3593965.jpg" />
      </div>
    </div>

    <div class="choose-account-type">
      <button :class="{ 'active' : visonaryCopywrite }" @click="toggleContent('visionary')">Visionary</button>
      <button :class="{ 'active' : developerCopywrite }" @click="toggleContent('developer')">Developer</button>
    </div>

    <div v-if="visonaryCopywrite">
      <div class="getting-started">
        <h1>Getting Started Is Simple</h1>
        <div class="getting-started_steps">
          <div>
            <img src="images/4071498.jpg" style="width: 300px" />
            <h2>Create A Project</h2>
            <p>
              The path to making your idea a reality starts here! In 5 minutes or
              less you can create an account, a project and start searching for
              the people you need to bring it to life. Don't let someone beat you
              to the finish line. Get started on your project today!
            </p>
            <router-link to="/devs" class="link"
              ><button>Create Project</button></router-link
            >
          </div>
          <div>
            <img src="images/team.png" style="width: 300px" />
            <h2>Build A Team</h2>
            <p>
              Great teams build great products. Search our community to find the
              professionals you need. Whether you are in need of a graphic
              designer, web developer, mobile app dev, project manager, dev-ops or
              all of the above, you can find them all here.
            </p>
            <router-link to="/devs" class="link"
              ><button>Search Devs</button></router-link
            >
          </div>
          <div>
            <img src="images/4309857.jpg" style="width: 300px" />
            <h2>Bring Your Idea To Life</h2>
            <p>
              As you and your new team begin the journey of designing and creating
              your product we will still be here for you. We know it is a lot to
              accomplish and you will have questions along the way. We have
              articles that help to guide you on your journey.
            </p>
            <router-link to="/devs" class="link"
              ><button>View Articles</button></router-link
            >
          </div>
        </div>
      </div>
      <div class="join-devs">
        <div>
          <img src="images/programmer-man.png" style="width: 500px" />
        </div>
        <div class="join-devs_col2">
            <h2>Why DevAlly is Better than Hiring Freelancers.</h2>
          <p>
            Freelancers are great for logos, single marketing campaign material and the occasional quick job. Building a product from the ground up
            requires a permanant team. People that are invested in the project. That's why technical co-founders are the best option for any serious project.
          </p>
          <router-link to="/signin" class="link"
            ><button>Join Now</button></router-link
          >
        </div>
      </div>
      <div class="start-learning">
        <div>
          <h2>Need Guidance on how to start and run a tech startup?</h2>
          <p>
            We got you covered. Read up on software development methodologies, how
            to start a business and much more.
          </p>
          <router-link to="/signin" class="link"
            ><button>Start Learning</button></router-link
          >
        </div>
        <div>
          <img src="images/201brain-knowledge.png" style="width: 500px" />
        </div>
      </div>
    </div>
    <div v-else >
      <div class="experienced-devs">
        <div class="join-devs_col2">
          <h2>Are You An Experienced Developer?</h2>
          <p>
            Are you a web, mobile or software developer, graphic designer or
            project manager? Work for part ownership in tech startups.
            Join DevAlly and find projects your passionate about and even start your own. 
          </p>
          <router-link to="/signin" class="link"
            ><button>Join Now</button></router-link
          >
        </div>
        <!-- <div>
          <img src="images/programmer-man.png" style="width: 500px" />
        </div> -->
      </div>
      <div class="join-devs">
        <div>
          <img src="images/programmer-man.png" style="width: 500px" />
        </div>
        <div class="join-devs_col2">
          <h2>Want To Build Something From the Ground Up?</h2>
          <p>
            Are you a web, mobile or software developer, graphic designer or
            project manager? Join DevAlly and find paid jobs or work for part
            ownership in tech startups.
          </p>
        </div>
      </div>
      <div class="last-section">
        <div class="join-devs_col2">
          <h2>Want To Build Something From the Ground Up?</h2>
          <p>
            Are you a web, mobile or software developer, graphic designer or
            project manager? Join DevAlly and find paid jobs or work for part
            ownership in tech startups.
          </p>
          <router-link to="/signin" class="link"
            ><button>Join Now</button></router-link
          >
        </div>
        <div>
          <img src="images/team.png" style="width: 400px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./home.js"></script>
<style src="./home.scss" lang="scss" scoped></style>