// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Devs from '../pages/Devs'
import Dev from '../pages/Dev'
import UserProfile from '../pages/UserProfile'
import Projects from '../pages/Projects'
import Works from '../pages/Works'
import About from '../pages/About'
import CreateAccount from '../pages/CreateAccount'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/devs', name: 'Devs', component: Devs },
    { path: '/dev/:id?', name: 'Dev', component: Dev },
    { path: '/projects', name: 'Projects', component: Projects },
    { path: '/profile/:id?', name: 'Profile', component: UserProfile },
    { path: '/works',  name: 'Works', component: Works },
    { path: '/about',  name: 'About', component: About },
    { path: '/create-account',  name: 'CreateAccount', component: CreateAccount },
  ],
  scrollBehavior() {
    window.scrollTo({ x: 0, y: 0, behavior: 'auto'})
  }
})

export default router
