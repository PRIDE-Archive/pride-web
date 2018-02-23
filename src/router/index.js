import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/landingpage/Index'

const Index = resolve => require(['@/components/landingpage/Index'], resolve);
const SubmitData = resolve => require(['@/components/landingpage/SubmitData'], resolve);

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/submitdata',
      name: 'submitdata',
      component: SubmitData
    }
  ]
})
