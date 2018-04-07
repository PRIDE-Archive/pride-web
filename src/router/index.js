import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/landingpage/Index'

const LandingPage = resolve => require(['@/components/landingpage/LandingPage'], resolve);
const SubmitData = resolve => require(['@/components/landingpage/SubmitData'], resolve);
const SubmitStep1 = resolve => require(['@/components/landingpage/SubmitStep1'], resolve);
const SubmitStep2 = resolve => require(['@/components/landingpage/SubmitStep2'], resolve);
const SubmitStep3 = resolve => require(['@/components/landingpage/SubmitStep3'], resolve);
const SubmitStep4 = resolve => require(['@/components/landingpage/SubmitStep4'], resolve);
const SubmitStep5 = resolve => require(['@/components/landingpage/SubmitStep5'], resolve);
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
      path: '/submitdata',
      name: 'submitdata',
      component: SubmitData
    },
    {
      path: '/submitstep1',
      name: 'submitstep1',
      component: SubmitStep1
    },
    {
      path: '/submitstep2',
      name: 'submitstep2',
      component: SubmitStep2
    },
    {
      path: '/submitstep3',
      name: 'submitstep3',
      component: SubmitStep3
    },
    {
      path: '/submitstep4',
      name: 'submitstep4',
      component: SubmitStep4
    },
     {
      path: '/submitstep5',
      name: 'submitstep5',
      component: SubmitStep5
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
  ]
})
