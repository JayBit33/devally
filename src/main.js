import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store/index'

import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter)
Vue.config.productionTip = false

// import Home from './pages/Home'
// import Devs from './pages/Devs'
// import Dev from './pages/Dev'
// import Projects from './pages/Projects'
// import Works from './pages/Works'
// import About from './pages/About'

const router = new VueRouter({
  routes: [
    { path: '/',  name: 'Home', component: () => import(/* webpackPreload: true */ /* webpackChunkName: "Home" */ './pages/Home')},
    { path: '/devs', name: 'Devs', component: () => import(/* webpackPreload: true */ /* webpackChunkName: "Devs" */ './pages/Devs')},
    { path: '/dev', name: 'Dev', component: () => import(/* webpackPreload: true */ /* webpackChunkName: "Dev" */ './pages/Dev')},
    { path: '/projects', name: 'Projects', component: () => import(/* webpackPreload: true */ /* webpackChunkName: "Projects" */ './pages/Projects')},
    { path: '/works', name: 'Works', component: () => import(/* webpackPreload: true */ /* webpackChunkName: "Works" */ './pages/Works')},
    { path: '/about', name: 'About', component: () => import(/* webpackPreload: true */ /* webpackChunkName: "About" */ './pages/About')},
  ]
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
