<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
            <div style="display: flex;justify-content: space-between; align-items: baseline;"><h2 class="project-title">Publish Project</h2><!-- <span>Already have an account? Please <a href="">Log in</a></span> --></div>
            <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 30px;"> </span>
            <Form class="publishForm" ref="formInlinePublish" :model="formInlinePublish" :rules="ruleInlinePublish">
              <FormItem prop="accession" label="Accession">
                <Input type="text" v-model="formInlinePublish.accession" placeholder="" disabled>
                </Input>
              </FormItem>
              <FormItem prop="pubmed" label="PubMedID or DOI">
                <Input type="text" v-model="formInlinePublish.pubmed" placeholder="">
                </Input>
              </FormItem>
              <!-- <FormItem prop="reference" label="Reference">
                <Input type="text" v-model="formInlinePublish.reference" placeholder="">
                </Input>
              </FormItem> -->
              <FormItem prop="reason" label="Reason of making dataset public">
                <Input type="textarea" :autosize="{minRows: 2,maxRows: 3}" v-model="formInlinePublish.reason" placeholder="">
                </Input>
              </FormItem>
             <!--  <FormItem prop="doi" label="DOI">
                <Input type="text" v-model="formInlinePublish.doi" placeholder="">
                </Input>
              </FormItem> -->
              <!-- <FormItem prop="terms" label="Terms of Usage" >
                  <Checkbox v-model="formInlinePublish.terms"><a @click="openTerms">Privacy notice</a></Checkbox>
              </FormItem> -->
              <FormItem>
                <Button class="publishButton" type="primary" @click="publish('formInlinePublish')" long>Submit</Button>
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
                publishAPI: this.$store.state.basePrivateURL + '/user/register',
                formInlinePublish:{
                  accession:this.$route.params.id,
                  pubmed:'',
                  //reference:'',
                  reason:'',
                  //doi:'',
                  //terms:false,
                },
                ruleInlinePublish:{
                  accession: [
                    { required: true, type:'accession', message: 'Please input Project Accession', trigger: 'blur' }
                  ],
                  pubmed: [
                    { required: true, message: 'Please input PubMed', trigger: 'blur' }
                  ],
                  // reference: [
                  //   { required: true, message: 'Please input Reference', trigger: 'blur' }
                  // ],
                  reason: [
                    { required: false, message: 'Please input Publish Reason', trigger: 'blur' }
                  ],
                  // doi: [
                  //   { required: true, message: 'Please input DOI', trigger: 'blur' }
                  // ],
                  // terms:[
                  //   { required: true, type:'enum', enum: ["true"], transform: value => value.toString(), message: 'Please check Terms and Conditions' }
                  // ],
                },
            }
        },
        components: {
            NavBar,
        },
        methods:{
            publish(name){
              this.$Message.success({ content: 'Coming Soon' });
              return;
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
                    //acceptedTermsOfUse: this.formInlinePublish.terms,
                    reason: this.formInlinePublish.reason,
                    country: this.formInlinePublish.country,
                    accession: this.formInlinePublish.accession,
                    pubmed: this.formInlinePublish.pubmed,
                    //reference: this.formInlinePublish.reference,
                    //doi: this.formInlinePublish.doi,
                  }
                  this.$http
                        .post(this.publishAPI,query)
                        .then(function(res){
                              this.publishModalBool=false;
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
            // openTerms(){
            //   window.open('https://www.ebi.ac.uk/data-protection/privacy-notice/pride-new');
            // },
        },
        mounted:function(){
             
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
