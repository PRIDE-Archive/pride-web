<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
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
                <Icon type="ios-locked-outline" slot="prepend" size="14"></Icon>
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
    </div>
</template>
<script>
    import NavBar from '@/components/ebi/Nav'
    import store from "@/store/store.js"
    export default {
        data () {
            return {
                tokenApi:this.$store.state.basePrivateURL+'/getAAPToken',
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
