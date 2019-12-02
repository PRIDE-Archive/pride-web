<template>
  <div class="sample-container">
      <div class="panel nav"><NavBar/></div>
      <div class="browse-data-container">
          <Row>
              <div class="title">
                  Welcome to Pride Annotation System
              </div>
              <div class="step-wrapper">
                  <Steps :current="annotationStep">
                      <Step title="Search" content="Find your project to annotate"></Step>
                      <Step title="Check" content="Confirm your project information"></Step>
                      <Step title="Sample" content="Give the number of samples"></Step>
                      <Step title="Annotate" content="Add the raw file"></Step>
                  </Steps>
              </div>
          </Row>
 
          <div v-if="annotationStep == 2" class="stepThree">
              <!--<Spin size="large" fix v-if="loading"></Spin>-->
              <Row>
                <Card>
                    <p slot="title" class="resource-list-title-container">
                      <span>Input Numbers</span>
                    </p>
                    <div class="card-content">
                         <div class="step-title">1. Choose the experiment type 
                            <Tooltip class="step-title-tooltip" placement="right">
                                <Icon type="help-circled"></Icon>
                                <div slot="content">
                                    <p>Display multiple lines of information</p>
                                    <p><i>Can customize the style</i></p>
                                </div>
                            </Tooltip>
                         </div>
                         <div class="experiment-type-wrapper">
                            <div v-for="item in annotateExperiment" :class="item.class" @click="experimentTypeChoose(item)">
                              <span :class="{selectedExperimentText:item.check}">{{item.value}}</span>
                            </div>
                         </div>
                         <div class="step-title">2. Input Samples Number 
                            <Tooltip class="step-title-tooltip" placement="right">
                                <Icon type="help-circled"></Icon>
                                <div slot="content">
                                    <p>Display multiple lines of information</p>
                                    <p><i>Can customize the style</i></p>
                                </div>
                            </Tooltip>
                         </div>
                         <div class="number-wrapper">
                             <!--<span>Samples</span>-->
                             <InputNumber class="input-number" v-model="samplesNum" size="small" :min='1'></InputNumber>
                         </div>
                         <!--
                         <div class="step-title">3. Input Technical Number 
                            <Tooltip class="step-title-tooltip" placement="right">
                                <Icon type="help-circled"></Icon>
                                <div slot="content">
                                    <p>Display multiple lines of information</p>
                                    <p><i>Can customize the style</i></p>
                                </div>
                            </Tooltip>
                         </div>
                         
                         <div class="number-wrapper">
                             <InputNumber class="input-number"  v-model="trNum" size="small" :min='1'></InputNumber>
                         </div>
                         -->
                         <div class="step-title">3. Input Fractions Number 
                              <Tooltip class="step-title-tooltip" placement="right">
                                <Icon type="help-circled"></Icon>
                                <div slot="content">
                                    <p>Display multiple lines of information</p>
                                    <p><i>Can customize the style</i></p>
                                </div>
                            </Tooltip>
                         </div>
                         
                         <div  class="number-wrapper">
                             <InputNumber class="input-number"  v-model="fractionsNum" size="small" :min='1'></InputNumber>
                         </div>
                         
                    </div>
                </Card>
                <div class="button-wrapper">
                    <div class="search-button">
                        <a class="button search-button" @click="back">Back</a>
                    </div>
                    <div class="search-button">
                        <a class="button search-button" @click="next">Next</a>
                    </div>
                </div>
              </Row>
          </div>
      </div>
    
  </div>
</template>

<script>
  import NavBar from '@/components/ebi/Nav'
  export default {
    name: 'sample',
    data(){
      return {
            annotationStep:2,
            accession:'',
            title:'',
            species:[],
            samplesNum:1, 
            trNum:1, 
            fractionsNum:1,
            selectedExperimentType:'',
            loading:true,
            annotateExperiment:[
                {
                  value:'Human',
                  class:'human',
                  check:false,
                  type:'HUMAN',
                },
                {
                  value:'Vertebrates',
                  class:'vertebrates',
                  check:false,
                  type:'VERTEBRATES'
                },
                {
                  value:'Cell Line',
                  class:'cellline',
                  check:false,
                  type:'CELL_LINES'
                },
                {
                  value:'Plant',
                  class:'plant',
                  check:false,
                  type:'PLANTS'
                },
                {
                  value:'Other',
                  class:'questionmark',
                  check:false,
                  type:'OTHER'
                },
            ],   
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      //console.log('to query',to.query);
      /*
      let filter = to.query.split('?')[1].split('filter');
      if(filter.length>1)
        filter.split("=");
      console.log('filter',filter);*/
      console.log('fromaaaaaaa',from);
      console.log('beforeRouteUpdate',to.query);
      next();
    },
    components: {
      NavBar,
    },
    methods:{
      back(){
        this.$router.push({path:'/annotation/'+this.$route.params.id+'/check'});
      },
      next(){
        let found = false;
        for(let i of this.annotateExperiment){
          if(i.check){
            found = true;
          }
        }
        if(!found){
          this.$Message.error({content:'Please select experiment type', duration:1});
          return;
        }
        this.saveSampleInfo();
        this.$router.push({path:'/annotation/'+this.$route.params.id+'/annotate'});
      },
      handleDelete (params) {
        console.log(params)
      },
      experimentTypeChoose(item){
        for(let i=0; i<this.annotateExperiment.length; i++){
            if(this.annotateExperiment[i].value == item.value){
                this.annotateExperiment[i].check = !this.annotateExperiment[i].check;
                if(this.annotateExperiment[i].check){
                  this.selectedExperimentType = this.annotateExperiment[i].type;
                  //console.log('selectedExperimentType',this.selectedExperimentType);
                  this.annotateExperiment[i].class = this.annotateExperiment[i].class + '-check';
                }
                else{
                  if(this.annotateExperiment[i].class.match('-check'))
                      this.annotateExperiment[i].class = this.annotateExperiment[i].class.replace('-check','');
                }
            } 
            else{
                this.annotateExperiment[i].check=false;
                if(this.annotateExperiment[i].class.match('-check'))
                  this.annotateExperiment[i].class = this.annotateExperiment[i].class.replace('-check','');
            }
        }
      },
      saveSampleInfo(){
          if (typeof(Storage) !== "undefined") {
              localStorage.setItem('selectedExperimentType',this.selectedExperimentType);
              localStorage.setItem('samplesNum',this.samplesNum);
              localStorage.setItem('fractionsNum',this.fractionsNum);
              localStorage.setItem('trNum',this.trNum);
              
          } else {
            this.$Message.error({content:'localStorage Not Supported', duration:1});
          }
      },
      init(){
            this.selectedExperimentType = localStorage.getItem("selectedExperimentType") || ''
            for(let i of this.annotateExperiment){
              if(i.type == this.selectedExperimentType){
                this.experimentTypeChoose(i);
                break;
              }
            }
            this.samplesNum  = +localStorage.getItem("samplesNum") || 1
            this.fractionsNum = +localStorage.getItem("fractionsNum") || 1
            this.trNum = +localStorage.getItem("trNum") || 1
      }, 
      localStorageCheck(){
          var tempProjectAccession = localStorage.getItem("tempProjectAccession");
          if(tempProjectAccession &&  tempProjectAccession!= this.$route.params.id){
              this.$Message.error({content:'Wrong Project Accession', duration:1});
              this.$router.push({path:'/annotation'});
          }

          var projectAccession = localStorage.getItem("projectAccession");
          console.log('projectAccession',projectAccession);
          if(projectAccession)
              this.$Modal.confirm({
                  title: 'Uncompleted Annotaion',
                  content: '<p>Do you want to carry on with the previouse annotation?</p>',
                  onOk: () => {
                      this.$router.push({path:'/annotation/'+projectAccession+'/annotate'});
                  },
                  onCancel: () => {
                      console.log('ok');
                      localStorage.clear();
                  }
              });
      },
    },

    watch: {
     
    },
    computed:{
     
    },
    mounted: function(){
      this.localStorageCheck();
    },
    created(){
      
    },
    beforeDestroy(){
          
    },
    beforeRouteEnter(to,from,next){
      console.log('from',from);
      if(from.name != 'check')
        next(vm=>{
          let username = localStorage.getItem('username') || '';
          if(!username){
            vm.$Message.error({content:'Please Login', duration:2})
            vm.$router.push({name:'annotation'})
          }
          vm.init();
        });
      else
        next();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .sample-container{
    width: 100%;
  }
  .title{
    font-size: 35px;
    color: #454548;
    margin-bottom: 50px;
  }
  .step-wrapper{
    margin-bottom: 50px;
  }
  .button-wrapper{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .button-wrapper .search-button{
    width: 70px;
  }
  .button-wrapper .search-button.right{
    width: auto;
  }
  .browse-data-container{
    width: 80%;
    margin:0 auto;
    padding: 90px 0;
  }
  .number-wrapper{
    font-size: 20px;
    margin: 15px;
    display: flex;
    width: 300px;
    justify-content: space-between;
  }
  .input-number{
    width: 60px;
  }
  .resource-list-title-container{
    display: flex;
    justify-content: space-between;
  }
  .search-button a{
        padding: 8px 10px;
        font-size: 12px;
        width: 100%;
        margin-bottom: 0;
        margin-top: 5px;
        /*padding: 20px 85px;
        font-size: 24px;*/
        font-weight: 700;
        background-color: #5bc0be;
        border-radius: 3px;
    }
  .card-content .step-title{
    font-size: 14px;
    color: #5bc0be;
    font-weight: bold;
    margin:15px 0 0 0;
  }
  .card{
    margin-top: 20px;
  }
  .experiment-type-wrapper{
    display: flex;
  }
  .experiment-type-wrapper div{
    position: relative;
    width: 135px;
    height: 135px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-color: #5bc0be;
    border-radius: 6px;
    /*background-color: #207a79;*/
    margin: 15px;
  }
  .experiment-type-wrapper div span{
      position: absolute;
      bottom: 8px;
  }
  .step-title-tooltip{
    margin-left: 5px;
  }
  .human:before{
    content: "H";
    font-family: "EBI-Species";
    display: block;
    font-size: 44pt;
    margin: 7px;
    background: none;
    color: #aaa;
    margin-bottom: 15px;
  }
  .human-check{
    background-color: #5bc0be;
  }
  .human-check:before{
    content: "H";
    font-family: "EBI-Species";
    display: block;
    font-size: 44pt;
    margin: 7px;
    color: white;
    margin-bottom: 15px;
  }
  .vertebrates:before{
    content: "M";
    font-family: "EBI-Species";
    display: block;
    font-size: 44pt;
    margin: 7px;
    background: none;
    color: #aaa;
    margin-bottom: 15px;
  }
  .vertebrates-check{
    background-color: #5bc0be;
  }
  .vertebrates-check:before{
    content: "M";
    font-family: "EBI-Species";
    display: block;
    font-size: 44pt;
    margin: 7px;
    color: white;
    margin-bottom: 15px;
  }
  .cellline:before{
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      background: url(../../../static/font/expsprite.png);
      background-size: 128px !important;
      background-color: transparent;
      background-position: 0 -311px;
      margin-bottom: 15px;
  }
  .cellline-check{
    background-color: #5bc0be;
  }
  .cellline-check:before{
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      background: url(../../../static/font/expsprite.png);
      background-size: 128px !important;
      background-color: transparent;
      background-position: -64px -311px;
      margin-bottom: 15px;
  }
  .plant:before{
      content: "P";
      font-family: "EBI-Species";
      display: block;
      color: #aaa;
      font-size: 44pt;
      background: none;
      margin-bottom: 15px;
  } 
  .plant-check{
      background-color: #5bc0be;
  }
  .plant-check:before{
      content: "P";
      font-family: "EBI-Species";
      display: block;
      color: white;
      font-size: 44pt;
      background: none;
      margin-bottom: 15px;
  }
  .questionmark:before{
      content: "?";
      font-family: "EBI-Generic";
      display: block;
      color: #aaa;
      font-size: 44pt;
      background: none;
      margin-bottom: 15px;
  }
  .questionmark-check{
      background-color: #5bc0be;
  }
  .questionmark-check:before{
      content: "?";
      font-family: "EBI-Generic";
      display: block;
      color: white;
      font-size: 44pt;
      background: none;
      margin-bottom: 15px;
  }
  .selectedExperimentText{
    color: white
  }
  @font-face {
      font-family: 'EBI-Generic';
      src:url('../../../static/font/EBI-Generic.eot');
      src:url('../../../static/font/EBI-Generic.eot?#iefix') format('embedded-opentype'),
          url('../../../static/font/EBI-Generic.woff2') format('woff2'),
          url('../../../static/font/EBI-Generic.woff') format('woff'),
          url('../../../static/font/EBI-Generic.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    /* Icons for commonly referenced species and orgamisms */
    @font-face {
      font-family: 'EBI-Species';
      src:url('../../../static/font/EBI-Species.eot');
      src:url('../../../static/font/EBI-Species.eot?#iefix') format('embedded-opentype'),
          url('../../../static/font/EBI-Species.woff2') format('woff2'),
          url('../../../static/font/EBI-Species.woff') format('woff'),
          url('../../../static/font/EBI-Species.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
</style>
