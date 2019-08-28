<template>
  <div class="moleculo-container">
    <div class="panel nav"><NavBar page="archive"/></div>
    <div class="content">
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="12">
              <div class="visualization-wrapper">
                  <Card class="card protein">
                      <p slot="title" class="molecules-table-header"> 
                          <span><i class="fas fa-download icon-tag"></i>Identified Proteins</span>
                          <span class="right">
                              <Input v-model="proteinAccessionInputModel" placeholder="Enter something..." style="width: 200px" size="small"></Input>
                              <Icon type="ios-search" size="20" @click="searchProtein"></Icon>
                              <Icon type="ios-refresh-empty" size="24" @click="refreshProteinTable"></Icon>
                          </span>
                      </p>
                      
                     <div class="download-list-wrapper">
                       <!--<div class="summary-content-header">List</div>-->
                       <div class="download-list">
                         <Table class="protein-table" :loading="proteinTableLoading" border :columns="proteinTableColumn" :data="proteinTableResults" size="small"></Table>
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
                        <span v-if="peptideTableLoading==false && peptideTableResults.length<1" class="no-data-wrapper">No data</span>
                        <Table v-else class="peptide-table" :loading="peptideTableLoading" border :columns="peptideTableColumn" :data="peptideTableResults" size="small"></Table>
                       
                      
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
                       
                         <!-- <Table class="peptide-table" :loading="proteinTableLoading" border :columns="proteinTableColumn" :data="proteinTableResults" size="small"></Table> -->
                      
                     </div>
                     <div class="page-container">
                        <!-- <Page :total="total" :page-size="pageSize" size="small" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page> -->
                     </div>
                  </Card>
              </div>
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
          proteinAccessionInputModel:'',
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
                                  this.proteinTableResults[params.index].select= val;
                                  //console.log(params.row);
                                  if(val){
                                    this.peptideProteinAccession = params.row.reportedaccession
                                    this.peptideAssayAccession = params.row.assayAccession
                                    this.getPeptidesEvidences();
                                    if (history.pushState) {
                                        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?accession=' + this.$route.params.id + '%3A' + this.peptideAssayAccession + '%3A'+ this.peptideProteinAccession;
                                        window.history.pushState({path:newurl},'',newurl);
                                    }
                                  }
                                  else{
                                    if (history.pushState) {
                                        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname
                                        window.history.pushState({path:newurl},'',newurl);
                                    }
                                    this.peptideTableResults=[];
                                  }
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
          proteinTableResults:[],
          peptideTableLoading:false,
          peptideTableColumn: [
              {
                  title: 'Protein Accession',
                  key: 'proteinAccession',
                  sortable: true,
                  minWidth: 140,
                  // ellipsis:true
              },
              {
                  title: 'Peptide Sequence',
                  key: 'peptideSequence',
                  sortable: true,
                  minWidth: 140,
                  render: (h, params) => {
                      // var className;
                      // var iconColor;
                      //console.log(params.row)
                      let highlightChar=[];
                      if(params.row.peptideSequence){
                          if(params.row.ptms&&params.row.ptms.length>0){
                             for(let i=0; i< params.row.ptms.length; i++){
                                let positionMap = params.row.ptms[i].positionMap;
                                //console.log('positionMap',positionMap);
                                for(let j=0; j<positionMap.length; j++){
                                    let item = {
                                      pos:positionMap[j].key,
                                      val:'123'
                                    }
                                    highlightChar.push(item);
                                }
                             }
                             //console.log('highlightChar',highlightChar);
                             let spanArray = [];
                             let sequenceChar = params.row.peptideSequence.split('')
                             //console.log(highlightChar,sequenceChar)
                            
                              for(let i=0; i<sequenceChar.length; i++){
                                  let found = false;
                                  for(let j=0; j< highlightChar.length; j++){
                                      if(highlightChar[j].pos && highlightChar[j].pos-1 ==i){
                                          found =true;
                                          let item = h('span',[
                                                h('span', {
                                                    style: {color:'red'}
                                                }, sequenceChar[i]),
                                                h('Tooltip',{ 
                                                    props: {content: '222222'}
                                                })
                                            ])
                                          spanArray.push(item);
                                          highlightChar.splice(j, 1);
                                          break;
                                      }
                                  }
                                  if(!found){
                                      let item = h('span', {}, sequenceChar[i])
                                      spanArray.push(item)
                                  }
                              }  
                             return h('span',spanArray)

                          }
                          else{
                              return h('span',[h('span',{}, params.row.peptideSequence)])
                          }
                      }
                      else{
                          return h('span',[h('span',{}, 'No Seq')])
                      }
                      

                      // return h('div', [
                      //     h('span', {
                      //         on: {
                      //             click: () => {
                                      
                      //             }
                      //         }
                      //     }, params.row.peptide),
                      //     h('Tooltip',//first item
                      //         {
                      //             props: {
                      //                 content: 'Consensus peptide',
                      //             },
                      //         },//second item
                      //         [
                      //            h('Icon', {
                      //                 props: {
                      //                     type: 'checkmark-round',
                      //                 },
                      //                 style: {
                      //                     marginLeft: '5px'
                      //                 },
                      //             }),
                              
                      //         ]//third item
                      //     ),
                          
                      // ]);
                      // if(params.row.valid){
                      //   className='fa fa-check';
                      //   iconColor='#19be6b'
                      // }
                      // else{
                      //   className ='fa fa-times';
                      //   iconColor='#ed3f14'
                      // }
                      // return h('div', [
                      //     h('i', {
                      //         attrs: { class: className},
                      //         style: {
                      //             color:iconColor,
                      //             //marginRight: '5px',
                      //             marginLeft: '20px'
                      //         },
                      //     }),
                      // ]);
                  }
                  //className:'peptideID'
              },
              {
                  title: 'Decoy',
                  key: 'decoy',
                  sortable: true,
                  minWidth: 75,
                  //className:'peptideID'
              },
              {
                  title: 'Start',
                  key: 'startPostion',
                  sortable: true,
                  minWidth: 60,
                  // ellipsis:true
              },
              {
                  title: 'End',
                  key: 'endPostion',
                  sortable: true,
                  minWidth: 60,
                  // ellipsis:true
              },
              {
                  title: 'Peptide-level FDR',
                  key: 'peptidelevelFDR',
                  sortable: true,
                  minWidth: 130,
                  // ellipsis:true
              },
              {
                  title: 'Valid',
                  key: 'isValid',
                  sortable: true,
                  minWidth: 60,
                  render: (h, params) => {
                      var className;
                      var iconColor;
                      if(params.row.isValid){
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
              },
              {
                  title: 'PTMs',
                  key: 'ptms',
                  width:1,
                  className:'peptidePTMs'
                  // ellipsis:true
              },
          ],
          peptideTableResults:[],
          peptidePage:0,
          peptidePageSize:20,
          //selectedProteinTableItem:{},
          proteinPage:0,
          proteinPageSize:20,
          proteinTotal:2000,
          msRunApi: this.$store.state.baseApiURL + '/msruns/byProject', 
          proteinEvidencesApi: this.$store.state.baseApiURL+ '/proteinevidences',
          peptideEvidencesApi: this.$store.state.baseApiURL+ '/peptideevidences',
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      console.log('to.query',to.query);
      if(to.query && to.query.accession)
        this.getProteinEvidencesByAccession(to.query.accession);
      else
        this.getProteinEvidences();
      next();
    },
    components: {
      NavBar
    },
    methods:{
      getProteinEvidences(q){
          this.proteinTableLoading = true;
          let query = q || this.proteinQuery;
          this.$http
              .get(this.proteinEvidencesApi,{params: query})
              .then(function(res){
                this.proteinTableResults=[];
                this.peptideTableResults=[];
                this.proteinTableLoading = false;
                if(res.body && res.body._embedded){
                  //console.log('getProteinEvidences',res.body)
                  console.log('getProteinEvidences',res.body._embedded)
                  let proteinEvidences = res.body._embedded.proteinevidences;
                  this.proteinTotal = res.body.page.totalElements;
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
                  if(this.proteinTableResults.length>0){
                      this.peptideProteinAccession = this.proteinTableResults[0].reportedaccession
                      this.peptideAssayAccession = this.proteinTableResults[0].assayAccession
                  }
                }
              },function(err){
                  this.proteinTableResults = [];
                  this.proteinTableLoading = false;
                  this.$Message.error({content:'Search Error', duration:1});
              });
      },
      getProteinEvidencesByAccession(accession){
          this.proteinTableLoading = true;
          this.$http
              .get(this.proteinEvidencesApi+'/'+accession)
              .then(function(res){
                //console.log('accession',accession)
                //console.log('getProteinEvidencesByAccession',res.body)
                this.proteinTableResults=[];
                this.proteinTableLoading = false;
                if(res.body){
                  this.proteinTotal = 1;
                  let proteinEvidences = res.body;
                  var item = {
                    reportedaccession: proteinEvidences.reportedAccession,
                    assayAccession: proteinEvidences.assayAccession,
                    numberPeptides: proteinEvidences.numberPeptides,
                    sequenceCoverage: proteinEvidences.sequenceCoverage == 'NaN' ? 'No Value' : proteinEvidences.sequenceCoverage,
                    numberPSMs: proteinEvidences.numberPSMs,
                    bestsearchenginescore: proteinEvidences.bestSearchEngineScore.value || '',
                    valid: proteinEvidences.valid,
                    select:true,
                  }
                  this.proteinTableResults.push(item);

                  if(this.proteinTableResults.length>0){
                      this.peptideProteinAccession = this.proteinTableResults[0].reportedaccession
                      this.peptideAssayAccession = this.proteinTableResults[0].assayAccession
                  }
                  this.getPeptidesEvidences();
                }
              },function(err){
                  this.proteinTableResults=[];
                  console.log(err);
                  this.proteinTableLoading = false;
                  this.$Message.error({content:'No protein', duration:3});
              });
      },
      getPeptidesEvidences(q){
          this.peptideTableLoading = true;
          let query = q || this.peptideQuery;
          query.proteinAccession = this.peptideProteinAccession
          query.assayAccession = this.peptideAssayAccession
          this.$http
              .get(this.peptideEvidencesApi,{params: query})
              .then(function(res){
                console.log('getPeptidesEvidences',res.body);
                this.peptideTableResults=[];
                this.peptideTableLoading = false;
                if(res.body && res.body._embedded){
                  let peptideevidences = res.body._embedded.peptideevidences;
                  console.log('peptideevidences',peptideevidences)
                  for(let i=0; i < peptideevidences.length; i++){
                      var item = {
                        proteinAccession: peptideevidences[i].projectAccession,
                        peptideSequence: peptideevidences[i].peptideSequence,
                        decoy: peptideevidences[i].decoy,
                        isValid: peptideevidences[i].isValid,
                        startPostion: peptideevidences[i].startPostion,
                        endPostion: peptideevidences[i].endPostion,
                        ptms:peptideevidences[i].ptms,
                      }
                      //add peptidelevelFDR for item
                      for(let j=0; j<peptideevidences[i].properties.length; j++){
                          if(peptideevidences[i].properties[j].name && peptideevidences[i].properties[j].name.indexOf('FDR')!=-1){
                              item.peptidelevelFDR = peptideevidences[i].properties[j].value
                              break;
                          }
                      }
                      this.peptideTableResults.push(item);

                  }
                   //console.log(this.peptideTableResults)
                }
                else{
                  this.$Message.success({content:'No Peptides', duration:3});

                }
              },function(err){
                  this.peptideTableResults=[];
                  this.peptideTableLoading = false;
                  this.$Message.error({content:'Search Error', duration:3});
              });
      },
      proteinPageChange(page){
          this.proteinPage = page-1;
          if(this.$route.query && this.$route.query.accession)
            return
          this.getProteinEvidences();
      },
      proteinPageSizeChange(size){
          this.proteinPageSize = size;
          if(this.$route.query && this.$route.query.accession)
            return
          this.getProteinEvidences();
      },
      refreshProteinTable(){
          if (history.pushState) {
              var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
              window.history.pushState({path:newurl},'',newurl);
          }
          this.getProteinEvidences();
      },
      searchProtein(){ 
          console.log(123);
          let accession = this.$route.params.id + '%3A' + this.peptideAssayAccession + '%3A'+ this.proteinAccessionInputModel
          this.getProteinEvidencesByAccession(accession)
          if (history.pushState) {
              var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?accession='+accession
              window.history.pushState({path:newurl},'',newurl);
          }
      }
    },
    watch: {
        // selectedItem1:{
        //   handler(){
        //     console.log(this.selectedItem1)
        //     console.log(this.data2)
        //     for(let i=0; i<this.data2.length; i++){
        //       if(this.data2[i].accession != this.selectedItem1[0].row.accession){
        //         this.data2.splice(i,1)
        //         i--;
        //       }
        //     }
        //     console.log('111',this.selectedItem1[0].row.accession);
        //   },
        //   deep:true
        // },
    },
    computed:{
      proteinQuery:function(){
          let normalQuery = {}
          normalQuery.projectAccession=this.$route.params.id //'PXD012991'
          normalQuery.sortDirection='DESC'
          normalQuery.sortConditions='projectAccession'
          normalQuery.page = this.proteinPage
          normalQuery.pageSize = this.proteinPageSize
          return normalQuery;
      },
      peptideQuery:function(){
          let normalQuery = {}
          //normalQuery.proteinAccession=this.peptideProteinAccession
          normalQuery.projectAccession=this.$route.params.id //this.peptideProjectAccession
          //normalQuery.assayAccession=this.peptideAssayAccession
          normalQuery.sortDirection='DESC'
          normalQuery.sortConditions='projectAccession'
          normalQuery.page = this.peptidePage
          normalQuery.pageSize = this.peptidePageSize
          return normalQuery;
      }
    },
    mounted: function(){
        //console.log('this.$route',this.$route);
        if(this.$route.query && this.$route.query.accession)
          this.getProteinEvidencesByAccession(this.$route.query.accession);
        else
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
    width: 95%;
    margin:0 auto;
    padding: 0 0 40px 0;
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
  }
  .no-data-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #5bc0be;
    height: 100%;
    width: 100%;
    z-index:-1;
  }
  .molecules-table-header{
    display: flex;
    justify-content: space-between;
    height: 24px !important;
  }
  .molecules-table-header .right{
    display: flex;
    align-items: center;
  }
  .molecules-table-header .right i{
    margin-left: 10px;
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
  .protein-table .ivu-table-header thead tr th:first-child .ivu-table-cell{
    visibility: hidden;
  }
  .peptide-table .peptidePTMs{
      display: none;
  }
</style>

