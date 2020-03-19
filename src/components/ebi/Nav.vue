<template>
    <div class="nav-container">
        <div data-sticky-container>
          <header class="masthead ebi-masthead" data-sticky data-sticky-on="large" data-top-anchor="content:top" data-btm-anchor="content:bottom">
            <Alert v-if="bannerContent" banner type="warning" @on-close="closeBanner">
              <span class="banner" v-html="bannerContent"></span>
            </Alert>
            <div class="masthead-inner row">
              <!-- local-title -->
              <div class="columns medium-5" id="local-title">
                <div class="pride-logo">
                  <a title="Back to [service-name] homepage"><img @click="gotoPage(pageObj.pageName)" :src="pageObj.logoURL" alt="logo" :width="pageObj.logoWidth"></a>
                </div>
              </div>
              <!-- /local-title -->
              <div class="columns medium-10">
                <span id="quickgo-header-subtext"><h1 ng-hide="location.path()!=='/'" class="landingpage-title">{{title}}</h1></span>
              </div>
              <!-- local-search -->
              <!--
              <div class="columns medium-10">
                <form id="local-search" name="local-search" action="[search-action]" method="post">
                  <h4>Search this project</h4>
                  <fieldset class="ebi-fieldset">
                    <div class="input-group margin-bottom-none">
                      <input type="text" name="first" id="local-searchbox" placeholder="Search this service" class="input-group-field">
                      <div class="input-group-button">
                        <input type="submit" name="submit" value="1" class="button icon icon-functional">
                      </div>
                    </div>
                    <small class="">-->
                      <!-- If your search is more complex than just a keyword search, you can link to an Advanced Search -->
                      <!-- <span class="adv"><a href="../search" id="adv-search" title="Advanced">Advanced</a></span> | -->
                      <!-- Include some example searchterms - keep them short and few. -->
                      <!--
                      <a href="[search-url-1]">[search-1]</a>
                      <a href="[search-url-1]">[search-2]</a>
                      <a href="[search-url-1]">[search-3]</a>
                    </small>
                  </fieldset>
                </form>
              </div>
              -->
              <!-- /local-search -->
              <!-- local-nav -->
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
                            <Icon type="chevron-down"></Icon>
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
                            <Icon type="chevron-down"></Icon>
                          </a>
                          <DropdownMenu slot="list">
                    <!--<DropdownItem name="goToSpectraClustering">Spectra Clustering Toolsuite</DropdownItem>-->
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
                          <!--<DropdownMenu slot="list">-->
                              <!--&lt;!&ndash;-->
                              <!--<Dropdown placement="right-start">-->
                                  <!--<DropdownItem>-->
                                      <!--User Guide-->
                                      <!--<Icon type="ios-arrow-right"></Icon>-->
                                  <!--</DropdownItem>-->
                                  <!--<DropdownMenu slot="list">-->
                                      <!--<DropdownItem>PRIDE Archive</DropdownItem>-->
                                      <!--<DropdownItem>PRIDE Peptidome</DropdownItem>-->
                                  <!--</DropdownMenu>-->
                              <!--</Dropdown>-->
                              <!--&ndash;&gt;-->
                              <!--<DropdownItem name="goToPrideArchiveWS">PRIDE Archive WS</DropdownItem>-->
                              <!--<DropdownItem name="goToPridePeptidomeWS">PRIDE Peptidome WS</DropdownItem>-->
                          <!--</DropdownMenu>-->
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
                              <Icon type="chevron-down"></Icon>
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
              <!-- /local-nav -->
            </div>
          </header>
        </div>
        <Modal
            v-model="loginModalBool"
            title="Log In"
            :mask-closable="false"
            :footer-hide="true"
            :closable="true"
            class-name="login-modal"
            scrollable>
            <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline">
              <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="Email">
                <Icon type="ios-person-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input :type="passwordType" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <div class="login-action">
                <Checkbox @on-change="passwordTypeChange">Show Password</Checkbox>
                <!-- <a @click="forgotPassword">Forgot Password</a> -->
                <a href="mailto:pride-support@ebi.ac.uk?subject=Forgotten Password">Forgotten Password</a>
              </div>
              <FormItem>
                <Button type="primary" @click="login('formInline')" long>Log in</Button>
              </FormItem>
            </Form>
        </Modal>
        <Modal
            v-model="signUpModalBool"
            title="Sign Up"
            :mask-closable="false"
            :footer-hide="true"
            :closable="true"
            class-name="signup-modal"
            scrollable>
            <Form class="signUpForm" ref="formInlineSignUp" :model="formInlineSignUp" :rules="ruleInlineSignUp">
              <FormItem prop="email" label="Email">
                <Input type="text" v-model="formInlineSignUp.email" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="title" label="Title">
                <Select v-model="formInlineSignUp.title">
                    <Option v-for="item in titleList" :value="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
              <FormItem prop="firstname" label="First name">
                <Input type="text" v-model="formInlineSignUp.firstname" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="lastname" label="Last name">
                <Input type="text" v-model="formInlineSignUp.lastname" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="affiliation" label="Affiliation">
                <Input type="textarea" :autosize="{minRows: 2,maxRows: 3}" v-model="formInlineSignUp.affiliation" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="country" label="Country">
                <Select v-model="formInlineSignUp.country">
                    <Option v-for="item in countryList" :value="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
              <FormItem prop="orcid" label="ORCID">
                <Input type="text" v-model="formInlineSignUp.orcid" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="terms" label="Terms of Usage" >
                  <Checkbox v-model="formInlineSignUp.terms"><a @click="openTerms">Privacy notice</a></Checkbox>
              </FormItem>
              <FormItem>
                <Button class="signupButton" type="primary" @click="signup('formInlineSignUp')" long>Sign Up</Button>
              </FormItem>
            </Form>
        </Modal>
        <Modal
            v-model="forgotPasswordModalBool"
            title="Forgot Password"
            :mask-closable="false"
            :footer-hide="true"
            :closable="true"
            class-name="forgot-password-modal"
            scrollable>
            <Form class="signUpForm" ref="formInlineSendEmail" :model="formInlineSendEmail" :rules="ruleInlineSendEmail">
               <FormItem prop="email" label="Email">
                <Input type="text" v-model="formInlineSendEmail.email" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="firstname" label="First name">
                <Input type="text" v-model="formInlineSendEmail.firstname" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="lastname" label="Last name">
                <Input type="text" v-model="formInlineSendEmail.lastname" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="content" label="Content">
                <Input type="textarea" :autosize="{minRows: 2,maxRows: 3}" v-model="formInlineSendEmail.content" placeholder="">
                </Input>
              </FormItem>
              <FormItem>
                <Button class="signupButton" type="primary" @click="sendEmail('formInlineSendEmail')" long>Send Email</Button>
              </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import store from "@/store/store.js"
    //const csv=require('csvtojson')
    const initPage = function(page){
      let item = {}
      if(page == 'archive'){
        item = {
            pageName:'archive',
            homePageName:'landingpage',
            logoWidth:410,
            logoURL:'/static/logo/PRIDE_logo_Archive.png',
        }
      }
      else if(page == 'peptidome'){
        item = {
            pageName:'peptidome',
            homePageName:'landingpage',
            logoWidth:400,
            logoURL:'/static/logo/PRIDE_logo_Peptide.png',
        }
      }
      else if(page == 'spectra'){
        item = {
            pageName:'spectra',
            homePageName:'landingpage',
            logoWidth:400,
            logoURL:'/static/logo/PRIDE_logo_Archive.png',
        }
      }
      else if(page == 'landingpage'){
        item = {
            pageName:'landingpage',
            homePageName:'landingpage',
            logoWidth:500,
            logoURL:'/static/logo/PRIDE_logo.png',
        }
      }
      else{
        item = {
            pageName:'archive',
            homePageName:'landingpage',
            logoWidth:410,
            logoURL:'/static/logo/PRIDE_logo_Archive.png',
        }
      }
      return item;
    }
    export default {
        data () {
            return {
                keyword:'',
                selected: 'archive',
                title:'',
                subnav:[],
                bannerContentURL: this.$store.state.baseURL + '/static/banner/index.txt',
                countryListURL: this.$store.state.baseURL + '/static/country/index.csv',
                //countryListURL:'https://github.com/PRIDE-Utilities/pride-ontology/blob/master/pride-annotations/countries.csv',
                signupAPI: this.$store.state.basePrivateURL + '/user/register',
                //signupAPI :'https://wwwdev.ebi.ac.uk/pride/ws/archive/user/register',
                loginModalBool:false,
                signUpModalBool:false,
                forgotPasswordModalBool:false,
                formInline: {
                  user: '',
                  password: ''
                },
                ruleInline: {
                  user: [
                    { required: true, message: 'Please input username', trigger: 'blur' }
                  ],
                  password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                    // { type: 'string', min: 5, message: 'At least 5 words', trigger: 'blur' }
                  ]
                },
                tokenApi:this.$store.state.basePrivateURL+'/getAAPToken',
                formInlineSignUp:{
                  email:'',
                  title:'',
                  firstname:'',
                  lastname:'',
                  affiliation:'',
                  country:'',
                  orcid:'',
                  terms:false,
                },
                ruleInlineSignUp:{
                  email: [
                    { required: true, type:'email', message: 'Please input email', trigger: 'blur' }
                  ],
                  title: [
                    { required: true, message: 'Please input title', trigger: 'blur' }
                  ],
                  firstname: [
                    { required: true, message: 'Please input firstname', trigger: 'blur' }
                  ],
                  lastname: [
                    { required: true, message: 'Please input lastname', trigger: 'blur' }
                  ],
                  affiliation: [
                    { required: true, message: 'Please input affiliation', trigger: 'blur' }
                  ],
                  country: [
                    { required: true, message: 'Please input country', trigger: 'blur' }
                  ],
                  orcid: [
                    { required: false, message: 'Please input orcid', trigger: 'blur' }
                  ],
                  terms:[
                    { required: true, type:'enum', enum: ["true"], transform: value => value.toString(), message: 'Please check Terms and Conditions' }
                  ],
                },
                formInlineSendEmail:{
                  email:'',
                  firstname:'',
                  lastname:'',
                  content:'',

                },
                ruleInlineSendEmail:{
                  email: [
                    { required: true, type:'email', message: 'Please input email', trigger: 'blur' }
                  ],
                  firstname: [
                    { required: true, message: 'Please input firstname', trigger: 'blur' }
                  ],
                  lastname: [
                    { required: true, message: 'Please input lastname', trigger: 'blur' }
                  ],
                  content: [
                    { required: true, message: 'Please input content', trigger: 'blur' }
                  ],
                },
                titleList:[
                  {
                    label:'Mr',
                    value:'Mr'
                  },
                  {
                    label:'Ms',
                    value:'Ms'
                  },
                  {
                    label:'Miss',
                    value:'Miss'
                  },
                  {
                    label:'Mrs',
                    value:'Mrs'
                  },
                  {
                    label:'Dr',
                    value:'Dr'
                  },
                  {
                    label:'Professor',
                    value:'Professor'
                  },
                ],
                countryList:[],
                pageObj:{},
                passwordType:'password',
                bannerContent:''
            }
        },
        props: ['page'],
        methods:{
            submit(){
                this.$Message.error({content:this.selected+' search coming soon', duration:3});
                this.$http
                  .post("/source/type")
                  .then(function(res){
                    this.successSearch();
                  },function(err){
                    this.failSearch();
                  });
            },
            successSearch(){
                this.$Message.success({content:'success search', duration:3});
            },
            failSearch(){
                this.$Message.error({content:'error search', duration:3});
            },
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
              //this.$refs['formInline'].resetFields();
              //this.loginModalBool=true;
            },
            showSignup(){
              this.$router.push({name:'register'});
              //this.$refs['formInlineSignUp'].resetFields();
              //this.signUpModalBool=true;
            },
            login(name) {
              this.$refs[name].validate((valid) => {
                  if (!valid) {
                    this.$Message.error({ content: 'Format Invalid' });
                    return
                  }
                  this.$Spin.show({
                    render: (h) => {
                      return h('div', [
                        h('Icon', {
                          'class': 'demo-spin-icon-load',
                          props: {
                            type: 'ios-loading',
                            size: 18
                          }
                        }),
                        h('div', 'Loading')
                      ])
                    }
                  });
                  console.log(this.tokenApi)
                  this.$http
                        //.post(this.tokenApi + '?username='+this.formInline.user+'&password='+this.formInline.password)
                        .post(this.tokenApi,
                            {Credentials:
                              {
                                username:this.formInline.user,
                                password:this.formInline.password
                              }
                            })
                        .then(function(res){
                              this.loginModalBool=false;
                              localStorage.setItem('username',this.formInline.user);
                              localStorage.setItem('token',res.bodyText);
                              //this.username = this.formInline.user;
                              this.$store.commit('setUser',{username: this.formInline.user, token:res.bodyText});
                              this.$Message.success({ content: 'Login Success' })
                              this.$Spin.hide()
                              this.$refs[name].resetFields();
                              this.gotoProfile();
                        }).catch(err=>{
                          console.log(err);
                          this.$Spin.hide()
                          this.$Message.error({ content: 'Invalid Username or Password'});
                        });
              })
            },
            signup(name){
              this.$refs[name].validate((valid) => {
                  if (!valid) {
                    this.$Message.error({ content: 'Fill all required items' });
                    return
                  }
                  this.$Spin.show({
                    render: (h) => {
                      return h('div', [
                        h('Icon', {
                          'class': 'demo-spin-icon-load',
                          props: {
                            type: 'load-b',
                            size: 18
                          }
                        }),
                        h('div', 'Please wait...')
                      ])
                    }
                  });
                  let query = {};
                  query.UserSummary = {
                    acceptedTermsOfUse: this.formInlineSignUp.terms,
                    affiliation: this.formInlineSignUp.affiliation,
                    country: this.formInlineSignUp.country,
                    email: this.formInlineSignUp.email,
                    firstName: this.formInlineSignUp.firstname,
                    lastName: this.formInlineSignUp.lastname,
                    orcid: this.formInlineSignUp.orcid,
                    title: this.formInlineSignUp.title,
                  }
                  this.$http
                        .post(this.signupAPI,query)
                        .then(function(res){
                              this.signUpModalBool=false;
                              this.$Message.success({ content: 'Sign Up Success' })
                              this.$Spin.hide()
                              this.$refs[name].resetFields();
                        },function(err){
                          let errArray = err.body;
                          this.$Spin.hide()
                          this.$Message.error({ content: errArray[0].defaultMessage});
                        });
              })
            },
            sendEmail(name){
              this.$refs[name].validate((valid) => {
                  if (!valid) {
                    this.$Message.error({ content: 'Fill all required items' });
                    return
                  }
                  this.$Spin.show({
                    render: (h) => {
                      return h('div', [
                        h('Icon', {
                          'class': 'demo-spin-icon-load',
                          props: {
                            type: 'load-b',
                            size: 18
                          }
                        }),
                        h('div', 'Please wait...')
                      ])
                    }
                  });
                  let query = {};
                  query.UserSummary = {
                    content: this.formInlineSendEmail.affiliation,
                    email: this.formInlineSendEmail.email,
                    firstName: this.formInlineSendEmail.firstname,
                    lastName: this.formInlineSendEmail.lastname,
                  }
                  this.$Message.error({ content: 'Wait for API' });
                  // this.$http
                  //       .post(this.signupAPI,query)
                  //       .then(function(res){
                  //             this.signUpModalBool=false;
                  //             this.$Message.success({ content: 'Sign Up Success' })
                  //             this.$Spin.hide()
                  //             this.$refs[name].resetFields();
                  //       },function(err){
                  //         let errArray = err.body;
                  //         this.$Spin.hide()
                  //         this.$Message.error({ content: errArray[0].defaultMessage});
                  //       });
              })
            },
            logout(){
              //this.$store.commit('setUser',{username: '', token:''});
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
                //console.log(123)
                this.$http
                  .get(this.countryListURL)
                  .then(function(res){
                      this.countryList = [];
                      let json = JSON.parse(this.csvJSON(res.body))
                      for(let i=0; i < json.length-1; i++){
                        //console.log(json[i].value);
                          json[i].value = json[i].value.replace(/^"(.*)"$/, '$1');
                          let item = {}
                          item.label=json[i].value
                          item.value=json[i].id
                          this.countryList.push(item);
                        //json[i].value.replace(/['"]+/g, '')
                        //console.log(i);
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
              //return result; //JavaScript object
              return JSON.stringify(result); //JSON
            },
            forgotPassword(){
                this.forgotPasswordModalBool = true;
                this.signUpModalBool = false;
                this.loginModalBool = false;
            },
            passwordTypeChange(type){
              if(type)
                this.passwordType="text";
              else
                this.passwordType="password"
              //console.log(type)
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
        background-image: url('../../../static/image/hero-beta-banner.png');
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
   /*.user-action{
      float: right;
      margin-right: 10px;
      display: flex;
      margin-bottom: 5px;
    }
    .user-action a{
      margin-left: 10px;
    }*/
    .signUpForm div{
      margin-bottom: 5px;
    }
    .signupButton{
      margin-top: 20px;
    }
    .login-action{
      display: flex;
      justify-content: space-between;
      margin-top: -10px;
      margin-bottom: 10px;
      color:#454548 !important;
    }
    .login-action label{
      color:#454548 !important;
    }
    .login-action a{
      border-bottom-style:none !important;
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
    .signup-modal .ivu-modal-body{
      padding: 0 16px 16px 16px;
    }
    .signUpForm.ivu-form .ivu-form-item-label{
      padding:6 12px 2px 0;
    }
    .signUpForm .ivu-form-item-error-tip{
      padding-top: 0px
    }
    .login-modal a{
      border-bottom-style:none;
    }
    .signup-modal a{
      border-bottom-style:none;
    }
    .forgot-password-modal a{
      border-bottom-style:none;
    }
    .banner{
      color:#454548 !important;
    }
    .banner a{
      color:#454548 !important;
    }
</style>
