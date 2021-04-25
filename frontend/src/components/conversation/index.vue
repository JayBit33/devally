<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="conversation">
    <div class="conversation-header">
      <img src="http://localhost:3000/uploads/profile3.jpg" class="profile-img" />
      <span>
        <span v-if="isOnline" class="is-online">online</span>
        <span v-if="!isOnline" class="is-offline">offline</span>
        <h3>Cindy Summers</h3>
      </span>
    </div>
    <div class="conversation-text">
      <p class="conversation-content_text">Hey, be interested in joining your team. 3 years as a UI/UX designer.</p>
      <p class="conversation-content_text">3 years as a UI/UX designer is impressive.</p>
      <p class="conversation-content_text">Have you started on the project?</p>
      <p class="conversation-content_text">No, I am still looking for a backend developer.</p>
      <p class="conversation-content_text">I know a few good ones if you are interested.</p>
      <p class="conversation-content_text">Yeah that would be great. I would love their contact info.</p>
      <p class="conversation-content_text">Hey, be interested in joining your team. 3 years as a UI/UX designer.</p>
      <p class="conversation-content_text">What is your slack handle? I will add you to our channel</p>
    </div>
    <textarea class="write-message" rows="11" />
  </div>
</template>

<script src="./conversation.js" ></script>
<style src="./conversation.scss" lang="scss"></style>
