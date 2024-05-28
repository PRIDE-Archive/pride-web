<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
           
            <h2 style="border-bottom: 1px solid rgba(100, 102, 100, 0.4); margin-bottom: 60px;" class="project-title">System Updated Already!</h2><!-- <span>Already have an account? Please <a href="">Log in</a></span> -->
           
            <!-- <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 30px;"> </span> -->
            <p style="margin: 30px 0">
              Please go to the <a class="login-button" @click="gotoLogin">Log In</a> page and use the <span style="font-weight: bold">Project Accession</span> and <span style="font-weight: bold">Token</span> to login.
            </p>

            <p style="margin: 30px 0">
              Or it will redirect automatically in <span style="font-size: 16; font-weight: bold">{{seconds}}</span> seconds.
            </p>

            <!-- <Form class="reviewDatasetForm" ref="formInlineReviewDataset" :model="formInlineReviewDataset" :rules="ruleInlineReviewDataset">
              <FormItem prop="accession" label="Project Accession">
                <Input type="text" v-model="formInlineReviewDataset.accession" placeholder="Project accession (PXD.... etc.,)">
                </Input>
              </FormItem>
              <FormItem prop="token" label="Token">
                <Input type="text" v-model="formInlineReviewDataset.token" placeholder="Token from your email">
                </Input>
              </FormItem>
              <FormItem>
                <Button class="resetPasswordButton" style="margin-top: 20px" type="primary" @click="reviewDataset('formInlineReviewDataset')" long>Submit</Button>
              </FormItem>
            </Form> -->
        </div>
    </div>
</template>
<script>
    import NavBar from '@/components/Nav'
    import store from "@/store.js"
    export default {
        data () {
            return {
                // reviewDatasetAPI: this.$store.state.basePrivateURL + '/projects/reviewer-project',
                // formInlineReviewDataset:{
                //   accession:'',
                //   token:''
                // },
                // ruleInlineReviewDataset:{
                //   accession: [
                //     { required: true, message: 'Please input accession', trigger: 'on-change' }
                //   ],
                //   token: [
                //     { required: true, message: 'Please input token', trigger: 'on-change' }
                //   ],
                // },
                seconds: 0,
                endTime: new Date().getTime() + 10000,
                intervalId:null
            }
        },
        components: {
            NavBar,
        },
        methods:{
            reviewDataset(name){
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
                  query.ReviewerAccess = {
                      accession:this.formInlineReviewDataset.accession,
                      reference: this.$route.params.reference,
                      token:this.formInlineReviewDataset.token
                  }
                  this.$http
                        .post(this.reviewDatasetAPI,query)
                        .then(function(res){
                              // this.$Message.success({ content: 'Dataset Review successfully11111.',duration:7 })
                              this.$Spin.hide()
                              localStorage.setItem('reviewdataset',JSON.stringify(query));
                              //set timer for reviewdataset
                              let timer = {
                                time:Date.now(),
                                expire:30*60*1000
                              }
                              localStorage.setItem('reviewdataset-timer',JSON.stringify(timer));
                              this.$router.push({name:'privatereviewdataset', params:{id:this.formInlineReviewDataset.accession}});
                        },function(err){
                          this.$Spin.hide()
                          this.$Message.error({ content: err.bodyText, duration:7});
                        });
              })
            },
            startCountdown(){
              this.updateCountdown();
              this.intervalId = setInterval(this.updateCountdown, 1000);
            },
            updateCountdown() {
                const now = new Date().getTime();
                const distance = this.endTime - now;
                if (distance < 0) {
                    clearInterval(this.intervalId);
                    this.seconds = 0;
                    this.$router.push({name:'login'})
                    return;
                }
                this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
            },
            gotoLogin(){
              this.$router.push({name:'login'})
            }
        },
        mounted:function(){
            // this.$refs['formInlineReviewDataset'].resetFields();
            // console.log('this.$route.params',this.$route.params)
            // this.startCountdown();
        },
        beforeDestroy() {
            clearInterval(this.intervalId);
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
        padding: 100px 125px;
        text-align: center;
    }
    .project-title{
      color:rgb(100, 102, 100);
      margin: 20px 0 5px 0;
    }
    .login-button{
      color:#515a6e
    }
    .login-button:hover{
      color:#5bc0be
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
