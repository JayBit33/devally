// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import { articleAPI } from '@/api/apis';

Vue.use(Vuex)

    const state = {

    };

    const getters = {

    };

    const mutations = {

    };

    const actions = {
        fetchArticles() {
            return new Promise((resolve, reject) => {
                articleAPI.get('/articles')
                .then(res => {
                    console.log('res', res.data);
                    resolve(res.data);
                }).catch(error => reject(error));
            })
        },
    };

export default {
    state,
    getters,
    mutations,
    actions
};
