<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
  <div class="message-box">

    <div v-if="!isTextBoxOpen" class="message-box_icon" :class="{'animating': hasIncomingMessages}" @click="toggleTextBoxOpen">
      <font-awesome-icon :icon="['fas', 'comment']"></font-awesome-icon>
    </div>

    <div v-if="isTextBoxOpen && hasIncomingMessages" class="message-box_messages" :class="{'is-replying': replyMessage !== null}">
      <h6>Incoming Messages: </h6>
      <div v-for="message in getIncomingMessages" :key="message.id" class="message-box_messages_message">
        <div class="message-box_messages_message_text">
          <h2>{{message.sender.name}}</h2>
          <p>{{message.text}}</p>
        </div>
        <font-awesome-icon :icon="['fas', 'reply']" @click="replyToMessage(message)"></font-awesome-icon>
      </div>
    </div>

    <div v-if="isTextBoxOpen && replyMessage" class="message-box_text" :class="{'is-replying': replyMessage !== null, 'has-messages': hasIncomingMessages}">
      <div v-if="hasIncomingMessages" class="message-box_text_has-messages">
        <div v-if="replyMessage" class="reply-message">
          <h6>{{replyMessage.sender.name}}: </h6>
          <h6>{{replyMessage.text}}</h6>
        </div>

        <font-awesome-icon :icon="['fas','times']" class="message-box_text_closeBtn" @click="closeTextBox"/>
        <textarea type="text" v-model="messageText" class="message-box_text_textarea" />
        <button class="message-box_text_sendMsgBtn" @click="sendMessage">Send</button>
      </div>
      <div v-else class="message-box_text_no-messages">
        <font-awesome-icon :icon="['fas','times']" class="message-box_text_closeBtn" @click="closeTextBox"/>
        <h6>No incoming messages</h6>
      </div>
    </div>
  </div>
</template>

<script src="./message-box.js" ></script>
<style src="./message-box.scss" lang="scss"></style>
