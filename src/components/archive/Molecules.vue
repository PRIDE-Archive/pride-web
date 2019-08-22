<template>
  <div class="moleculo-container">
    <div class="panel nav"><NavBar page="archive"/></div>
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="12">
              <div class="visualization-wrapper">
                  <Card class="card protein">
                      <p slot="title" class="molecules-table-header"> 
                          <span><i class="fas fa-download icon-tag"></i>Identified Proteins</span>
                          <!-- <Input placeholder="Enter something..." style="width: 200px" size="small"></Input> -->
                      </p>
                      
                     <div class="download-list-wrapper">
                       <!--<div class="summary-content-header">List</div>-->
                       <div class="download-list">
                         <Table class="peptide-table" :loading="proteinTableLoading" border :columns="proteinTableColumn" :data="proteinTableResults" size="small"></Table>
                       </div>
                     </div>
                     <div class="page-container">
                        <Page :total="proteinTotal" :page-size="proteinPageSize" size="small" show-sizer show-total @on-change="proteinPageChange" @on-page-size-change="proteinPageSizeChange"></Page>
                     </div>
                  </Card>    
              </div>
          </Col>
          <Col span="12">
              <div class="visualization-wrapper">
                  <Card class="card protein">
                      <p slot="title"> <i class="fas fa-download icon-tag"></i>Sequence</p>
                     <!--
                     <div class="filter-wrapper">
                         <div class="summary-content-header">Filter</div>
                         <Select v-model="model1" size="small" style="width:100px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                         </Select>
                     </div>
                      -->
                     <div class="sequence-container">
                      <span class="no-data-wrapper">No data</span>
                       <!--<div class="summary-content-header">List</div>-->
                      
                     </div>
            
                  </Card>
              </div>
          </Col>
      </Row>
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="12">
              <div class="visualization-wrapper">
                  <Card class="card protein">
                      <p slot="title"> <i class="fas fa-download icon-tag"></i>Peptides</p>
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
                         <!-- <Table class="peptide-table" :loading="proteinTableLoading" border :columns="proteinTableColumn" :data="proteinTableResults" size="small"></Table> -->
                       </div>
                     </div>
                     <div class="page-container">
                        <!-- <Page :total="total" :page-size="pageSize" size="small" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page> -->
                     </div>
                  </Card>    
              </div>
          </Col>
          <Col span="12">
              <div class="visualization-wrapper">
                  <Card class="card protein">
                      <p slot="title"> <i class="fas fa-download icon-tag"></i>PSM</p>
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
                         <!-- <Table class="peptide-table" :loading="proteinTableLoading" border :columns="proteinTableColumn" :data="proteinTableResults" size="small"></Table> -->
                       </div>
                     </div>
                     <div class="page-container">
                        <!-- <Page :total="total" :page-size="pageSize" size="small" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page> -->
                     </div>
                  </Card>
              </div>
          </Col>
      </Row>
  </div>
</template>

<script>
  import NavBar from '@/components/ebi/Nav'
  import store from "@/store/store.js"
  export default {
    name: 'archive',
    data(){
      return {
          tableCol1:[
              {
                  width: 40,
                  align: 'center',
                  render: (h, params) => {
                      return h('Checkbox', {
                          props: {
                              value: params.row.select
                          },
                          on: {
                              'on-change': (val) => {
                                  this.tableData1.map(x => {
                                      x.select= false;
                                      return x;
                                  });
                                  console.log(222)
                                  this.tableData1[params.index].select= val;
                                  if(val)
                                    this.selectedItem1.push(params);
                                  else
                                    this.selectedItem1=[];
                              }
                          }
                      });
                  }
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
              },
              {
                  title: 'Accession',
                  width:1,
                  key: 'accession',
                  className:'msrun-modal-table-accession'
              },
          ],
          tableData1:[],
          data1:[],
          selectedItem1:[],
          tableCol2:[
              {
                  width: 40,
                  align: 'center',
                  render: (h, params) => {
                      return h('Checkbox', {
                          props: {
                              value: params.row.select
                          },
                          on: {
                              'on-change': (val) => {
                                  this.tableData2.map(x => {
                                      x.select= false;
                                      return x;
                                  });
                                  console.log(222)
                                  this.tableData2[params.index].select= val;
                                  if(val)
                                    this.selectedItem2.push(params);
                                  else
                                    this.selectedItem2=[];
                              }
                          }
                      });
                  }
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
              },
              {
                  title: 'Accession',
                  width:1,
                  key: 'accession',
                  className:'msrun-modal-table-accession'
              },
          ],

          tableData2:[],
          data2:[],
          selectedItem2:[],
          proteinTableLoading: false,
          proteinTableColumn: [
              {
                  title: '#',
                  width: 30,
                  align: 'center',
                  render: (h, params) => {
                      return h('Checkbox', {
                          props: {
                              value: params.row.select
                          },
                          on: {
                              'on-change': (val) => {
                                  this.proteinTableResults.map(x => {
                                      x.select= false;
                                      return x;
                                  });
                                  console.log(222)
                                  this.proteinTableResults[params.index].select= val;
                                  if(val)
                                    this.selectedProteinTableItem =params;
                                  else
                                    this.selectedProteinTableItem={};
                              }
                          }
                      });
                  }
              },
              {
                  title: 'Accession',
                  key: 'reportedaccession',
                  sortable: true,
                  minWidth: 200,
                  // ellipsis:true
              },
              {
                  title: '#Peptides',
                  key: 'numberPeptides',
                  sortable: true,
                  minWidth: 90,
                  //className:'peptideID'
              },
              {
                  title: '#PSMs',
                  key: 'numberPSMs',
                  sortable: true,
                  minWidth: 75,
                  //className:'peptideID'
              },
              {
                  title: 'Coverage',
                  key: 'sequenceCoverage',
                  sortable: true,
                  minWidth: 85,
                  //className:'peptideID'
              },
              {
                  title: 'Assay',
                  key: 'assayAccession',
                  sortable: true,
                  minWidth: 60,
                  // ellipsis:true
              },
              {
                  title: 'Confidence Score',
                  key: 'bestsearchenginescore',
                  sortable: true,
                  minWidth: 130,
                  // ellipsis:true
              },
              {
                  title: 'Valid',
                  key: 'valid',
                  sortable: true,
                  minWidth: 60,
                  render: (h, params) => {
                      var className;
                      var iconColor;
                      if(params.row.valid){
                        className='fa fa-check';
                        iconColor='#19be6b'
                      }
                      else{
                        className ='fa fa-times';
                        iconColor='#ed3f14'
                      }
                      return h('div', [
                          h('i', {
                              attrs: { class: className},
                              style: {
                                  color:iconColor,
                                  //marginRight: '5px',
                                  marginLeft: '20px'
                              },
                          }),
                          // h('span', {
                          //     on: {
                          //         click: () => {

                          //         }
                          //     }
                          // }, params.row.type),
                      ]);
                  }
              }
          ],
          selectedProteinTableItem:{},
          proteinTableResults:[],
          proteinPage:0,
          proteinPageSize:20,
          proteinTotal:2000,
          msRunApi: this.$store.state.baseApiURL + '/msruns/byProject', 
          proteinEvidencesApi: this.$store.state.baseApiURL+ '/proteinevidences'
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
      getMSRunTableData1(){
          this.tableData1=[];
          let query={
              // accession: this.$route.params.id,
                  accession:'PXD014344'
          }
          this.$http
              .get(this.msRunApi,{params: query})
              .then(function(res){
                  for(let i of res.body){
                      let item = {
                        accession:i.accession,
                        name:i.fileName,
                        size:Math.round(i.fileSizeBytes/1024/1024),
                        select:false,
                      }
                      this.tableData1.push(item);
                  }
                  console.log(this.tableData1);
              },function(err){

              });
      },
      getMSRunTableData2(){
          this.tableData2=[];
          let query={
              // accession: this.$route.params.id,
                  accession:'PXD014344'
          }
          this.$http
              .get(this.msRunApi,{params: query})
              .then(function(res){
                  for(let i of res.body){
                      let item = {
                        accession:i.accession,
                        name:i.fileName,
                        size:Math.round(i.fileSizeBytes/1024/1024),
                        select:false,
                      }
                      this.tableData2.push(item);
                  }
                  this.data2 = this.tableData2
                  console.log(this.tableData2);
              },function(err){

              });
      },
      getProteinEvidences(q){
          this.proteinTableLoading = true;
          let query = q || this.proteinQuery;
          this.$http
              .get(this.proteinEvidencesApi,{params: query})
              .then(function(res){
                this.proteinTableResults=[];
                this.proteinTableLoading = false;
                if(res.body && res.body._embedded){
                  let proteinEvidences = res.body._embedded.proteinevidences;
                  for(let i=0; i < proteinEvidences.length; i++){
                      var item = {
                        reportedaccession: proteinEvidences[i].reportedAccession,
                        assayAccession: proteinEvidences[i].assayAccession,
                        numberPeptides: proteinEvidences[i].numberPeptides,
                        sequenceCoverage: proteinEvidences[i].sequenceCoverage == 'NaN' ? 'No Value' : proteinEvidences[i].sequenceCoverage,
                        numberPSMs: proteinEvidences[i].numberPSMs,
                        bestsearchenginescore: proteinEvidences[i].bestSearchEngineScore.value || '',
                        valid: proteinEvidences[i].valid,
                        select:false,
                      }
                      this.proteinTableResults.push(item);
                  }
                }
              },function(err){
                  this.proteinTableLoading = false;
                  this.$Message.error({content:'Search Error', duration:1});
              });
      },
      proteinPageChange(page){
          this.proteinPage = page-1;
          this.getProteinEvidences();
      },
      proteinPageSizeChange(size){
          this.proteinPageSize = size;
          this.getProteinEvidences();
      },
    },
    watch: {
        selectedItem1:{
          handler(){
            console.log(this.selectedItem1)
            console.log(this.data2)
            for(let i=0; i<this.data2.length; i++){
              if(this.data2[i].accession != this.selectedItem1[0].row.accession){
                this.data2.splice(i,1)
                i--;
              }
            }
            console.log('111',this.selectedItem1[0].row.accession);
          },
          deep:true
        },
    },
    computed:{
      proteinQuery:function(){
          let normalQuery = {}
          normalQuery.projectAccession='PXD012991'
          normalQuery.sortDirection='DESC'
          normalQuery.sortConditions='projectAccession'
          normalQuery.page = this.proteinPage
          normalQuery.pageSize = this.proteinPageSize
          return normalQuery;
      }
    },
    mounted: function(){
        //this.getMSRunTableData1();
        //this.getMSRunTableData2();
        this.getProteinEvidences();
    },
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .moleculo-container{
    width: 100%;
  }
  .content{
    width: 80%;
    margin:0 auto;
    padding: 40px 0;
    min-height: calc(100vh - 200px);
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
  .page-container{
    text-align: center;
    margin-top: 20px;
  }
  .visualization-wrapper{
      padding: 0px 20px 0 20px;
  }
  .sequence-container{
    height: 495px;
    border: 1px solid #5bc0be;
  }
  .no-data-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  .molecules-table-header{
    display: flex;
    justify-content: space-between;
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
  .msrun-modal-table{
    height:30%;
  }
  .msrun-modal-table .ivu-table-cell{
      padding-left: 0; 
      padding-right: 0; 
  }
  .msrun-modal-table .ivu-table-cell .ivu-checkbox-wrapper{
    margin-right:0;
  }
  .msrun-modal-table .ivu-table-header table{
    margin-bottom:0 !important;
  }
  .msrun-modal-table .ivu-table-body table{
    margin-bottom:0 !important;
  }
  .msrun-modal-table .msrun-modal-table-accession{
    display: none;
  }
  .card.protein .download-list-wrapper{
     overflow: auto;
     height: 450px;
  }
  .peptide-table .ivu-table-header thead tr th:first-child .ivu-table-cell{
    visibility: hidden;
  }
</style>

