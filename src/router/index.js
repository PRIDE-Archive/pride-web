import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/landingpage/Index'
const Test = resolve => require(['@/components/Test'], resolve);
const LandingPage = resolve => require(['@/components/landingpage/LandingPage'], resolve);
const SubmitdataPage = resolve => require(['@/components/landingpage/SubmitdataPage'], resolve);
const Archive = resolve => require(['@/components/archive/Archive'], resolve);
const Citation = resolve => require(['@/components/landingpage/Citation'], resolve);

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
      path: '/submitdatapage',
      name: 'submitdatapage',
      component: SubmitdataPage
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive
    },
    {
      path: '/citation',
      name: 'citation',
      component: Citation
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
  ],
})
