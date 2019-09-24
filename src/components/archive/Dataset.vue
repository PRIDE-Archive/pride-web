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
                  <a class="tag-button" @click="gotoMolecules">Identification Results</a>
                  <!--<div class="tags">
                    
                      <span class="type-tag-wrapper">
                        <Icon class="type-tag" type="ios-pricetag-outline"></Icon>
                        <a>Biological Dataset</a>
                      </span>
                      <span>
                        <Icon class="download-tag" type="ios-download-outline"></Icon><a>Download</a>
                      </span>
                   
                  </div> -->
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
                    <!--
                    <Card class="card">
                       <p slot="title">Properties</p>
                       <div class="property">
                          <div class="property-col">
                            <div class="property-row">
                                <div class="summary-content-header">Species</div>
                                <div class="property-wrapper">
                                  <div v-if="species.length>0">
                                      <a v-for="item in species">{{item.name}}</a>
                                  </div>
                                  <div v-else>
                                      <p>Unknown</p>
                                  </div>
                                </div>
                            </div>
                            <div class="property-row">
                                <div class="summary-content-header">Tissue</div>
                                <div class="property-wrapper">
                                  <div v-if="tissues.length>0">
                                      <a v-for="item in tissues">{{item.name}}</a>
                                  </div>
                                  <div v-else>
                                      <p>Unknown</p>
                                  </div>
                                </div>
                            </div>
                            <div class="property-row">
                                <div class="summary-content-header">Instrument</div>
                                <div class="property-wrapper">
                                  <a v-for="item in instrumentNames">{{item.name}}</a>
                                </div>
                            </div>
                            <div class="property-row">
                                <div class="summary-content-header">Softwares</div>
                                <div class="property-wrapper">
                                  <div v-if="softwares.length>0">
                                      <a v-for="item in softwares">{{item}}</a>
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
                                      <a v-for="item in diseases">{{item.name}}</a>
                                  </div>
                                  <div v-else>
                                      <p>Unknown</p>
                                  </div>
                                </div>
                            </div>
                          </div>
                          <div class="property-col">
                            <div class="property-row">
                                <div class="summary-content-header">Modification</div>
                                <div class="property-wrapper">
                                  <div v-if="modification.length>0">
                                      <a v-for="item in modification">{{item.name}}</a>
                                  </div>
                                  <div v-else>
                                      <p>No PTMs are included in the dataset</p>
                                  </div>
                                </div>
                            </div>
                            <div class="property-row">
                                <div class="summary-content-header">Quantification</div>
                                <div class="property-wrapper">
                                  <div v-if="quantificationMethods.length>0">
                                      <a v-for="item in quantificationMethods">{{item.name}}</a>
                                  </div>
                                  <div v-else>
                                      <p>Unknown</p>
                                  </div>
                                </div>

                            </div>
                            <div class="property-row">
                                <div class="summary-content-header">Experiment Type</div>
                                <div class="property-wrapper">
                                  <a v-for="item in experimentTypes">{{item}}</a>
                                </div>
                            </div>
                            <div class="property-row">
                                <div class="summary-content-header">Assay count</div>
                                <p>{{total}}</p>
                            </div>
                          </div>
                       </div>
                        -->
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
                       <p slot="title"> <i class="fas fa-download icon-tag"></i>Project Files</p>
                       <!--
                       <div class="filter-wrapper">
                           <div class="summary-content-header">Filter</div>
                           <Select v-model="model1" size="small" style="width:100px">
                              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                           </Select>
                       </div>
                        -->
                       <div class="download-list-wrapper">
                         <!--<div class="summary-content-header">List</div>-->
                         <div class="download-list">
                           <Table border ref="selection" height="350" :loading="fileListLoading" :columns="fileListCol" :data="fileList" @on-select="downLoadSelect" @on-select-all="filesSelectAll"></Table>
                           <!--
                           <div class="page-container">
                              <Page :total="totalDownLoad" :page-size="pageSizeDownLoad" size="small" class-name="page" @on-change="pageChangeDownload" @on-page-size-change="pageSizeChangeDownload"></Page>
                           </div>
                           -->
                           <Button v-if="selectAllfiles" class= "download-button">Download</Button>
                         </div>
                       </div>
                    </Card>
                    <!-- <Card class="card">
                       <p slot="title"> <i class="fas fa-download icon-tag"></i>MSRun Files</p>
                       <div class="download-list-wrapper">
                         <div class="summary-content-header">List</div>
                         <div class="download-list">
                           <Table border ref="selection" height="350" :loading="fileListLoading" :columns="msRunModalTableCol" :data="msRunModalTableData"></Table>
                         </div>
                       </div>
                    </Card> -->
                    <!--
                    <Card v-if="total>0" class="card">
                        <p slot="title">Assay</p>
                        <div class="assay-search-container">
                        <Table class="assay-detail-table" :loading="assayLoading" border :columns="assayCol" :data="assayResults" size="small"></Table>
                        </div>
                        <div class="page-container">
                          <Page :total="total" :page-size="size" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                        </div>
                    </Card>
                    -->
                  </div>
                 <!--
                  <Tabs :animated="false">
                    <TabPane label="Summary">
                      <div class="tab-container">
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                      </div>
                    </TabPane>
                    <TabPane label="Publication">
                      <div class="tab-container">
                        <p>Schroeter CB, Koehler S, Kann M, Schermer B, Benzing T, Brinkkoetter PT, Rinschen MM. Protein half-life determines expression of proteostatic networks in podocyte differentiation. FASEB J. 2018:fj201701307R PubMed: 29694247</p>
                      </div>
                    </TabPane>
                  </Tabs>
                -->
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
  </div>
</template>

<script>
  import NavBar from '@/components/ebi/Nav'
  import store from "@/store/store.js"
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
          queryArchiveProjectApi: this.$store.state.baseApiURL + '/projects/',
          queryArchiveProjectFilesApi: this.$store.state.baseApiURL + '/projects/',
          queryAssayApi:'https://www.ebi.ac.uk:443/pride/ws/archive/assay/list/project/',
          europepmcApi:'http://europepmc.org/abstract/MED/',
          reactomeApi:'https://reactome.org/AnalysisService/identifiers/url?pageSize=1&page=1',
          viewInreactomeApi:'https://www.ebi.ac.uk/pride/ws/archive/protein/list/assay/',
          msRunApi:'http://wwwdev.ebi.ac.uk/pride/ws/archive/msruns/byProject',
          similarityApi: this.$store.state.baseApiURL + '/projects/',
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
                  ellipsis:true
              },
              {
                  title: 'Type',
                  width: 100,
                  key: 'type',
                  align:'left',
                  sortable: true,
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

                          /*
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
                                  click: () => {
                                      //window.location.href = params.row.url.ftp;
                                      window.open(params.row.url.ftp)
                                      console.log(params.row.url.ftp);
                                      //this.gotoBlast(params);
                                  }
                              }
                          }, 'FTP'),*/

                      ]);
                  }
              },
              {
                  title: 'Size (M)',
                  width: 80,
                  key: 'size',
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'Download',
                  key: 'download',
                  align:'center',
                  width:160,
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
                                  click: () => {
                                      //window.location.href = params.row.url.ftp;
                                      window.open(params.row.url.ftp)
                                      console.log(params.row.url.ftp);
                                      //this.gotoBlast(params);
                                  }
                              }
                          }, 'FTP'),
                          
                          // h('i', {
                          //     attrs: { class: 'fas fa-download'},
                          //     style: {
                          //         marginRight: '5px',
                          //         marginLeft: '0px'
                          //     },
                          // }),



                          // h('Button', {
                          //     props: {
                          //         type: 'primary',
                          //         size: 'small'
                          //     },
                          //     style: {
                          //         display:'inline-block',
                          //         marginRight: '0px'
                          //     },
                          //     on: {
                          //         click: () => {
                          //             //window.location.href = params.row.url.asp;
                          //             window.open(params.row.url.asp)
                          //             console.log(params.row.url.asp);
                          //         }
                          //     }
                          // }, 'ASPERA'),
                      ]);
                  }
              }
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
          page:0, //TODO for queryAssayApi
          size:20, //TODO for queryAssayApi
          total:0, //TODO for queryAssayApi
          pageDownLoad:0,
          pageSizeDownLoad:100,
          totalDownLoad:0,
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
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      this.queryProjectDetails(to.params.id);
      //this.queryAssay(to.params.id);
      this.queryArchiveProjectFiles(to.params.id);
      this.querySimilarity(to.params.id);
      //console.log('to query',to.query);
      /*
      let filter = to.query.split('?')[1].split('filter');
      if(filter.length>1)
        filter.split("=");
      console.log('filter',filter);*/
      //this.$bus.$emit('submit-search', {params: to.params, query: to.query});
      next();
    },
    components: {
      NavBar
    },
    methods:{
      queryProjectDetails(id){
           var id = id || this.$route.params.id;
           this.$http
            .get(this.queryArchiveProjectApi + id)
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

            },function(err){
                this.$router.replace({name:'404'});
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
                  console.log(this.msRunModalTableData);
              },function(err){
                  this.msRunTableLoading = false;
              });
      },
      queryArchiveProjectFiles(id){
           var id = id || this.$route.params.id;
           this.fileListLoading = true;
           this.$http
            .get(this.queryArchiveProjectFilesApi +id+ '/files'+ this.queryDownload)
            .then(function(res){
                console.log(res.body);
                this.fileListLoading = false;
                this.totalDownLoad = res.body.page.totalElements;
                if(res.body._embedded && res.body._embedded.files){
                  let filesArray = res.body._embedded.files;
                  let tempArray = [];
                  for(let i=0;i<filesArray.length;i++){
                      let item ={
                            name: filesArray[i].fileName,
                            type: filesArray[i].fileCategory.value,
                            size: Math.round(filesArray[i].fileSizeBytes/1024/1024) > 0 ? Math.round(filesArray[i].fileSizeBytes/1024/1024) : (filesArray[i].fileSizeBytes)+' bit',
                            url: {
                              ftp: filesArray[i].publicFileLocations[0].value,
                              asp: filesArray[i].publicFileLocations[1].value
                            }
                      }
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
      pageChange(page){
          this.page = page-1;
          //this.queryAssay();
      },
      pageSizeChange(size){
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
      pageChangeDownload(page){
          this.pageDownLoad = page-1;
          this.queryArchiveProjectFiles();
      },
      pageSizeChangeDownload(size){
          this.pageSizeDownLoad = size;
          this.queryArchiveProjectFiles();
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

                console.log(this.similarProjects)
            },function(err){

            });
      },
      gotoDetails(id){
          this.$router.push({name:'dataset',params:{id:id}});
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
      },
      searchProperties(filter){
          let normalQuery = {}
          normalQuery.filter = filter;
          console.log(filter)
          this.$router.push({name: 'archive', query: normalQuery});
      }
    },
    mounted: function(){
        this.queryProjectDetails();
        //this.queryAssay();
        this.queryArchiveProjectFiles();
        this.querySimilarity();
        this.getMSRunTableData();
    },
    computed:{//TODO for queryAssayApi
      query:function(){
          let page='page='+this.page+'&';
          let size='size='+this.size;
          return '?'+sequence+project+mod+page+size;
      },
      queryDownload:function(){
          let pageDownLoad='page='+this.pageDownLoad+'&';
          let pageSizeDownLoad='pageSize='+this.pageSizeDownLoad;
          return '?'+pageDownLoad+pageSizeDownLoad;
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
  .download-button{
    padding: 6px 8px;
    font-size: 12px;
    margin-top: 10px;
    font-weight: 700;
    background-color: #5bc0be;
    border-radius: 3px;
    color: #f8f8f8;
    border-bottom-style:none;
    display: inline-block;
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
      width: 80px;
      text-align: center;
      font-weight: 700;
      background-color: #5bc0be;
      border-radius: 3px;
  }
  .tag-button:hover{
    opacity: 0.8 !important;
    color: white;
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
</style>

