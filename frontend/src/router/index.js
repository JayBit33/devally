// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Devs from '../views/Devs'
import Dev from '../views/Dev'
import UserProfile from '../views/UserProfile'
import Projects from '../views/Projects'
import Works from '../views/Works'
import About from '../views/About'
import CreateAccount from '../views/CreateAccount'

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
    window.scrollTo({ top: 0, left: 0, behavior: 'auto'})
  }
})

export default router
