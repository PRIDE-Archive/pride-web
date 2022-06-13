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
              <FormItem class="pubmed-doi-form-item" prop="pubmed" label="Please select either PubMedID or DOI from the dropdown & input corresponding value.">
                <div class="form-item-wrapper">
                    <Select class="pubmed-doi-select" v-model="formInlinePublish.title" @on-change="validTypeChange">
                      <Option v-for="item in titleList" :value="item.value">{{item.label}}</Option>
                    </Select>
                    <Input class="pubmed-doi-value" type="text" v-model="formInlinePublish.id" placeholder="">
                        <!-- <Icon v-if="checkValid" type="ios-search" slot="suffix" /> -->
                    </Input>
                    <!-- <Icon type="md-checkmark" /> -->
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
              <FormItem>
              <span style="color: gray; line-height: 14px">**NOTE: If the PubmedID/DOI doesn't exist in EUPMC or if it's a preprint, the request to make it public will fail. In such cases it's better to omit this.**</span>
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
        <Modal
            v-model="publishModel"
            title="Publish Hint"
            :closable="false">
            <p style="margin-bottom: 5px;">Publication request has been submitted.</p>
            <p>If you do not receive a successful publication email of your dataset within 5 working days, please contact <a <a href="mailto:pride-support@ebi.ac.uk" style="color:#495060">pride-support@ebi.ac.uk</a></p>
            <div slot="footer">
                <Button  @click="publishModalOk">OK</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import NavBar from '@/components/Nav'
    import store from "@/store.js"
    export default {
        data () {
             const validatePass = async (rule, value, callback) => {
              // console.log('value',value)
                if (!this.formInlinePublish.id) {  
                    let err = this.formInlinePublish.title == 'PubMedID' ? 'Please input PubMed' : 'Please input DOI'
                    callback(new Error(err));
                } 
                else {
                  try{
                      let result = await this.validateCheck()
                      // this.$nextTick(() => {
                      //   console.log(123)
                      //   this.checkValid = true
                      //   this.$forceUpdate()
                      // });
                      // this.checkValid = true
                      // this.$forceUpdate()
                      callback();
                  }
                  catch(e){
                      callback(new Error(e))
                  }
                    
                }
            };
            return {
                publishOtherAPI: this.$store.state.basePrivateURL + '/projects/publishother',
                publishSelfAPI: this.$store.state.basePrivateURL + '/projects/publish',
                validatePubmedIDAPI:'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi',
                validateDOIAPI:'https://www.ebi.ac.uk/europepmc/webservices/rest/search',
                formInlinePublish:{ 
                  accession:this.$route.params.id,
                  id:'',
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
                    { validator: validatePass, trigger: 'blur' }
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
                publishModel:false,
                idCheckPass: false,
                // checkValid:false
            }
        },
        components: {
            NavBar,
        },
        methods:{
            publish(name){
              if(!this.idCheckPass)
                this.$refs[name].validate((valid) => {
                    if (!valid) {
                      this.$Message.error({ content: 'Fill all required items' });
                      return
                    }
                    this.$Modal.confirm({
                        title: 'Publish Data',
                        content: '<p>Do you want to publish this dataset?</p>',
                        onOk: () => {
                             this.submit(name)
                        },
                        onCancel: () => {

                        }
                    });
                })
            },
            submit(name){
                // this.$Spin.show({
                //   render: (h) => {
                //     return h('div', [
                //       h('Icon', {
                //         'class': 'demo-spin-icon-load',
                //         props: {
                //           type: 'load-b',
                //           size: 18
                //         }
                //       }),
                //       h('div', 'Please wait...')
                //     ])
                //   }
                // });
                let query = {}; //two items: publishJustification and pubmedId/doi
                query.PublishProjectRequest = {
                  publishJustification: this.formInlinePublish.reason,
                }

                if(this.formInlinePublish.title == 'PubMedID')
                  query.PublishProjectRequest.pubmedId = this.formInlinePublish.id 
                else if(this.formInlinePublish.title == 'DOI')
                  query.PublishProjectRequest.doi = this.formInlinePublish.id //the value is the same, only the obj name is different

                let api;
                if(this.$route.query && this.$route.query.r == 'self')
                    api = this.publishSelfAPI;
                else
                    api = this.publishOtherAPI;
                 // this.$http
                 //      .post(api+'/'+this.formInlinePublish.accession,query,{
                 //        headers: {
                 //          'Authorization':'Bearer '+ localStorage.getItem('token')
                 //        }
                 //      })
                 //      .then(function(res){
                 //            this.$Spin.hide()
                 //            this.$refs[name].resetFields();
                 //            this.publishModel = true
                 //            this.$Message.success({ content: 'Publish Successfully!',duration:'5'});
                 //            this.idCheckPass = false
                 //            // this.$router.push({name:'dataset',params:{id:id}}); TODO: put the id to redirect to the dataset page.
                 //      },function(err){
                 //          console.log('errerrerr',err)
                 //          this.$Spin.hide()
                 //          this.idCheckPass = false
                 //          if(err.body){
                 //              if(err.body.hasOwnProperty('message')){
                 //                  if(err.body.message == 'Supplied Token is not a valid JWT token')
                 //                     this.$Message.error({ content: 'Invalid Token, Please log in!',duration:'10'});
                 //                  else
                 //                    this.$Message.error({ content: 'Publish Error, contact pride-support',duration:'10'});
                 //              }
                 //              else{
                 //                  let errArray = err.body;
                 //                  if(errArray[0].hasOwnProperty('defaultMessage'))
                 //                    this.$Message.error({ content: errArray[0].defaultMessage,duration:'10'});
                 //                  else
                 //                    this.$Message.error({ content: 'Unknow Error, contact pride-support',duration:'10'});
                 //              }
                 //          }
                 //          else{
                 //              this.$Message.error({ content: 'Error: ' + err.bodyText?err.bodyText:'', duration:'10'});
                 //          }
                 //      });
              
            },
            publishModalOk(){
              this.publishModel=false
            },
            async validateCheck(){
              let result = ''
              console.log('this.formInlinePublish.title',this.formInlinePublish.title)
              if(this.formInlinePublish.title == 'PubMedID'){
                return new Promise((resolve,reject)=>{
                    let query = {
                        db:'pubmed',
                        retmode:'json',
                        id:this.formInlinePublish.id
                    }
                    this.$http
                        .get(this.validatePubmedIDAPI,{params: query})
                        .then(function(res){
                            console.log(res)
                            if(Object.keys(res.body.result).length!=2){
                                reject('PubMedID Invalid')
                            }
                            else{
                                if(res.body.result[query.id].hasOwnProperty("error"))
                                  reject('PubMedID Check Failed') // check the error in "res.body.result[query.id].error"
                                else{
                                  this.idCheckPass = true;
                                  resolve(res.body);
                                }
                            }
                        },function(err){
                            reject('PubMedID Check Failed')
                        });
                })
                
              }
              else if(this.formInlinePublish.title == 'DOI'){
                return new Promise((resolve,reject)=>{
                    let query = {
                        query: 'doi:'+this.formInlinePublish.id,
                        format:'json',
                    }
                    this.$http
                        .get(this.validateDOIAPI,{params: query})
                        .then(function(res){
                            console.log('DOI',res)
                            if(res.body.resultList.result.length == 0)
                              reject('DOI Check Failed') // check the error in "res.body.result[query.id].error"
                            else{
                              this.idCheckPass = true;
                              resolve(res.body);
                            }
                            
                        },function(err){
                            reject('DOI Check Failed')
                        });
                })  
              }
              return result
            },
            async validTypeChange(){
                this.idCheckPass = false;
                // if (this.formInlinePublish.id) {  
                //     await validatePass()
                // } 
            }
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
    white-space: pre-wrap;
}
</style>
