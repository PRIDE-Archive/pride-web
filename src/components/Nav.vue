<template>
    <div class="nav-container">
        <div data-sticky-container>
          <header class="masthead ebi-masthead" data-sticky data-sticky-on="large" data-top-anchor="content:top" data-btm-anchor="content:bottom">
            <Alert v-if="bannerContent" banner type="warning" @on-close="closeBanner">
              <span class="banner" v-html="bannerContent"></span>
            </Alert>
            <div class="masthead-inner row">
              <div class="columns medium-5" id="local-title">
                <div class="pride-logo">
                  <a title="Back to [service-name] homepage"><img @click="gotoPage(pageObj.pageName)" :src="pageObj.logoURL" alt="logo" :width="pageObj.logoWidth"></a>
                </div>
              </div>
              <nav class="sub-nav-ebi">
                <ul id="local-nav" class="dropdown menu float-left" data-description="navigational">
                  <li class="sub-nav-list">
                      <Dropdown>
                          <router-link :to="{ name: pageObj.homePageName}">
                            <i class="fas fa-home"></i>
                            <span class='sub-nav-title'>Home</span>
                          </router-link>
                      </Dropdown>
                  </li>
                  <li class="sub-nav-list">
                      <Dropdown @on-click="resourcesClick">
                          <a href="javascript:void(0)">
                            <i class="fas fa-search"></i>
                            <span class='sub-nav-title'>Resources</span>
                            <Icon type="ios-arrow-down" />
                          </a>
                          <DropdownMenu slot="list">
                              <DropdownItem name="goToArchive"><router-link :to="{ name: 'archive'}">PRIDE Archive</router-link></DropdownItem>
                              <DropdownItem name="goToSpectra"><router-link :to="{ name: 'spectra'}">PRIDE Archive Spectra</router-link></DropdownItem>

                              <DropdownItem name="goToPeptidome"><router-link :to="{ name: 'peptidome'}">PRIDE Peptidome</router-link></DropdownItem>
                              <DropdownItem name="gotoSpectrumLibrary"><router-link :to="{ name: 'spectrumlibrary'}">PRIDE Spectral Libraries</router-link></DropdownItem>
                          </DropdownMenu>
                      </Dropdown>
                  </li>
                  <li class="sub-nav-list">
                      <Dropdown @on-click="resourcesClick">
                          <a href="javascript:void(0)">
                            <i class="fas fa-cogs"></i>
                            <span class='sub-nav-title'>Tools</span>
                            <Icon type="ios-arrow-down"></Icon>
                          </a>
                          <DropdownMenu slot="list">
                              <DropdownItem name="goToPrideSubmission"><router-link :to="{ path: '/markdownpage/pridesubmissiontool' }">PRIDE Submission Tool</router-link></DropdownItem>
                              <DropdownItem name="goToPrideInspector"><router-link :to="{ path: '/markdownpage/prideinspector' }">PRIDE Inspector Toolsuite</router-link></DropdownItem>
                              <DropdownItem name="goToPrideUtilities"><router-link :to="{ path: '/markdownpage/prideutilities' }">PRIDE Utilities Libraries</router-link></DropdownItem>
                          </DropdownMenu>
                      </Dropdown>
                  </li>
                  <li class="sub-nav-list">
                      <Dropdown @on-click="resourcesClick">
                          <router-link :to="{ path: '/markdownpage/documentationpage' }">
                            <i class="fas fa-graduation-cap"></i>
                            <span class='sub-nav-title'>Docs</span>
                          </router-link>
                      </Dropdown>
                  </li>
                  <li class="sub-nav-list">
                      <Dropdown>
                          <router-link :to="{ path: '/markdownpage/citationpage' }">
                            <i class="fas fa-info-circle"></i>
                            <span class='sub-nav-title'>About</span>
                          </router-link>
                      </Dropdown>
                  </li>
                </ul>
                <ul class="user-action dropdown menu float-right" data-description="navigational">
                    <li v-if="!username" class="sub-nav-list">
                        <Dropdown>
                            <a href="javascript:void(0)" @click="showLogin">
                              <span class='sub-nav-title'>Log in</span>
                            </a>
                        </Dropdown>
                    </li>
                    <li v-else class="sub-nav-list">
                        <Dropdown @on-click="usernameClick">
                            <a href="javascript:void(0)">
                              <span class='sub-nav-title'>{{username}}</span>
                              <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="profile">Profile</DropdownItem>
                                <DropdownItem name="logout">Log out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                    <li class="sub-nav-list">
                        <Dropdown>
                            <a href="javascript:void(0)" @click="showSignup">
                              <span class='sub-nav-title'>Register</span>
                            </a>
                        </Dropdown>
                    </li>
                </ul>
              </nav>
            </div>
          </header>
        </div>
    </div>
</template>
<script>
    import store from "@/store.js"
    const initPage = function(page){
      let item = {}
      if(page == 'archive'){
        item = {
            pageName:'archive',
            homePageName:'landingpage',
            logoWidth:410,
            logoURL:'/logo/PRIDE_logo_Archive.png',
        }
      }
      else if(page == 'peptidome'){
        item = {
            pageName:'peptidome',
            homePageName:'landingpage',
            logoWidth:400,
            logoURL:'/logo/PRIDE_logo_Peptide.png',
        }
      }
      else if(page == 'spectra'){
        item = {
            pageName:'spectra',
            homePageName:'landingpage',
            logoWidth:400,
            logoURL:'/logo/PRIDE_logo_Archive.png',
        }
      }
      else if(page == 'landingpage'){
        item = {
            pageName:'landingpage',
            homePageName:'landingpage',
            logoWidth:500,
            logoURL:'/logo/PRIDE_logo.png',
        }
      }
      else{
        item = {
            pageName:'archive',
            homePageName:'landingpage',
            logoWidth:410,
            logoURL:'/logo/PRIDE_logo_Archive.png',
        }
      }
      return item;
    }
    export default {
        data () {
            return {
                selected: 'archive',
                bannerContentURL: this.$store.state.baseURL + '/banner/index.txt',
                countryListURL: this.$store.state.baseURL + '/country/index.csv',
                countryList:[],
                pageObj:{},
                bannerContent:''
            }
        },
        props: ['page'],
        methods:{
            gotoPage(name){
              if(name=="archive")
                this.$router.push({name: 'archive', query: {refresh:true}});
              else
                this.$router.push({name:name});
            },
            resourcesClick(name){
                if(name=='goToArchive'){
                    this.$router.push({name:'archive'});
                }
                else if(name=='goToSpectra'){
                  this.$router.push({name:"spectra"})
                }
                else if(name=='goToPeptidome'){
                    this.$router.push({name:'peptidome'});
                }
                else if(name=='gotoSpectrumLibrary'){
                    this.$router.push({name:'spectrumlibrary'});
                }
                else if(name=='goToSpectraClustering'){
                    this.$router.push({path:'/markdownpage/spectraclustering'});
                }
                else if(name=='goToPrideSubmission'){
                  this.$router.push({path:'/markdownpage/pridesubmissiontool'});
                }
                else if(name=='goToPrideInspector'){
                    this.$router.push({path:'/markdownpage/prideinspector'});
                }
                else if(name=='goToPrideUtilities'){
                    this.$router.push({path:'/markdownpage/prideutilities'});
                }
                else if(name=='goToPrideArchiveWS'){
                    this.$router.push({path:'/markdownpage/pridearchivews'});
                }
                else if(name=='goToPridePeptidomeWS'){
                    this.$router.push({path:'/markdownpage/pridepeptidomews'});
                }
            },
            gotoAbout(){
              this.$router.push({path:'/markdownpage/citationpage'});
            },
            gotoDocs(){
              this.$router.push({path:'/markdownpage/documentationpage'});
            },
            showLogin(){
              this.$router.push({name:'login'});
            },
            showSignup(){
              this.$router.push({name:'register'});
            },
            logout(){
              localStorage.setItem('username','');
              localStorage.setItem('token','');
              this.$router.replace({name:'archive'});
              this.$store.commit('setUser',{username: '', token:''});
            },
            init(){
                let username = localStorage.getItem('username');
                let token = localStorage.getItem('token');
                if(username && token)
                  this.$store.commit('setUser',{username: username, token:token});

                this.pageObj = initPage(this.page)
                this.pageObj.logoURL =  this.$store.state.baseURL +  this.pageObj.logoURL
                this.queryBanner()
            },
            openTerms(){
              window.open('https://www.ebi.ac.uk/data-protection/privacy-notice/pride-new');
            },
            gotoProfile(){
              this.$router.push({ name: 'profile', params: {id: this.$store.state.username.split('@')[0] }});
            },
            usernameClick(name){
              if(name=='profile'){
                this.gotoProfile();
              }
              else if(name=='logout'){
                this.logout();
              }
            },
            queryCountryList(){
                this.$http
                  .get(this.countryListURL)
                  .then(function(res){
                      this.countryList = [];
                      let json = JSON.parse(this.csvJSON(res.body))
                      for(let i=0; i < json.length-1; i++){
                          json[i].value = json[i].value.replace(/^"(.*)"$/, '$1');
                          let item = {}
                          item.label=json[i].value
                          item.value=json[i].id
                          this.countryList.push(item);
                      }
                  },function(err){

                  });
            },
            csvJSON(csv){
              var lines=csv.split("\n");
              var result = [];
              var headers=lines[0].split(",");
              for(var i=1;i<lines.length;i++){
                  var obj = {};
                  var currentline=lines[i].split(",");
                  for(var j=0;j<headers.length;j++){
                      obj[headers[j]] = currentline[j];
                  }
                  result.push(obj);
              }
              return JSON.stringify(result); //JSON
            },
            queryBanner(){
              this.$http
                  .get(this.bannerContentURL)
                  .then(function(res){
                      this.bannerContent = res.body;
                  },function(err){

                  });
            },
            closeBanner(){
              console.log('close banner');
            }
        },
        mounted() {
          this.init();
          this.queryCountryList();
        },
        computed:{
          username(){
            var username = this.$store.state.username || '';
            return username;
          },
        }
    }
</script>
<style scoped>
    .nav-container{
        /*
        width:100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F0F0F0;*/
    }
    .masthead-inner{
      color:#656665;
    }
    .ebi-fieldset{
        border: 0 !important;
    }
    .ebi-masthead{
        background-image: url('/image/hero-beta-banner.png');
    }
    .ebi-masthead nav ul.menu li{
        border-right: 1px solid rgb(248,248,248,0.7);
    }
    .sub-nav-list{
      padding: 0 5px;
    }
    .sub-nav-list li{
        border-right:0px !important;
        border-bottom: 1px solid #e7e7e7 !important;
    }
    .sub-nav-list li:last-child{
        border-bottom: none !important;
    }
    .ebi-masthead nav ul.menu li:last-child{
      border: 0;
    }
    .sub-nav-ebi a:hover{
        opacity: 0.7;
    }
    .ebi-masthead h1, .ebi-masthead a{
      color:#454548;
    }
    .landingpage-title{
      font-size: 3rem;
      font-weight:300;
      font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
    }
    .pride-logo{
      margin-bottom: 20px;
    }
    .sub-nav-ebi .ivu-dropdown-menu{
      margin-left:0 !important;
    }
    .sub-nav-title{
      margin: 0 3px;
    }
    .row{
      margin:0 auto;

      max-width: 150rem !important;
   }
   #local-nav{
      margin-left: 10px;
   }
</style>
<style>
   .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
   .sub-nav-ebi .sub-nav-list .ivu-select-dropdown{
      padding: 0 !important;
      border-radius: 0px !important;
    }
    .sub-nav-ebi .ivu-dropdown-item{
      float: none !important;
      font-size: 14px !important;
      padding: 12px 16px !important;
    }
    .sub-nav-ebi .ivu-dropdown-menu .ivu-dropdown{
      border-bottom: 1px solid #e7e7e7 !important;
    }
    .banner{
      color:#454548 !important;
    }
    .banner a{
      color:#454548 !important;
    }
</style>
