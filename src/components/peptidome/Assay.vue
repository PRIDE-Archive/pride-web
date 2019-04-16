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
               <h2 class="project-title">Project {{accession}}</h2>
                <div class="tags">
                  <!--
                    <span class="type-tag-wrapper">
                      <Icon class="type-tag" type="ios-pricetag-outline"></Icon>
                      <a>Biological Dataset</a>
                    </span>
                    <span>
                      <Icon class="download-tag" type="ios-download-outline"></Icon><a>Download</a>
                    </span>
                  -->
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
                              <div class="summary-content-header">Data Processing Protocol1</div>
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
                    <Card class="card">
                       <p slot="title">Property</p>
                       <div class="property">
                          <div class="property-col">
                            <div class="property-row">
                                <div class="summary-content-header">Species</div>
                                <div>
                                  <a v-for="item in species">{{item}}</a>
                                </div>
                            </div>
                            <div class="property-row">
                                <div class="summary-content-header">Tissue</div>
                                <div class="property-wrapper">
                                  <a v-for="item in tissues">{{item}}</a>
                                </div>
                            </div>
                            <div class="property-row">
                                <div class="summary-content-header">Instrument</div>
                                <div class="property-wrapper">
                                  <a v-for="item in instrumentNames">{{item}}</a>
                                </div>
                            </div>
                            <div class="property-row">
                                <div class="summary-content-header">Software</div>
                                <p>{{software}}</p>
                            </div>
                          </div>
                          <div class="property-col">
                            <div class="property-row">
                                <div class="summary-content-header">Modification</div>
                                <a>No PTMs are included in the dataset</a>
                            </div>
                            <div class="property-row">
                                <div class="summary-content-header">Quantification</div>
                                <div class="property-wrapper">
                                  <div v-if="quantificationMethods.length>0">
                                      <a v-for="item in quantificationMethods">{{item}}</a>
                                  </div>
                                  <div v-else>
                                      <p>Not available</p>
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
                    <Card v-if="total>0" class="card">
                        <p slot="title">Assay</p>
                        <div class="assay-search-container">
                        <!--<Table class="peptide-table" :loading="loading" border :columns="columns5" :data="results" size="small" @on-row-click="rowClick"></Table>-->
                        <Table class="assay-detail-table" :loading="assayLoading" border :columns="assayCol" :data="assayResults" size="small"></Table>
                        </div>
                        <div class="page-container">
                          <Page :total="total" :page-size="size" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                        </div>
                    </Card>
                   
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
                       <p slot="title"> <i class="fas fa-download icon-tag"></i>Download</p>
                       <div class="filter-wrapper">
                           <div class="summary-content-header">Filter</div>
                           <Select v-model="model1" size="small" style="width:100px">
                              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                           </Select>
                       </div>
                       <div class="download-list-wrapper">
                         <div class="summary-content-header">List</div>
                         <div class="download-list">
                           <Table border ref="selection" :columns="columns4" :data="data1"></Table>
                           <Button class= "download-button">Download</Button>
                         </div>
                       </div>
                  </Card>
                  <Card class="card">
                       <p slot="title"><i class="fas fa-link icon-tag"></i>Similar Studies</p>
                       <div class="list-wrapper">
                        <ul>
                          <li><a>Homo sapiens (Human) XXXXXXX  XXXXXX XXXXX XXXX XXXXX</a></li>
                          <li><a>Homo sapiens (Human) XXXXXXX  XXXXXX XXXXX XXXX XXXXX</a></li>
                          <li><a>Homo sapiens (Human) XXXXXXX  XXXXXX XXXXX XXXX XXXXX</a></li>
                          <li><a>Homo sapiens (Human) XXXXXXX  XXXXXX XXXXX XXXX XXXXX</a></li>
                          <li><a>Homo sapiens (Human) XXXXXXX  XXXXXX XXXXX XXXX XXXXX</a></li>
                        </ul>
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
          publications:[],
          species:[],
          tissues:[],
          instrumentNames:[],
          quantificationMethods:[],
          experimentTypes:[],
          software:'',
          queryArchiveProjectApi:'https://www.ebi.ac.uk:443/pride/ws/archive/project/'+this.$route.params.id,
          queryAssayApi:'https://www.ebi.ac.uk:443/pride/ws/archive/assay/list/project/'+this.$route.params.id,
          europepmcApi:'http://europepmc.org/abstract/MED/',
          contactors:[],
          columns4: [
              {
                  type: 'selection',
                  width: 40,
                  align: 'center'
              },
              {
                  title: 'Name',
                  key: 'name',
                  ellipsis:true
              },
              {
                  title: 'Size (M)',
                  width: 80,
                  key: 'size',
                  sortable: true,
                    align:'center'
              },
          ],
          data1: [
            {
                name: '41598_2018_23766_MOESM1_ESM.doc',
                size: 1312.606,
               
            },
            {
                name: '41598_2018_23766_MOESM1_ESM.doc',
                size: 1312.606,
            },
            {
                name: '41598_2018_23766_MOESM1_ESM.doc',
                size: 1312.606,
            },
            {
                name: '41598_2018_23766_MOESM1_ESM.doc',
                size: 1312.606,
            }
          ],
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
          viewInReactomeButtonType:'primary',
          viewInReactomeButtonContent:'Analyse',
          viewInReactomeButtonLoading:false,
          assayLoading:true,
          viewInReactomeUrl:'',
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
                        h('a', {
                          on: {
                              click: () => {
                                  
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
                          h('Button', {
                              props: {
                                  type: this.viewInReactomeButtonType,
                                  size: 'small',
                                  loading: this.viewInReactomeButtonLoading
                              },
                              style: {
                                  marginRight: '5px'
                              },
                          }, this.viewInReactomeButtonContent),
                      ]);
                  }
              }
          ],
          assayResults:[],
          page:0,
          size:20,
          total:0,
      }
    },
    components: {
      NavBar
    },
    methods:{
      queryProjectDetails(){
           this.$http
            .get(this.queryArchiveProjectApi)
            .then(function(res){
                //console.log(res.body);
                this.accession = res.body.accession;
                this.title = res.body.title;
                this.projectDescription = res.body.projectDescription;
                this.publicationDate = res.body.publicationDate.split('-')[2] +'/'+ res.body.publicationDate.split('-')[1] +'/'+ res.body.publicationDate.split('-')[0];
                this.submissionDate = res.body.submissionDate.split('-')[2] +'/'+ res.body.submissionDate.split('-')[1] +'/'+ res.body.submissionDate.split('-')[0];
                this.sampleProcessingProtocol = res.body.sampleProcessingProtocol;
                this.dataProcessingProtocol = res.body.dataProcessingProtocol;
                this.species = res.body.species;
                this.tissues = res.body.tissues;
                this.instrumentNames = res.body.instrumentNames;
                this.software = res.body.software || 'Unknown';
                this.quantificationMethods = res.body.quantificationMethods; 
                this.experimentTypes = res.body.experimentTypes; 
                //for contactors
                let submitter = res.body.submitter;
                let item = {
                  name: submitter.firstName + ' ' + submitter.lastName,
                  affiliation: submitter.affiliation,
                  email:submitter.email
                }
                this.contactors.push(item);
                for(let i=0; i<res.body.labHeads.length; i++){
                  let item = {
                    name: res.body.labHeads[i].firstName + ' ' + res.body.labHeads[i].lastName,
                    affiliation: res.body.labHeads[i].affiliation + ' ' +'(lab head)',
                    email:res.body.labHeads[i].email
                  }
                  this.contactors.push(item);
                }
                //for publications
                for(let i=0; i<res.body.references.length; i++){
                  let item = {
                    desc:res.body.references[i].desc,
                    pmid:res.body.references[i].ids[1].split(':')[1],
                  }
                  this.publications.push(item);
                }
                
            },function(err){

            });
      },
      pageChange(page){
          this.page = page-1;
          this.queryAssay();
      },
      pageSizeChange(size){
          this.size = size;
          this.queryAssay();
      },
      queryAssay(){
          this.assayResults=[];
          this.assayLoading=true;
          this.$http
            .get(this.queryAssayApi)
            .then(function(res){
                this.assayLoading=false;
                console.log(res.body);
                this.total = res.body.list.length;
                for(let i=0;i<res.body.list.length; i++){
                    var item = {
                        accession: res.body.list[i].assayAccession,
                        title: res.body.list[i].title,
                        proteins: res.body.list[i].proteinCount,
                        peptides: res.body.list[i].peptideCount,
                        uniquepeptides:  res.body.list[i].uniquePeptideCount,
                        spectra: res.body.list[i].totalSpectrumCount,
                        identifiedspectra: res.body.list[i].identifiedSpectrumCount,
                        viewinreactome: this.viewInReactomeUrl+res.body.list[i].sequence
                    } 
                    this.assayResults.push(item);
                }
            },function(err){

            });
      },
      europePMC(id){
          window.open(this.europepmcApi + id);
          //location.href = this.europepmcApi + id;
      }
    },
    mounted: function(){
        this.queryProjectDetails();
        this.queryAssay();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .dataset-container{
    width: 100%;
  }
  .content{
    width: 80%;
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
      margin: 20px 0;
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
    display: flex;
  }
  .card .property .property-col{
    display: flex;
    flex:1;
    flex-direction:column;
  }
  .card .property .property-col:not(:last-child) {
    margin-right: 40px;
  }
  .card .property .property-col .property-row{
    display: flex;
    padding: 12px 0;
    justify-content: space-between;
    border-bottom: 1px solid #e7e7e7;
  }
  .list-wrapper{
    padding-left: 20px;
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
    margin-top: 10px;
  }
  .card-item-wrapper{
    margin-bottom: 10px;
  }
  .property-wrapper{
    display: flex;
    flex-direction: column;
  }
  .summary-content-header{
    display: flex;
    align-items: center;
  }
  .page-container{
    text-align: center;
    margin-top: 20px;
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
      white-space:normal;
  }
</style>

