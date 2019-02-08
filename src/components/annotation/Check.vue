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
          <div v-if="annotationStep == 1" class="stepTwo">
              <!--<Spin size="large" fix v-if="loading"></Spin>-->
              <Row>
                <Card>
                    <p slot="title" class="resource-list-title-container">
                      <span>Project {{accession}}</span>
                      <Icon v-if="editProjectBool" type="android-done" @click="saveProject" size="25" color="#5bc0be"></Icon>
                      <Icon v-else type="edit" @click="editProject" size="20" ></Icon>
                    </p>
                    <div class="card-content">
                          <div class="card-item-wrapper">
                              <div class="summary-content-header">Title</div>
                              <p v-if="editProjectBool"><Input v-model="title" type="textarea" :autosize="true" placeholder="Enter something..."></Input></p>
                              <p v-else>{{title}}</p>
                          </div>
                          <div class="card-item-wrapper">
                              <div class="summary-content-header">Description</div>
                              <p v-if="editProjectBool"><Input v-model="projectDescription" type="textarea" :autosize="true" placeholder="Enter something..."></Input></p>
                              <read-more v-else class="readMore" more-str="Read more" :text="projectDescription" link="#" less-str="Read less" :max-chars="400"></read-more>
                          </div>
                          <div class="card-item-wrapper">
                              <div class="summary-content-header">Sample Processing Protocol</div>
                              <div v-if="sampleProcessingProtocol != 'Not available'">
                                <p v-if="editProjectBool"><Input v-model="sampleProcessingProtocol" type="textarea" :autosize="true" placeholder="Enter something..."></Input></p>
                                <read-more v-else class="readMore" more-str="Read more" :text="sampleProcessingProtocol" link="#" less-str="Read less" :max-chars="400"></read-more>
                              </div>
                              <div v-else>
                                  <div v-if="publications.length == 0">
                                    <p>Not available</p>
                                  </div>
                                  <div v-else>
                                    <div v-for="item in publications">
                                      <p>See details in reference(s): <a @click="europePMC(item.pmid)">{{item.pmid}}</a></p>
                                    </div>
                                  </div>
                              </div>
                          </div>
                          <div class="card-item-wrapper">
                              <div class="summary-content-header">Data Processing Protocol</div>
                              <div v-if="dataProcessingProtocol != 'Not available'">
                                <p v-if="editProjectBool"><Input v-model="sampleProcessingProtocol" type="textarea" :autosize="true" placeholder="Enter something..."></Input></p>
                                <read-more v-else class="readMore" more-str="Read more" :text="dataProcessingProtocol" link="#" less-str="Read less" :max-chars="400"></read-more>
                              </div>
                              <div v-else>
                                  <div v-if="publications.length == 0">
                                    <p>Not available</p>
                                  </div>
                                  <div v-else>
                                    <div v-for="item in publications">
                                      <p>See details in reference(s): <a @click="europePMC(item.pmid)">{{item.pmid}}</a></p>
                                    </div>
                                  </div>
                              </div>
                          </div>
                          <div class="card-item-wrapper">
                              <div class="summary-content-header">Contact</div>
                              <p v-for ="item in contactors"> <a :href="'mailto:'+item.email">{{item.name}}</a><span>, {{item.affiliation}}</span></p>
                          </div>
                          <div class="card-item-wrapper">
                              <div class="summary-content-header">Submission Date</div>
                              <p>{{submissionDate}}</p>
                          </div>
                          <div class="card-item-wrapper">
                              <div class="summary-content-header">Publication Date</div>
                              <p>{{publicationDate}}</p>
                          </div>
                    </div>
                </Card>
                <Card class="card">
                     <p slot="title">Properties</p>
                     <div class="property">
                          <div class="property-row">
                              <div class="summary-content-header">Organism</div>
                              <div class="property-wrapper">
                                <div v-if="species.length>0">
                                  <div v-for="item in species">
                                    <a>{{item.name}}</a>
                                  </div>
                                </div>
                                <div v-else>
                                    <p>Unknown</p>
                                </div>
                              </div>
                          </div>
                          <div class="property-row">
                              <div class="summary-content-header">Organism part</div>
                              <div class="property-wrapper">
                                <div v-if="tissues.length>0">
                                  <div v-for="item in tissues">
                                    <a>{{item.name}}</a>
                                  </div>
                                </div>
                                <div v-else>
                                    <p>Unknown</p>
                                </div>
                              </div>
                          </div>
                          <div class="property-row">
                              <div class="summary-content-header">Diseases</div>
                              <div class="property-wrapper">
                                <div v-if="diseases.length>0">
                                  <div v-for="item in diseases">
                                    <a>{{item.name}}</a>
                                  </div>
                                </div>
                                <div v-else>
                                    <p>Unknown</p>
                                </div>
                              </div>
                          </div>
                          <div class="property-row">
                              <div class="summary-content-header">Modification</div>
                              <div class="property-wrapper">
                                <div v-if="modification.length>0">
                                  <div v-for="item in modification">
                                    <a>{{item.name}}</a>
                                  </div>
                                </div>
                                <div v-else>
                                    <p>No PTMs are included in the dataset</p>
                                </div>
                              </div>
                          </div>
                          <div class="property-row">
                              <div class="summary-content-header">Instrument</div>
                              <div class="property-wrapper">
                                <div v-if="instrumentNames.length>0">
                                  <div v-for="item in instrumentNames">
                                    <a>{{item.name}}</a>
                                  </div>
                                </div>
                                <div v-else>
                                    <p>Unknown</p>
                                </div>
                              </div>
                          </div>
                          <div class="property-row">
                              <div class="summary-content-header">Software</div>
                              <div class="property-wrapper">
                                <div v-if="softwares.length>0">
                                  <div v-for="item in softwares">
                                    <a>{{item.name}}</a>
                                  </div>
                                </div>
                                <div v-else>
                                    <p>Unknown</p>
                                </div>

                              </div>
                          </div>
                          <div class="property-row">
                              <div class="summary-content-header">Experiment Type</div>
                              <div class="property-wrapper">
                                <div v-if="experimentTypes.length>0">
                                  <div v-for="item in experimentTypes">
                                    <a>{{item}}</a>
                                  </div>
                                </div>
                                <div v-else>
                                    <p>Unknown</p>
                                </div>
                              </div>
                          </div>
                          <div class="property-row">
                              <div class="summary-content-header">Quantification</div>
                              <div class="property-wrapper">
                                <div v-if="quantificationMethods.length>0">
                                  <div v-for="item in quantificationMethods">
                                    <a>{{item.name}}</a>
                                  </div>
                                </div>
                                <div v-else>
                                    <p>Unknown</p>
                                </div>
                              </div>
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
  import store from "@/store/store.js"
  export default {
    name: 'check',
    data(){
      return {
            annotationStep:1,
            accession:'',
            title:'',
            projectDescription:'',
            species:[],
            diseases:[],
            tissues:[],
            instrumentNames:[],
            quantificationMethods:[],
            experimentTypes:[],
            softwares:[],
            modification:[],
            publicationDate:'',
            submissionDate:'',
            editProjectBool:false,
            sampleProcessingProtocol:'',
            dataProcessingProtocol:'',
            contactors:[],
            loading:true,
            queryArchiveProjectApi: this.$store.state.baseApiURL + '/projects/',
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      //console.log('to.params',to.params);
      //console.log('beforeRouteUpdate',to.query);
      next();
    },
    components: {
      NavBar,
    },
    methods:{
      showDataset(id){
           this.loading=true;
           this.$http
            .get(this.queryArchiveProjectApi + id)
            .then(function(res){
                this.loading = false;
                this.accession = res.body.accession;
                //for self table
                this.projectAccession=res.body.accession;
                this.title = res.body.title;
                this.projectDescription = res.body.projectDescription;
                this.publicationDate = res.body.publicationDate.split('-')[2] +'/'+ res.body.publicationDate.split('-')[1] +'/'+ res.body.publicationDate.split('-')[0];
                this.submissionDate = res.body.submissionDate.split('-')[2] +'/'+ res.body.submissionDate.split('-')[1] +'/'+ res.body.submissionDate.split('-')[0];
                
                this.sampleProcessingProtocol = res.body.sampleProcessingProtocol;
                this.dataProcessingProtocol = res.body.dataProcessingProtocol;

                //for contactors
                for(let i=0; i<res.body.submitters.length; i++){
                  let item = {
                    name: res.body.submitters[i].name,
                    affiliation: res.body.submitters[i].affiliation,
                    email:res.body.submitters[i].email
                  }
                  this.contactors.push(item);
                }
                for(let i=0; i<res.body.labPIs.length; i++){
                  let item = {
                    name: res.body.labPIs[i].name,
                    affiliation: res.body.labPIs[i].affiliation + ' ' +'(lab head)',
                    email:res.body.labPIs[i].email
                  }
                  this.contactors.push(item);
                }
                
                this.species = res.body.organisms || [];
                this.tissues = res.body.organismParts || [];
                this.diseases = res.body.diseases || [];
                this.instrumentNames = res.body.instruments || [];
                this.softwares = res.body.softwares || [];
                this.quantificationMethods = res.body.quantificationMethods || [];
                this.experimentTypes = res.body.projectTags || [];
                this.modification = res.body.identifiedPTMStrings || [];
                /*
                //for publications
                //console.log('res.body',res.body);
                for(let i=0; i<res.body.references.length; i++){
                  let item = {
                    desc:res.body.references[i].referenceLine,
                    pmid:res.body.references[i].pubmedId,
                  }
                  this.publications.push(item);
                }*/

            },function(err){
                //this.$router.replace({name:'404'});
            });
      },
      back(){
        this.$router.push({path:'/annotation'});
      },
      next(){
        this.$router.push({path:'/annotation/'+this.$route.params.id+'/sample'});
      },
      editProject(){
        this.editProjectBool=true;
      },
      saveProject(){
        this.editProjectBool=false;
      },
      handleDelete (params) {
        console.log(params)
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
    mounted: function(){
      this.localStorageCheck();
      this.showDataset(this.$route.params.id);
    },
    created(){
      
    },
    beforeDestroy(){
          
    },
    /*
    beforeRouteEnter(to,from,next){
      var projectAccession = localStorage.getItem("projectAccession")
      if(from.name == 'landingpage' && from.params.keyword)
        paramsFromLandingPage = from.params.keyword;
      if(projectAccession){
          next(vm=>{
              vm.$Modal.confirm({
                  title: 'Uncompleted Annotaion',
                  content: '<p>Do you want to delete the uncompleted annotation?</p>',
                  onOk: () => {
                      console.log('ok',vm.$router.push);
                      //localStorage.clear();
                      vm.$router.push({path:'/annotation'});
                      //this.$bus.$emit('annotation-confirm');
                      //next();
                  },
                  onCancel: () => {
                      console.log('cancel');
                      vm.$router.push({path:'/annotation/'+projectAccession+'/annotate'});
                      //next();
                  }
              });
          });
      }
      else
        next();
    },*/
    /*
    beforeRouteLeave (to, from, next) {
      let projectAccession = localStorage.getItem("projectAccession")
      if(to.name!='sample' && projectAccession)
          this.$Modal.confirm({
              title: 'Uncompleted Annotaion',
              content: '<p>Do you want to delete the uncompleted annotation?</p>',
              onOk: () => {
                  console.log('ok');
                  localStorage.clear();
                  this.$router.push({path:'/annotation'});
                  //this.$bus.$emit('annotation-confirm');
                  next();
              },
              onCancel: () => {
                  this.$router.push({path:'/annotation/'+projectAccession+'/annotate'});
                  next();
              }
          });
      else
        next();
    }*/
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
  .card-item-wrapper{
    margin-bottom: 10px;
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
    .readMore{
      display: inline;
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
    .readMore a{
        color: #495060;
        border-bottom-style: dotted;
    }
    .readMore a:hover{
        color: #5bc0be;
    }
    .readMore span{
        display: block;
        margin-top: 15px;
    }
</style>
