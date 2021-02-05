// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import {authAPI, userAPI} from '@/api/apis';
import { CometChat } from "@cometchat-pro/chat";

Vue.use(Vuex)

    const state = {
        devUsers: null,
        loggedIn: false,
        loggedInUser: null,
        loggedInUserId: 2
    };

    const getters = {
        getDevUsers: state => state.devUsers,
        getDevUser: state => id => state.devUsers?.find(user => user.id == id),
        getDevUserByUsername: state => username => state.devUsers?.find(user => user.username === username),
        getCurrentUserId: state => state.loggedInUserId,
        isLoggedIn: state => state.loggedIn,
        getLoggedInUser: state => state.loggedInUser,

    };

    const mutations = {
        updateDevUsers(state, users) {
            state.devUsers = users;
        },
        updateIsLoggedIn(state, isLoggedIn) {
            state.loggedIn = isLoggedIn;
        },
        updateUserId(state, id) {
            state.loggedInUserId = id;
        },
        updateLoggedInUser(state, user) {
            state.loggedInUser = user;
        }
    };

    const actions = {
        fetchDevUsers({commit}) {
            return new Promise((resolve, reject) => {
                userAPI.get(`/dev-accounts`)
                    .then(res => {
                        console.log('fetchDevUsers', res.data)
                        commit("updateDevUsers", res.data);
                        resolve(res.data);
                    }).catch(error => reject(error));
            })
        },
        login({commit}, userLoginInfo) {
            return new Promise((resolve, reject) => {
                authAPI.post(`/login`, userLoginInfo)
                    .then(res => {
                        if (res) {
                            console.log('res', res);
                            commit('updateUserId', res.data.user.id);
                            commit('updateIsLoggedIn', res.data.result);
                            commit('updateLoggedInUser', res.data.user);
                            CometChat.login(res.data.user.username, '7550adcf70e27f56b88bf5e46295aabf32f49403').then(
                                user => {
                                  console.log("Login Successful:", { user });
                                },
                                error => {
                                  console.log("Login failed with exception:", { error });
                                }
                              );
                            resolve(res.data);
                        }
                    }).catch(error => reject(error));
            })
        }
    }

export default {
    state,
    getters,
    mutations,
    actions
};
