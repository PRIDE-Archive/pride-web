<template>
  <div class="moleculo-container">
    <div class="panel nav"><NavBar page="archive"/></div>
    <div class="content">
      <Card class="card">
       <p slot="title"> <i class="fas fa-download icon-tag"></i>Protein Table</p>
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
           <Table class="peptide-table" :loading="loading" border :columns="proteinTableColumn" :data="proteinTableResults" size="small" @on-row-click="rowClick"></Table>
         </div>
         <div class="page-container">
            <Page :total="total" :page-size="pageSize" size="small" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
          </div>
       </div>
      </Card>    
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
          proteinTableColumn: [

              {
                  title: 'Project ',
                  key: 'projectAccession', 
                  // sortable: true,
                  //minWidth: 150,
                  //ellipsis:true
              },
              {
                  title: 'Assay',
                  key: 'assayAccession',
                  // sortable: true,
                  // minWidth: 150,
                  // ellipsis:true
              },
              {
                  title: 'GroupMembers',
                  key: 'proteingroupmembers',
                  // sortable: true,
                  // minWidth: 150,
                  // ellipsis:true
              },
              {
                  title: 'BestSearchEngineScore',
                  key: 'bestsearchenginescore',
                  // sortable: true,
                  // minWidth: 150,
                  // ellipsis:true
              },
              {
                  title: 'QualityMethod',
                  key: 'qualitymethod',
                  // sortable: true,
                  // minWidth: 150,
                  // ellipsis:true
              },
              {
                  title: 'PTMs',
                  key: 'ptms',
                  // sortable: true,
                  // minWidth: 150,
                  // ellipsis:true
              },
              {
                  title: 'Decoy',
                  key: 'decoy',
                  // sortable: true,
                  // minWidth: 150,
                  // ellipsis:true
              },
              {
                  title: 'Valid',
                  key: 'valid',
                  // width:1,
                  //maxWidth:0,
                  //className:'peptideID'
              },
              {
                  title: 'AdditionalAttributes',
                  key: 'additionalattributes',
                  // width:1,
                  //maxWidth:0,
                  //className:'peptideID'
              }
          ],
          proteinTableResults:[],
          page:0,
          pageSize:20,
          total:2000,
          msRunApi:'http://wwwdev.ebi.ac.uk/pride/ws/archive/msruns/byProject',
          proteinEvidencesApi:'https://wwwdev.ebi.ac.uk/pride/ws/archive/proteinevidences'
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
      getProteinEvidences(){
          this.tableData2=[];
          let query={
              // accession: this.$route.params.id,
                  projectAccession:'PXD009796',
                  pageSize:100,
                  sortDirection:'DESC',
                  sortConditions:'projectAccession'
          }
          this.$http
              .get(this.proteinEvidencesApi,{params: query})
              .then(function(res){
                console.log(res.body);
                if(res.body && res.body._embedded){
                  let proteinEvidences = res.body._embedded.proteinevidences;
                  for(let i=0; i < proteinEvidences.length; i++){
                      var item = {
                        projectAccession: proteinEvidences[i].projectAccession,
                        assayAccession: proteinEvidences[i].assayAccession,
                        proteingroupmembers: proteinEvidences[i].proteinGroupMembers[0] || '',
                        bestsearchenginescore: proteinEvidences[i].bestSearchEngineScore.name || '',
                        qualitymethod: proteinEvidences[i].qualityMethods[0].name || '',
                        ptms: proteinEvidences[i].ptms[0] || '',
                        decoy: proteinEvidences[i].decoy,
                        valid: proteinEvidences[i].valid,
                        additionalattributes:proteinEvidences[i].additionalAttributes[0].name || '',
                      }
                      this.proteinTableResults.push(item);
                  }
                }
                
                  // for(let i of res.body){
                  //     let item = {
                  //       accession:i.accession,
                  //       name:i.fileName,
                  //       size:Math.round(i.fileSizeBytes/1024/1024),
                  //       select:false,
                  //     }
                  //     this.tableData2.push(item);
                  // }
                  // this.data2 = this.tableData2
                  // console.log(this.tableData2);
              },function(err){

              });
      },
      pageChange(page){
          this.page = page-1;
          //this.$router.push({name: 'peptidesearch', query: this.query});
      },
      pageSizeChange(size){
          this.pageSize = size;
          //this.$router.push({name: 'peptidesearch', query: this.query});
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
    mounted: function(){
        this.getMSRunTableData1();
        this.getMSRunTableData2();
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
</style>

