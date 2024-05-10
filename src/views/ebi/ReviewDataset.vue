<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
            <div style="display: flex;justify-content: space-between; align-items: baseline;"><h2 class="project-title">Review Dataset</h2><!-- <span>Already have an account? Please <a href="">Log in</a></span> --></div>
            <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 30px;"> </span>
            <Form class="reviewDatasetForm" ref="formInlineReviewDataset" :model="formInlineReviewDataset" :rules="ruleInlineReviewDataset">
              <FormItem prop="accession" label="Accession">
                <Input type="text" v-model="formInlineReviewDataset.accession" placeholder="Token from your email">
                </Input>
              </FormItem>
              <FormItem prop="token" label="Token">
                <Input type="text" v-model="formInlineReviewDataset.token" placeholder="Token from your email">
                </Input>
              </FormItem>
              <FormItem>
                <Button class="resetPasswordButton" style="margin-top: 20px" type="primary" @click="reviewDataset('formInlineReviewDataset')" long>Submit</Button>
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
                reviewDatasetAPI: this.$store.state.basePrivateURL + '/projects/reviewer-project',
                formInlineReviewDataset:{
                  accession:'',
                  token:''
                },
                ruleInlineReviewDataset:{
                  accession: [
                    { required: true, message: 'Please input accession', trigger: 'on-change' }
                  ],
                  token: [
                    { required: true, message: 'Please input token', trigger: 'on-change' }
                  ],
                },
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
        },
        mounted:function(){
            this.$refs['formInlineReviewDataset'].resetFields();
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
