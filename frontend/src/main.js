import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "./chat/constants";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './scss/element-variables.scss'
import store from './store/index'

Vue.use(ElementUI)

import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

var appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .build();

CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});
