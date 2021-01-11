// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // user: {
        //     guid: 33,
        //     accountCreated: 'May 20 2021 7:32:23am',
        //     firstName: 'Jay',
        //     lastName: 'Boseman',
        //     email: 'bosemanrocks@gmail.com',
        //     password: 'HHLKHLEION2002NS102746179',
            // profileImage: 'user_profile.jpg',
        //     accountType: ['ENTREPRENEUR', 'DEVELOPER'],
        //     skills: ['Java', 'Spring Boot', 'REST API\'s', 'Mobile App Development'],
        //     rating: 5,
        //     availableHireOptions: ['OWNERSHIP PERCENTAGE', 'HOURLY', 'QUOTE']
        // },
        users: null,
        loggedInUserId: 2190
    },

    getters: {
        getUsers(state) {
            return state.users;
        },
        getCurrentUserId(state) {
            return state.loggedInUserId;
        }
    },

    mutations: {
        updateUsers(state, users) {
            state.users = users;
        }
    },

    actions: {
        async fetchUsers({commit}) {
            const users = (await axios.get('http://localhost:3000/dev-accounts')).data
            commit("updateUsers", users);
        }
    }
})

export default store;
