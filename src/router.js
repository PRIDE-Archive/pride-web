import Vue from 'vue'
import Router from 'vue-router'

const LandingPage = resolve => require(['@/views/landingpage/LandingPage'], resolve);
const Archive = resolve => require(['@/views/archive/Archive'], resolve);
const Dataset = resolve => require(['@/views/archive/Dataset'], resolve);
const NotFound = resolve => require(['@/views/NotFound'], resolve);
const MarkdownPage = resolve => require(['@/views/documentation/MarkdownPage'], resolve);
const SpectrumLibrary = resolve => require(['@/views/peptidome/SpectrumLibrary'], resolve);
const PSM = resolve => require(['@/views/peptidome/PSM'], resolve);
const Peptidome = resolve => require(['@/views/peptidome/Peptidome'], resolve);
const PeptideSearch = resolve => require(['@/views/peptidome/PeptideSearch'], resolve);
const PeptideDetails = resolve => require(['@/views/peptidome/PeptideDetails'], resolve);
const StatisticsDetails = resolve => require(['@/views/landingpage/StatisticsDetails'], resolve);
const Profile = resolve => require(['@/views/ebi/Profile'], resolve);
const Molecules = resolve => require(['@/views/archive/Molecules'], resolve);
const PrivateDataset = resolve => require(['@/views/archive/PrivateDataset'], resolve);
const EditDataset = resolve => require(['@/views/archive/EditDataset'], resolve);
const Spectra = resolve => require(['@/views/archive/Spectra'], resolve);
const Register = resolve => require(['@/views/ebi/Register'], resolve);
const Publish = resolve => require(['@/views/archive/Publish'], resolve);
const EditProfile = resolve => require(['@/views/ebi/EditProfile'], resolve);
const Login = resolve => require(['@/views/ebi/Login'], resolve);
const Forgotpassword = resolve => require(['@/views/ebi/ForgotPassword'], resolve);
const Resetpassword = resolve => require(['@/views/ebi/ResetPassword'], resolve);
const Reviewdataset = resolve => require(['@/views/ebi/ReviewDataset'], resolve);
const PrivateReviewDataset = resolve => require(['@/views/archive/PrivateReviewDataset'], resolve);
const Xiview = resolve => require(['@/views/archive/Xiview'], resolve);
const Crosslinking = resolve => require(['@/views/archive/Crosslinking'], resolve);
const Relevant = resolve => require(['@/views/ebi/Relevant'], resolve);

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
      path: '/relevant',
      name: 'relevant',
      component: Relevant
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
      path:'/archive/projects/:id/edit',
      name: 'editdataset',
      component: EditDataset
    },
    {
      path: '/peptidome',
      name: 'peptidome',
      component: Peptidome
    },
    {
      path: '/help',
      redirect: {
        name: 'markdownpage',
        params: { subpage: 'documentationpage' }
      },
    },
    {
      path: '/peptidome/peptidesearch',
      name: 'peptidesearch',
      component: PeptideSearch
    },
    {
      path: '/archive/usi',
      name: 'usi',
      component: Spectra
    },
    {
      path: '/archive/spectra',
      redirect: to => {
          return { name: 'usi'}
      }
    },
    {
      path: '/peptidome/peptidedownload',
      name: 'peptidedownload',
      component: NotFound,
    },
    {
      path: '/spectrumlibrary',
      name: 'spectrumlibrary',
      component: SpectrumLibrary
    },
    {
      path:'/peptidome/peptidedetails',
      name: 'peptidedetails',
      component: PeptideDetails
    },
    {
      path:'/psm/:id',
      name: 'psm',
      component: PSM
    },
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
      path:'/forgotpassword',
      name: 'forgotpassword',
      component: Forgotpassword,
    },
    {
      path:'/resetpassword/:reference',
      name: 'resetpassword',
      component: Resetpassword,
    },
    {
      path:'/archive/projects/:id/privatereviewdataset',
      name: 'privatereviewdataset',
      component: PrivateReviewDataset
    },
    {
      path:'/review-dataset/:reference',
      name: 'reviewdataset',
      component: Reviewdataset,
    },
    {
      path:'/archive/crosslinking',
      name: 'Xiview',
      component: Xiview,
    },
    {
      path:'/archive/crosslinking/:id',
      name: 'crosslinking',
      component: Crosslinking
    },
    {
      path:'/archive/projects/:id/publish',
      name: 'publish',
      component: Publish
    },
    // for publish test
    // {
    //   path:'/archive/projects/PXD12311/publish',
    //   name: 'publish',
    //   component: Publish
    // },
    {
      path:'/archive/users/profile/edit',
      name: 'editprofile',
      component: EditProfile
    },
    {
      path:'/404',
      name: '404',
      component: NotFound,
    },
    {
      path:'*',
      name: 'notfound',
      component: NotFound,
    },
  ],
})
