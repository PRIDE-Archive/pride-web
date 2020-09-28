<template>
  <div class="dataset-container">
      <div class="panel nav"><NavBar page="landingpage"/></div>
      <div class="content">
          <Row>
            <Col span="24">
                <!--
                <Breadcrumb separator=">">
                    <BreadcrumbItem to="/">Home</BreadcrumbItem>
                    <BreadcrumbItem to="/components/breadcrumb">Pride</BreadcrumbItem>
                    <BreadcrumbItem>PXD006887</BreadcrumbItem>
                </Breadcrumb>
                -->
                <div class="title-wrapper">
                  <h2 class="project-title">Project {{accession}}</h2>
                  <Button class="tag-button" :disabled="moleculesButtonState" :class="{notActive:moleculesButtonState}" @click="gotoMolecules">Identification Results</Button>
                </div>
                <div class="tag-wrapper">
                    <span v-if="experimentTypes.length>0">PRIDE Assigned Tags: </span>
                    <!-- <span style="display: flex;align-items: center;">Download Project: 
                      <a :href="projectDownload" style="margin-left: 5px;border-bottom-style:none">
                        <Icon type="ios-cloud-download-outline" size='20'></Icon>
                      </a>
                    </span> -->
                    <span class="dataset-wrapper" v-for="(datesetItem, index) in experimentTypes" :key="index">
                        <a v-if="datesetItem == 'Biological'" class="button biological-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                           <Icon type="ios-pricetag"></Icon>
                            {{datesetItem}}
                        </a>
                        <a v-else-if="datesetItem == 'Biomedical'" class="button biomedical-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                           <Icon type="ios-pricetag"></Icon>
                            {{datesetItem}}
                        </a>
                        <a v-else-if="datesetItem == 'Highlighted'" class="button highlighted-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                           <Icon type="ios-pricetag"></Icon>
                            {{datesetItem}}
                        </a>
                        <a v-else-if="datesetItem == 'Technical'" class="button technical-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                           <Icon type="ios-pricetag"></Icon>
                            {{datesetItem}}
                        </a>
                        <a v-else class="button gray-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                           <Icon type="ios-pricetag"></Icon>
                            {{datesetItem}}
                        </a>
                        <!-- <DropdownMenu slot="list">
                            <DropdownItem>{{datesetItem}}</DropdownItem>
                        </DropdownMenu> -->
                    </span>
                </div>
            </Col>
          </Row>
          <Row :gutter="48">
              <Col span="16">
                  <div>
                    <Card class="card">
                          <p slot="title">Summary</p>
                          <div class="card-item-wrapper">
                              <div class="summary-content-header">Title</div>
                              <p>{{title}}</p>
                          </div>
                          <div class="card-item-wrapper">
                              <div class="summary-content-header">Description</div>
                              <read-more class="readMore" more-str="Read more" :text="projectDescription" link="#" less-str="Read less" :max-chars="400"></read-more>
                          </div>
                          <div class="card-item-wrapper">
                              <div class="summary-content-header">Sample Processing Protocol</div>
                              <div v-if="sampleProcessingProtocol != 'Not available'">
                                <read-more class="readMore" more-str="Read more" :text="sampleProcessingProtocol" link="#" less-str="Read less" :max-chars="400"></read-more>
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
                                <read-more class="readMore" more-str="Read more" :text="dataProcessingProtocol" link="#" less-str="Read less" :max-chars="400"></read-more>
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
                    </Card>
                    </Card>
                    <Card class="card">
                        <p slot="title">Publication</p>
                        <div v-if="publications.length>0">
                          <div v-for="item in publications">
                            <p>{{item.desc}}<span>, PubMed: </span><a @click="europePMC(item.pmid)">{{item.pmid}}</a></p>
                          </div>
                        </div>
                        <div v-else>
                          <p>Publication pending</p>
                        </div>
                    </Card>
                    <Card class="card">
                        <p slot="title" class="project-file-title-container">
                          <span>Project Files</span>
                          <span class="sort-wrapper">
                              <Input type="text" v-model="fileName" placeholder="" size="small" style="margin-right: 10px;width:auto" @on-enter="searchFile">
                                  <Button slot="append" icon="ios-search" @click="searchFile"></Button>
                              </Input>
                              <Button class= "download-button" size="small" @click="projectFtp(projectDownload)">Project FTP</Button>
                          </span>
                        </p>

                         <div class="download-list-wrapper">
                           <div class="download-list">
                             <Table border ref="selection" height="350" :loading="fileListLoading" :columns="fileListCol" :data="fileList" @on-select="downLoadSelect" @on-select-all="filesSelectAll" @on-sort-change="projectFilesTableSortChange" @on-row-click="fileTableRowClick"></Table>
                           </div>
                         </div>
                         <div class="page-container">
                           <Page :total="totalDownLoad" :page-size="pageSizeDownLoad" :current="pageDownLoad" size="small" show-sizer show-total @on-change="downloadPageChange" @on-page-size-change="downloadPageSizeChange"></Page>
                         </div>
                    </Card>
                    <Card class="card">
                        <p slot="title" class="sdrf-file-title-container">
                          <span>Experimental Design (Samples)</span>
                          <span class="right">
                              <a v-if="sdrfTableCollapse" href="javascript:void(0)"><Icon type="arrow-right-b" size="20" @click="sdrfTableCollapseChange(false)"></Icon></a>
                              <a v-else href="javascript:void(0)"><Icon type="arrow-down-b" size="20" @click="sdrfTableCollapseChange(true)"></Icon></a>
                          </span>
                        </p>
                        <div v-if="!sdrfTableCollapse" style="display:flex; overflow: auto; height:350px; border: 1px solid #5bc0be;">
                            <div v-if="sdrfTableData.length == 0" class="no-data-table-wrapper">
                                <span>No data</span>
                            </div>
                            <template v-else>
                                <div style="display: flex">
                                    <div class="table-col" v-for="(itemCol,i) in sdrfTableCol" :key="itemCol.key">
                                        <div class="table-row first">{{itemCol.name}}</div>
                                        <div class="table-row" :class="{'index':itemCol.key=='index'}" v-for="(itemRow,j) in sdrfTableData" :key="itemRow.index">
                                              <!-- <p>{{itemRow.index}}</p> -->
                                              <template v-if="itemCol.key!='index'">
                                                    <p>{{itemRow[itemCol.key].value}}</p>
                                              </template>
                                              <template v-else>
                                                  <div class="index-col">
                                                      <div>
                                                        {{itemRow.index}}
                                                      </div>
                                                  </div>
                                              </template>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        
                        <div v-if="!sdrfTableCollapse" class="page-container">
                           <Page :total="totalSdrf" :page-size="pageSizeSdrf" :current="pageSdrf" size="small" show-sizer show-total :page-size-opts="[100,200,300,400]" @on-change="sdrfPageChange" @on-page-size-change="sdrfPageSizeChange"></Page>
                        </div>
                        <Spin class="table-spin" v-if="!sdrfTableCollapse && sdrfTableLoading"></Spin>
                    </Card>
                  </div>
              </Col>
              <Col span="8">
                  <Card class="card">
                     <p slot="title">Properties</p>
                     <div class="property">
                          <div class="property-row">
                              <div class="summary-content-header">Organism</div>
                              <div class="property-wrapper">
                                <div v-if="species.length>0">
                                  <div v-for="item in species">
                                    <a @click="searchProperties('organisms_facet=='+item.name)">{{item.name}}</a>
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
                                    <a @click="searchProperties('organisms_part_facet=='+item.name)">{{item.name}}</a>
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
                                    <a @click="searchProperties('diseases_facet=='+item.name)">{{item.name}}</a>
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
                                    <a @click="searchProperties('project_identified_ptms_facet=='+item.name)">{{item.name}}</a>
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
                                    <a @click="searchProperties('instruments_facet=='+item.name)">{{item.name}}</a>
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
                                    <p>{{item.name}}</p>
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
                                    <p>{{item}}</p>
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
                                    <p>{{item.name}}</p>
                                  </div>
                                </div>
                                <div v-else>
                                    <p>Unknown</p>
                                </div>
                              </div>
                          </div>
                     </div>
                  </Card>
                  <Card class="card" v-if="similarProjects.length>0">
                       <p slot="title"><i class="fas fa-link icon-tag"></i>Similar Studies</p>
                       <div class="list-wrapper">
                            <Card class="similarity-card" v-for="item in similarProjects" :key="item.accession">
                              <div class="similarity-title"><a @click="gotoDetails(item.accession)">{{item.title}}</a></div>
                              <div><span>{{item.submissionDate}}</span></div>
                            </Card>
                       </div>
                      </p>
                  </Card>
              </Col>
          </Row>
      </div>

      <!-- <Button @click= "downloadFiles">123</Button> -->

  </div>
</template>

<script>
  import NavBar from '@/components/Nav'
  import store from "@/store.js"
  export default {
    name: 'archive',
    data(){
      return {
          accession:'',
          title:'',
          projectDescription:'',
          publicationDate:'',
          submissionDate:'',
          sampleProcessingProtocol:'',
          dataProcessingProtocol:'',
          contactors:[],
          publications:[],
          species:[],
          diseases:[],
          tissues:[],
          instrumentNames:[],
          quantificationMethods:[],
          experimentTypes:[],
          softwares:[],
          modification:[],
          queryArchiveProjectApi: this.$store.state.baseApiURL + '/projects',
          queryArchiveProjectFilesApi: this.$store.state.baseApiURL + '/projects',
          queryAssayApi: this.$store.state.baseApiURL + '/assay/list/project/',
          europepmcApi:'http://europepmc.org/abstract/MED/',
          reactomeApi:'https://reactome.org/AnalysisService/identifiers/url?pageSize=1&page=1',
          viewInreactomeApi: this.$store.state.baseApiURL + '/protein/list/assay/',
          msRunApi:this.$store.state.baseApiURL+ '/msruns/byProject',
          similarityApi: this.$store.state.baseApiURL + '/projects/',
          proteinEvidencesApi: this.$store.state.baseApiURL+ '/proteinevidences',
          similarProjects:[],
          similarityLoading:false,
          fileListLoading:false,
          fileListCol: [
            /*
              {
                  type: 'selection',
                  width: 40,
                  align: 'center'
              },*/
              {
                  title: 'Name',
                  key: 'name',
                  align:'left',
                  sortable: 'custom',
                  ellipsis:true
              },
              {
                  title: 'Type',
                  width: 100,
                  key: 'type',
                  align:'left',
                  sortable: 'custom',
                  ellipsis:true,
                  render: (h, params) => {
                      var className;
                      var iconColor;
                      if(params.row.type == 'PEAK'){
                        className='far fa-chart-bar';
                        iconColor='#bd7edc'
                      }
                      else if (params.row.type == 'RAW'){
                        className ='far fa-list-alt';
                        iconColor='#e2c94c'
                      }
                      else if (params.row.type == 'RESULT'){
                        className ='far fa-envelope-open';
                        iconColor='#6acaef'
                      }
                      else if (params.row.type == 'OTHER'){
                        className ='far fa-file';
                        iconColor='#999c9c'
                      }
                      else if (params.row.type == 'SEARCH'){
                        className ='fas fa-search';
                        iconColor='#5bc0be'
                      }
                      else if (params.row.type == 'IMAGE DATA'){
                        className ='far fa-image';
                        iconColor='#fd7e14'
                      }
                      return h('div', [

                          h('i', {
                              attrs: { class: className},
                              style: {
                                  color:iconColor,
                                  marginRight: '5px',
                                  marginLeft: '0px'
                              },
                          }),
                          h('span', {
                              on: {
                                  click: () => {

                                  }
                              }
                          }, params.row.type),
                      ]);
                  }
              },
              {
                  title: 'Size (M)',
                  width: 80,
                  key: 'size',
                  sortable: false,
                  align:'center'
              },
              {
                  title: 'Download',
                  key: 'download',
                  align:'center',
                  width:100,
                  renderHeader: (h,params)=>{
                      return h('span',[
                          h('Icon',{
                              props:{
                                  type: 'information-circled'
                              },
                              style: {
                                  marginRight: '5px',
                                  cursor:'pointer'
                              },
                              on: {
                                click: (value) => {
                                    let routeData = this.$router.resolve({path:'/markdownpage/pridefiledownload'});
                                    window.open(routeData.href, '_blank');
                                }
                              }
                          }),
                          h('span','Download')
                      ])
                  },
                  render: (h, params) => {
                      return h('div', [
                          /*
                          h('Button', {

                              on: {
                                  click: () => {
                                      this.gotoBlast(params);
                                  }
                              }
                          }, 'Blast'),
                          */
                          h('Button', {
                              props: {
                                  type: 'primary',
                                  size: 'small'
                              },
                              style: {
                                  display:'inline-block',
                                  marginRight: '5px',
                                  paddingLeft: '22px',
                                  paddingRight: '22px'
                              },
                              on: {
                                  click: (value) => {
                                      console.log(value)
                                      console.log(params.row.url[0].key);
                                      //window.location.href = params.row.url.ftp;
                                      window.open(params.row.url[0].key)
                                     
                                      //this.gotoBlast(params);
                                  }
                              }
                          }, 'FTP'),
                      ]);
                  },
              },
              {
                  title: '',
                  key: 'accession',
                  width:1,
                  className:'project-files-accession'
              },
          ],
          fileList: [],
          cityList: [
                  {
                      value: 'New York',
                      label: 'New York'
                  },
                  {
                      value: 'London',
                      label: 'London'
                  },
                  {
                      value: 'Sydney',
                      label: 'Sydney'
                  },
                  {
                      value: 'Ottawa',
                      label: 'Ottawa'
                  },
                  {
                      value: 'Paris',
                      label: 'Paris'
                  },
                  {
                      value: 'Canberra',
                      label: 'Canberra'
                  }
          ],
          model1: '',
          viewInReactomeButtonArray:[],
          assayLoading:true,
          assayCol: [
              {
                  type: 'index',
                  width: 60,
                  align: 'center'
              },
              {
                  title: 'Accession',
                  key: 'accession',
                  align:'center',
                  width: 100,
                  render: (h, params) => {
                      return h('div', [
                        h('Icon', {
                            props: {
                                type: 'eye',
                            },
                            style: {
                                marginRight: '1px'
                            },
                        }),
                        h('a', {
                          on: {
                              click: () => {
                                  this.$router.push({name:'assay',params:{id:params.row.accession}})
                              }
                          }
                        }, params.row.accession),
                      ]);
                  }
              },
              {
                  title: 'Title',
                  key: 'title',
                  sortable: false,
                  align:'center',
              },
              {
                  title: 'Proteins',
                  key: 'proteins',
                  sortable: false,
                  align:'center',
                  width: 80,
              },
              {
                  title: 'Peptides',
                  key: 'peptides',
                  sortable: false,
                  align:'center',
                  width: 80,
              },
              {
                  title: 'Unique Peptides',
                  key: 'uniquepeptides',
                  sortable: false,
                  align:'center',
                  width: 110,
              },
              {
                  title: 'Spectra',
                  key: 'spectra',
                  sortable: false,
                  align:'center',
                  width: 80,
              },
              {
                  title: 'Identified Spectra',
                  key: 'identifiedspectra',
                  sortable: false,
                  align:'center',
                  width: 120,
              },
              {
                  title: 'View in Reactome',
                  key: 'viewinreactome',
                  align:'center',
                  width: 120,
                  render: (h, params) => {
                      return h('div', [
                          /*
                          h('Button', {

                              on: {
                                  click: () => {
                                      this.gotoBlast(params);
                                  }
                              }
                          }, 'Blast'),
                          */
                          h('Tooltip',//first item
                              {
                                  props: {
                                      placement:"bottom",
                                      content: 'Analysis the protein set in Reactome',
                                      disabled: this.viewInReactomeButtonArray[params.row._index].disabled,
                                  },
                              },//second item
                              [
                                  h('Button', {
                                      props: {
                                          type: this.viewInReactomeButtonArray[params.row._index].type,
                                          size: 'small',
                                          loading: this.viewInReactomeButtonArray[params.row._index].loading,
                                      },
                                      style: {
                                          marginRight: '5px'
                                      },
                                      on: {
                                          click: () => {
                                              if(this.viewInReactomeButtonArray[params.row._index].type != 'success'){
                                                  this.viewInReactomeButtonArray[params.row._index].loading = true;
                                                  this.$http
                                                      .post(this.reactomeApi,this.viewInReactomeButtonArray[params.row._index].api, {headers: {'Content-Type': 'text/plain'}})
                                                      .then(function(res){
                                                          this.viewInReactomeButtonArray[params.row._index].loading = false;
                                                          this.viewInReactomeButtonArray[params.row._index].disabled = true;
                                                          this.viewInReactomeButtonArray[params.row._index].content = 'View ' + '(' + res.body.pathwaysFound + ')';
                                                          this.viewInReactomeButtonArray[params.row._index].type = 'success';
                                                          this.viewInReactomeButtonArray[params.row._index].token = JSON.parse(res.bodyText).summary.token;
                                                        //this.$router.push({name:'me',  params: {username: res.body.data.user.username}});
                                                      },function(err){

                                                      });
                                              }
                                              else{
                                                  window.open('https://reactome.org/PathwayBrowser/#/DTAB=AN&ANALYSIS='+this.viewInReactomeButtonArray[params.row._index].token+'&RESOURCE=UNIPROT');
                                              }

                                          }
                                      }
                                  }, this.viewInReactomeButtonArray[params.row._index].content),
                              ]//third item
                          ),
                      ]);
                  }
              },
          ],
          assayResults:[],
          totalDownLoad:0, 
          pageDownLoad:1,
          pageSizeDownLoad:20,
          totalDownLoad:0,
          projectFileSortCondition:'fileName',
          sortList:[
            {
                value: 'name',
                label: 'Name'
            },
            {
                value: 'type',
                label: 'Type'
            }
          ],
          selectAllfiles:false,
          msRunModalTableCol:[
              {
                  title: 'Accession',
                  key: 'accession',
                  align: 'center',
              },
              {
                  title: 'Name',
                  key: 'name',
                  align: 'center',
              },
              {
                  title: 'Size (M)',
                  key: 'size',
                  width: 70,
                  align: 'center',
              }
          ],
          msRunModalTableData:[],
          msRunTableLoading:false,
          moleculesButtonState:true,
          projectDownload:'',
          fileName:'',
          sdrfTableCollapse:true,
          sdrfTableLoading:false,
          sdrfTableData:[],
          sdrfTableCol:[],
          sdrfTableApi:this.$store.state.baseApiURL + '/files/sdrfByAccession',
          sdrfTableLoading:false,
          pageSizeSdrf:200,
          pageSdrf:1,
          totalSdrf:0
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      this.queryProjectDetails(to.params.id);
      this.queryArchiveProjectFiles(to.params.id);
      this.querySimilarity(to.params.id);
      next();
    },
    components: {
      NavBar
    },
    methods:{
      queryProjectDetails(id){
           var id = id || this.$route.params.id;
           this.$http
            .get(this.queryArchiveProjectApi + '/' +id)
            .then(function(res){
                this.init();
                this.accession = res.body.accession;
                this.title = res.body.title;
                this.projectDescription = res.body.projectDescription;
                this.publicationDate = res.body.publicationDate.split('-')[2] +'/'+ res.body.publicationDate.split('-')[1] +'/'+ res.body.publicationDate.split('-')[0];
                this.submissionDate = res.body.submissionDate.split('-')[2] +'/'+ res.body.submissionDate.split('-')[1] +'/'+ res.body.submissionDate.split('-')[0];
                this.sampleProcessingProtocol = res.body.sampleProcessingProtocol;
                this.dataProcessingProtocol = res.body.dataProcessingProtocol;
                this.species = res.body.organisms || [];
                this.tissues = res.body.organismParts || [];
                this.diseases = res.body.diseases || [];
                this.instrumentNames = res.body.instruments || [];
                this.softwares = res.body.softwares || [];
                this.quantificationMethods = res.body.quantificationMethods || [];
                this.experimentTypes = res.body.projectTags || [];
                this.modification = res.body.identifiedPTMStrings || [];
                this.projectDownload = res.body.additionalAttributes[0].value || '';
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
                //for publications
                //console.log('res.body',res.body);
                for(let i=0; i<res.body.references.length; i++){
                  let item = {
                    desc:res.body.references[i].referenceLine,
                    pmid:res.body.references[i].pubmedId,
                  }
                  this.publications.push(item);
                }
                this.getMSRunTableData()
                this.getProteinEvidences()
            },function(err){
                if(err.bodyText.match('not in the database')){
                    this.$Modal.warning({
                        title: 'Not Public Project',
                        content: '<p>The requested project is not public</p>',
                        onOk: () => {
                            this.$router.push({name:'archive'});
                        },
                    });
                }
                else
                  this.$Message.error({content:'No results', duration:3});
            });
      },
      getMSRunTableData(){
          this.msRunTableLoading = true;
          this.msRunModalTableData=[];
          let query={
              accession: this.$route.params.id,
          }
          this.$http
              .get(this.msRunApi,{params: query})
              .then(function(res){
                  this.msRunTableLoading = false;
                  for(let i of res.body){
                      let item = {
                        accession:i.accession,
                        name:i.fileName,
                        size:Math.round(i.fileSizeBytes/1024/1024),
                        //select:false,
                      }
                      this.msRunModalTableData.push(item);
                  }
                  //console.log(this.msRunModalTableData);
              },function(err){
                  this.msRunTableLoading = false;
              });
      },
      queryArchiveProjectFiles(q){
           let query = q || this.queryDownload
           this.fileListLoading = true;
           this.$http
            .get(this.queryArchiveProjectFilesApi + '/' +this.$route.params.id+ '/files',{params: query})
            .then(function(res){
                this.fileListLoading = false;
                this.totalDownLoad = res.body.page.totalElements;
                this.fileList=[];
                if(res.body._embedded && res.body._embedded.files){
                  let filesArray = res.body._embedded.files;
                  //console.log('filesArray',filesArray)
                  let tempArray = [];
                  for(let i=0;i<filesArray.length;i++){
                      let item ={
                            accession: filesArray[i].accession,
                            name: filesArray[i].fileName,
                            type: filesArray[i].fileCategory.value,
                            size: Math.round(filesArray[i].fileSizeBytes/1024/1024) > 0 ? Math.round(filesArray[i].fileSizeBytes/1024/1024) : (filesArray[i].fileSizeBytes)+' bit',
                            url: [],
                      }
                      for(let j=0; j<filesArray[i].publicFileLocations.length; j++){
                          if(filesArray[i].publicFileLocations[j].name.indexOf('FTP')!=-1){
                              let urlItem = {
                                  label:'FTP',
                                  key:filesArray[i].publicFileLocations[j].value,
                              }
                              item.url.push(urlItem)
                          }
                          else if(filesArray[i].publicFileLocations[j].name.indexOf('Aspera')!=-1){
                              let urlItem = {
                                label:'Aspera',
                                key:filesArray[i].publicFileLocations[j].value
                              }
                              item.url.push(urlItem)
                          }
                      }
                      item.url.sort((a,b)=>{
                          let labelA=a.label.toUpperCase()
                          let labelB=b.label. toUpperCase()
                          if(labelA<labelB)
                            return 1
                          if(labelA>labelB)
                            return -1

                          return 0
                      });
                      //console.log('file type',item.type)
                      tempArray.push(item);
                  }

                  this.fileList=tempArray;
                }
                else{
                    this.$Message.error({content:'No results', duration:1});
                }
            },function(err){
                this.fileListLoading = false;
            });
      },
      pageAssayChange(page){
          this.page = page-1;
          //this.queryAssay();
      },
      pageSizeAssayChange(size){
          this.size = size;
          //this.queryAssay();
      },
      queryAssay(id){
          var id = id || this.$route.params.id;
          this.assayResults=[];
          this.assayLoading=true;
          this.$http
            .get(this.queryAssayApi + id)
            .then(function(res){
                this.assayLoading=false;
                //console.log(res.body);
                this.total = res.body.list.length;
                for(let i=0;i<res.body.list.length; i++){
                    let item = {
                        accession: res.body.list[i].assayAccession,
                        title: res.body.list[i].title,
                        proteins: res.body.list[i].proteinCount,
                        peptides: res.body.list[i].peptideCount,
                        uniquepeptides:  res.body.list[i].uniquePeptideCount,
                        spectra: res.body.list[i].totalSpectrumCount,
                        identifiedspectra: res.body.list[i].identifiedSpectrumCount,

                    }

                    let button = {
                        type:'primary',
                        content:'Analyse',
                        loading:false,
                        disabled:false,
                        token:'',
                        api: this.viewInreactomeApi+res.body.list[i].assayAccession+'.acc'
                    }
                    this.viewInReactomeButtonArray.push(button);
                    this.assayResults.push(item);
                }
            },function(err){

            });
      },
      europePMC(id){
          window.open(this.europepmcApi + id);
          //location.href = this.europepmcApi + id;
      },
      downLoadSelect(selection,row){
          console.log(selection);
          console.log(row);
      },
      filesSelectAll(){
          this.selectAllfiles =! this.selectAllfiles;
          this.$refs.selection.selectAll(this.selectAllfiles);
      },
      querySimilarity(id){
          var id = id || this.$route.params.id;
          this.similarProjects=[];
          this.similarityLoading=true;
          this.$http
            .get(this.similarityApi +id+'/similarProjects')
            .then(function(res){
                this.similarityLoading=false;
                this.similarProjects=res.body._embedded.compactprojects;

                //console.log(this.similarProjects)
            },function(err){

            });
      },
      gotoDetails(id){
          this.$router.push({name:'dataset',params:{id:id}});
          window.location.reload()
      },
      gotoMolecules(){
          this.$router.push({name:'molecules',params:{id:this.$route.params.id}});
      },
      init(){
          this.accession=''
          this.title=''
          this.projectDescription=''
          this.publicationDate=''
          this.submissionDate=''
          this.sampleProcessingProtocol=''
          this.dataProcessingProtocol=''
          this.contactors = []
          this.publications=[]
          this.species=[]
          this.diseases=[]
          this.tissues=[]
          this.instrumentNames=[]
          this.quantificationMethods=[]
          this.experimentTypes=[]
          this.softwares=[]
          this.modification=[]
          this.projectDownload=''
      },
      searchProperties(filter){
          let normalQuery = {}
          normalQuery.filter = filter;
          console.log(filter)
          this.$router.push({name: 'archive', query: normalQuery});
      },
      getProteinEvidences(q){
          let query = {};
          query.projectAccession=this.$route.params.id //'PXD012991'
          this.$http
              .get(this.proteinEvidencesApi,{params: query})
              .then(function(res){
               
                if(res.body && res.body._embedded){
                 
                  let proteinEvidences = res.body._embedded.proteinevidences;
                  if(proteinEvidences.length>0)
                    this.moleculesButtonState = false
                  else
                    this.moleculesButtonState = true
                  
                }
              },function(err){
                  this.$Message.error({content:'Protein Check Error', duration:3});
              });
      },
      searchByLabel(filter){
        this.$router.push({name: 'archive', query:{filter:filter}});
      },
      hasPlugin(name) {
          //用于把字符串转化为小些字母
          name = name.toLowerCase()
          for (let i = 0; i < navigator.plugins.length; i++) {
              if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
                  return true
              }
          }
          return false
      },
      initAsperaConnect() {
          /* This SDK location should be an absolute path, it is a bit tricky since the usage examples
           * and the install examples are both two levels down the SDK, that's why everything works
           */
          var CONNECT_INSTALLER =  "//d3gcli72yxqn2z.cloudfront.net/connect/v4";
          this.asperaWeb = new AW4.Connect({sdkLocation: CONNECT_INSTALLER, minVersion: "3.6.0"});
          var asperaInstaller = new AW4.ConnectInstaller({sdkLocation: CONNECT_INSTALLER});
          var statusEventListener = function (eventType, data) {
            if (eventType === AW4.Connect.EVENT.STATUS && data == AW4.Connect.STATUS.INITIALIZING) {
              asperaInstaller.showLaunching();
           } else if (eventType === AW4.Connect.EVENT.STATUS && data == AW4.Connect.STATUS.FAILED) {
             asperaInstaller.showDownload();
           } else if (eventType === AW4.Connect.EVENT.STATUS && data == AW4.Connect.STATUS.OUTDATED) {
             asperaInstaller.showUpdate();
           } else if (eventType === AW4.Connect.EVENT.STATUS && data == AW4.Connect.STATUS.RUNNING) {
             asperaInstaller.connected();
           }
          };
          this.asperaWeb.addEventListener(AW4.Connect.EVENT.STATUS, statusEventListener);
          this.asperaWeb.initSession();

          //this.asperaWeb.addEventListener('transfer', fileControls.handleTransferEvents);
          //setup();
      },
      downloadFiles (value) {
          console.log('value',value);
          let transferSpec = {
              "paths": [{"source":value}],
              "remote_host": "fasp.ebi.ac.uk",
              "remote_user": "prd_ascp",
              "authentication":"token",
              "token":"PRIDE-Aspera-1-Token",
              "direction": "receive",
              "target_rate" : 10000000,
              "resume" : "sparse_checksum",
              "ssh_port": 33001
          };

          let connectSettings = {
              "allow_dialogs": false
          };
          var response = this.asperaWeb.startTransfer(transferSpec, connectSettings);

          console.log('response',response);
      },
      downloadPageChange(page){
          this.pageDownLoad = page;
          let query = {
            sortConditions: this.projectFileSortCondition,
            sortDirection: this.projectFileSortDirection,
            page:this.pageDownLoad-1,
            pageSize :this.pageSizeDownLoad,
          }
          if(this.fileName)
            query.filter = 'fileName=regex='+this.fileName
          this.queryArchiveProjectFiles(query)
      },
      downloadPageSizeChange(size){
          this.pageSizeDownLoad = size;
          let query = {
            sortConditions: this.projectFileSortCondition,
            sortDirection: this.projectFileSortDirection,
            page:this.pageDownLoad-1,
            pageSize :this.pageSizeDownLoad,
          }
          if(this.fileName)
            query.filter = 'fileName=regex='+this.fileName
          this.queryArchiveProjectFiles(query)
      },
      projectFtp(ftp){
          window.open(ftp)
      },
      projectFilesTableSortChange(item){
        console.log(item)
        if(item.order == 'asc')
            this.projectFileSortDirection = 'ASC'
        else
            this.projectFileSortDirection = 'DESC'

        if(item.order == 'normal' || item.key == 'name')
          this.projectFileSortCondition = 'fileName'
        else
          this.projectFileSortCondition = 'fileType'

        let query = {
            sortConditions: this.projectFileSortCondition,
            sortDirection: this.projectFileSortDirection,
            page:this.pageDownLoad-1,
            pageSize :this.pageSizeDownLoad,
        }
        if(this.fileName)
            query.filter = 'fileName=regex='+this.fileName
        this.queryArchiveProjectFiles(query)
      },
      searchFile(){
        let query = {
            sortConditions: this.projectFileSortCondition,
            sortDirection: this.projectFileSortDirection,
            page:this.pageDownLoad-1,
            pageSize :this.pageSizeDownLoad,
        }
        if(this.fileName)
            query.filter = 'fileName=regex='+this.fileName
        this.queryArchiveProjectFiles(query)
      },
      sdrfTableCollapseChange(val){
        this.sdrfTableCollapse = val
      },
      fileTableRowClick(row){
        //console.log(row)
        if(row.name.match('sdrf')){
          this.sdrfTableCollapse = false
          this.sdrfTableLoading = true
          let query = {accession:row.accession}

          this.$http
              .get(this.sdrfTableApi,{params: query})
              .then(function(res){
                  this.sdrfTableLoading = false
                  if(res.data){
                    this.mapSdrfFileText(res.data)
                  }
                  else
                     this.$Message.error({content:'Sdrf File Error', duration:3});
              },function(err){
                  this.sdrfTableLoading = false
                  this.$Message.error({content:'Sdrf File Error', duration:3});
              });
        }
      },
      mapSdrfFileText(data){
        let arr = data.split('\n');
        this.totalSdrf = 0
        this.sdrfTableData = []
        this.sdrfTableCol = []
        this.sampleData = []
        this.sampleCol = []
        this.keyList = []
        for(let i=0; i<arr.length; i++){
            if(i == 0){ //for first row which is the col in the table
              let header = arr[i].split('\t');
              this.sampleCol.push({
                  name: '#',
                  key: 'index',
                  // align: 'center',
                  required: true,
              })
              for(let j=0; j<header.length; j++){
                  //console.log(header[j])
                  let item = {
                      name:header[j],
                      key:header[j].replace(/\s+/g,"") + Math.floor(100000 + Math.random() * 900000),
                  }
                  this.keyList.push(item)
                  this.sampleCol.push(item)
              }
            }
            else{ //for the table data
              if(!arr[i]){
                console.log('empty row')
                // this.$Modal.warning({
                //       title: 'WARNING',
                //       content: '<p>The current file has some empty lines and the end, please remove it. Check specification</p>',
                //       onOk: () => {

                //       },
                //   });
                continue
              }
              let body = arr[i].split('\t');
              let item = {}
              for(let j=0; j<body.length; j++){
                  item.index=parseInt(i)
                  item[this.keyList[j].key]={
                    value:body[j],
                  }
              }
              this.sampleData.push(item)
            }
        }
        this.totalSdrf = this.sampleData.length
        this.sdrfTableData = this.sampleData.slice((this.pageSdrf-1)*this.pageSizeSdrf, (this.pageSdrf-1)*this.pageSizeSdrf + this.pageSizeSdrf)
        this.sdrfTableCol = this.sampleCol
      },
      sdrfPageChange(page){
          this.sdrfTableLoading = true
          this.pageSdrf = page;
          this.sdrfTableData = this.sampleData.slice((this.pageSdrf-1)*this.pageSizeSdrf, (this.pageSdrf-1)*this.pageSizeSdrf + this.pageSizeSdrf)
          setTimeout(()=>{
            this.sdrfTableLoading = false
          },500)
      },  
      sdrfPageSizeChange(size){
          this.sdrfTableLoading = true
          this.pageSizeSdrf = size;
          this.sdrfTableData = this.sampleData.slice((this.pageSdrf-1)*this.pageSizeSdrf, (this.pageSdrf-1)*this.pageSizeSdrf + this.pageSizeSdrf)
          setTimeout(()=>{
            this.sdrfTableLoading = false
          },500)
      }
    },
    mounted: function(){
        this.queryProjectDetails();
        this.queryArchiveProjectFiles();
        this.querySimilarity();
    },
    computed:{//TODO for queryAssayApi
      query:function(){
          let page='page='+this.page+'&';
          let size='size='+this.size;
          return '?'+sequence+project+mod+page+size;
      },
      queryDownload:function(){
          let normalQuery = {}
          normalQuery.page = this.pageDownLoad -1;
          normalQuery.pageSize = this.pageSizeDownLoad;
          return normalQuery;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dataset-container{
    width: 100%;
  }
  .content{
    width: 90%;
    margin:0 auto;
    padding: 40px 0;
    min-height: calc(100vh - 200px);
  }
  .tab-container{
    /*min-height: calc(100vh - 685px);*/
  }
  .card{
    margin-top: 30px;
  }
  .project-title{
      color:rgb(100, 102, 100);
  }
  .tags{
    font-size: 16px;
    color:rgb(100, 102, 100);
  }
  .tags a{
    color:rgb(100, 102, 100);
  }
  .tags a:hover{
    color: #5bc0be;;
  }
  .icon-tag{
    font-size: 12px;
    margin-right: 5px;
  }
  .summary-content-header{
    font-size: 14px;
    color: #5bc0be;
    font-weight: bold;
  }
  .card p{
    text-align: justify;
    font-size: 12px;
  }
  .card .summary-content-header:first-child{
    margin-top: 0px;
  }
  .card a{
      color: #495060;
      border-bottom-style: dotted;
  }
  .card a:hover{
        color: #5bc0be;
  }
  .card .property{
    /*display: flex;*/
    display: block;
  }
  .card .property .property-col{
    display: flex;
    flex:1;
    flex-direction:column;
  }
  .card .property .property-col:not(:last-child) {
    margin-right: 40px;
  }
  /*
  .card .property .property-col .property-row{
    display: flex;
    padding: 12px 0;
    justify-content: space-between;
    border-bottom: 1px solid #e7e7e7;
    margin-bottom: 10px;
  }*/
  .card .property .property-row{
    /*display: flex;*/
    /*padding: 2px 0;*/
    /*border-bottom: 1px solid #e7e7e7;*/
    margin-bottom: 10px;
  }
  .list-wrapper{

  }
  .similarity-card{
    margin-bottom: 5px;
  }
  .similarity-title{
    margin-bottom: 3px;
  }
  .download-icon{
    color: #5bc0be;
    cursor: pointer;
  }
  .download-icon:hover{
    opacity: .8;
  }
  .download-button{
    padding: 0;
    font-size: 12px;
    font-weight: 700;
    background-color: #5bc0be;
    border-radius: 3px;
    color: #f8f8f8;
    display: inline-block;
    padding: 2px 0px;
  }
  .download-button:hover{
    opacity: .8;
  }
  .download-list-wrapper{
    /*margin-top: 10px;*/
  }
  .card-item-wrapper{
    margin-bottom: 10px;
  }
  /*
  .property-wrapper{
    display: flex;
    flex-direction: column;
  }*/
  .property-wrapper{
    display: block;
  }
  .summary-content-header{
    display: flex;
    align-items: center;
  }
  .page-container{
    text-align: center;
    margin-top: 20px;
  }
  .title-wrapper{
    display: flex;
    margin: 20px 0;
    align-items: center;
    justify-content: space-between;
  }
  .tag-button{
      color: white;
      padding: 8px 10px;
      font-size: 12px;
      width: 150px;
      text-align: center;
      font-weight: 700;
      background-color: #5bc0be;
      border-radius: 3px;
  }
  .tag-button:hover{
    opacity: 0.8 !important;
    color: white;
  }
  .tag-button.notActive{
    color: white;
    opacity: 0.5 !important;
  }
  .tag-button.notActive:hover{
    opacity: 0.5 !important;
    color: white;
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
  .tag-wrapper{
    display: flex;
    align-items: center;
  }
  .dataset-wrapper{
      margin-left: 5px;
    }
  .project-file-title-container{
    display: flex;
    justify-content: space-between;
    height: 30px;
  }
  .sortOption{
    display: flex;
    margin-left: 5px;
  }
  .sort-wrapper{
    display:flex;
    align-items: center;
  }
  .sdrf-file-title-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sdrf-file-title-container .right a{
    border-bottom-style:none;
  }
  .table-col:first-child{
      /*border-left: 1px solid #e9eaec;*/
  }
  .table-col:first-child .table-row.first{
      padding: 10px;
  }
  .table-col:first-child .table-row.first:hover i{
    display: none
  }
  .table-col{
      flex:1;
      /*min-width: 200px;*/
      width: auto;
      max-width: 1000px;
  }
   .table-col:last-child{
      min-width: 350px;
  }
  .table-row:first-child{
      min-width: 50px;
      border-top: 1px solid #e9eaec;
      background-color: #f8f8f9;
      align-items: center;
      height:45px;
      display: flex;
      white-space: nowrap;
      overflow: hidden;
      justify-content: center;
      font-weight: 700;
      font-size: 12px;
  }
  .table-row:first-child.msrun{
      background-color: #2d8cf0ba;
  }
  .table-row{
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #e9eaec;
      padding: 10px 20px 10px 5px;
      /*padding: 10px 5px;*/
      position: relative;
      height:45px;
      border-right: 1px solid #e9eaec;
  }
  .table-row.first{
    /*cursor: all-scroll;*/
    padding:10px 30px;
  }
  .table-row.first i{
    display: none
  }
  .table-row.first:hover i{
    display: inline-block
  }
  .table-row.first i:hover{
    opacity: 0.6
  }
  .table-row .copy-icon{
    position: absolute;
    right: 5px;
    top: 12px;
    display: none;
    cursor: pointer;
  }
  .table-row:hover .copy-icon{
    display: block;
  }
  .table-row .copy-icon:hover{
    opacity: 0.6
  }
  .index-col{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 15px;
  }
  .table-row.index{
    padding: 10px 5px;
    border-left: 1px solid #e9eaec;
  }
  .table-row.index i{
    cursor: pointer;
    display: none;
    position: absolute;
    left: 5px;
  }
  .table-row.index:hover i{
    display: inline-block;
  }
  .table-row.index i:hover{
    opacity: 0.6
  }
  .table-col p{
    white-space: nowrap;
  }
  .table-spin{
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    /* text-align: center; */
    justify-content: center;
    align-items: center;
    background-color: #f7f7f78f;
  }
  .no-data-table-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  /*
  @media (min-width: 768px) {
      .content{
         min-height: calc(100vh - 505px);
      }

  }
  @media (min-width: 992px) {


  }
  @media (min-width: 1200px) {

  }

  @media (min-width: 1600px) {

  }
  @media (min-width: 1800px) {

  }
  @media (min-width: 2000px) {

  }
  @media (min-width: 2300px) {

  }*/

</style>
<style>
  .card .ivu-card-body table{
    margin-bottom: 0;
  }
  .card .ivu-card-body .ivu-checkbox-wrapper{
    margin-right: 0px;
  }
  .card .ivu-card-body .ivu-table-cell{
    padding: 0 5px;
  }
  .download-list table tbody td{
    padding: 0px;
  }
  table thead th{
    padding: 0px;
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
  .assay-detail-table table{
    margin-bottom: 0 !important;
  }

  .assay-detail-table a{
      color:#495060;
  }
  .assay-detail-table a:hover{
      color:#5bc0be;
      border-bottom-style:dotted;
  }
  .assay-detail-table .ivu-tooltip-inner{
      white-space:nowrap !important;
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
  .sortOption .ivu-select-dropdown{
    width:120px!important;
  }
  .sortOption .ivu-select-dropdown .ivu-select-item{
    font-weight: normal !important;

  }
  .download-button span{
    margin: 0 10px;
  }
  .project-files-accession{
    display: none;
  }
</style>

