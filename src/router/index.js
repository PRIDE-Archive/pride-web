import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/landingpage/Index'
const Test = resolve => require(['@/components/Test'], resolve);
const LandingPage = resolve => require(['@/components/landingpage/LandingPage'], resolve);
const SubmitdataPage = resolve => require(['@/components/documentation/SubmitdataPage'], resolve);
const Archive = resolve => require(['@/components/archive/Archive'], resolve);
const Citation = resolve => require(['@/components/landingpage/Citation'], resolve);
const PrideTools = resolve => require(['@/components/documentation/PrideTools'], resolve);
const PrideDocs = resolve => require(['@/components/landingpage/PrideDocs'], resolve);
const PrideFileFormats = resolve => require(['@/components/documentation/PrideFileFormats'], resolve);
const Dataset = resolve => require(['@/components/archive/Dataset'], resolve);
const NotFound = resolve => require(['@/components/NotFound'], resolve);

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
    {
      path: '/pridetools',
      name: 'pridetools',
      component: PrideTools
    },
    {
      path: '/pridedocs',
      name: 'pridedocs',
      component: PrideDocs
    },
    {
      path: '/pridefileformats',
      name: 'pridefileformats',
      component: PrideFileFormats
    },
    {
      path:'/dataset/:id',
      name: 'dataset',
      component: Dataset
    },
    {
      path:'*',
      name: 'notfound',
      component: NotFound
    },
  ],
})
