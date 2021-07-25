// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import { CometChat } from "@cometchat-pro/chat";
Vue.use(Vuex)

const state = {
  activeReceiverId: null,
  conversations: [],
  incomingMessages: [
    { "receiverId": "5", "type": "text", "receiverType": "user", "category": "message", "data": { "text": "hi", "resource": "WEB-2_1_7-f4400c9a-4048-4a15-9130-ec95bd58d488-1626915709000", "entities": { "sender": { "entity": { "uid": "2", "name": "Jen Smith", "status": "available", "role": "default", "lastActiveAt": 1626838062 }, "entityType": "user" }, "receiver": { "entity": { "uid": "5", "name": "Wavey", "status": "available", "role": "default", "lastActiveAt": 1626913500, "conversationId": "2_user_5" }, "entityType": "user" } } }, "text": "hi", "id": "124", "conversationId": "2_user_5", "sender": { "hasBlockedMe": false, "blockedByMe": false, "uid": "2", "name": "Jen Smith", "lastActiveAt": 1626838062, "role": "default", "status": "online" }, "receiver": { "hasBlockedMe": false, "blockedByMe": false, "uid": "5", "name": "Wavey", "lastActiveAt": 1626913500, "role": "default", "status": "online" }, "sentAt": 1626915711, "updatedAt": 1626915711 }
  ]
};

const getters = {
  getConversations: state => state.conversations,
  getIncomingMessages: state => state.incomingMessages,
  getActiveReceiverId: state => state.activeReceiverId,
};

const mutations = {
  addIncomingMessage(state, message) {
    state.incomingMessages.push(message)
  },
  clearIncomingMessage(state) {
    state.incomingMessages = []
  },
  deleteIncomingMessage(state, message) {
    state.incomingMessages = state.incomingMessages.filter(m => m.id !== message.id)
  },
  setActiveReceiverId(state, id) {
    state.activeReceiverId = id
  },
  updateConversations(state, conversations) {
    state.conversations = conversations
  }
};

const actions = {
  addMessageListener({ commit, getters }) {
    const listenerID = getters.getLoggedInUser.id;

    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
          console.log("Text message received successfully", textMessage);
          // Handle text message
          commit('addIncomingMessage', textMessage)
        },
        onMediaMessageReceived: mediaMessage => {
          console.log("Media message received successfully", mediaMessage);
          // Handle media message
        },
        onCustomMessageReceived: customMessage => {
          console.log("Custom message received successfully", customMessage);
          // Handle custom message
        }
      })
    );
  },
  fetchConversations({commit}) {
    return new Promise((resolve, reject) => {
      const conversationsRequest = new CometChat.ConversationsRequestBuilder()
        .setLimit(50)
        .build();

      return conversationsRequest.fetchNext().then(
        conversationList => {
          commit('updateConversations', conversationList)
          resolve(conversationList)
        },
        error => {
          reject(error)
        }
      );
    })
  },
  fetchConversationWithUserId(_, conversationWithId) {
    return new Promise((resolve, reject) => {
      CometChat.getConversation(conversationWithId, CometChat.RECEIVER_TYPE.USER).then(
        conversation => {
          resolve(conversation)
        }, error => {
          reject(error)
        }
      );
    })
  },
  fetchConversationHistoryWithUser(_, UID) {
    return new Promise((resolve, reject) => {
      var limit = 50;

      var messagesRequest = new CometChat.MessagesRequestBuilder()
        .setLimit(limit)
        .setUID(UID)
        .build();

      messagesRequest.fetchPrevious().then(
        messages => {
          console.log("Message list fetched:", messages);
          // Handle the list of messages
          resolve(messages)
        },
        error => {
          console.log("Message fetching failed with error:", error);
          reject(error)
        }
      );
    })
  },
  initializeCometChat({ dispatch, getters }) {
    return new Promise((resolve, reject) => {
      CometChat.login(getters.getLoggedInUser.id, process.env.VUE_APP_AUTH_KEY).then(
        user => {
          dispatch('addMessageListener')
          resolve({ user })
        },
        error => {
          reject(error)
        }
      );
    })
  },
  sendMessageToUserById({getters}, { messageText, receiverId }) {
    if (!receiverId) receiverId = getters.getActiveReceiverId
    return new Promise((resolve, reject) => {
      const textMessage = new CometChat.TextMessage(receiverId, messageText, CometChat.RECEIVER_TYPE.USER);
      CometChat.sendMessage(textMessage).then(
        message => {
          console.log("Message sent successfully:", message);
          // TODO Do something with message
          resolve(message)
        },
        error => {
          console.log("Message sending failed with error:", error);
          // Handle any error
          reject(error)
        }
      );
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
