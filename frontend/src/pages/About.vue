<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="about">
    <div class="home-banner">
      <div class="col-1">
        <h1>Founded By Thinkers Like You</h1>
        <h4>DevAlly was built to solve my own problem. Which was</h4>
        <h4>finding like minded people to build things with.</h4>
        <!-- <button class="btn"><router-link to="/create-account" class="link">GET STARTED</router-link></button> -->
      </div>
      <div class="col-2">
        <img src="images/temporary.png" />
      </div>
    </div>

    <div class="about-body">
      <h1>About</h1>
      <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.
      Lorem ipsum is typically a corrupted version of 'De finibus bonorum et malorum', a 1st century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin.
      Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets.[1] Lorem ipsum was introduced to the digital world in the mid-1980s, when Aldus employed it in graphic and word-processing templates for its desktop publishing program PageMaker. Other popular word processors including Pages and Microsoft Word have since adopted Lorem ipsum, as have many LaTeX packages, web content managers such as Joomla! and WordPress, and CSS libraries such as
      </p>
      <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.
      Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets.[1] Lorem ipsum was introduced to the digital world in the mid-1980s, when Aldus employed it in graphic and word-processing templates for its desktop publishing program PageMaker. Other popular word processors including Pages and Microsoft Word have since adopted Lorem ipsum, as have many LaTeX packages, web content managers such as Joomla! and WordPress, and CSS libraries such as
      </p>

    </div>
  </div>
</template>

<script>
export default {
  name: 'About',

}
</script>

<style lang="scss" scoped>
  .about {
  max-width: 1780px;
  background-color: white;

  .home-banner {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr auto;
    column-gap: 12rem;
    align-items: center;
    margin-bottom: 3rem;
    margin-left: 9rem;
    margin-right: 7rem;
    background-color: white;
    .col-1 {
      margin-left: 2.5rem;
      h1 {
        font: 500 2.125rem 'Montserrat';
        color: $primary;
        line-height: 1.5rem;
      }
      h4 {
        font: 1.125rem 'Montserrat';
        line-height: .5rem;
      }
      button {
        background-color: $button-primary;
        padding: 1rem 4rem .75rem 4rem;
        font-size: 1.25rem;
        border: none;
        float: left;
        margin-top: 0rem;
        .link {
          color: white;
        }
      }
    }
    .col-2 {
      margin-right: 2rem;
      img {
        width: 40rem;
      }
    }
  }

  .about-body {
    display: block;
    margin: 0 10rem;
    h1 {
      font-size: 2.25rem; color: #514E4E;
    }
    p {
      font-family: 'Montserrat';
      font-size: 1.125rem;
      line-height: 2rem;
    }
  }
}

@media (min-width: 1700px)  {
  .about {
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
