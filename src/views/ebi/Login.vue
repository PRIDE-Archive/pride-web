<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>


        <div class="container">
              <div class="content-container">
                  <div style="display: flex;justify-content: space-between; align-items: baseline;"><h2 class="project-title">Log In</h2><!-- <span>Already have an account? Please <a href="">Log in</a></span> --></div>
                  <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 70px;"> </span>
                  <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                      <Input type="text" v-model="formInline.user" placeholder="Email">
                      <Icon type="ios-person-outline" slot="prepend" size="14"></Icon>
                      </Input>
                    </FormItem>
                    <FormItem prop="password">
                      <Input :type="passwordType" v-model="formInline.password" placeholder="Password">
                      <Icon type="ios-lock-outline" slot="prepend" size="14"></Icon>
                      </Input>
                    </FormItem>
                    <div class="login-action">
                      <Checkbox @on-change="passwordTypeChange">Show Password</Checkbox>
                      <a @click="forgotPassword">Forgot Password</a>
                      <!-- <a href="mailto:pride-support@ebi.ac.uk?subject=Forgotten Password">Forgotten Password</a> -->
                    </div>
                    <FormItem>
                      <Button type="primary" @click="login('formInline')" long>Log in</Button>
                    </FormItem>
                  </Form>
              </div>
              <div class="divider"></div>
              <div class="content-container">
                  <div style="display: flex;justify-content: space-between; align-items: baseline;"><h2 class="project-title">Login using Reviewer Token</h2><!-- <span>Already have an account? Please <a href="">Log in</a></span> --></div>
                  <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 70px;"> </span>
                  <Form class="form" ref="token_formInline" :model="token_formInline" :rules="token_ruleInline">
                    <FormItem prop="accession">
                      <Input type="text" v-model="token_formInline.accession" placeholder="Project Accession">
                      <Icon type="ios-person-outline" slot="prepend" size="14"></Icon>
                      </Input>
                    </FormItem>
                    <FormItem prop="token">
                      <Input :type="token_passwordType" v-model="token_formInline.token" placeholder="Reviewer Token">
                      <Icon type="ios-lock-outline" slot="prepend" size="14"></Icon>
                      </Input>
                    </FormItem>
                    <div class="login-action">
                      <Checkbox @on-change="token_passwordTypeChange">Show Token</Checkbox>
                    </div>
                    <FormItem>
                      <Button type="primary" @click="token_login('token_formInline')" long>Log in</Button>
                    </FormItem>
                  </Form>
              </div>
        </div>
        <!-- <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="11">
              <div class="content-container">
                  <div style="display: flex;justify-content: space-between; align-items: baseline;"><h2 class="project-title">Log In</h2></div>
                  <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 70px;"> </span>
                  <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                      <Input type="text" v-model="formInline.user" placeholder="Email">
                      <Icon type="ios-person-outline" slot="prepend" size="14"></Icon>
                      </Input>
                    </FormItem>
                    <FormItem prop="password">
                      <Input :type="passwordType" v-model="formInline.password" placeholder="Password">
                      <Icon type="ios-lock-outline" slot="prepend" size="14"></Icon>
                      </Input>
                    </FormItem>
                    <div class="login-action">
                      <Checkbox @on-change="passwordTypeChange">Show Password</Checkbox>
                      <a @click="forgotPassword">Forgot Password</a>

                    </div>
                    <FormItem>
                      <Button type="primary" @click="login('formInline')" long>Log in</Button>
                    </FormItem>
                  </Form>
              </div>
          </Col>
          <Col :xs="0" :sm="0" :md="0" :lg="2">
              <div class="divider"></div>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="11">
              <div class="content-container">
                  <div style="display: flex;justify-content: space-between; align-items: baseline;"><h2 class="project-title">Login using Reviewer Token</h2></div>
                  <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 70px;"> </span>
                  <Form class="form" ref="formInline" :model="token_formInline" :rules="token_ruleInline">
                    <FormItem prop="user">
                      <Input type="text" v-model="token_formInline.accession" placeholder="Project Accession">
                      <Icon type="ios-person-outline" slot="prepend" size="14"></Icon>
                      </Input>
                    </FormItem>
                    <FormItem prop="password">
                      <Input :type="token_passwordType" v-model="token_formInline.token" placeholder="Reviewer Token">
                      <Icon type="ios-lock-outline" slot="prepend" size="14"></Icon>
                      </Input>
                    </FormItem>
                    <div class="login-action">
                      <Checkbox @on-change="token_passwordTypeChange">Show Token</Checkbox>
                    </div>
                    <FormItem>
                      <Button type="primary" @click="token_login('token_formInline')" long>Log in</Button>
                    </FormItem>
                  </Form>
              </div>
          </Col>
        </Row> -->
       
        
    </div>
</template>
<script>
    import NavBar from '@/components/Nav'
    import store from "@/store.js"
    export default {
        data () {
            return {
                // username password login
                loginApi:this.$store.state.basePrivateURL+'/login',
                passwordType:'password',
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


                // token login
                tokenApi: this.$store.state.basePrivateURL+'/reviewer_token_login',
                token_passwordType:'password', // it must be password as it will show stars when it is checked
                token_formInline: {
                  accession: '',
                  token: ''
                },
                token_ruleInline: {
                  accession: [
                    { required: true, message: 'Please input project accession', trigger: 'blur' }
                  ],
                  token: [
                    { required: true, message: 'Please input reviewer token', trigger: 'blur' },
                    // { type: 'string', min: 5, message: 'At least 5 words', trigger: 'blur' }
                  ]
                },
            }
        },
        components: {
            NavBar,
        },
        methods:{
            // username password login
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
                  this.$http
                        .post(this.loginApi,
                            {Credentials:
                              {
                                username:this.formInline.user.trim(),
                                password:this.formInline.password.trim()
                              }
                            })
                        .then(function(res){
                              this.loginModalBool=false;
                              localStorage.setItem('username',this.formInline.user);
                              localStorage.setItem('token',res.bodyText);
                              localStorage.setItem('logintype','password');
                              this.$store.commit('setUser',{username: this.formInline.user, token:res.bodyText});
                              
                              this.$Spin.hide()
                              this.$refs[name].resetFields();
                              if(localStorage.getItem('privateusi')){
                                this.$Message.success({ content: 'Login Success and we are doing the USI search for you!' , duration:3})
                                this.$router.push({ name: 'usi', query: {usi: localStorage.getItem('privateusi'), resultType: 'FULL'}});
                              }
                              else{
                                this.$Message.success({ content: 'Login Success' })
                                this.gotoProfile();
                              }
                        }).catch(err=>{
                          console.log(err);
                          this.$Spin.hide()
                          this.$Message.error({ content: 'Invalid Username or Password'});
                        });
              })
            },
            // token login
            token_login(name) {
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
                  this.$http
                        .post(this.tokenApi,
                            {Credentials:
                              {
                                username:this.token_formInline.accession.trim(),
                                password:this.token_formInline.token.trim()
                              }
                            })
                        .then(function(res){
                              this.loginModalBool=false;
                              localStorage.setItem('username',this.token_formInline.accession.trim());
                              localStorage.setItem('token',res.bodyText);
                              localStorage.setItem('logintype','token');
                              this.$store.commit('setUser',{username: this.token_formInline.accession, token:res.bodyText});
                              // set reviewdataset
                              let query = {}
                              query.ReviewerAccess = {
                                  accession:localStorage.getItem('username');
                                  token:localStorage.getItem('token');
                              }
                              localStorage.setItem('reviewdataset',JSON.stringify(query)); // this is specificall used for reveiew dataset page
                              //set timer for reviewdataset, the timer will be updated once it goes into the "privatereviewdataset" page again.
                              let timer = {
                                time:Date.now(),
                                expire:30*60*1000
                              }
                              localStorage.setItem('reviewdataset-timer',JSON.stringify(timer));
                              console.log('login success, direct to privatereviewdataset')
                              // here we will direct to "archive/PrivateReviewDataset.vue" but NOT the "ebi/ReviewDataset.vue" which will be abandoned soon

                              this.$Spin.hide()
                              this.$refs[name].resetFields();
                             
                              this.$Message.success({ content: 'Login Success' })
                              this.gotoReviewDataset()
                            
                        }).catch(err=>{
                          console.log(err);
                          this.$Spin.hide()
                          this.$Message.error({ content: 'Invalid Accession or Token'});
                        });
              })
            },
            // username password login
            passwordTypeChange(type){
              if(type)
                this.passwordType="text";
              else
                this.passwordType="password"
              //console.log(type)
            },
            // token login
            token_passwordTypeChange(type){
              if(type)
                this.token_passwordType="text";
              else
                this.token_passwordType="password"
              //console.log(type)
            },
            gotoProfile(){
              this.$router.push({ name: 'profile', params: {id: this.$store.state.username.split('@')[0] }});
            },
            gotoReviewDataset(){
              this.$router.push({ name: 'privatereviewdataset', params: {id: this.$store.state.username.split('@')[0] }});
            },
            forgotPassword(){
                this.$router.push({ name: 'forgotpassword'});
            },
        },
        mounted:function(){
             this.$refs['formInline'].resetFields();
        },
        beforeRouteEnter(to,from,next){
            next(vm=>{
              let username = localStorage.getItem('username') || '';
              let lastLoginType = localStorage.getItem('logintype');
              if(username && lastLoginType == 'password'){
                vm.$router.push({name:'profile', params: {id: username.split('@')[0] }})
              }
              else if(username && lastLoginType == 'token'){
                vm.$router.push({name:'privatereviewdataset', params: {id: username.split('@')[0] }})
              }
            });
        }
    }
</script>
<style scoped>
    .container{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content-container{
        margin: 0 auto;
        padding: 150px 125px;
        flex: 1;
        box-sizing: border-box;
    }
    .project-title{
      color:rgb(100, 102, 100);
      margin: 20px 0 5px 0;
    }
    .login-action{
      display: flex;
      justify-content: space-between;
      margin-top: -10px;
      margin-bottom: 50px;
      color:#454548 !important;
    }
    .login-action label{
      color:#454548 !important;
    }
    .login-action a{
      border-bottom-style:none !important;
      color:#444;
    }
    .login-action a:hover{
      color:#5bc0be;
    }
    .divider {
      width: 1px;
      height: 300px;
      background-color: #ccc;
      margin: 0 20px;
    }

    @media (max-width: 991px) {
        .content-container{
            width: 100%;
            padding: 50px 50px;
        }
        .container{
          display: block;
        }
        .divider {
          /*width: 80%;
          height: 1px;
          background-color: #ccc;
          margin: 0 20px;*/
          display: none;
        }
    }
    @media (min-width: 992px) {
        .content-container{
            width: 800px;
            padding: 150px 30px;
        }
    }
    @media (min-width: 1200px) {
        .content-container{
            width: 850px;
            padding: 150px 30px;
        }
    }
    @media (min-width: 1400px) {
        .content-container{
            width: 850px;
            padding: 150px 80px;
        }
    }
</style>
<style>

</style>
