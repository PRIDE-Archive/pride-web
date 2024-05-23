<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
            <div style="display: flex;justify-content: space-between; align-items: baseline;"><h2 class="project-title">Login using Reviewer Token</h2><!-- <span>Already have an account? Please <a href="">Log in</a></span> --></div>
            <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 70px;"> </span>
            <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline">
              <FormItem prop="user">
                <Input type="text" v-model="formInline.accession" placeholder="Project Accession">
                <Icon type="ios-person-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input :type="passwordType" v-model="formInline.token" placeholder="Reviewer Token">
                <Icon type="ios-lock-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <div class="login-action">
                <Checkbox @on-change="passwordTypeChange">Show Token</Checkbox>
              </div>
              <FormItem>
                <Button type="primary" @click="login('formInline')" long>Log in</Button>
              </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import NavBar from '@/components/Nav'
    import store from "@/store.js"
    export default {
        data () {
            return {
                // tokenApi:this.$store.state.basePrivateURL+'/login',
                loginApi: this.$store.state.basePrivateURL+'/reviewer_token_login',
                passwordType:'password',
                formInline: {
                  accession: '',
                  token: ''
                },
                ruleInline: {
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
                        //.post(this.tokenApi + '?username='+this.formInline.accession+'&password='+this.formInline.token)
                        .post(this.loginApi,
                            {Credentials:
                              {
                                username:this.formInline.accession.trim(),
                                password:this.formInline.token.trim()
                              }
                            })
                        .then(function(res){
                          console.log('res',res)
                          console.log('this.formInline.accession',this.formInline.accession)
                          console.log('res.bodyText',res.bodyText)
                              this.loginModalBool=false;
                              localStorage.setItem('username',this.formInline.accession.trim());
                              localStorage.setItem('token',res.bodyText);

                              console.log('localStorage username', localStorage.getItem('username'));
                              console.log('localStorage token', localStorage.getItem('token'));


                              //this.username = this.formInline.accession;
                              this.$store.commit('setUser',{username: this.formInline.accession, token:res.bodyText});
                              
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
           passwordTypeChange(type){
              if(type)
                this.passwordType="text";
              else
                this.passwordType="password"
              //console.log(type)
            },
            gotoProfile(){
              this.$router.push({ name: 'profile', params: {id: this.$store.state.username.split('@')[0] }});
            },
            // forgotPassword(){
            //     this.$router.push({ name: 'forgotpassword'});
            // },
        },
        mounted:function(){
             this.$refs['formInline'].resetFields();
        },
        beforeRouteEnter(to,from,next){
            next(vm=>{


              let username = localStorage.getItem('username') || '';
              console.log('username',username)
              if(username){
                vm.$router.push({name:'profile', params: {id: username.split('@')[0] }})
              }
            });
        }
    }
</script>
<style scoped>
    .content-container{
        margin: 0 auto;
        padding: 150px 125px;
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
    @media (min-width: 768px) {
        .content-container{
            width: 750px;
        }
    }
    @media (min-width: 992px) {
        .content-container{
            width: 870px;
        }
    }
</style>
<style>

</style>
