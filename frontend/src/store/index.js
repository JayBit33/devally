// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import masterStore from './modules/masterStore';
import articleStore from './modules/articleStore';
import chatStore from './modules/chatStore';
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        masterStore,
        articleStore,
        chatStore
    }
})

export default store;
