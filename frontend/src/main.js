import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { CometChat } from "@cometchat-pro/chat";
import GoogleSignInButton from 'vue-google-signin-button-directive'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './scss/element-variables.scss'
import store from './store/index' 

Vue.use(ElementUI)

import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(far)
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

var appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(process.env.VUE_APP_REGION)
  .build();

CometChat.init(process.env.VUE_APP_APP_ID, appSetting).then(() => {
  new Vue({
    router,
    store,
    GoogleSignInButton,
    render: h => h(App)
  }).$mount('#app')
});
