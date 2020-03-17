import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/landingpage/Index'

const LandingPage = resolve => require(['@/views/landingpage/LandingPage'], resolve);
const Archive = resolve => require(['@/views/archive/Archive'], resolve);
const Dataset = resolve => require(['@/views/archive/Dataset'], resolve);
const NotFound = resolve => require(['@/views/NotFound'], resolve);
const MarkdownPage = resolve => require(['@/views/documentation/MarkdownPage'], resolve);
const Peptidome = resolve => require(['@/views/peptidome/Peptidome'], resolve);
const PeptideSearch = resolve => require(['@/views/peptidome/PeptideSearch'], resolve);
const PeptideDownload = resolve => require(['@/views/peptidome/PeptideDownload'], resolve);
const SpectrumLibrary = resolve => require(['@/views/peptidome/SpectrumLibrary'], resolve);
const PeptideDetails = resolve => require(['@/views/peptidome/PeptideDetails'], resolve);
const PSM = resolve => require(['@/views/peptidome/PSM'], resolve);
//const ClusterProjects = resolve => require(['@/views/peptidome/ClusterProjects'], resolve);
const StatisticsDetails = resolve => require(['@/views/landingpage/StatisticsDetails'], resolve);
const Profile = resolve => require(['@/views/ebi/Profile'], resolve);
const Molecules = resolve => require(['@/views/archive/Molecules'], resolve);
const PrivateDataset = resolve => require(['@/views/archive/PrivateDataset'], resolve);
const Spectra = resolve => require(['@/views/archive/Spectra'], resolve);
const Register = resolve => require(['@/views/ebi/Register'], resolve);
const Publish = resolve => require(['@/views/archive/Publish'], resolve);
const EditProfile = resolve => require(['@/views/ebi/EditProfile'], resolve);
const Login = resolve => require(['@/views/ebi/Login'], resolve);
const Forgotpassword = resolve => require(['@/views/ebi/ForgotPassword'], resolve);
const Resetpassword = resolve => require(['@/views/ebi/ResetPassword'], resolve);

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
    // {
    //   path:'/clusterprojects/:id',
    //   name: 'clusterprojects',
    //   component: ClusterProjects
    // },
    {
      path:'/statisticsdetails',
      name: 'statisticsdetails',
      component: StatisticsDetails
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
      }
    },
    {
      path: '/startRegistration.do',
      redirect: to => {
          return { name: 'register'}
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
      path:'/login',
      name: 'login',
      component: Login,
    },
    {
      path:'/archive/login',
      name: 'login',
      component: Login,
    },
    {
      path:'/forgotpassword',
      name: 'forgotpassword',
      component: Forgotpassword,

    },
    {
      path: '/archive/users/forgotpassword',
      name: 'forgotpassword',
      component: Forgotpassword,
    },
    {
      path:'/resetpassword/:reference',
      name: 'resetpassword',
      component: Resetpassword,
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
