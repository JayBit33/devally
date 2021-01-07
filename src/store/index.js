import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {
            guid: 33,
            accountCreated: 'May 20 2021 7:32:23am',
            firstName: 'Jay',
            lastName: 'Boseman',
            email: 'bosemanrocks@gmail.com',
            password: 'HHLKHLEION2002NS102746179',
            profileImage: 'user_profile.jpg',
            accountType: ['ENTREPRENEUR', 'DEVELOPER'],
            skills: ['Java', 'Spring Boot', 'REST API\'s', 'Mobile App Development'],
            rating: 10,
            availableHireOptions: ['OWNERSHIP PERCENTAGE', 'HOURLY', 'QUOTE']
        }
    },

    getters: {
        fullName(state) {
            return state.user.firstName + ' ' + state.user.lastName
        }
    },

    mutations: {

    },

    actions: {

    }
})

export default store;
