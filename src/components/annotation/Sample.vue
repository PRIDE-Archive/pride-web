<template>
  <div class="archive-container">
      <div class="panel nav"><NavBar/></div>
      <div class="browse-data-container">
          <Row>
              <div class="title">
                  Wellcome to Pride Annotation System
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
                             <InputNumber class="input-number" v-model="samplesNum" size="small" :min='0'></InputNumber>
                         </div>
                         <div class="step-title">3. Input Techinical Number 
                            <Tooltip class="step-title-tooltip" placement="right">
                                <Icon type="help-circled"></Icon>
                                <div slot="content">
                                    <p>Display multiple lines of information</p>
                                    <p><i>Can customize the style</i></p>
                                </div>
                            </Tooltip>
                         </div>
                         <div class="number-wrapper">
                             <!--<span>Techinical Replicate</span>-->
                             <InputNumber class="input-number"  v-model="trNum" size="small" :min='0'></InputNumber>
                         </div>
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
                              <!--<span>Fractions</span>-->
                             <InputNumber class="input-number"  v-model="fractionsNum" size="small" :min='0'></InputNumber>
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
  import NavBar from '@/components/archive/Nav'
  export default {
    name: 'sample',
    data(){
      return {
            annotationStep:2,
            accession:'',
            title:'',
            species:[],
            samplesNum:0, 
            trNum:0, 
            fractionsNum:0,
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
        this.$router.push({path:'/annotation/'+this.$route.params.id+'/annotate'});
        this.saveSampleInfo();
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
            this.samplesNum  = +localStorage.getItem("samplesNum") || 0
            this.fractionsNum = +localStorage.getItem("fractionsNum") || 0
      },
      localStorageCheck(){
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
          vm.init();
        });
      else
        next();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .archive-container{
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
  .summary-content-header{
    font-size: 14px;
    color: #5bc0be;
    font-weight: bold;
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
  .search-row{
    margin-bottom: 20px;
  }
  .search-condition:not(.first){
    display: inline-block;
    padding-left: 8px;
    border-left: 1px solid #e9eaec;
  }
  .refine-name{
    font-size: 12px;
  }
  .tag-container{
    display: inline-block;
  }
  .page-container{
    text-align: center;
  }
  .filter-condition{
    display: inline-block;
    margin-top: 5px; 
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
    .dataset-wrapper{
      margin-right: 5px;
    }
    .search-item-input-wrapper{
      position: absolute;
      top:5px;
      width: 100%;
      text-align: center;
      padding-bottom: 5px;
      border-bottom: 1px solid rgb(200,200,200,0.5);
    }
    .dropdown-action{
      width: 50px;
    }
    .separator{
      margin: 0 5px;
    }
    .sortOption{
      display: inline-block;
      margin-left: 5px;
    }
    .matched-items{
      color: #948d8d;
    }
    .card-content .step-title{
      font-size: 14px;
      color: #5bc0be;
      font-weight: bold;
      margin:15px 0 0 0;
    }
    .modal-column-name{
      font-size: 14px;
      color: #5bc0be;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .card{
      margin-top: 20px;
    }
    .property-row{
      margin-top: 10px;
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
    /*
    .animal:before{
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        background: url(../../../static/font/expsprite.png);
        background-size: 128px !important;
        background-color: transparent;
        background-position: 0 -256px;
        margin-bottom: 15px;
    }
    .animal-check{
      background-color: #5bc0be;
    }
    .animal-check:before{
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        background: url(../../../static/font/expsprite.png);
        background-size: 128px !important;
        background-color: transparent;
        background-position: -64px -256px;
        margin-bottom: 15px;
    }*/
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
    .new-column-checkbox{
          display: flex;
          flex-direction: column;
    }
    .checkbox-item-wrapper{
      display: flex;
    }
    .sample-class-table{
      margin-bottom: 20px;
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

<style>
    .page .ivu-select-dropdown-list{
      margin-left: 0 !important;
    }
    .search-item-input input{
      margin-bottom: 0 !important;
    }
    .filter-selector .ivu-select-item-selected{
      color: rgba(91, 192, 190, 0.9) !important;
      background: inherit !important;
    }
    .filter-selector .ivu-checkbox-wrapper{
      width: 100% !important;
      margin: 0 auto !important;
    }
    .filter-selector .ivu-select-input{
      margin-bottom: 0;
      box-shadow: none;
    }
    .filter-selector .ivu-select-input:focus{
          border: none;
          background:none !important;
    }
    .filter-selector .ivu-tag{
      background: none ;
    }
    .filter-selector .ivu-select-item-selected::after{
      line-height: 0.8 !important;
      font-size: 22px;
      margin-right: 5px;
      float:left;
      display: none !important; 
    }
    .tag-container .ivu-tag-border.ivu-tag-closable:after{
        /*display: none !important;*/
    }
    .filter-selector .ivu-select-input{
      height: 30px;
      line-height: 30px;
    }
    .filter-selector .ivu-tag{
      display: none;
      margin:2px 4px 2px 0;
    }
    .filter-selector .ivu-select-selection{
      border-radius: 3px;
    }
    .filter-selector.input-search-needed .ivu-select-dropdown{
      width: 200px !important;
      left:243px !important;
    }
    .filter-selector .ivu-icon-ios-close-empty{
      display: none;
    }
    .filter-selector .ivu-select-selection{
      height: 30px !important;
      line-height: 30px !important;
    }
    .sortOption .ivu-select-selection{
      height: 18px !important;
      line-height: 18px !important;
    }
    .sortOption .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      height: 17px !important;
      line-height: 17px !important;
    }
    .sortOption .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder{
      height: 18px !important;
      line-height: 18px !important;
    }
    .sortOption .ivu-select-selection .ivu-select-selected-value{
      font-weight: normal !important;

    }
    .sortOption .ivu-select-dropdown .ivu-select-item{
      font-weight: normal !important;

    }
    .sample-table table{
        margin-bottom: 0 !important;
    }
    .sample-table table thead th{
        padding: 0 !important;
    }
    .sample-table table tbody td{
        padding: 0 !important;
    }
    .sample-table .ivu-table-body{
        height: 263px !important;
    }
    .sample-table a{
        color:#495060;
    }
    .sample-table a:hover{
        color:#5bc0be;
        border-bottom-style:dotted;
    }
    .sample-table .ivu-tooltip-inner{
        white-space:normal;
    }
</style>
