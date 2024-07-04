<template>
  <div class="dataset-container">
      <!-- <Alert v-if="bannerContent" banner type="warning" @on-close="closeBanner">
        <span class="banner" v-html="bannerContent"></span>
      </Alert> -->
      <div class="panel nav"><NavBar page="xiview"/></div>
      <div class="content">
          <Row :gutter="48" class="row">
              <Col span="24">
                <div class="visualization-wrapper">
                  <Card class="card usi">
                      <p slot="title" class="table-header"> 
                          <span>
                            <!-- <Icon type="md-reorder" size="14" style="margin-right: 5px"/> -->
                            Crosslinking datasets
                          </span>
                          <span v-if="true" class="right">
                              <span class="icon-wrapper">
                                <Icon type="md-open" size="18" style="margin-right: 5px;cursor: pointer;" @click="gotoExternal()" />  
                                <Icon type="md-help-circle" size="19" style="margin-right: 5px;cursor: pointer;" @click="gotoHelp()"/>
                              </span>
                              <Input v-if ="!xiviewTableFoldBool" type="text" v-model="xiviewDataSearchKeyword" placeholder="" size="small" @on-enter="queryXiviewData">
                              <Button slot="append" icon="ios-search" @click="queryXiviewData"></Button>
                              </Input>
                              <a v-if="xiviewTableFoldBool" href="javascript:void(0)"><Icon type="md-arrow-dropright" size="20" @click="xiviewTableFold(false)"></Icon></a>
                              <a v-else href="javascript:void(0)"><Icon type="md-arrow-dropdown" size="20" @click="xiviewTableFold(true)"></Icon></a>
                          </span>
                      </p>
                      <div>
                          <div style="color:#bdbdbd; text-align: center;">
                              <span v-if ="xiviewTableFoldBool">{{xiviewTableHint}}</span>
                          </div>
                          <Table v-if ="true" row-key="id" class="xiview-table" :loading="queryXiviewDataLoading" border :columns="xiviewTableCol" :data="xiviewTableData" size="small"></Table>
                      </div>
                      <div class="page-container">
                         <Page :total="totalXiviewData" :page-size="pageSizeXiview" :current="pageXiview" size="small" show-sizer show-total @on-change="xiviewPageChange" @on-page-size-change="xiviewPageSizeChange"></Page>
                      </div>
                  </Card>
                </div>
              </Col>
          </Row>
          <Row :gutter="48" class="row">
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 12}">
                <Card class="card">
                    <p slot="title" class="table-header"> 
                        <span>
                          Peptides per Protein
                        </span>
                    </p>
                    <Spin fix v-if="barHorizontalShow"></Spin>
                    <BarHorizontalPride></BarHorizontalPride>
                </Card>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 12}">
                <Card class="card">
                    <p slot="title" class="table-header"> 
                        <span>
                          Project per Species
                        </span>
                    </p>
                    <Spin fix v-if="pieXiviewShow"></Spin>
                    <PieXiview></PieXiview>
                </Card>
            </Col>
          </Row>
          <Row :gutter="48" class="row">
            <Col :xs="{ span: 24 }" :sm="{span: 24}" :md="{ span: 24}" :lg="{ span: 24}">
                <Card class="card">
                    <p slot="title" class="table-header"> 
                        <span>
                          Overall Statistics
                        </span>
                    </p>
                    <Spin fix v-if="areaPieXiviewShow"></Spin>
                    <OverlapBar></OverlapBar>
                </Card>
            </Col>
          </Row>
          <Row :gutter="48" class="row">
            <Col span="24">
              <Divider />
            </Col>
          </Row>
          <Row :gutter="48" class="row">
            <Col span="18">
              <span style="color:gray; font-size: 20px">The PRIDE Crosslinking Database, visualisation components and integration with PDB-KB has been developed and maintained by Juri Rappsilber's Lab (Technische Universität Berlin, Edinburgh University), PRIDE and PDB teams (EMBL-EBI)</span>
            </Col>
            <Col span="6">
              <div class="logo_container" style="background-image:url(../logo/xiview_logo_horizon_1.png)"></div>
              <!-- <img :src="logoURL" alt="logo" :width="logoWidth"> -->
            </Col>
          </Row>
      </div>
  </div>
</template>

<script>
  import NavBar from '@/components/Nav'
  import store from "@/store.js"
  import svgLogo from "@/components/svg/archive"
  import BarHorizontalPride from '@/components/chart/BarHorizontalXiview.vue'
  import PieXiview from '@/components/chart/PieXiview.vue'
  import AreaPieXiview from '@/components/chart/AreaPieXiview.vue'
  import OverlapBar from '@/components/chart/OverlapBar.vue'
  export default {
    name: 'xview',
    data(){
      return {
          queryXiviewDataApi: 'https://www.ebi.ac.uk/pride/ws/archive/crosslinking/projects',
          barHorizontalApi: 'https://www.ebi.ac.uk/pride/ws/archive/crosslinking/peptide-per-protein',
          pieXiviewApi:'https://www.ebi.ac.uk/pride/ws/archive/crosslinking/projects-per-species',
          areaPieXiviewApi:'https://www.ebi.ac.uk/pride/ws/archive/crosslinking/statistics-count',
          // projectSearchApi:'https://www.ebi.ac.uk/pride/ws/archive/crosslinking/projects/search?query=PXD038060&page=1&page_size=10'
          bannerContent:"The PRIDE Crosslinking Database, visualisation components and integration with PDB-KB has been developed and maintained by Juri Rappsilber's Lab, PRIDE and PDB teams",
          // queryArchiveProjectFilesApi: this.$store.state.baseApiURL + '/projects',
          logoURL:'/logo/xiview_logo_horizon_1.png',
          logoWidth:410,
          accession: '',
          title: '',
          description:'',
          organism:'',
          pubmed_id:'',
          xiviewTableLoading:false,
          
          pageSizeXiview:10,
          pageXiview:1,
          totalXiviewData:0,
          xiviewTableFoldBool:false,
          
          xiviewTableHint:'xiVIEW Data List',
         
          queryXiviewDataLoading:false,
          xiviewTableCol: [
              {
                  title: 'Accession',
                  key: 'accession',
                  width: 120,
                  sortable: true,
                  align:'center',
                  render: (h, params) => {
                      // console.log('params',params)
                      return h('div', [
                          h('a', {
                              style:{
                                color:'#444'
                              },
                              class:{
                                // projectAction:true
                              },
                              on: {
                                  click: () => {
                                      let routeData = this.$router.resolve({name:'crosslinking',params:{id:params.row.accession}});
                                      // console.log('routeData',routeData)
                                      window.open(routeData.href, '_blank');
                                      // this.$router.push({name:'crosslinking',params:{id:params.row.accession}});
                                  }
                              }
                          }, params.row.accession),
                      ]);
                  },
              },
              {
                  title: 'Title',
                  key: 'title',
                  sortable: false,
                  align:'left',
                  className: 'nobreak-cell',
              },{
                  title: 'Publication',
                  key: 'pubmed_id',
                  width: 120,
                  sortable: true,
                  align:'center',
                  render: (h, params) => {
                      // console.log('params',params)
                      return h('div', [
                          h('a', {
                              style:{
                                color:'#444'
                              },
                              class:{
                                // projectAction:true
                              },
                              on: {
                                  click: () => {
                                      // this.$Message.success({content:'Coming Soon.', duration:1});
                                      //this.$router.push({name:'crosslinking',params:{id:params.row.accession}});
                                      // this.$router.push({name: 'crosslinking', query: {id:params.row.accession}});
                                    window.open('http://europepmc.org/article/MED/' + params.row.pubmed_id)
                                  }
                              }
                          }, params.row.pubmed_id),
                      ]);
                  },
            },
              {
                  title: 'Organism',
                  key: 'organism',
                  sortable: true,
                  align:'left',
                  width: 350,
                  className: 'nobreak-cell',
              },
              {
                  title: 'Proteins',
                  key: 'proteins',
                  width: 80,
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'Peptides',
                  key: 'peptides',
                  width: 80,
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'Spectra',
                  key: 'spectra',
                  width: 80,
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'xiVIEW',
                  key: 'link',
                  align:'center',
                  width:100,
                  renderHeader: (h,params)=>{
                      return h('span',[
                          h('Icon',{
                              props:{
                                  type: 'information-circled'
                              },
                              style: {
                                  marginRight: '10px',
                                  cursor:'pointer'
                              },
                              on: {
                                click: (value) => {
                                    let routeData = this.$router.resolve({path:'/markdownpage/pridefiledownload'});
                                    window.open(routeData.href, '_blank');
                                }
                              }
                          }),
                          h('span','xiVIEW')
                      ])
                  },
                  render: (h, params) => {
                      return h('div', [
                          h('Icon', {
                              props: {
                                  type: 'md-stats',
                                   size: 20
                              },
                              style: {
                                  display:'inline-block',
                                  marginRight: '10px',
                                  paddingLeft: '22px',
                                  paddingRight: '22px'
                              },
                              on: {
                                  click: (value) => {
                                      // console.log(value)
                                      console.log(params.row.link);
                                      //window.location.href = params.row.url.ftp;
                                      window.open(params.row.link)
                                     
                                      //this.gotoEuroPMC(params);
                                  }
                              }
                          }, 'xiVIEW'),
                      ]);
                  },
              },
          ],
          xiviewTableData: [],
          // orignalXiviewTableData:[],
          proteinTableData:[],
          xiviewDataSearchKeyword:'',
          barHorizontalShow:true,
          pieXiviewShow:true,
          areaPieXiviewShow:true,
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      this.queryXiviewData();
      next();
    },
    components: {
      NavBar,
      svgLogo,
      BarHorizontalPride,
      PieXiview,
      AreaPieXiview,
      OverlapBar
    },
    methods:{
      queryXiviewData(){
           this.queryXiviewDataLoading = true;
           this.xiviewTableData=[]
           this.$http
            .get(this.queryXiviewDataApi,{params: this.query})
            .then(function(res){
              console.log('queryXiviewData',res.body)
              this.queryXiviewDataLoading = false;
              let res_page = res.body.page
              let res_projects =  res.body.projects
              this.totalXiviewData = res_page.total_elements
              for(let i=0; i<res_projects.length; i++){
                  let item = {
                    accession: res_projects[i].project_id,
                    title: res_projects[i].title,
                    pubmed_id: res_projects[i].pubmed_id,
                    organism: res_projects[i].organism,
                    proteins: res_projects[i].number_of_proteins,
                    peptides: res_projects[i].number_of_peptides,
                    spectra: res_projects[i].number_of_spectra,
                    link: res_projects[i].xiview_url ? res_projects[i].xiview_url : 'https://www.ebi.ac.uk/pride/archive/xiview/network.html?project=' + res_projects[i].project_id,
                    select: i == 0? true : false //init the first item selected
                  }
                  // this.orignalXiviewTableData.push(item);//save for original data
                  this.xiviewTableData.push(item);//only used for showup
              }
            },function(err){
                this.queryXiviewDataLoading = false;
            });
      },
      createFileList(filesArray){
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
                          key:filesArray[i].publicFileLocations[j].value.replace("ftp://", "https://"),
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
         return tempArray
      },
      xiviewPageChange(page){
          this.pageXiview = page;
          this.queryXiviewData()
      },  
      xiviewPageSizeChange(size){
          this.pageSizeXiview = size;
          this.queryXiviewData()
      },
      xiviewTableFold(val){
          this.xiviewTableFoldBool = val
          if(this.xiviewTableFoldBool){
            if(document.querySelector('.xiview-table'))
              document.querySelector('.xiview-table').style.display = 'none'
            if(document.querySelector('.icon-wrapper'))
              document.querySelector('.icon-wrapper').style.display = 'none'
            if(document.querySelector('.page-container'))
              document.querySelector('.page-container').style.display = 'none'
          }
          else{
            if(document.querySelector('.xiview-table'))
              document.querySelector('.xiview-table').style.display = 'block'
            if(document.querySelector('.icon-wrapper'))
              document.querySelector('.icon-wrapper').style.display = 'inline-block'
            if(document.querySelector('.page-container'))
              document.querySelector('.page-container').style.display = 'block'
          } 
      },
      queryBarHorizontal(){
          this.$http
            .get(this.barHorizontalApi)
            .then(function(res){
              this.barHorizontalShow=false;
              this.$bus.$emit('show-bar-horizontal-xiview', res.body);
            },function(err){

            });
      },
      queryPieXiview(){
          this.$http
            .get(this.pieXiviewApi)
            .then(function(res){
              this.pieXiviewShow=false;
              this.$bus.$emit('show-pie-peptide-xiview', res.body);
            },function(err){

            });
      },
      queryOverlapBar(){
          this.$http
            .get(this.areaPieXiviewApi)
            .then(function(res){
              this.areaPieXiviewShow=false;
              this.$bus.$emit('show-overlap-bar-xiview', res.body);
            },function(err){

            });
      },
      gotoExternal(){
        this.$Message.success({content:'Coming Soon.', duration:1});
      }, 
      gotoHelp(){
        let routeData = this.$router.resolve({name:'markdownpage',params:{subpage:'crosslinking'}});
        // http://localhost:8081/markdownpage/crosslinking
        console.log('routeData',routeData)
        window.open(routeData.href, '_blank');
      }
    },
    computed:{
      //this variable is not used anymore and only for updating this.normalQuery;
      query:function(){
          let normalQuery = {}
          normalQuery.query = this.xiviewDataSearchKeyword;
          normalQuery.page = this.pageXiview;
          normalQuery.page_size = this.pageSizeXiview;
          return normalQuery;  
        }
    },
    mounted: function(){
        this.queryXiviewData()
        this.queryBarHorizontal()
        this.queryPieXiview()
        this.queryOverlapBar()


        // this.queryAreaPieXiview()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dataset-container{
    width: 100%;
  }
  .logo_container
  {
    width:  100%; /*or 70%, or what you want*/
    height: 100%; /*or 70%, or what you want*/
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

  }
  .content{
    width: 90%;
    margin:0 auto;
    padding: 40px 0;
    min-height: calc(100vh - 200px);
  }
  .row{
      margin:0 auto;
      max-width: 100% !important;
  }
  .tab-container{
    /*min-height: calc(100vh - 685px);*/
  }
  .card{
    margin-top: 30px;
  }
  .project-title{
      color:rgb(23, 35, 61);
  }
  .card p{
    text-align: justify;
    font-size: 12px;
  }
  .card a{
      color: #495060;
      border-bottom-style: dotted;
  }
  .card a:hover{
    color: #5bc0be;
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
  .tag-wrapper{
    display: flex;
    align-items: center;
  }
  .dataset-wrapper{
      margin-left: 5px;
    }
  .dataset-wrapper:first-child{
    margin-left: 0 !important;
  }
  .referenceModal a{
    color: #495060;
    border-bottom-style: dotted;
  }
  .referenceModal a:hover{
    color: #5bc0be;
  }
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
  .visualization-wrapper{
      /*padding: 0px 20px 0 20px;*/
  }
  .table-header{
    display: flex !important;
    justify-content: space-between;
    height: 24px !important;
  }
  .table-header .right{
    display: flex;
    align-items: center;
  }
  .table-header .right i{
    /*margin-left: 10px;*/
  }
  .table-header a{
      border-bottom-style:none !important;
  }
  .table-header a:hover{
      border-bottom-style:none !important;
  }
  #disableButton{
    opacity:0.35;
    color: #fff;
  }
  .nobreak-cell .ivu-table-cell{
    word-break:break-word !important;
    white-space: normal !important;
  }
</style>
 


