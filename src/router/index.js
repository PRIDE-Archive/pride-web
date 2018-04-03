import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/landingpage/Index'

const LandingPage = resolve => require(['@/components/landingpage/LandingPage'], resolve);
const SubmitData = resolve => require(['@/components/landingpage/SubmitData'], resolve);
const Archive = resolve => require(['@/components/archive/Archive'], resolve);

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landingpage',
      component: LandingPage
    },
    {
      path: '/submitdata',
      name: 'submitdata',
      component: SubmitData
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive
    }
  ]
})
