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
                            List of datasets 
                          </span>
                          <span v-if="true" class="right">
                              <Input v-if ="!xiviewTableFoldBool" type="text" v-model="xiviewDataSearchKeyword" placeholder="" size="small" suffix="ios-search" style="margin-right: 10px; width:auto" @on-change="searchTest">
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
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 8}">
                <Card class="card">
                    <p slot="title" class="table-header"> 
                        <span>
                          <!-- <Icon type="md-reorder" size="14" style="margin-right: 5px"/> -->
                          Peptides per Protein
                        </span>
                        <!-- <span v-if="true" class="right">
                            <a v-if="xiviewTableFoldBool" href="javascript:void(0)"><Icon type="md-arrow-dropright" size="20" @click="xiviewTableFold(false)"></Icon></a>
                            <a v-else href="javascript:void(0)"><Icon type="md-arrow-dropdown" size="20" @click="xiviewTableFold(true)"></Icon></a>
                        </span> -->
                    </p>
                    <!-- <Spin fix v-if="barHorizontalShow"></Spin> -->
                    <BarHorizontalPride></BarHorizontalPride>
                </Card>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 8}">
                <Card class="card">
                    <p slot="title" class="table-header"> 
                        <span>
                          <!-- <Icon type="md-reorder" size="14" style="margin-right: 5px"/> -->
                          Project per Species
                        </span>
                        <!-- <span v-if="true" class="right">
                            <a v-if="xiviewTableFoldBool" href="javascript:void(0)"><Icon type="md-arrow-dropright" size="20" @click="xiviewTableFold(false)"></Icon></a>
                            <a v-else href="javascript:void(0)"><Icon type="md-arrow-dropdown" size="20" @click="xiviewTableFold(true)"></Icon></a>
                        </span> -->
                    </p>
                    <!-- <Spin fix v-if="barHorizontalShow"></Spin> -->
                    <PieXiview></PieXiview>
                </Card>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 8}">
                <Card class="card">
                    <p slot="title" class="table-header"> 
                        <span>
                          <!-- <Icon type="md-reorder" size="14" style="margin-right: 5px"/> -->
                          Overall Statistics
                        </span>
                        <!-- <span v-if="true" class="right">
                            <a v-if="xiviewTableFoldBool" href="javascript:void(0)"><Icon type="md-arrow-dropright" size="20" @click="xiviewTableFold(false)"></Icon></a>
                            <a v-else href="javascript:void(0)"><Icon type="md-arrow-dropdown" size="20" @click="xiviewTableFold(true)"></Icon></a>
                        </span> -->
                    </p>
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
              <span style="color:gray; font-size: 20px">The PRIDE Crosslinking Database, visualisation components and integration with PDB-KB has been developed and maintained by Juri Rappsilber's Lab (Technische Universität Berlin), PRIDE and PDB teams (EMBL-EBI)</span>
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
    name: 'archive',  
    data(){
      return {
          queryXiviewDataApi: 'https://www.ebi.ac.uk/pride/archive/xiview/ws/projects',
          queryXiviewDataDetailApi: 'https://www.ebi.ac.uk/pride/archive/xiview/ws/projects/',
          barHorizontalApi: 'https://www.ebi.ac.uk/pride/archive/xiview/ws/peptide-per-protein',
          pieXiviewApi:'https://www.ebi.ac.uk/pride/archive/xiview/ws/projects-per-species',
          areaPieXiviewApi:'https://www.ebi.ac.uk/pride/archive/xiview/ws/statistics-count',
          bannerContent:"The PRIDE Crosslinking Database, visualisation components and integration with PDB-KB has been developed and maintained by Juri Rappsilber's Lab, PRIDE and PDB teams",
          // queryArchiveProjectFilesApi: this.$store.state.baseApiURL + '/projects',
          logoURL:'/logo/xiview_logo_horizon_1.png',
          logoWidth:410,
          accession: '',
          title: '',
          description:'',
          organism:'',
          xiviewTableLoading:false,
          
          pageSizeXiview:40,
          pageXiview:1,
          totalXiviewData:0,
          xiviewTableFoldBool:false,
          
          xiviewTableHint:'xiVIEW Data List',
         
          queryXiviewDataLoading:false,
          xiviewTableCol: [
              {
                  title:'#',
                  width: 50,
                  align: 'center',
                  render: (h, params) => {
                      return h('div', [
                          h('Checkbox', {
                              props: {
                                  value:params.row.select
                              },
                              on: {
                                 'on-change':(val)=>{
                                    this.xiviewTableData.map(x => {
                                      x.select= false;
                                      return x;
                                    });
                                    this.xiviewTableData[params.index].select= val;
                                    if(val){
                                      this.xiviewDataTableFold(false)
                                    }
                                    else{
                                      this.xiviewDataTableFold(true)
                                      this.initXiviewDataTable()
                                    }
                                 }
                              }
                          }, ''),
                      ]);
                  },

              },
              {
                  title: 'Accession',
                  key: 'accession',
                  width: 100,
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'Title',
                  key: 'title',
                  width: 500,
                  sortable: false,
                  align:'left',
                  className: 'nobreak-cell',
              },
              {
                  title: 'Organism',
                  key: 'organism',
                  sortable: true,
                  align:'left',
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
           this.$http
            .get(this.queryXiviewDataApi)
            .then(function(res){
              // console.log('queryXiviewData',res.body)
              this.queryXiviewDataLoading = false;
              this.totalXiviewData = res.body.length
              for(let i=0; i<res.body.length; i++){
                  let item = {
                    accession: res.body[i].project_id,
                    title: res.body[i].title,
                    organism: res.body[i].organism,
                    proteins: res.body[i].number_of_proteins,
                    peptides: res.body[i].number_of_peptides,
                    spectra: res.body[i].number_of_spectra,
                    link: res.body[i].xiview_url ? res.body[i].xiview_url : 'https://www.ebi.ac.uk/pride/archive/xiview/network.html?project=' + res.body[i].project_id,
                    select: i == 0? true : false //init the first item selected
                  }
                  // this.orignalXiviewTableData.push(item);//save for original data
                  this.xiviewTableData.push(item);//only used for showup
              }
              //init the first item selected
              this.xiviewDataTableFold(false)
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
      
      initXiviewDataTable(){
        this.accession = '' 
        this.title = ''
        this.description = ''
        this.proteinTableData = []
        this.totalProtein = 0
        this.pageSizeProtein = 20
        this.pageProtein = 1
        this.totalProtein = 0
      },
      xiviewPageChange(page){
          console.log('To do')
          // this.xiviewTableLoading = true
          // this.pageXiview = page;
          // this.xiviewTableData = this.sampleData.slice((this.pageXiview-1)*this.pageSizeXiview, (this.pageXiview-1)*this.pageSizeXiview + this.pageSizeXiview)
          // setTimeout(()=>{
          //   this.xiviewTableLoading = false
          // },500)
      },  
      xiviewPageSizeChange(size){
          console.log('To do')
          // this.xiviewTableLoading = true
          // this.pageSizeXiview = size;
          // this.xiviewTableData = this.sampleData.slice((this.pageXiview-1)*this.pageSizeXiview, (this.pageXiview-1)*this.pageSizeXiview + this.pageSizeXiview)
          // setTimeout(()=>{
          //   this.xiviewTableLoading = false
          // },500)
      },
      xiviewTableFold(val){
          this.xiviewTableFoldBool = val
          if(this.xiviewTableFoldBool){
            if(document.querySelector('.xiview-table'))
              document.querySelector('.xiview-table').style.display = 'none'
            if(document.querySelector('.page-container'))
              document.querySelector('.page-container').style.display = 'none'
          }
          else{
            if(document.querySelector('.xiview-table'))
              document.querySelector('.xiview-table').style.display = 'block'
            if(document.querySelector('.page-container'))
              document.querySelector('.page-container').style.display = 'block'
          } 
      },
      xiviewDataTableFold(val){
          this.xiviewDataTableFoldBool = val
          let divs = document.querySelectorAll('.card-item-wrapper')
          if(this.xiviewDataTableFoldBool){
              divs.forEach(div=>{
                 div.style.display = 'none'
              })
          }
          else{
              divs.forEach(div=>{
                 div.style.display = 'block'
              })
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
    },
    mounted: function(){
        // this.xiviewDataTableFold(true)
        this.queryXiviewData()
        this.queryBarHorizontal()
        this.queryPieXiview()
        // this.queryAreaPieXiview()
        this.queryOverlapBar()

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
  .card-item-wrapper{
    margin-bottom: 10px;
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
    margin-left: 10px;
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
 


