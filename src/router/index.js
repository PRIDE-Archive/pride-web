import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/landingpage/Index'
const Test = resolve => require(['@/components/Test'], resolve);
const LandingPage = resolve => require(['@/components/landingpage/LandingPage'], resolve);
const Archive = resolve => require(['@/components/archive/Archive'], resolve);
const Citation = resolve => require(['@/components/landingpage/Citation'], resolve);
const Dataset = resolve => require(['@/components/archive/Dataset'], resolve);
const NotFound = resolve => require(['@/components/NotFound'], resolve);
const MarkdownPage = resolve => require(['@/components/documentation/MarkdownPage'], resolve);
const Peptidome = resolve => require(['@/components/peptidome/Peptidome'], resolve);
const PeptideSearch = resolve => require(['@/components/peptidome/PeptideSearch'], resolve);
const PeptideDownload = resolve => require(['@/components/peptidome/PeptideDownload'], resolve);
const SpectrumLibrary = resolve => require(['@/components/peptidome/SpectrumLibrary'], resolve);
const PeptideDetails = resolve => require(['@/components/peptidome/PeptideDetails'], resolve);
const PSM = resolve => require(['@/components/peptidome/PSM'], resolve);
const ClusterProjects = resolve => require(['@/components/peptidome/ClusterProjects'], resolve);
const Assay = resolve => require(['@/components/peptidome/Assay'], resolve);
const StatisticsDetails = resolve => require(['@/components/landingpage/StatisticsDetails'], resolve);
const Annotation = resolve => require(['@/components/annotation/Annotation'], resolve);
const AnnotationID = resolve => require(['@/components/annotation/AnnotationID'], resolve);
const Check = resolve => require(['@/components/annotation/Check'], resolve);
const Sample = resolve => require(['@/components/annotation/Sample'], resolve);
const Annotate = resolve => require(['@/components/annotation/Annotate'], resolve);

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: location.hostname.match(/localhost/)?'':'/pride/',
  routes: [
    {
      path: '/',
      name: 'landingpage',
      component: LandingPage
    },
    {
      path: '/markdownpage/:subpage',
      name: 'markdownpage',
      component: MarkdownPage,
       /*children: [
     
            {
                path: "",
                name: 'markdownpage',
                component: MarkdownPage
            },
            {
                path: "aaa/:asd",
                name: 'test',
                component: Test
            }
        ]
      */
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
      path:'/dataset/:id',
      name: 'dataset',
      component: Dataset
    },
    {
      path: '/peptidome',
      name: 'peptidome',
      component: Peptidome
    },
    {
      path: '/peptidesearch',
      name: 'peptidesearch',
      component: PeptideSearch
    },
    {
      path: '/peptidedownload',
      name: 'peptidedownload',
      component: PeptideDownload
    },
    {
      path: '/spectrumlibrary',
      name: 'spectrumlibrary',
      component: SpectrumLibrary
    },
    {
      path:'/peptidedetails/:id',
      name: 'peptidedetails',
      component: PeptideDetails
    },
    {
      path:'/psm/:id',
      name: 'psm',
      component: PSM
    },
    {
      path:'/clusterprojects/:id',
      name: 'clusterprojects',
      component: ClusterProjects
    },
    {
      path:'/assay/:id',
      name: 'assay',
      component: Assay
    },
    {
      path:'/statisticsdetails',
      name: 'statisticsdetails',
      component: StatisticsDetails
    },
    {
      path:'/annotation',
      name: 'annotation',
      component: Annotation,
      
    },
    {
      path:'/annotation/:id/check',
      name: 'check',
      component: Check,
    },
    {
      path:'/annotation/:id/sample',
      name: 'sample',
      component: Sample,
      
    },
    {
      path:'/annotation/:id/annotate',
      name: 'annotate',
      component: Annotate,
    },
    {
      path:'/404',
      name: '404',
      component: NotFound,
      /*
      beforeEnter: (to, from, next) => {
        to.replace();
        console.log(to);
         
        
      }*/
    },
    {
      path:'*',
      name: 'notfound',
      component: NotFound,
      /*
      beforeEnter: (to, from, next) => {
        to.replace();
        console.log(to);
         
        
      }*/
    },
  ],
})
