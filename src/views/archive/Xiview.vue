<template>
  <div class="dataset-container">
      <div class="panel nav"><NavBar page="landingpage"/></div>
      <div class="content">
          <!-- <Row>
            <Col span="20">
                <div class="title-wrapper">
                  <h3 class="project-title">Project {{accession}}</h3>  
                </div>
                <div class="tag-wrapper">
                    <span class="dataset-wrapper" v-for="(datesetItem, index) in projectTags" :key="index">
                        <Tag color="blue" v-if="datesetItem == 'Biological'">
                          <span style="cursor: pointer;" @click="searchByLabel('project_tags_facet=='+datesetItem )">{{datesetItem}}</span>
                        </Tag>
                        <Tag color="cyan" v-else-if="datesetItem == 'Biomedical'">
                          <span style="cursor: pointer;" @click="searchByLabel('project_tags_facet=='+datesetItem )">{{datesetItem}}</span>
                        </Tag>
                        <Tag color="geekblue" v-else-if="datesetItem == 'Highlighted'">
                          <span style="cursor: pointer;" @click="searchByLabel('project_tags_facet=='+datesetItem )">{{datesetItem}}</span>
                        </Tag>
                        <Tag color="purple" v-else-if="datesetItem == 'Technical'">
                          <span style="cursor: pointer;" @click="searchByLabel('project_tags_facet=='+datesetItem )">{{datesetItem}}</span>
                        </Tag>
                        <Tag color="volcano" v-else>
                          <span style="cursor: pointer;" @click="searchByLabel('project_tags_facet=='+datesetItem )">{{datesetItem}}</span>
                        </Tag>
                    </span>
                </div>
            </Col>
          </Row> -->
          <Row :gutter="48">
              <Col span="24">
                <div class="visualization-wrapper">
                  <Card class="card usi">
                      <p slot="title" class="table-header"> 
                          <span>
                            <!-- <Icon type="md-reorder" size="14" style="margin-right: 5px"/> -->
                            List of datasets 
                          </span>
                          <span v-if="true" class="right">
                             <!--  <Input v-if ="!xiviewTableFoldBool" type="text" v-model="xiviewDataSearchKeyword" placeholder="" size="small" suffix="ios-search" style="margin-right: 10px; width:auto" @on-change="searchTest">
                              </Input> -->
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
                  <Card class="card">
                        <p slot="title" class="table-header" style="display:flex;justify-content: space-between;">
                            <span>Project Details</span>
                            <span v-if="true" class="right">
                                <a v-if="xiviewDataTableFoldBool" href="javascript:void(0)"><Icon type="md-arrow-dropright" size="20" @click="xiviewDataTableFold(false)"></Icon></a>
                                <a v-else href="javascript:void(0)"><Icon type="md-arrow-dropdown" size="20" @click="xiviewDataTableFold(true)"></Icon></a>
                            </span>
                        </p>
                        <template v-if = "!proteinTableLoading">
                            <div class="card-item-wrapper">
                                <div class="summary-content-header">Project ID</div>
                                <p>{{accession}}</p>
                            </div>
                            <div class="card-item-wrapper">
                                <div class="summary-content-header" style="margin-top: 30px">Title</div>
                                <p>{{title}}</p>
                            </div>
                            <div class="card-item-wrapper" style="margin-top: 30px">
                                <div class="summary-content-header">Description</div>
                                <read-more class="readMore" more-str="Read more" :text="description" link="#" less-str="Read less" :max-chars="400"></read-more>
                            </div>
                            <div class="card-item-wrapper">
                                <div class="summary-content-header" style="margin-top: 30px">Organism</div>
                                <p>{{organism}}</p>
                            </div>
                            <div class="card-item-wrapper" style="margin-top: 30px">
                                <div class="summary-content-header">Protein Details</div>
                            </div>
                            <div class="card-item-wrapper">
                              <Table row-key="id" class="xiview-table" border :columns="xiviewDetailTableCol" :data="xiviewDetailTableData" size="small"></Table>
                            </div>
                            <div style="color:#bdbdbd; text-align: center;">
                                  <span v-if ="xiviewDataTableFoldBool">{{xiviewDataTableHint}}</span>
                            </div>
                            <div class="page-container" v-if = "!xiviewDataTableFoldBool">
                                <Page :total="totalProtein" :page-size="pageSizeProtein" :current="pageProtein" size="small" show-sizer show-total @on-change="proteinPageChange" @on-page-size-change="proteinPageSizeChange"></Page>
                            </div>
                        </template>
                        <template v-else>  
                          <!-- <div style="text-align: center;"> -->
                            <Spin size="small" style="display: flex; justify-content: center;" ></Spin>
                          <!-- </div> -->
                        </template>
                        
                  </Card>
                </div>
              </Col>
          </Row>
      </div>
<!--   <Modal
      class-name="referenceModal"
      v-model="referenceModalShow"
      title="Reference List"
      :footer-hide="true">
      <div v-for="item in reanalysisReferences" style="margin: 10px 0">
          <a @click="gotoReference">{{item.referenceLine}}</a>
      </div>
  </Modal> -->
  </div>
</template>

<script>
  import NavBar from '@/components/Nav'
  import store from "@/store.js"
  import svgLogo from "@/components/svg/archive"
  export default {
    name: 'archive',  
    data(){
      return {
          queryXiviewDataApi: 'https://www.ebi.ac.uk/pride/archive/xiview/ws/projects',
          queryXiviewDataDetailApi: 'https://www.ebi.ac.uk/pride/archive/xiview/ws/projects/',
          queryArchiveProjectFilesApi: this.$store.state.baseApiURL + '/projects',
          accession: '',
          title: '',
          description:'',
          organism:'',
          xiviewTableLoading:false,
          proteinTableLoading:false,
          pageSizeXiview:40,
          pageXiview:1,
          totalXiviewData:0,
          pageSizeProtein: 20,
          pageProtein:1,
          totalProtein: 0,
          xiviewTableFoldBool:false,
          xiviewDataTableFoldBool:false,
          xiviewTableHint:'Xiview Data List',
          xiviewDataTableHint:'Xiview Data Details',
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
                                      this.queryXiviewDataDetails(params.row.accession)
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
                  sortable: false,
                  align:'left'
              },
              {
                  title: 'Organism',
                  key: 'organism',
                  sortable: true,
                  align:'left'
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
                  title: 'XiView',
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
                          h('span','XiView')
                      ])
                  },
                  render: (h, params) => {
                      return h('div', [
                          /*
                          h('Button', {

                              on: {
                                  click: () => {
                                      this.gotoEuroPMC(params);
                                  }
                              }
                          }, 'Blast'),
                          */
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
                          }, 'XiView'),
                      ]);
                  },
              },
              // {
              //     title: '',
              //     key: 'accession',
              //     width:1,
              //     className:'project-files-accession'
              // },
          ],
          xiviewTableData: [],
          xiviewDetailTableCol:[
              {
                  type: 'index',
                  width: 60,
                  align: 'center'
              },
              {
                  title: 'Accession',
                  key: 'accession',
                  width: 150,
                  sortable: false,
                  align:'center'
              },
              {
                  title: 'Peptides',
                  key: 'peptides',
                  sortable: false,
                  align:'center'
              },
              {
                  title: 'Crosslink',
                  key: 'crosslink',
                  sortable: false,
                  align:'center'
              },
              {
                  title: 'PDB',
                  key: 'pdb',
                  sortable: false,
                  align:'center',
                  render: (h, params) => {
                      return h('div', [
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
                                      // console.log(value)
                                      console.log(params.row.link);
                                      //window.location.href = params.row.url.ftp;
                                      window.open(params.row.pdb)
                                     
                                      //this.gotoEuroPMC(params);
                                  }
                              }
                          }, 'PDB'),
                      ]);
                  },
              },
          ],
          xiviewDetailTableData:[],
          proteinTableData:[],
          xiviewDataSearchKeyword:'',
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      this.queryXiviewData();
      next();
    },
    components: {
      NavBar,
      svgLogo
    },
    methods:{
      queryXiviewData(){
           this.queryXiviewDataLoading = true;
           this.$http
            .get(this.queryXiviewDataApi)
            .then(function(res){
              console.log('queryXiviewData',res.body)
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
                  this.xiviewTableData.push(item);
              }
              //init the first item selected
              this.xiviewDataTableFold(false)
              this.queryXiviewDataDetails(res.body[0].project_id)
            },function(err){
                this.queryXiviewDataLoading = false;
                // if(err.bodyText.match('not in the database')){
                //     this.$Modal.warning({
                //         title: 'Not Public Project',
                //         content: '<p>The requested project is not public</p>',
                //         onOk: () => {
                //             this.$router.push({name:'archive'});
                //         },
                //     });
                // }
                // else
                //   this.$Message.error({content:'No results', duration:3});
            });
      },
      // queryArchiveProjectFiles(q){
      //      let query = q || this.queryDownload
      //      this.fileListLoading = true;
      //      this.$http
      //       .get(this.queryArchiveProjectFilesApi + '/' +this.$route.params.id+ '/files',{params: query})
      //       .then(function(res){
      //           this.fileListLoading = false;
      //           this.totalDownLoad = res.body.page.totalElements;
      //           this.fileList=[];
      //           if(res.body._embedded && res.body._embedded.files){
      //             let filesArray = res.body._embedded.files;
      //             //console.log('filesArray',filesArray)
      //             this.fileList = this.createFileList(filesArray)
      //           }
      //           else{
      //               this.$Message.error({content:'No results', duration:1});
      //           }
      //       },function(err){
      //           this.fileListLoading = false;
      //       });
      // },
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
      queryXiviewDataDetails(id){
          this.xiviewDataTableFold(true)
          this.proteinTableLoading = true
          this.$http
            .get(this.queryXiviewDataDetailApi + id)
            .then(function(res){
              this.xiviewDataTableFold(false)
              this.proteinTableLoading = false
              let body = res.body[0]
              console.log('queryXiviewDataDetails',body)
              this.accession = body.project_id
              this.title = body.title
              this.description = body.description
              this.organism = body.organism ? body.organism : 'Null'
              this.totalProtein = body.project_sub_details.length
              console.log('body.project_sub_details.length',body.project_sub_details.length)
              for(let i=0; i<body.project_sub_details.length; i++){
                  let item = {
                    accession: body.project_sub_details[i].protein_accession,               
                    peptides: body.project_sub_details[i].number_of_peptides,
                    crosslink: body.project_sub_details[i].number_of_cross_links,
                    pdb: body.project_sub_details[i].link_to_pdbe ? body.project_sub_details[i].link_to_pdbe : ' https://www.ebi.ac.uk/pdbe/pdbe-kb/proteins/'+ body.project_sub_details[i].protein_accession
                  }
                  this.proteinTableData.push(item)//save for original data
                  this.xiviewDetailTableData.push(item);//only used for showup
              }
              //for first pagination when table is loaded
              if(this.totalProtein > this.pageSizeProtein)
                this.xiviewDetailTableData = this.proteinTableData.slice((this.pageProtein-1)*this.pageSizeProtein, (this.pageProtein-1)*this.pageSizeProtein + this.pageSizeProtein)

            },function(err){
               this.this.proteinTableLoading = false
               this.xiviewDataTableFold(true)
            });
      },
      initXiviewDataTable(){
        this.accession = '' 
        this.title = ''
        this.description = ''
        this.xiviewDetailTableData = []
        this.totalProtein = 0
        this.pageSizeProtein = 40
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
      proteinPageChange(page){
          console.log('proteinPageChange')
          this.proteinTableLoading = true
          this.pageProtein = page;
          this.xiviewDetailTableData = this.proteinTableData.slice((this.pageProtein-1)*this.pageSizeProtein, (this.pageProtein-1)*this.pageSizeProtein + this.pageSizeProtein)
          setTimeout(()=>{
            this.proteinTableLoading = false
          },500)
      },  
      proteinPageSizeChange(size){
          console.log('proteinPageSizeChange')
          this.proteinTableLoading = true
          this.pageSizeProtein = size;
          this.xiviewDetailTableData = this.proteinTableData.slice((this.pageProtein-1)*this.pageSizeProtein, (this.pageProtein-1)*this.pageSizeProtein + this.pageSizeProtein)
          setTimeout(()=>{
            this.proteinTableLoading = false
          },500)
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
      searchTest(){

      },
    },
    mounted: function(){
        if(this.xiviewDetailTableData.length == 0)
          this.xiviewDataTableFold(true)
        this.queryXiviewData();

    }
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
  .visualization-wrapper{
      padding: 0px 20px 0 20px;
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

</style>
 


