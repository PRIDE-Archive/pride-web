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
const Check = resolve => require(['@/components/annotation/Check'], resolve);
const Sample = resolve => require(['@/components/annotation/Sample'], resolve);
const Annotate = resolve => require(['@/components/annotation/Annotate'], resolve);
const Profile = resolve => require(['@/components/ebi/Profile'], resolve);
const Molecules = resolve => require(['@/components/archive/Molecules'], resolve);
const PrivateDataset = resolve => require(['@/components/archive/PrivateDataset'], resolve);
const Spectra = resolve => require(['@/components/archive/Spectra'], resolve);
const Register = resolve => require(['@/components/ebi/Register'], resolve);
const Publish = resolve => require(['@/components/archive/Publish'], resolve);
const EditProfile = resolve => require(['@/components/ebi/EditProfile'], resolve);

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
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: Test
    // },
    {
      path:'/archive/projects/:id',
      name: 'dataset',
      component: Dataset
    },
    {
      path:'/archive/projects/:id/results',
      name: 'molecules',
      component: Molecules
    },
    {
      path:'/archive/projects/:id/private',
      name: 'privatedataset',
      component: PrivateDataset
    },
    {
      path: '/peptidome',
      name: 'peptidome',
      component: Peptidome
    },
    {
      path: '/peptidome/peptidesearch',
      name: 'peptidesearch',
      component: PeptideSearch
    },
    {
      path: '/archive/spectra',
      name: 'spectra',
      component: Spectra
    },
    {
      path: '/peptidome/peptidedownload',
      name: 'peptidedownload',
      component: PeptideDownload
    },
    {
      path: '/spectrumlibrary',
      name: 'spectrumlibrary',
      component: SpectrumLibrary
    },
    {
      path:'/peptidome/peptidedetails/:id',
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
      path:'/profile/:id',
      name: 'profile',
      component: Profile,

    },
    {
      path: '/searchSummary.do',
      redirect: to => {
        let id = to.query.identificationAccessionNumber
        if(id)
            return { name: 'archive', query: {keyword:id} }
        else
            return { name: '404' }
        //return { path: '/archive/spectra', query: null }
        //console.log(to)
        // if (query.to === 'foo') {
        //   return { path: '/foo', query: null }
        // }
        // if (hash === '#baz') {
        //   return { name: 'baz', hash: '' }
        // }
        // if (params.id) {
        //   return '/with-params/:id'
        // } else {
        //   return '/bar'
        // }
      }
    },
    {
      path: '/archive/simpleSearch',
      redirect: to => {
        let query = to.query
        if(query.q)
          return { name: 'archive', query: {keyword:query.q} }
        else
          return { name: 'archive',query: {}}
      }
    },
    {
      path:'/register',
      name: 'register',
      component: Register,

    },
    {
      path:'/archive/register',
      name: 'register',
      component: Register,

    },
    {
      path:'/archive/projects/:id/publish',
      name: 'publish',
      component: Publish
    },
    {
      path:'/archive/users/profile/edit',
      name: 'editprofile',
      component: EditProfile
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
