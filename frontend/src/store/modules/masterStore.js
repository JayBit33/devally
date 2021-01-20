// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex)

    const state = {
        devUsers: null,
        loggedInUserId: 2190
    };

    const getters = {
        getDevUsers: state => state.devUsers,
        getDevUser: state => id => state.devUsers?.find(user => user.id == id),
        getCurrentUserId: state => state.loggedInUserId,

    };

    const mutations = {
        updateDevUsers(state, users) {
            state.devUsers = users;
        }
    };

    const actions = {
        fetchDevUsers({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('http://localhost:3000/dev-accounts').then(res => {
                    console.log('fetchDevUsers', res.data)
                    commit("updateDevUsers", res.data);
                    resolve(res.data);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    };

export default {
    state,
    getters,
    mutations,
    actions
};
