<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
            <div style="display: flex;justify-content: space-between; align-items: baseline;"><h2 class="project-title">Forgot Password</h2><!-- <span>Already have an account? Please <a href="">Log in</a></span> --></div>
            <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 30px;"> </span>
            <Form class="signUpForm" ref="formInlineSendEmail" :model="formInlineSendEmail" :rules="ruleInlineSendEmail">
               <FormItem prop="email" label="Email">
                <Input type="email" v-model="formInlineSendEmail.email" placeholder="We can not validate your email currently, please make sure the email is correct.">
                </Input>
              </FormItem>
              <p><b>If the email address doesn't exist in our database, there will be no error message shown and password reset email will not be sent. So, please make sure the email address is correct.</b></p>
              <FormItem>
                <Button class="send-email" type="primary" @click="sendEmail('formInlineSendEmail')" long>Send Email</Button>
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
                //forgotPasswordApi:this.$store.state.basePrivateURL+'/getAAPToken',
                forgotPasswordApi:'https://api.aai.ebi.ac.uk/reset?service=pride',
                formInlineSendEmail:{
                  email:'',
                },
                ruleInlineSendEmail:{
                  email: [
                    { required: true, type:'email', message: 'Please input email', trigger: 'blur' }
                  ],
                },
            }
        },
        components: {
            NavBar,
        },
        methods:{
           sendEmail(name) {
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
                        .post(this.forgotPasswordApi, {
                                username:this.formInlineSendEmail.email,
                                email:this.formInlineSendEmail.email
                              }).then(function(res){
                              this.$Message.success({ content: 'Email Sent', duration:15, closable: true})
                              this.$Spin.hide()
                        }).catch(err=>{
                          this.$Spin.hide()
                          this.$Message.error({ content: err});
                        });
              })
           },

        },
        mounted:function(){
             this.$refs['formInlineSendEmail'].resetFields();
        },
        // beforeRouteEnter(to,from,next){
        //     next(vm=>{
        //       let username = localStorage.getItem('username') || '';
        //       console.log('username',username)
        //       if(username){
        //         vm.$router.push({name:'profile', params: {id: username.split('@')[0] }})
        //       }
        //     });
        // }
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
    .send-email{
      margin-top: 30px;
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
