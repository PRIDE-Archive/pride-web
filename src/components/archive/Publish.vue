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
              <FormItem class="pubmed-doi-form-item" prop="pubmed" label="PubMedID or DOI">
                <div class="form-item-wrapper">
                    <Select class="pubmed-doi-select" v-model="formInlinePublish.title">
                      <Option v-for="item in titleList" :value="item.value">{{item.label}}</Option>
                    </Select>
                    <Input class="pubmed-doi-value" type="text" v-model="formInlinePublish.pubmed" placeholder="">
                    </Input>
                </div>
              </FormItem>

              <!-- <FormItem prop="reference" label="Reference">
                <Input type="text" v-model="formInlinePublish.reference" placeholder="">
                </Input>
              </FormItem> -->
              <FormItem prop="reason" label="Reason for making the dataset public">
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
                publishOtherAPI: this.$store.state.basePrivateURL + '/projects/publishother',
                publishSelfAPI: this.$store.state.basePrivateURL + '/projects/publish',
                formInlinePublish:{
                  accession:this.$route.params.id,
                  pubmed:'',
                  title:'PubMedID',
                  //reference:'',
                  reason:'',
                  //doi:'',
                  //terms:false,
                },
                ruleInlinePublish:{
                  // accession: [
                  //   { required: true, type:'accession', message: 'Please input Project Accession', trigger: 'blur' }
                  // ],
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
                titleList:[
                  {
                    label:'PubMedID',
                    value:'PubMedID'
                  },
                  {
                    label:'DOI',
                    value:'DOI'
                  },
                ],
            }
        },
        components: {
            NavBar,
        },
        methods:{
            publish(name){
              // this.$Message.success({ content: 'Coming Soon' });
              // return;
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
                  query.PublishProjectRequest = {
                    publishJustification: this.formInlinePublish.reason,
                  }

                  if(this.formInlinePublish.title == 'PubMedID')
                    query.PublishProjectRequest.pubmedId = this.formInlinePublish.pubmed
                  else if(this.formInlinePublish.title == 'DOI')
                    query.PublishProjectRequest.doi = this.formInlinePublish.pubmed //the value is the same, only the obj name is different

                  let api;
                  if(this.$route.query && this.$route.query.r == 'self')
                      api = this.publishSelfAPI;
                  else
                      api = this.publishOtherAPI;
                  this.$http
                        .post(api+'/'+this.formInlinePublish.accession,query,{
                          headers: {
                            'Authorization':'Bearer '+ localStorage.getItem('token')
                          }
                        })
                        .then(function(res){
                              this.$Message.success({ content: 'Publish Request Received, please wait for our response.', duration:10 })
                              this.$Spin.hide()
                              this.$refs[name].resetFields();
                              //this.$router.push({name:'archive'})
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
             console.log()
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

    .pubmed-doi-select{
      width: 120px;
      margin-right: 10px;
    }
    .form-item-wrapper{
      display: flex;
      width: 100%;
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
.pubmed-doi-form-item .ivu-form-item-label{
    width: 100%;
    text-align: left;
}
</style>
