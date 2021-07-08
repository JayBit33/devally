// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home'
import Devs from '../pages/devs'
import Dev from '../pages/dev'
import UserApp from '../pages/user-app'
import Projects from '../pages/projects'
import Project from '../pages/project'
import Works from '../pages/Works'
import Resources from '../pages/Resources'
import Article from '../pages/Article'
import LearningPath from '../pages/LearningPath'
import About from '../pages/About'
import Support from '../pages/Support'
import Careers from '../pages/Careers'
import Contact from '../pages/Contact'
import Policy from '../pages/Policy'
import Terms from '../pages/Terms'
import SigninSignup from '../pages/signin-signup'
import PageNotFound from '../pages/PageNotFound'
import CreateAccount from '../pages/create-account'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { breadcrumb: []} },
    { path: '/devs', name: 'Devs', component: Devs, meta: { breadcrumb: [ { name: 'home', to: '/' }, { name: 'developers', to: '/devs' }]} },
    { path: '/dev/:id?', name: 'Dev', component: Dev, meta: { breadcrumb: [ { name: 'home', to: '/' }, { name: 'developers', to: '/devs' }, { name: 'developer', to: '/dev' }]} },
    { path: '/projects', name: 'Projects', component: Projects, meta: { breadcrumb: [{ name: 'home', to: '/' }, { name: 'projects', to: '/projects' }]} },
    { path: '/project/:id?', name: 'Project', component: Project, meta: { breadcrumb: [{ name: 'home', to: '/' }, { name: 'projects', to: '/projects' }, { name: 'project', to: '/project' }]} },
    { path: '/profile/:id?/:view?/:projectId?', name: 'Profile', component: UserApp, meta: { breadcrumb: [] } },
    { path: '/works',  name: 'Works', component: Works, meta: { breadcrumb: []} },
    { path: '/resources',  name: 'Resources', component: Resources, meta: { breadcrumb: []} },
    { path: '/article/:id?', name: 'Article', component: Article, meta: { breadcrumb: []} },
    { path: '/path/:id?', name: 'LearningPath', component: LearningPath, meta: { breadcrumb: []} },
    { path: '/about',  name: 'About', component: About, meta: { breadcrumb: []} },
    { path: '/support',  name: 'Support', component: Support, meta: { breadcrumb: []} },
    { path: '/careers',  name: 'Careers', component: Careers, meta: { breadcrumb: []} },
    { path: '/contact',  name: 'Contact', component: Contact, meta: { breadcrumb: []} },
    { path: '/policy',  name: 'Policy', component: Policy, meta: { breadcrumb: []} },
    { path: '/terms',  name: 'Terms', component: Terms, meta: { breadcrumb: []} },
    { path: '/signin',  name: 'SignIn', component: SigninSignup, meta: { breadcrumb: [] }},
    { path: '/create-account',  name: 'CreateAccount', component: CreateAccount, meta: { breadcrumb: []} },
    { path: '/:pathMatch(.*)*',  name: 'NotFound', component: PageNotFound, meta: { breadcrumb: []} },
  ],
  scrollBehavior() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto'})
  }
})

export default router
