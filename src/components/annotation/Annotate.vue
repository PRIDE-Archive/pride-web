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
                <!--
                <Card>
                    <p slot="title" class="resource-list-title-container">
                      <span>File</span>
                      <Icon type="plus-round" @click="showAddColumnModal" size="20"></Icon>
                    </p>
                    <div class="card-content">
                        <Table height="295" class="sample-table" border :columns="sampleCol" :data="sampleData" size="small" :disabled-hover="true"></Table>
                    </div>
                </Card>
                -->
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
                </Checkbox>

                
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
            columns: [
              {title: 'Name', key: 'name', sortable: false},
              {title: 'Email', key: 'email', editable: true},
              {title: 'Create-Time', key: 'createTime'},
              {
                title: 'Handle',
                key: 'handle',
                options: ['delete'],
                button: [
                  (h, params, vm) => {
                    return h('Poptip', {
                      props: {
                        confirm: true,
                        title: '你确定要删除吗?'
                      },
                      on: {
                        'on-ok': () => {
                          vm.$emit('on-delete', params)
                          vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                        }
                      }
                    }, [
                      h('Button', '自定义删除')
                    ])
                  }
                ]
              }
            ],
            tableData:[],
            organismSample:'',
            strainbreed:'',
            organismTest:[],
            organismSampleLoading:false,
            annotationStep:3,
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
            samplesNum:0, 
            trNum:0, 
            fractionsNum:0,
            selectedExperimentType:'',
            publicationDate:'',
            submissionDate:'',
            sampleProcessingProtocol:'',
            dataProcessingProtocol:'',
            contactors:[],
            keyword:'',
            selectTemp:'',
            searchInputLoading:false,
            fieldValue:'',
            containValue:'',
            loading:true,
            sampleCol: [/*
                {type: 'selection',
                          width: 60,
                          align: 'center'},
                {title: 'Organism',key: 'organism',align:'center',
                    renderHeader (h, params) {
                      return h('div', [
                          h('span',{

                          },'Organism'),
                          h('Icon', {
                              props: {
                                  type: 'checkmark-round',
                              },
                              style: {
                                  marginLeft: '5px'
                              },
                              on: {
                                  click: () => {
                                      
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
                                      //console.log('on-query-change',this.organismSample)
                                  },
                                  
                                    'on-change': () => {
                                        //console.log('change');
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
                },
                {title: 'Strain/breed',key: 'strainbreed',align:'center',
                    renderHeader (h, params) {
                      return h('div', [
                          h('span',{

                          },'Organism'),
                          h('Icon', {
                              props: {
                                  type: 'checkmark-round',
                              },
                              style: {
                                  marginLeft: '5px'
                              },
                              on: {
                                  click: () => {
                                      
                                  }
                              }
                          }),
                      ])
                    },
                    render: (h, params) => {
                        return h('div', [
                            h('Input', {
                                props:{
                                  'v-model': this.strainbreed,
                                  size:'small'
                                },
                                on: {
                                    'on-blur': ()=>{
                                        console.log('this.strainbreed',this.strainbreed);
                                    }
                                    
                                }
                            }),
                        ]);
                    }
                },
                {title: 'Age',key: 'age',sortable: false,align:'center',
                    render: (h, params) => {
                        return h('InputNumber', {
                           props:{
                              min: 0,
                              step: 1,
                              value:18,
                              size:'small'
                           },
                           style:{
                              width: '50px'
                           }
                        });
                    }
                },
                {title: 'Developmental stage',key: 'developmentalstage',sortable: false,align:'center',editable: true},
                {title: 'Sex',key: 'sex',sortable: false,align:'center',editable: true},
                {title: 'Disease',key: 'disease',align:'center',
                   
                    children: [
                        {
                            title: 'Age',
                            key: 'age',
                            align: 'center',
                            width: 200,
                            sortable: false,
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
                                              //console.log('on-query-change',this.organismSample)
                                          },
                                          
                                            'on-change': () => {
                                                //console.log('change');
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
                        },
                        {
                            title: 'Age',
                            key: 'age',
                            align: 'center',
                            width: 200,
                            sortable: false,
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
                                              //console.log('on-query-change',this.organismSample)
                                          },
                                          
                                            'on-change': () => {
                                                //console.log('change');
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
                    ],
                    renderHeader:(h, params)=> {
                      return h('div', [
                          h('span',{

                          },'Disease'),
                          h('Icon', {
                              props: {
                                  type: 'close-round',
                              },
                              style: {
                                  marginLeft: '5px',
                                 
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
                },
                {title: 'Cell type',key: 'celltype',sortable: false,align:'center',editable: true},
                {title: 'Individual',key: 'individual',sortable: false,align:'center',editable: true},
                {title: 'Cell line Code',key: 'celllinecode',sortable: false,align:'center',editable: true},*/
            ],
            sampleData:[],
            querySpecificFacetsLoading:false,
            highlightKeyword:'',
            HighlightKeywordSensitive:false,
            facetsURL: this.$store.state.baseApiURL + '/facet/projects',
            searchConfigURL: this.$store.state.baseURL + '/static/config/facets/config.json', 
            projectItemsConfigURL: this.$store.state.baseURL + '/static/config/projectItems/config.json',
            queryArchiveProjectListApi: this.$store.state.baseApiURL + '/search/projects',
            autoCompleteApi: this.$store.state.baseApiURL + '/search/autocomplete?keyword=',
            queryArchiveProjectApi: this.$store.state.baseApiURL + '/projects/',
            //getSampleAttributesApi: this.$store.state.baseApiURL + '/ws/archive/annotator/getSampleAttributes',
            getSampleAttributesApi: 'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/getSampleAttributes',
            getValuesByAttributeApi: 'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/getValuesByAttribute',
            containItemSearch:'',
            fieldSelectors:[],
            currentPage:1,
            containSelectors:[{ //Need to be initial value to make sure "No match data" hint will not be shown.
                value: '',
                label: '',
                check: false,
                number: ''
            }],
            //containSelectors:[],
            filterCombination:[],
            sortType:'Date',
            publicaitionList:[],
            sortList:[
              {
                  value: 'Accession',
                  label: 'Accession'
              },
              {
                  value: 'Title',
                  label: 'Title'
              },
              {
                  value: 'Relevance',
                  label: 'Relevance'
              },
              {
                  value: 'Date',
                  label: 'Date'
              }
            ],
            page:0,
            pageSize:20,
            filter:'',
            sort:'publication_date',
            total:0,
            facetsConfigRes:'',
            projectItemsConfigRes:'',
            hightlightMode:false,
            hightlightItemArray:[],
            tagArray:[],
            projectItemsSpecies:'',
            projectItemsProjectDescription:'',
            projectItemsPublicationDate:'',
            normalQuery:{},
            autoCompleteArray:[],
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
      saveProject(){
          if (typeof(Storage) !== "undefined") {
              localStorage.setItem('selectedExperimentType',this.selectedExperimentType);
              localStorage.setItem('samplesNum',this.samplesNum);
              localStorage.setItem('fractionsNum',this.fractionsNum);
          } else {
            this.$Message.error({content:'localStorage Not Supported', duration:1});
          }
          
      },
      handleDelete (params) {
        console.log(params)
      },
      exportExcel () {
        this.$refs.tables.exportCsv({
          filename: `table-${(new Date()).valueOf()}.csv`
        })
      },
      showAddColumnModal(){
        this.newColumnNameSelectedArray=[];
        this.addColumnBool=true;
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
          //console.log('this.tempSampleCol',this.tempSampleCol);
          //console.log('this.tempParams.column.key',this.tempParams.column.key);

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
      localStorageCheck(){
         
      },
    },

    watch: {
      filterCombination: function (val) {
          //combine keyword (this.keyword) and filters together (val)
          //this.submitSearch();
      },

    },
    computed:{
      //this variable is not used anymore and only for updating this.normalQuery;
      query:function(){
          //let keyword= this.keyword? 'keyword='+this.keyword+'&' : '';
          //let filter = this.filter? 'filter='+this.filter+'&' : '';
          //let page='page='+this.page+'&';
          //let pageSize='pageSize='+this.pageSize;
          let normalQuery = {}
          for(let i=0; i<this.tagArray.length; i++){

          }
          if(this.keyword)
            normalQuery.keyword = this.keyword;
          if(this.filter)
            normalQuery.filter = this.filter;
          normalQuery.page = this.page;
          normalQuery.pageSize = this.pageSize;
          //console.log('this.normalQuery',this.normalQuery);
          //return '?'+keyword+filter+page+pageSize;
          return normalQuery; 
      }
    },
    mounted: function(){
      //this.queryConfig();
      //this.updateCondition();//move into queryConfig function
      //this.queryArchiveProjectList();//move into queryConfig function
      //this.setFilter();//move into queryConfig function
      this.localStorageCheck();
     // this.searchInputListener();

     
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
  .search-filter{
    display: flex;
    margin-bottom: 2rem;
    justify-content: space-between;
  }
  .search-row{
    margin-bottom: 20px;
  }
  .search-condition:not(.first){
    display: inline-block;
    padding-left: 8px;
    border-left: 1px solid #e9eaec;
  }
  .search-input{
    text-align: center;
    margin-bottom: 10px;
  }
  .search-input-wrapper{
    position: relative;
  }
  .search-input-wrapper .fake-input{
    padding-right: 32px;
    border-radius: 3px !important;
        font-size: 14px;
    padding: 6px 7px;
    height: 36px;
    display: flex;
    align-items: center;
    width: 100%;
    line-height: 1.5;
        border: 1px solid #5bc0be;
            color: #495060;
                background-color: #fcfcfc;
    background-image: none;
    cursor: text;
    text-align:left;
  }
  .search-input-wrapper .tag-wrapper{
    display: inline-block;
    width: 100%
   /* position: absolute;*/
  }

  .search-input-wrapper .tag-wrapper .tag-in-search-input:hover{
      opacity: 1 !important;
  }
  .search-input-wrapper .tag-wrapper .tag-in-search-input{
      background: none !important;
  }
  .search-input-wrapper .tag-wrapper .ivu-select{
      width: auto
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
  .search-condition-container{
    display: inline-block;
  }
  .search-condition-container .ivu-tag{
    overflow: visible !important;
    z-index: 2 !important;
    opacity: 1 !important;
    height: 30px;
    line-height: 30px;
  }
  .search-condition-container a{
    border:none;
  }
  .search-condition-container .ivu-select-dropdown .ivu-dropdown-menu{
    min-width: 50px;
  }
  .resource-list-title-container{
    display: flex;
    justify-content: space-between;
  }
  .sort-action{
    font-size: 12px;
    font-weight: normal;
    color: #495060;
    border:none;
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
    .resource-item{
      margin-bottom: 20px;
    }
    .resource-item .project-info{
      font-weight: 400;
    }
    .resource-id{
      font-size: 14px;
      margin-right: 2px;
    }
    .resource-title{
      font-weight: bold;
    }
    .detailed-resouce{
      margin-left: 5px;
    }
    .biological-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #5bc0be;
        border-radius: 3px;
    }
    .biomedical-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #bd7edc;
        border-radius: 3px;
    }
    .highlighted-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #e2c94c;
        border-radius: 3px;
    }
    .technical-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #6acaef;
        border-radius: 3px;
    }
    .gray-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #999c9c;
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
    /*
    .archive-search-input{
      margin-bottom: 10px;
    }*/
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
    /*
    .archive-search-input input{
      border-radius: 3px !important;
      margin-bottom: 0 !important;
    }
    .archive-search-input input:focus{
      border:none !important;
      box-shadow: none !important;
    }
    .archive-search-input .ivu-select-dropdown{
      text-align: left;
    }*/
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
    .resource-item .readMore p{
      display: inline !important;
    }
    .resource-item .readMore span{
      display: inline !important;
    }
    .resource-item .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header{
      padding-left: 0px;
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .resource-item .ivu-collapse{
      border:none;
      background: none;
    }
    .resource-item .ivu-collapse-content > .ivu-collapse-content-box{
      padding-top: 0;
      padding-bottom: 0;
    }
    .search-input .tag-input .ivu-input{
      width: 100%;
      height: 29px;
      line-height: 32px;
      padding: 0 0 0 4px;
      display: inline-block;
      font-size: 14px;
      outline: 0;
      border: none !important;
      box-sizing: border-box;
      color: #495060;
      background-color: transparent;
      position: relative;
      margin:0 !important;
      box-shadow:none !important;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-selection{
      border:none !important;
      box-shadow:none !important;
      background: none;
      padding:0;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-selection input:focus{
      border:none !important;
      box-shadow:none !important;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-selection input{
      border:none !important;
      box-shadow:none !important;
      background: none;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-dropdown{
      /*display: none;*//******this will be removed when autocomplete function needed********/
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
