// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex)

    const state = {
        devUsers: null,
        loggedInUserId: 2
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
                axios.get('http://localhost:3000/api/v1/users/dev-accounts').then(res => {
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
