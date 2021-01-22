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
import SignIn from '../views/SignIn'
import CreateAccount from '../views/CreateAccount'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { breadcrumb: []} },
    { path: '/devs', name: 'Devs', component: Devs, meta: { breadcrumb: [ { name: 'home', to: '/' }, { name: 'developers', to: '/devs' }]} },
    { path: '/dev/:id?', name: 'Dev', component: Dev, meta: { breadcrumb: [ { name: 'home', to: '/' }, { name: 'developers', to: '/devs' }, { name: 'developer', to: '/dev' }]} },
    { path: '/projects', name: 'Projects', component: Projects, meta: { breadcrumb: []} },
    { path: '/profile/:id?', name: 'Profile', component: UserProfile, meta: { breadcrumb: [] } },
    { path: '/works',  name: 'Works', component: Works, meta: { breadcrumb: []} },
    { path: '/about',  name: 'About', component: About, meta: { breadcrumb: []} },
    { path: '/signin',  name: 'SignIn', component: SignIn, meta: { breadcrumb: [] }},
    { path: '/create-account',  name: 'CreateAccount', component: CreateAccount, meta: { breadcrumb: []} },
  ],
  scrollBehavior() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto'})
  }
})

export default router
