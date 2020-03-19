<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
            <div style="display: flex;justify-content: space-between; align-items: baseline;"><h2 class="project-title">Reset Password</h2><!-- <span>Already have an account? Please <a href="">Log in</a></span> --></div>
            <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 30px;"> </span>
            <Form class="resetPasswordForm" ref="formInlineResetPassword" :model="formInlineResetPassword" :rules="ruleInlineResetPassword">
              <FormItem prop="email" label="Email">
                <Input type="email" v-model="formInlineResetPassword.email" placeholder="We can not valid your email currently, please make sure the email is correct.">
                </Input>
              </FormItem>
              <FormItem prop="password" label="New Password">
                <Input type="password" v-model="formInlineResetPassword.password" placeholder="Please input new password">
                </Input>
              </FormItem>
              <FormItem prop="conformpassword" label="Confirm New Password">
                <Input type="password" v-model="formInlineResetPassword.conformpassword" placeholder="Please conform your new password">
                </Input>
              </FormItem>
              <FormItem prop="pin" label="Pin">
                <Input type="text" v-model="formInlineResetPassword.pin" placeholder="Pin from your email">
                </Input>
              </FormItem>
              <FormItem>
                <Button class="resetPasswordButton" style="margin-top: 20px" type="primary" @click="resetPassword('formInlineResetPassword')" long>Reset Password</Button>
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
            const passwordRecheck = (rule, value, callback) => {
              if(this.formInlineResetPassword.conformpassword != this.formInlineResetPassword.password){
                console.log(222)
                return callback(new Error('Password not the same.'));
              }
              console.log(111)
              callback(); 
            };
            return {
                resetPasswordAPI: this.$store.state.basePrivateURL + '/user/reset-password',
                formInlineResetPassword:{
                  email:'',
                  password:'',
                  conformpassword:'',
                  pin:''
                },
                ruleInlineResetPassword:{
                  email: [
                    { required: true, type:'email', message: 'Please input correct email', trigger: 'on-change' }
                  ],
                  password: [
                    { required: true, message: 'Please input password', trigger: 'on-change' },
                  ],
                  conformpassword: [
                    { required: true, validator: passwordRecheck, trigger: 'on-change' },
                  ],
                  pin: [
                    { required: true, message: 'Please input pin', trigger: 'on-change' }
                  ],
                },
                confirmPasswordState:false
            }
        },
        components: {
            NavBar,
        },
        methods:{
            resetPassword(name){
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
                  query.ResetPassword = {
                      username: this.formInlineResetPassword.email,
                      password: this.formInlineResetPassword.password,
                      reference: this.$route.params.reference,
                      pin:this.formInlineResetPassword.pin
                  }
                  this.$http
                        .post(this.resetPasswordAPI,query)
                        .then(function(res){
                              this.$Message.success({ content: 'Password reset successfully, please Log In.',duration:7 })
                              this.$Spin.hide()
                              this.$refs[name].resetFields();
                              this.$router.push({name:'login'});
                        },function(err){
                          this.$Spin.hide()
                          this.$Message.error({ content: err.body.message, duration:7});
                        });
              })
            },
        },
        mounted:function(){
            this.$refs['formInlineResetPassword'].resetFields();
            console.log('this.$route.params',this.$route.params)
        },
        // beforeRouteEnter(to,from,next){
        //     next(vm=>{
        //       let username = localStorage.getItem('username') || '';
        //       if(!username){
        //         vm.$Message.error({content:'Please Login', duration:2})
        //         vm.$router.push({name:'landingpage'})
        //       }
        //     });
        // }
    }
</script>
<style scoped>
    .content-container{
        margin: 0 auto;
        padding: 20px 125px;
    }
    .project-title{
      color:rgb(100, 102, 100);
      margin: 20px 0 5px 0;
    }
    @media (min-width: 768px) { 
        .content-container{
            width: 750px;
        }
    }
    @media (min-width: 992px) { 
        .content-container{
            width: 970px;
        }
    }
</style>
<style>

</style>
