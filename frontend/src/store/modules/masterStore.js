// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import {authAPI, usersAPI, projectsAPI } from '@/api/apis';
import { CometChat } from "@cometchat-pro/chat";

Vue.use(Vuex)

    const state = {
        devUsers: null,
        loggedIn: false,
        loggedInUser: null,
        loggedInUserId: 2,
        projects: null,
        toastShown: true,
        toast: {}
    };

    const getters = {
        getDevUsers: state => state.devUsers,
        getDevUser: state => id => state.devUsers?.find(user => user.id == id),
        getDevUserByUsername: state => username => state.devUsers?.find(user => user.username === username),
        getCurrentUserId: state => state.loggedInUserId,
        isLoggedIn: state => state.loggedIn,
        isToastShown: state => state.toastShown,
        getToast: state => state.toast,
        getLoggedInUser: state => state.loggedInUser,
        getProjects: state => state.projects,

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
        },
        updateProjects(state, projects) {
            state.projects = projects;
        },
        showToast(state) {
            state.toastShown = true
            setTimeout(() => {
                if (state.toastShown) {
                    state.toastShown = false
                }
            }, 5000)
        },
        hideToast(state) {
            state.toastShown = false
        },
        updateToast(state, toast) {
            state.toast = toast
        }
    };

    const actions = {
        fetchDevUsers({commit}) {
            return new Promise((resolve, reject) => {
                usersAPI.get(`/devs`)
                    .then(res => {
                        console.log('fetchDevUsers', res.data)
                        commit("updateDevUsers", res.data);
                        resolve(res.data);
                    }).catch(error => reject(error));
            })
        },
        fetchUserById({commit}, id) {
            return new Promise((resolve, reject) => {
                usersAPI.get(`/${id}`)
                    .then(res => {
                        commit('');
                        console.log('res', res.data);
                        resolve(res.data);
                    }).catch(error => reject(error));
            })
        },
        fetchProjects({commit}) {
            return new Promise((resolve, reject) => {
                projectsAPI.get(`/`)
                    .then(res => {
                        console.log('fetchProjects', res.data)
                        commit("updateProjects", res.data);
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
