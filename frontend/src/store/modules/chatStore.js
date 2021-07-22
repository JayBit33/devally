// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import { CometChat } from "@cometchat-pro/chat";
Vue.use(Vuex)

const state = {
  conversations: [],
  incomingMessages: []
};

const getters = {
  getConversations: state => state.conversations,
  getIncomingMessages: state => state.incomingMessages
};

const mutations = {
  addIncomingMessage(state, message) {
    state.incomingMessages.push(message)
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
      CometChat.getConversation(conversationWithId, 'user').then(
        conversation => {
          resolve(conversation)
        }, error => {
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
