// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import masterStore from './modules/masterStore';
import chatStore from './modules/chatStore';
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        masterStore,
        chatStore
    }
})

export default store;
