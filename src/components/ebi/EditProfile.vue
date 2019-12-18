<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
            <div style="display: flex;justify-content: space-between; align-items: baseline;"><h2 class="project-title">Edit Profile</h2><!-- <span>Already have an account? Please <a href="">Log in</a></span> --></div>
            <span style="display: block; border-bottom: 1px solid rgba(100, 102, 100, 0.4);margin-bottom: 30px;"> </span>
            <Form class="signUpForm" ref="formInlineSignUp" :model="formInlineSignUp" :rules="ruleInlineSignUp">
              <FormItem prop="email" label="Email">
                <Input type="text" v-model="formInlineSignUp.email" placeholder="" disabled>
                </Input>
              </FormItem>
              <FormItem prop="title" label="Title">
                <Select v-model="formInlineSignUp.title">
                    <Option v-for="item in titleList" :value="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
              <FormItem prop="firstname" label="First name">
                <Input type="text" v-model="formInlineSignUp.firstname" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="lastname" label="Last name">
                <Input type="text" v-model="formInlineSignUp.lastname" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="affiliation" label="Affiliation">
                <Input type="textarea" :autosize="{minRows: 2,maxRows: 3}" v-model="formInlineSignUp.affiliation" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="country" label="Country">
                <Select v-model="formInlineSignUp.country">
                    <Option v-for="item in countryList" :value="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
              <FormItem prop="orcid" label="ORCID">
                <Input type="text" v-model="formInlineSignUp.orcid" placeholder="">
                </Input>
              </FormItem>
              <FormItem prop="terms" label="Terms of Usage" >
                  <Checkbox v-model="formInlineSignUp.terms"><a @click="openTerms">Privacy notice</a></Checkbox>
              </FormItem>
              <FormItem>
                <Button class="signupButton" type="primary" @click="signup('formInlineSignUp')" long>Submit</Button>
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
                updateProfileAPI: this.$store.state.basePrivateURL + '/user/update-profile',
                formInlineSignUp:{
                  email:'',
                  title:'',
                  firstname:'',
                  lastname:'',
                  affiliation:'',
                  country:'',
                  orcid:'',
                  terms:false,
                },
                ruleInlineSignUp:{
                  email: [
                    { required: true, type:'email', message: 'Please input email', trigger: 'blur' }
                  ],
                  title: [
                    { required: true, message: 'Please input title', trigger: 'blur' }
                  ],
                  firstname: [
                    { required: true, message: 'Please input firstname', trigger: 'blur' }
                  ],
                  lastname: [
                    { required: true, message: 'Please input lastname', trigger: 'blur' }
                  ],
                  affiliation: [
                    { required: true, message: 'Please input affiliation', trigger: 'blur' }
                  ],
                  country: [
                    { required: true, message: 'Please input country', trigger: 'blur' }
                  ],
                  orcid: [
                    { required: false, message: 'Please input orcid', trigger: 'blur' }
                  ],
                  terms:[
                    { required: true, type:'enum', enum: ["true"], transform: value => value.toString(), message: 'Please check Terms and Conditions' }
                  ],
                },
                titleList:[
                  {
                    label:'Mr',
                    value:'Mr'
                  },
                  {
                    label:'Ms',
                    value:'Ms'
                  },
                  {
                    label:'Miss',
                    value:'Miss'
                  },
                  {
                    label:'Mrs',
                    value:'Mrs'
                  },
                  {
                    label:'Dr',
                    value:'Dr'
                  },
                  {
                    label:'Professor',
                    value:'Professor'
                  },
                ],
                countryList:[],
                countryListURL: this.$store.state.baseURL + '/static/country/index.csv',
                viewProfileURL: this.$store.state.basePrivateURL + '/user/view-profile',
            }
        },
        components: {
            NavBar,
        },
        methods:{
            signup(name){
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
                  query.UserProfile = {
                    acceptedTermsOfUse: this.formInlineSignUp.terms,
                    affiliation: this.formInlineSignUp.affiliation,
                    country: this.formInlineSignUp.country,
                    email: this.formInlineSignUp.email,
                    firstName: this.formInlineSignUp.firstname,
                    lastName: this.formInlineSignUp.lastname,
                    orcid: this.formInlineSignUp.orcid,
                    title: this.formInlineSignUp.title,
                  }
                  this.$http
                        .post(this.updateProfileAPI,query,{
                          headers: {
                            'Authorization':'Bearer '+ localStorage.getItem('token')
                          }
                        })
                        .then(function(res){
                              this.signUpModalBool=false;
                              this.$Message.success({ content: 'Edit Success',duration:7 })
                              this.$Spin.hide()
                              this.$refs[name].resetFields();
                              this.gotoProfile();
                        },function(err){
                          console.log('err',err)
                          this.$Spin.hide()
                          this.$Message.error({ content: err.body.message || err.body[0].defaultMessage});
                        });
              })
            },
            openTerms(){
              window.open('https://www.ebi.ac.uk/data-protection/privacy-notice/pride-new');
            },
            queryCountryList(){
                //console.log(123)
                this.$http
                  .get(this.countryListURL)
                  .then(function(res){
                      this.countryList = [];
                      let json = JSON.parse(this.csvJSON(res.body)) 
                      for(let i=0; i < json.length-1; i++){
                        
                          json[i].value = json[i].value.replace(/^"(.*)"$/, '$1');
                          let item = {}
                          item.label=json[i].value
                          item.value=json[i].value
                          this.countryList.push(item);
                          //console.log(this.countryList);
                        //json[i].value.replace(/['"]+/g, '')
                        //console.log(i);
                      }
                      this.getProfile()
                  },function(err){

                  });
            },
            csvJSON(csv){
              var lines=csv.split("\n");
              var result = [];
              var headers=lines[0].split(",");
              for(var i=1;i<lines.length;i++){
                  var obj = {};
                  var currentline=lines[i].split(",");
                  for(var j=0;j<headers.length;j++){
                      obj[headers[j]] = currentline[j];
                  }
                  result.push(obj);
              }
              //return result; //JavaScript object
              return JSON.stringify(result); //JSON
            },
            getProfile(){
                this.profileLoading = true;
                this.$http
                      .get(this.viewProfileURL,{
                        headers: {
                          'Authorization':'Bearer '+ localStorage.getItem('token')
                        }
                      })
                      .then(function(res){
                        console.log('res.body',res.body)
                        this.profileLoading = false;
                        this.formInlineSignUp.email = res.body.email;
                        this.formInlineSignUp.title = res.body.title;
                        this.formInlineSignUp.firstname = res.body.firstName;
                        this.formInlineSignUp.lastname = res.body.lastName;
                        this.formInlineSignUp.affiliation = res.body.affiliation;
                        this.formInlineSignUp.country = res.body.country;
                        this.formInlineSignUp.orcid = res.body.orcid;
                        this.formInlineSignUp.terms = res.body.acceptedTermsOfUse;
                      },function(err){
                        if(err.body.error == 'TOKEN_EXPIRED'){
                            this.logout();
                        }
                        this.$Message.error({content:'Get Profile Error', duration:1});
                      });
            },
            gotoProfile(){
              this.$router.push({ name: 'profile', params: {id: this.$store.state.username.split('@')[0] }});
            },
        },
        mounted:function(){
            this.queryCountryList();
        },
        beforeRouteEnter(to,from,next){
            next(vm=>{
              let username = localStorage.getItem('username') || '';
              if(!username){
                vm.$Message.error({content:'Please Login', duration:2})
                vm.$router.push({name:'landingpage'})
              }
            });
        }
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
