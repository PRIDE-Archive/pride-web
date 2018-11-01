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
          <div v-if="annotationStep == 0" class="stepOne">
            <Row class="search-row">
                <Card>
                  <p slot="title">Search</p>
                  <div class="search-container">
                      <div class="search-input">
                         
                          <div class="search-input-wrapper">
                              <div class="fake-input">
                                <div class="tag-wrapper">
                                    <Tag class="tag-in-search-input" v-for="(item,index) in tagArray" :key="index" closable @on-close="tagDelete">{{item}}</Tag>
                                    <Select
                                        ref="searchRef"
                                        v-model="selectTemp"
                                        filterable
                                        remote
                                        placeholder="input here"
                                        :remote-method="searchInputChange"
                                        :loading="searchInputLoading"
                                        @on-open-change="searchInputLoadingDropdownOpen"
                                        style="width:500px">
                                        <Option v-for="(item, index) in autoCompleteArray" :value="item" :key="index">{{item}}</Option>
                                    </Select>
                                    <!--<Input class="tag-input" v-model="keyword" placeholder="input here" style="width: 500px;"></Input>-->
                                </div>
                                <Icon type="ios-search"></Icon>
                              </div>
                          </div>
                          <!--
                          <AutoComplete
                              class="archive-search-input"
                              v-model="keyword"
                              @on-search="keywordSearch"
   
                              icon="ios-search"
                              :filter-method="autoCompleteFilter"
                              placeholder="input here"
                              style="width: 100%" 
                              size="large">
                          </AutoComplete>
                        -->
                      </div>
                      <div class="search-filter">
                          <div class="filter-wrapper">
                              <div class="filter-condition">
                                  <Select ref="fieldRef" class="filter-selector" v-model="fieldValue" style="width:200px" @on-change="fieldChange">
                                      <Option v-for="item in fieldSelectors" :value="item.value" :label="item.label" :key="item.value" >
                                              <span>{{ item.label }}</span>
                                              <span style="float:right;color:#ccc">{{item.number}}</span>
                                      </Option>
                                  </Select>
                              </div>
                              <span class="separator">></span>
                              <div class="filter-condition ">
                                  <Select ref="containRef" class="filter-selector input-search-needed" v-model="containValue" style="min-width:200px" size="small" filterable remote :remote-method="querySpecificFacets" :loading="querySpecificFacetsLoading" @on-change="containChange" loading-text="loading..." @on-open-change="containDropdownOpen" @on-query-change="queryChange">
                                      <Option v-for="item in containSelectors" :value="item.value" :label="item.label" :key="item.value">
                                        <span>
                                              <span>{{ item.label }}</span>
                                              <span style="color:#ccc"><span v-if="item.number">(</span>{{item.number}}<span v-if="item.number">)</span></span>
                                        </span>
                                      </Option>
                                  </Select>
                              </div>
                          </div>

                          <div class="search-button">
                              <a class="button search-button" @click="submitSearch">Search</a>
                          </div>
                      </div>
                      <div class="search-condition-container">
                        <div class="tag-container">
                            <Tag type="border" v-for="(item,index) in tagArray" :key="index" closable @on-close="tagDelete">{{item}}</Tag>
                        </div>
                      </div>
                      <div v-for="(item, index) in filterCombination" class="search-condition-container">
                        <div class="tag-container">
                            <Tag type="border" closable @on-close="conditionDelete(index,item)">
                              <Dropdown>
                                  <a class="dropdown-action" href="javascript:void(0)">
                                      {{item.condition}}
                                      <Icon type="arrow-down-b"></Icon>
                                  </a>
                                  <DropdownMenu slot="list">
                                      <DropdownItem @click.native="conditionChange(index,'And')">And</DropdownItem>
                                      <DropdownItem @click.native="conditionChange(index,'Not')">Not</DropdownItem>
                                      <DropdownItem @click.native="conditionChange(index,'Or')">Or</DropdownItem>
                                  </DropdownMenu>
                              </Dropdown>
                              <span class="search-condition">{{item.field}} > {{item.contains}} </span>
                            </Tag>
                        </div>
                      </div>
                  </div>
                </Card>
            </Row>
            <Row>
                <Card>
                    <p slot="title" class="resource-list-title-container">
                      <span>Resources List</span>
                      <!--new api has no sort function
                      <span>
                          <span>Sort by: </span>
                          <div class="sortOption">
                              <Select v-model="sortType" size="small" style="width:95px" @on-change="sortChange">
                                  <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                          </div>
                      </span>
                      -->
                    </p>
                    <Spin size="large" fix v-if="loading"></Spin>
                    <Card v-for="publicationItem in publicaitionList" class="resource-item" v-bind:key = "publicationItem.accession">
                        <a class="resource-id" @click="showDataset(publicationItem.accession)"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.accession}}</text-highlight></a><span v-if="publicationItem.submissionType == 'COMPLETE'"><Icon type="checkmark-round"></Icon></span> 
                        <p class="resource-title"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.title}}</text-highlight></p> 
                        <p><span class="project-info">{{projectItemsSpecies}}: </span> <span v-for="item in publicationItem.species"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item}}</text-highlight></span></p>
                        <span><span class="project-info">{{projectItemsProjectDescription}}: </span><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.projectDescription}}</text-highlight>
                          <a @click="gotoDetails(publicationItem.accession)">(More)</a>
                          <!--<read-more class="readMore" more-str="(More)" :text="publicationItem.projectDescription" link="#" less-str="Less" :max-chars="200"></read-more>-->
                        </span>
                        <p><span class="project-info">{{projectItemsPublicationDate}}: </span><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.publicationDate}}</text-highlight></p>
                        <Dropdown class="dataset-wrapper" v-for="(datesetItem, index) in publicationItem.projectTags" :key="index">
                            <a v-if="datesetItem == 'Biological'" class="button biological-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset
                            </a>
                            <a v-else-if="datesetItem == 'Biomedical'" class="button biomedical-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <a v-else-if="datesetItem == 'Highlighted'" class="button highlighted-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <a v-else-if="datesetItem == 'Technical'" class="button technical-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <a v-else class="button gray-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>{{datesetItem}} Dataset</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Collapse v-if="hightlightMode">
                            <Panel>
                                <span>Matched Items</span>
                                <p class="matched-items" v-for="highlightItem in publicationItem.hightlightItemArray" slot="content">
                                    <span class="project-info">{{highlightItem.name}}: </span>
                                   <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{highlightItem.content}}</text-highlight>
                                </p>
                            </Panel>
                        </Collapse>
                    </Card>
                    
                    <div class="page-container">
                      <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                    </div>
                </Card>
            </Row>
          </div>
          <div v-if="annotationStep == 1" class="stepTwo">
              <Spin size="large" fix v-if="loading"></Spin>
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
          <div v-if="annotationStep == 2" class="stepThree">
              <Spin size="large" fix v-if="loading"></Spin>
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
                            <!--
                            <div class="human">
                            
                            </div> 
                            <div class="animal">
                                
                            </div> 
                            <div class="cellline">
                            
                            </div> 
                            <div class="plant">
                            
                            </div> 
                            <div class="questionmark">
                                
                            </div> -->
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
          <div v-if="annotationStep == 3" class="stepFour">
              <Spin size="large" fix v-if="loading"></Spin>
              <Row>
                <Card>
                    <p slot="title" class="resource-list-title-container">
                      <span>Sample</span>
                      <Icon type="plus-round" @click="showAddColumnModal" size="20"></Icon>
                    </p>
                    <div class="card-content">
                        <Table height="295" class="sample-table" border :columns="sampleCol" :data="sampleData" size="small"></Table>
                    </div>
                </Card>
                <Card class="card">
                    <p slot="title" class="resource-list-title-container">
                      <span>File</span>
                    </p>
                    <div class="card-content">
                        <!--
                        <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>-->
                        <!--<tables ref="tables" editable v-model="sampleData" :columns="sampleCol" @on-delete="handleDelete"/>-->
                    </div>
                </Card>
                <div class="button-wrapper">
                    <div class="search-button">
                        <a class="button search-button" @click="back">Back</a>
                    </div>
                    <div class="search-button">
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
            organismTest:[
              {value:'111'},{value:'222'},{value:'333'}
            ],
            organismSampleLoading:false,
            annotationStep:0,
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
            editProjectBool:false,
            sampleProcessingProtocol:'',
            dataProcessingProtocol:'',
            contactors:[],
            keyword:'',
            selectTemp:'',
            searchInputLoading:false,
            fieldValue:'',
            containValue:'',
            loading:true,
            sampleCol: [
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
                         /*
                          // role是引入的组件名称
                          return h(SelectSampleTable, {
                            props: {
                              //dataType: 1,
                              //userId: params.row.userId
                            }
                          }, '123');
                          */
                     
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
                    /*
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
                    ],*/
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
                                  /*display:'none'*/
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
                {title: 'Cell line Code',key: 'celllinecode',sortable: false,align:'center',editable: true},
            ],
            sampleData:[{
                organism:'123',
                strainbreed:'123',
                age:'123',
                developmentalstage:'123',
                sex:'123',
                disease:'123',
                celltype:'123',
                individual:'123',
                celllinecode:'123',
            }],
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
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      //console.log('to query',to.query);
      /*
      let filter = to.query.split('?')[1].split('filter');
      if(filter.length>1)
        filter.split("=");
      console.log('filter',filter);*/
      this.updateCondition(to.query);
      console.log('beforeRouteUpdate',to.query);
      this.queryArchiveProjectList(to.query);
      //this.$bus.$emit('submit-search', {params: to.params, query: to.query});
      next();
    },
    components: {
      NavBar,
      Tables,
      SelectSampleTable
    },
    methods:{
      organismSampleQuery(searchValue){
        this.organismSampleLoading = true;
        setTimeout(()=>{
             this.organismSampleLoading = false;
            this.organismTest = [{value:'555'},{value:'666'}]
             console.log('searchValue',searchValue);
        },1000)
        
       
      },
      searchInputChange (query, splitBool) {
          if(splitBool){
            //console.log('searchInputChange',query);
            this.tadAdd(query);
            this.$refs.searchRef.setQuery(null);
          }

          if(query !== ''){
              console.log('query',query);
              this.searchInputLoading = false;
              this.$http
                  .get(this.autoCompleteApi + query)
                  .then(function(res){
                     this.autoCompleteArray=res.body;
                  },function(err){

                  });
          }
          else{
            this.autoCompleteArray = [];
          }
      },
      setFilter(){
          this.$http
            .get(this.facetsURL + '?dateGap=%2B1YEAR&facetPageSize=100')
            .then(function(res){
                //console.log('res.body._embedded',res.body._embedded);
                let facetsMap = res.body._embedded.facets;
                this.fieldSelectors = [];
                    let archiveObj = this.facetsConfigRes.body.archive;
                    for(let i in archiveObj){
                        let item = {
                            value: archiveObj[i].name,
                            label: archiveObj[i].name,
                            containItems:[]
                        }
                        for(let j in facetsMap){
                            if(facetsMap[j].field == i){
                              for(let k=0; k<facetsMap[j].values.length; k++){
                                  let containItem = {
                                      value: facetsMap[j].values[k].value,
                                      label: facetsMap[j].values[k].value,
                                      check: false,
                                      number: facetsMap[j].values[k].count
                                  }
                                  item.containItems.push(containItem);
                              }
                              break;
                            }
                        }
                        this.fieldSelectors.push(item);
                    }
                    this.fieldValue = this.fieldSelectors[0].value;
                    //console.log( this.fieldSelectors[0].value);
                    //console.log('this.fieldValue',this.fieldValue);
                    this.containSelectors = this.fieldSelectors[0].containItems;
            },function(err){

            });
      },
      setSearchCondition(){
          let condition='';       
          for(let i=0; i<this.filterCombination.length; i++){
            for(let j in this.facetsConfigRes.body.archive){
              if(this.facetsConfigRes.body.archive[j].name == this.filterCombination[i].field){
                   condition += j+'='+this.filterCombination[i].contains+','
                break;
              }
            }
          }
          this.filter = condition.replace(/,$/gi,'');
      },
      queryArchiveProjectList(q){
          this.publicaitionList = [];
          this.loading = true;
          let query = q || this.$route.query;
          query.dateGap = '+1YEAR';
          let pageSizeFound = false;
          for(let i in query){
              if(i == 'pageSize'){
                  pageSizeFound = true;
                  break;
              }
          }
          if(!pageSizeFound)
            query.pageSize = this.pageSize;

          this.$http
            .get(this.queryArchiveProjectListApi,{params: query})
            .then(function(res){
              this.total = res.body.page.totalElements;
                this.loading = false;
                if(res.body._embedded && res.body._embedded.compactprojects){
                    this.setHighlightKeywords();
                    let projectsList = res.body._embedded.compactprojects;
                      for(let i=0; i<projectsList.length; i++){
                          let item = {
                              accession: projectsList[i].accession,
                              title: projectsList[i].title,
                              species: projectsList[i].organisms,
                              projectDescription: projectsList[i].projectDescription.replace(/\s*$/g,"").slice(0,200) + '...',
                              publicationDate: projectsList[i].publicationDate,
                              projectTags: projectsList[i].projectTags,
                              submissionType: projectsList[i].submissionType,
                              hightlightItemArray:[],
                          }
                          //console.log('projectsList[i].highlights',projectsList[i].highlights);
                          for(let j in projectsList[i].highlights){
                              let content='';
                              for(let k=0; k<projectsList[i].highlights[j].length;k++){
                                //let temp = projectsList[i].highlights[j].k;
                                //console.log(projectsList[i].highlights[j][k]);
                                content += (projectsList[i].highlights[j][k]+'').replace(/<(\w+|\/\w+)>/g,'')+',';
                              }
                              let hightlightItem={
                                  name:this.projectItemsConfigRes[j],
                                  content:content.replace(/,$/gi,'')
                              }
                              item.hightlightItemArray.push(hightlightItem);
                          }
                          this.projectItemsSpecies = this.projectItemsConfigRes['organisms'];
                          this.projectItemsProjectDescription = this.projectItemsConfigRes['projectDescription'];
                          this.projectItemsPublicationDate = this.projectItemsConfigRes['publicationDate'];
                          this.publicaitionList.push(item);
                           
                      }
                }
                else{
                  this.$Message.error({content:'No results', duration:1});
                }
                
            },function(err){

            });
           
      },
      queryChange(query){
        if(query === ''){
            for(let i=0; i<this.fieldSelectors.length; i++){
                if(this.fieldSelectors[i].value == this.fieldValue){
                    this.containSelectors = this.fieldSelectors[i].containItems;
                    break;
                }
            }
        }
      },
      gotoDetails(id){
          this.$router.push({name:'dataset',params:{id:id}});
      },
      setHighlightKeywords(){
          this.highlightKeyword = this.keyword.split(',');
          //console.log('this.highlightKeyword',this.highlightKeyword);
      },
      querySpecificFacets(keyword){
          if(this.containSelectors[0] && !this.containSelectors[0].value || this.containValue == keyword)
            return;
         
          if(keyword.length<4 && keyword.length>0) {
              this.querySpecificFacetsLoading = true;
              for(let i=0; i<this.fieldSelectors.length; i++){
                //console.log('aaa');
                  if(this.fieldSelectors[i].value == this.fieldValue){
                      let itemArray=[];
                      var re = new RegExp(keyword,'i');
                      for(let j=0; j<this.fieldSelectors[i].containItems.length; j++){
                          if(this.fieldSelectors[i].containItems[j].value.match(re)){
                              let item = {
                                  value: this.fieldSelectors[i].containItems[j].value,
                                  label: this.fieldSelectors[i].containItems[j].label,
                                  check: false,
                                  number: this.fieldSelectors[i].containItems[j].number,
                              }
                              itemArray.push(item);
                          }
                      }
                      this.containSelectors=itemArray;
                      if(this.containSelectors.length>0){
                          this.querySpecificFacetsLoading = false;
                          break;
                      }
                      else{
                          for(let i in this.facetsConfigRes.body.archive){
                              if(this.facetsConfigRes.body.archive[i].name == this.fieldValue){
                                  this.$http
                                    .get(this.facetsURL + '?dateGap=%2B1YEAR' + '&filter='+i+'=='+keyword)
                                    .then(function(res){
                                        //console.log(res.body._embedded);
                                         if(res.body._embedded && res.body._embedded.facets){
                                              let facetsArray = res.body._embedded.facets;
                                              let fieldFind = false;
                                              for(let j=0; j<facetsArray.length; j++){
                                                //console.log('ddd');
                                                  if(this.facetsConfigRes.body.archive[facetsArray[j].field] && this.facetsConfigRes.body.archive[facetsArray[j].field].name == this.fieldValue && facetsArray[j].values.length>0){
                                                      fieldFind = true;
                                                      this.querySpecificFacetsLoading = false;
                                                      let itemArray = [];
                                                      for(let k=0; k<facetsArray[j].values.length; k++){
                                                        //console.log('eee');
                                                            let item = {
                                                                value: facetsArray[j].values[k].value,
                                                                label: facetsArray[j].values[k].value,
                                                                check: false,
                                                                number: facetsArray[j].values[k].count,
                                                            }
                                                            itemArray.push(item);
                                                      }
                                                      this.containSelectors = itemArray;
                                                  }
                                              }
                                              if(!fieldFind){
                                                  this.querySpecificFacetsLoading = false;
                                              }
                                         }
                                    },function(err){
                                        this.querySpecificFacetsLoading = false;
                                    });
                                  break;
                              }
                          }
                      }
                  }
              }
          }
          else if(keyword.length>=4) { 
              this.querySpecificFacetsLoading = true;
              for(let i in this.facetsConfigRes.body.archive){
                  if(this.facetsConfigRes.body.archive[i].name == this.fieldValue){
                      this.$http
                        .get(this.facetsURL + '?dateGap=%2B1YEAR' + '&filter='+i+'=='+keyword)
                        .then(function(res){
                            //console.log(res.body._embedded);
                             if(res.body._embedded && res.body._embedded.facets){
                                  let facetsArray = res.body._embedded.facets;
                                  let fieldFind = false;
                                  for(let j=0; j<facetsArray.length; j++){
                                    //console.log('ddd');
                                      if(this.facetsConfigRes.body.archive[facetsArray[j].field] && this.facetsConfigRes.body.archive[facetsArray[j].field].name == this.fieldValue && facetsArray[j].values.length>0){
                                          fieldFind = true;
                                          this.querySpecificFacetsLoading = false;
                                          let itemArray = [];
                                          for(let k=0; k<facetsArray[j].values.length; k++){
                                            //console.log('eee');
                                                let item = {
                                                    value: facetsArray[j].values[k].value,
                                                    label: facetsArray[j].values[k].value,
                                                    check: false,
                                                    number: facetsArray[j].values[k].count,
                                                }
                                                itemArray.push(item);
                                          }
                                          this.containSelectors = itemArray;
                                      }
                                  }
                                  if(!fieldFind){
                                      this.querySpecificFacetsLoading = false;
                                  }
                             }
                        },function(err){
                            this.querySpecificFacetsLoading = false;
                        });
                      break;
                  }
              }
          }
      },
      containDropdownOpen(open){
          //console.log( this.$refs.containRef);
          //console.log('aaaaaa');
          if(!open && this.$refs.containRef.isFocused){
            this.$refs.containRef.toggleMenu();
            //this.$Message.success({content:'repeated item', duration:1});
          }
      },
      searchInputLoadingDropdownOpen(open){
          if(open){
              window.addEventListener('mousedown', this.searchInputBlur, false);
              window.addEventListener('touchstart', this.searchInputBlur, false);
          }
          else{
            window.removeEventListener('mousedown', this.searchInputBlur, false);
            window.removeEventListener('touchstart', this.searchInputBlur, false);
          }
      },
      searchInputBlur(e){
        this.$nextTick(()=>{
            e.target.click();
        });
      },
      keywordChange(keyword){
        /*
        if(keyword == ';'){
          this.keyword = ''
          console.log(123);
          return;
        }
        if(keyword.charAt(keyword.length-1) ==';')
          console.log(keyword);*/
      },
      autoCompleteFilter (value, option) {
          return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      conditionChange(index,condition){
        this.filterCombination[index].condition = condition;
        this.setSearchCondition();
      },
      fieldChange(){
        console.log('fieldChange');
        for(let i in this.fieldSelectors){
          if(this.fieldSelectors[i].value == this.fieldValue){
              /*
              this.containSelectors=[{ //Need to be initial value to make sure "No match data" hint will not be shown.
                  value: '',
                  label: '',
                  check: false,
                  number: ''
              }],*/
             //console.log('fieldChange his.fieldValue', this.fieldValue);
              //console.log('fieldChange this.containSelectors',this.containSelectors);
              this.containSelectors = this.fieldSelectors[i].containItems
              this.containValue='';
              this.$refs.containRef.setQuery(null);
              break;
          }
        }
      },
      containChange(){
        console.log('containChange');
          if(this.containValue){
              this.$refs.containRef.toggleMenu();
              let filterCombinationFound =false;
              for(let j=0; j<this.filterCombination.length; j++){
                  if(this.filterCombination[j].field == this.fieldValue && this.filterCombination[j].contains == this.containValue){
                    filterCombinationFound = true;
                    //this.$Message.success({content:'repeated item', duration:1});
                    break;
                  }
              }
              if(!filterCombinationFound){
                  let item={
                      condition:'And',
                      field:this.fieldValue,
                      contains:this.containValue
                  };
                  this.filterCombination.push(item);
                  this.setSearchCondition();
              }
          }
      },
      tadAdd(item){
        this.tagArray.push(item);
        this.setKeywords();
      },
      tagDelete(event, name){
          const index = this.tagArray.indexOf(name);
          this.tagArray.splice(index, 1);
          this.setKeywords();
      },
      setKeywords(){
          this.keyword='';
          for(let i=0; i<this.tagArray.length; i++){
              this.keyword += this.tagArray[i]+',';
          }
          this.keyword = this.keyword.replace(/,$/gi,'');
      },
      conditionDelete(index,item){
        this.filterCombination.splice(index,1);
        this.$refs.containRef.setQuery(null);
        this.setSearchCondition();
        /*
          for(let i=0; i<this.fieldSelectors.length; i++){
              if(this.fieldSelectors[i].value == item.field){
                  for(let j=0; j<this.fieldSelectors[i].containItems.length; j++){
                    if(this.fieldSelectors[i].containItems[j].value == item.contains){
                        this.fieldSelectors[i].containItems[j].check =false;
                        break;
                    }
                  }
                  break;
              }
          }
        */
      },
      keywordSearch(value){

        //console.log('this.keyword',this.keyword);
        //this.keyword = value;
      },
      submitSearch(){
        let temp = this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').value;
        if(temp && this.tagArray.length == 0){
          this.tadAdd(temp);
          this.$refs.searchRef.setQuery(null);
        }
        
        if(this.keyword)
          this.hightlightMode = true;
        else
          this.hightlightMode = false;

        this.$router.push({name: 'archive', query: this.query});
        //this.$Message.success({content:'new result', duration:1});
      },
      pageChange(page){
          this.page = page-1;
          this.setFilter();
          this.$router.push({name: 'archive', query: this.query});
      },
      pageSizeChange(size){
          this.pageSize = size;
          this.setFilter();
          this.$router.push({name: 'archive', query: this.query});
      },
      /*new api has no sort funtions
      sortChange(type){
        console.log(type);
        if(type == 'Title')
          this.sort = 'project_title'
        else if(type == 'Accession')
          this.sort = 'id'
        else if(type == 'Relevance')
          this.sort = 'score'
        else if(type == 'Date')
          this.sort = 'publication_date';

        this.setFilter();
        this.queryArchiveProjectList();
      },*/
      updateCondition(q){
          let query = q || this.$route.query;
          for(let i in query){
              if(i == 'keyword'){
                  this.tagArray=[];
                  if(query[i]){
                      let keywordArray = query[i].split(',');
                      for(let i=0; i<keywordArray.length;i++){
                          this.tadAdd(keywordArray[i]);
                      }
                  }
              }
              else if(i == 'filter'){
                if(query[i]){
                    let filterArray = query[i].split(',');
                    console.log('filterArray',filterArray);
                    this.filterCombination=[];
                      for(let i=0; i<filterArray.length;i++){
                          let facetsArray = filterArray[i].split('=')
                          let item={
                              condition:'And',
                              field: this.facetsConfigRes.body.archive[facetsArray[0]].name,     
                              contains:facetsArray[1]
                          };
                          this.filterCombination.push(item);
                          //this.tadAdd(keywordArray[i]);
                      }
                }
              }
              else if(i =='page'){
                this.currentPage = parseInt(query[i])+1;
                //console.log(this.currentPage );
              }
              else if(i =='pageSize'){
                  let tempPageSize = parseInt(query[i]);
                  if(tempPageSize == 10 || tempPageSize == 20 || tempPageSize == 30 || tempPageSize == 40)
                    this.pageSize = parseInt(query[i]);
                  else 
                    this.pageSize = 20;
              }
          }
          //console.log();
        //this.normalQuery = {keyword:this.keyword, page:0, pageSize:20}
      },
      searchInputListener(){
          this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').addEventListener('keydown',(e)=>{
              if(e.keyCode == 13 || e.keyCode == 188){
                  e.preventDefault();
                  e.stopPropagation();
                  //this.searchInputChange(',');
              }
          });

          this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').addEventListener('keyup',(e)=>{
           // console.log('123');
           
              if(e.keyCode == 13 || e.keyCode == 188){
                  e.preventDefault();
                  e.stopPropagation();
                  if(e.target.value)
                    this.searchInputChange(e.target.value, true);
              }
          });
      },
      queryFormatter(query){
          console.log('query',query);
          let queryTemp = '?';
          for(let i in query){
              if(query[i] && i == 'keyword'){
                  queryTemp = queryTemp + i + '='+query[i]
              }
              else if(query[i] && i == 'filter'){
                console.log('query[i]',query[i]);
              }
          }
      },
      queryConfig(){
          this.$http
            .get(this.searchConfigURL)
            .then(function(facetsConfigRes){
                this.facetsConfigRes = facetsConfigRes;
                this.$http
                  .get(this.projectItemsConfigURL)
                  .then(function(projectItemsConfigRes){
                      this.projectItemsConfigRes = projectItemsConfigRes.body.projectItems;
                      this.setFilter();
                      this.updateCondition();
                      this.queryArchiveProjectList();
                  },function(err){

                  });
            },function(err){

            });
      },
      showDataset(id){
           this.loading=true;
           this.$http
            .get(this.queryArchiveProjectApi + id)
            .then(function(res){
                this.annotationStep++;
                this.loading = false;
                this.accession = res.body.accession;
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
        this.annotationStep--;
      },
      next(){
        if(this.annotationStep == 2){
            //if(this.selectedExperimentType && this.samplesNum != 0 && this.trNum != 0 && this.fractionsNum != 0){
            if(this.selectedExperimentType && this.samplesNum != 0){
              this.annotationStep++;
              this.getSampleAttributes();
            }
            else{
              this.$Message.error({content:'Choose the Experiment Type and All the numbers cannot be 0', duration:1});
              return;
            }
        }
        else{
          this.annotationStep++;
        }
        
         
    
        //console.log('samplesNum trNum fractionsNum selectedExperimentType',this.selectedExperimentType, this.samplesNum,this.trNum,this.fractionsNum)
       
      },
      annotationConfirm(){
        console.log('annotationConfirm');
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
      exportExcel () {
        this.$refs.tables.exportCsv({
          filename: `table-${(new Date()).valueOf()}.csv`
        })
      },
      experimentTypeChoose(item){
        for(let i=0; i<this.annotateExperiment.length; i++){
            if(this.annotateExperiment[i].value == item.value){
                this.annotateExperiment[i].check = !this.annotateExperiment[i].check;
                if(this.annotateExperiment[i].check){
                  this.selectedExperimentType = this.annotateExperiment[i].type;
                  console.log('selectedExperimentType',this.selectedExperimentType);
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
          console.log('before this.sampleData',this.sampleData);
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
          let tempSampleCol=[];
          let tempSampleData={};
          this.sampleCol=[];
          this.sampleData=[];
          this.$http
              .get(this.getSampleAttributesApi)
              .then((res)=>{
                  for(let i=0; i<res.body.length; i++){
                      if(res.body[i].first == this.selectedExperimentType){
                          console.log('res.body[i]',res.body[i]);
                          let item = {
                            experimentType:res.body[i].first,
                            required: res.body[i].second == 'REQUIRED'? true:false,
                            cvLable:res.body[i].third.cvLabel.toLowerCase(),
                            accession:res.body[i].third.accession,
                            name:this.titleCase(res.body[i].third.name),
                            orignal_name:res.body[i].third.name
                          }
                          tempSampleCol.push(item);
                      }
                  }
                  for(let j=0; j<tempSampleCol.length; j++){
                      let key = tempSampleCol[j].name.toLowerCase().replace(/\s/ig,'');
                      let itemColumn =  {
                          title: tempSampleCol[j].name, 
                          key: key,
                          align:'center',
                          renderHeader: (h, params)=> {
                            return h('div', [
                                h('span',{

                                },tempSampleCol[j].name),
                                h('Icon', {
                                    props: {
                                        type: 'ios-close-outline',
                                    },
                                    style: {
                                        marginLeft: '5px',
                                        display: tempSampleCol[j].required ? 'none':'inline-block'
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
                              console.log('params',params);
                              return h('div', [
                                  h('Select', {
                                      props:{
                                        'v-model':params.row[key],
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
                      let tempAddNewCol={
                          value: itemColumn.key,
                          label: itemColumn.title,
                          required: tempSampleCol[j].required
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
                 //console.log('tempSampleCol',tempSampleCol);
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
      }
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
      this.queryConfig();
      //this.updateCondition();//move into queryConfig function
      //this.queryArchiveProjectList();//move into queryConfig function
      //this.setFilter();//move into queryConfig function
      this.searchInputListener();

     
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
