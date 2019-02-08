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
          <div v-if="annotationStep == 3" class="stepFour">
              <!--<Spin size="large" fix v-if="loading"></Spin>-->
              <Row>
                <selfTable class="sample-class-table"></selfTable>
                <div class="button-wrapper">
                    <div class="search-button">
                        <a class="button search-button" @click="back">Back</a>
                    </div>
                    <div class="search-button right">
                        <a class="button search-button" @click="annotationSave">Save</a>
                        <a class="button search-button" @click="annotationConfirm">Confirm</a>
                    </div>
                </div>
              </Row>
          </div>
      </div>
      <Modal
          title="Add Column"
          v-model="addColumnBool"
          :closable="false"
          @on-ok="addColumn">
          <div class="modal-column-name">Column Name: </div>
          <CheckboxGroup class="new-column-checkbox" v-model="newColumnNameSelectedArray">
                <Checkbox v-for="item in newColumnNameArray" :label="item.label" :key="item.value">
                  <!--<div class="checkbox-item-wrapper">-->
                      <span>{{item.label}}</span>
                      <!--<InputNumber class="input-number" v-model="samplesNum" size="small" :min='0'></InputNumber>-->
                  <!--</div>-->
                </Checkbox >
          </CheckboxGroup>
      </Modal>
  </div>
</template>

<script>
  import NavBar from '@/components/archive/Nav'
  import store from "@/store/store.js"
  import Tables from '@/components/tables'
  import SelectSampleTable from '@/components/select'
  import draggable from 'vuedraggable'
  import selfTable from './table.vue'
  var paramsFromLandingPage='';
  export default {
    name: 'archive',
    data(){
      return {
            addColumnBool:false,
            newColumnNameSelectedArray:[],
            newColumnNameArray:[],
            organismSample:'',
            strainbreed:'',
            organismTest:[],
            organismSampleLoading:false,
            annotationStep:3,
            accession:'',
            title:'',
            projectDescription:'',
            samplesNum:0, 
            trNum:0, 
            fractionsNum:0,
            selectedExperimentType:'',
            keyword:'',
            loading:true,
            sampleCol: [],
            sampleData:[],
            //getSampleAttributesApi: this.$store.state.baseApiURL + '/ws/archive/annotator/getSampleAttributes',
            getSampleAttributesApi: 'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/getSampleAttributes',
            getValuesByAttributeApi: 'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/getValuesByAttribute',
            filterCombination:[],
            filter:'',
            tagArray:[],
            normalQuery:{},  
            tempParams:{},
            tempSampleCol:[],
            test:'',
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      //console.log('to query',to.query);
      /*
      let filter = to.query.split('?')[1].split('filter');
      if(filter.length>1)
        filter.split("=");
      console.log('filter',filter);*/
      console.log('to.params',to.params);
      
      console.log('beforeRouteUpdate',to.query);
     
      //this.$bus.$emit('submit-search', {params: to.params, query: to.query});
      next();
    },
    components: {
      NavBar,
      Tables,
      SelectSampleTable,
      draggable,
      selfTable
    },
    methods:{
      back(){
        let projectAccession = localStorage.getItem("projectAccession")
        if(projectAccession){
            this.$Modal.confirm({
                title: 'Uncompleted Annotaion',
                content: '<p>Do you want to delete the uncompleted annotation?</p>',
                onOk: () => {
                    console.log('ok');
                    localStorage.clear();
                    this.$router.push({path:'/annotation/'+this.$route.params.id+'/sample'});
                    
                },
                onCancel: () => {
                   
                }
            });
        }
        else
          this.$router.push({path:'/annotation/'+this.$route.params.id+'/sample'});
      },
      annotationConfirm(){
          this.$Modal.confirm({
              title: 'Finish Annotation',
              content: '<p>Do you want to submit this annotation?</p>',
              onOk: () => {
                  this.$bus.$emit('annotation-confirm');
              },
              onCancel: () => {
                  
              }
          });
      },
      annotationSave(){
          this.$bus.$emit('annotation-save');
      },
      addColumn(){
          let key =[];
          for(let i=0; i<this.newColumnNameSelectedArray.length; i++){
              for(let j=0; j<this.newColumnNameArray.length; j++){
                  if(this.newColumnNameArray[j].label == this.newColumnNameSelectedArray[i]){
                      let item =  {title:this.newColumnNameArray[j].label,key:this.newColumnNameArray[j].value,align:'center',
                          renderHeader: (h, params)=> {
                            return h('div', [
                                h('span',{

                                },this.newColumnNameArray[j].label),
                                h('Icon', {
                                    props: {
                                        type: 'ios-close-outline',
                                    },
                                    style: {
                                        marginLeft: '5px',
                                        //display: this.newColumnNameArray[j].required ? 'none':'inline-block'
                                        display:'inline-block'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteColumn(params);
                                        }
                                    }
                                }),
                            ])
                          },
                          render: (h, params) => {
                              return h('div', [
                                  h('Select', {
                                      props:{
                                        'v-model':this.organismSample,
                                        filterable:true,
                                        remote:true,
                                        loading:this.organismSampleLoading,
                                        'remote-method':this.organismSampleQuery,
                                        size:'small',
                                        placeholder:''
                                      },
                                      on: {
                                        'on-query-change': ()=>{
                                            this.tempParams = params
                                            //console.log('on-query-change',this.organismSample)
                                            //console.log('sampleData',this.sampleData);
                                        },
                                        
                                        'on-change': () => {
                                            //console.log('changechangechangechange');
                                        },
                                      }
                                  }, [
                                      this.organismTest.map(function (item) {
                                          return h('Option', {
                                              props: {
                                                  value: item.value
                                              }
                                          })
                                      })

                                  ]),
                              ]);
                          }

                      };
                      for(let k=0; k<this.sampleCol.length; k++){
                          if(this.sampleCol[k].title == item.title){
                            this.sampleCol.splice(k+1,0,item);
                            break;
                          }
                      }
                      key.push(item.key)
                  }
              }
          }
          for(let i=0; i<this.sampleData.length; i++){
              for(let j=0; j<key.length; j++){
                  this.sampleData[i][key]=''
              }
          }
          //console.log('before this.sampleData',this.sampleData);
      },
      deleteColumn(params){
        this.sampleCol.splice(params.index,1);
        //console.log('before this.sampleData',this.sampleData);
        let key = params.column.key;
        for(let i=0; i<this.sampleData.length; i++){
            for(let j in this.sampleData[i]){
                if(j == key){
                  delete this.sampleData[i][key]
                  break;
                }
            }
        }
      },
      getSampleAttributes(){
          let tempSampleData={};
          this.tempSampleCol=[];
          this.sampleCol=[];
          this.sampleData=[];
          this.$http
              .get(this.getSampleAttributesApi)
              .then((res)=>{
                  for(let i=0; i<res.body.length; i++){
                      if(res.body[i].first == this.selectedExperimentType){
                          //console.log('res.body[i]',res.body[i]);
                          let item = {
                            experimentType:res.body[i].first,
                            required: res.body[i].second == 'REQUIRED'? true:false,
                            cvLable:res.body[i].third.cvLabel.toLowerCase(),
                            accession:res.body[i].third.accession,
                            name:this.titleCase(res.body[i].third.name),
                            orignal_name:res.body[i].third.name,
                            key: this.titleCase(res.body[i].third.name).toLowerCase().replace(/\s/ig,'')
                          }
                          this.tempSampleCol.push(item);
                      }
                  }
                  for(let j=0; j<this.tempSampleCol.length; j++){
                      let key = this.tempSampleCol[j].name.toLowerCase().replace(/\s/ig,'');
                      let itemColumn =  {
                          title: this.tempSampleCol[j].name, 
                          key: key,
                          align:'center',
                          renderHeader: (h, params)=> {
                            return h('div', [
                                h('span',{

                                },this.tempSampleCol[j].name),
                                h('Icon', {
                                    props: {
                                        type: 'ios-close-outline',
                                    },
                                    style: {
                                        marginLeft: '5px',
                                        display: this.tempSampleCol[j].required ? 'none':'inline-block'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteColumn(params);
                                        }
                                    }
                                }),
                            ])
                          },
                          render: (h, params) => {
                              //console.log('params',params);
                              return h('div', [
                                  h('Select', {
                                      props:{
                                        //'v-model':this.sampleData[params.index][params.column.key],
                                        //'v-model':this.test,
                                        filterable:true,
                                        remote:true,
                                        clearable:true,
                                        loading:this.organismSampleLoading,
                                        'remote-method':this.organismSampleQuery,
                                        size:'small',
                                        placeholder:''
                                      },
                                      on: {
                                         'on-query-change': ()=>{
                                            this.tempParams = params;
                                            //console.log('on-query-change',this.organismSample)
                                            //console.log('sampleData',this.sampleData);

                                        },
                                        
                                        'on-change': () => {
                                            this.tempParams = params;
                                            this.organismTest=[];
                                            this.pushData();
                                            //console.log('changechangechangechange');
                                        },
                                        'on-open-change': (open) => {
                                            this.tempParams = params;
                                            this.organismTest=[];
                                            if(!open){
                                                this.pushData();
                                            }
                                            //console.log('on-open-changeon-open-changeon-open-change');
                                        },
                                        
                                      }
                                  }, [
                                      this.organismTest.map(function (item) {
                                          return h('Option', {
                                              props: {
                                                  value: item.value
                                              }
                                          })
                                      })

                                  ]),
                              ]);
                          }
                      }
                      let tempAddNewCol={
                          value: itemColumn.key,
                          label: itemColumn.title,
                          required: this.tempSampleCol[j].required
                      }
                      this.sampleCol.push(itemColumn);
                      this.newColumnNameArray.push(tempAddNewCol);
                      tempSampleData[itemColumn.key]='';
                  }
                  //console.log('tempSampleData',tempSampleData);
                  for(let k=0; k<this.samplesNum; k++){
                      this.sampleData.push(tempSampleData)
                  }     
                  console.log('this.sampleData',this.sampleData);
              },function(err){

              });
      },
      titleCase(str) {
        str=str.toLowerCase().split(" ");
        for(var i=0;i<str.length;i++){
          var char=str[i].charAt(0);
          str[i]=str[i].replace(char,function(s){return s.toUpperCase();});
        }
        str=str.join(" ");
        return str;
      },
      pushData(){
          for(let i=0; i<this.tempSampleCol.length;i++){
              if(this.tempSampleCol[i].key == this.tempParams.column.key){
                  let item ={
                      cvLable:this.tempSampleCol[i].cvLable,
                      accession:this.tempSampleCol[i].accession,
                      name:this.tempSampleCol[i].orignal_name
                  };
                  {
                    key:{columnPrp}
                    value:{item}
                  }
                  this.ad[index].push(item);
                  console.log('item',item);
                  break;
              }
          }
          console.log('this.test',this.test);
      },
    },
    watch: {
      filterCombination: function (val) {
          //combine keyword (this.keyword) and filters together (val)
          //this.submitSearch();
      },
    },
    computed:{
  
    },
    mounted: function(){
      //this.queryConfig();
      //this.updateCondition();//move into queryConfig function
      //this.queryArchiveProjectList();//move into queryConfig function
      //this.setFilter();//move into queryConfig function
      //this.searchInputListener();
    },
    created(){
      
    },
    beforeDestroy(){
          
    },
    beforeRouteEnter(to,from,next){
      //console.log('from',from);
      if(from.name == 'landingpage' && from.params.keyword)
        paramsFromLandingPage = from.params.keyword;
      
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
  .input-number{
    width: 60px;
  }
  .search-button a{
      padding: 8px 10px;
      font-size: 12px;
      width: 100%;
      margin-bottom: 0;
      margin-top: 5px;
      font-weight: 700;
      background-color: #5bc0be;
      border-radius: 3px;
  }
  .modal-column-name{
    font-size: 14px;
    color: #5bc0be;
    font-weight: bold;
    margin-bottom: 15px;
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
</style>

<style>
    .search-item-input input{
      margin-bottom: 0 !important;
    }
</style>
