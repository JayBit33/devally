// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import {authAPI, userAPI} from '@/api/apis';
Vue.use(Vuex)

    const state = {
        devUsers: null,
        loggedIn: false,
        loggedInUserId: 2
    };

    const getters = {
        getDevUsers: state => state.devUsers,
        getDevUser: state => id => state.devUsers?.find(user => user.id == id),
        getCurrentUserId: state => state.loggedInUserId,
        isLoggedIn: state => state.loggedIn
    };

    const mutations = {
        updateDevUsers(state, users) {
            state.devUsers = users;
        },
        updateIsLoggedIn(state, isLoggedIn) {
            state.loggedIn = isLoggedIn;
        },
        updateUserId(state, id) {
            state.loggedInUserId = id
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
                            commit('updateIsLoggedIn', res.data.result);
                            commit('updateUserId', res.data.id)
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
