<template>
  <div class="moleculo-container">
    <div class="panel nav"><NavBar page="archive"/></div>
    <div class="content">
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="24">
              <div class="visualization-wrapper">
                  <Card class="card protein">
                      <p slot="title" class="table-header"> 
                          <span><i class="fas fa-download icon-tag"></i>Identified Proteins</span>
                          <span class="right">
                              <Input v-model="proteinAccessionInputModel" placeholder="Enter something..." style="width: 200px" size="small"></Input>
                              <a href="javascript:void(0)"><Icon type="ios-search" size="20" @click="searchProtein"></Icon></a>
                              <a href="javascript:void(0)"><Icon type="ios-refresh-empty" size="24" @click="refreshProteinTable"></Icon></a>
                              <!-- <Dropdown placement="bottom-start" class="sort-dropdown" @on-click="proteinTableSortChange">
                                  <a href="javascript:void(0)">
                                      <Icon type="arrow-swap" size="20"></Icon>
                                  </a>
                                  <DropdownMenu slot="list">
                                      <DropdownItem v-for="item in proteinSortOptions" :name="item.key">{{item.label}}</DropdownItem>
                                  </DropdownMenu>
                              </Dropdown> -->
                          </span>
                      </p>
                      
                     <div class="download-list-wrapper">
                       <!--<div class="summary-content-header">List</div>-->
                       <div class="download-list">
                         <Table class="protein-table" :loading="proteinTableLoading" border :columns="proteinTableColumn" :data="proteinTableResults" size="small" @on-sort-change="proteinTableSortChange"></Table>
                       </div>
                     </div>
                     <div class="page-container">
                        <Page :total="proteinTotal" :page-size="proteinPageSize" size="small" show-sizer show-total @on-change="proteinPageChange" @on-page-size-change="proteinPageSizeChange"></Page>
                     </div>
                  </Card>    
              </div>
          </Col>
      </Row>
      <Row type="flex" justify="center" class="code-row-bg">
        <Col span="24">
            <div class="visualization-wrapper">
                <Card class="card protein">
                    <p slot="title" class="table-header"> 
                        <span><i class="fas fa-download icon-tag"></i>Sequence</span>
                        <span class="right">
                            <a v-if="proteinSequenceCollapse" href="javascript:void(0)"><Icon type="arrow-right-b" size="20" @click="proteinTableCollapseChange(false)"></Icon></a>
                            <a v-else href="javascript:void(0)"><Icon type="arrow-down-b" size="20" @click="proteinTableCollapseChange(true)"></Icon></a>
                        </span>
                    </p>
                    <div class="sequence-container">
                      <div v-if="proteinSequenceArray.length>1 && !proteinSequenceCollapse" class="header">
                          <div class="info">
                              <div>Accesssion: {{sequenceTableHeader.accession}}</div>
                              <div>{{sequenceTableHeader.peptides}} peptides ({{sequenceTableHeader.matched}} matched,  <!--{{sequenceTableHeader.distinct}} distinct) 206/509 amino (--> {{sequenceTableHeader.coverage}} coverage)</div>
                          </div>
                          <div class="legender">
                              <span style ="display: flex; align-items: center; margin-left: 20px" v-for = "item in headerLegend">
                                  <span style="display: flex; width: 15px; height: 15px; border: 1px solid rgba(0, 0, 0, .1);" :style="{'background-color':item.background}">
                                  </span>
                                  <span style ="display: flex; margin-left: 5px">{{item.value}}</span>
                              </span>
                          </div>
                      </div>
                      <div v-if="proteinSequenceArray.length>1 && !proteinSequenceCollapse" class="count">
                          <div style="text-align: right" v-for="item in countArray">{{item}}</div>
                      </div>
                      <div v-if="proteinSequenceArray.length<1" class="sequence-tag" style="color:#bdbdbd; text-align: center;">
                          {{proteinTableHint}}
                      </div>
                      <div v-else class="sequence-tag" >
                          <div v-if="proteinSequenceCollapse" style="color:#bdbdbd; text-align: center;">
                              {{proteinTableHint}}
                          </div> 
                          <span v-else class="sequence-block" v-for="item in this.tempSequenceArray">
                            <span v-for="char in item" :class="{fit:char.type == 'fit', fuzzyfit:char.type == 'fuzzyfit', ptm: char.type == 'ptm'}">
                                <span v-if="!char.des">{{char.val}}</span>
                                <Tooltip v-else :content="char.des" placement="top">{{char.val}}</Tooltip>
                            </span>  
                          </span>
                      </div>
                    </div>
                </Card>
            </div>
        </Col>
      </Row>
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="12">
              <div class="visualization-wrapper">
                  <Card class="card protein">
                      <p slot="title" class="table-header"> 
                          <span class="right">
                            <i class="fas fa-download icon-tag"></i>Peptides
                          </span>
                          <span class="right">
                              <Input v-model="peptideSequenceInputModel" placeholder="Enter something..." style="width: 200px" size="small"></Input>
                              <a href="javascript:void(0)"><Icon type="ios-search" size="20" @click="searchPeptide"></Icon></a>
                              <a href="javascript:void(0)"><Icon type="ios-refresh-empty" size="24" @click="refreshPeptideTable"></Icon></a>
                              <Dropdown placement="bottom-start" class="sort-dropdown" @on-click="peptideTableSortChange">
                                  <a href="javascript:void(0)">
                                      <Icon type="arrow-swap" size="20"></Icon>
                                  </a>
                                  <DropdownMenu slot="list">
                                      <DropdownItem v-for="item in peptideSortOptions" :name="item.key">{{item.label}}</DropdownItem>
                                  </DropdownMenu>
                              </Dropdown>
                          </span>
                      </p>
                     <div class="download-list-wrapper">
                       <!--<div class="summary-content-header">List</div>-->
                        <span v-if="peptideTableLoading==false && peptideTableResults.length<1" class="no-data-wrapper">Please select one Protein</span>
                        <Table v-else class="peptide-table" :loading="peptideTableLoading" border :columns="peptideTableColumn" :data="peptideTableResults" size="small"></Table>
                       
                      
                     </div>
                     <div class="page-container">
                        <div class="page-container">
                            <Page :total="peptideTotal" :page-size="peptidePageSize" size="small" show-sizer show-total @on-change="peptidePageChange" @on-page-size-change="peptidePageSizeChange"></Page>
                        </div>
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
                     <div class="download-list-wrapper psm-container">
                        <span v-if="psmTableLoading==false && psmTableResults.length<1" class="no-data-wrapper">Please select one Peptide</span>
                        <Table v-else class="psm-table" :loading="psmTableLoading" border :columns="psmTableColumn" :data="psmTableResults" size="small"></Table>
                     </div>
                      <!-- <div class="page-container">
                       <Page :total="total" :page-size="pageSize" size="small" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                     </div> -->
                  </Card>
              </div>
          </Col>
      </Row>
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="24">
              <div class="visualization-wrapper">
                  <Card class="card protein">
                       <p slot="title" class="table-header">
                          <span><i class="fas fa-download icon-tag"></i>Spectrum</span>
                          <span class="right">
                              <a v-if="spectrumTableCollapse" href="javascript:void(0)"><Icon type="arrow-right-b" size="20" @click="spectrumTableCollapseChange(false)"></Icon></a>
                              <a v-else href="javascript:void(0)"><Icon type="arrow-down-b" size="20" @click="spectrumTableCollapseChange(true)"></Icon></a>
                          </span>
                       </p>
                       <div class="spectrum-container">
                          <div style="color:#bdbdbd; text-align: center;">
                              {{spectrumTableHint}}
                          </div>
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
          iframeURL:this.$store.state.baseURL + '/static/lorikeet/html/pride.html',
          proteinAccessionInputModel:'',
          peptideSequenceInputModel:'',
          proteinSequence:'',
          proteinSequenceArray:[],
          proteinSequenceCollapse:true,
          proteinTableLoading: false,
          proteinTableHint:'Please select one Protein',
          spectrumTableHint:'Please select one PSM',
          proteinTableColumn: [
              {
                  type: 'index',
                  width: 30,
                  align: 'center'
              },
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
                                  //console.log('params.row',params.row);
                                  
                                  if(val){
                                      this.proteinSequence = params.row.proteinSequence;
                                      if(!this.proteinSequence){
                                        this.proteinSequenceArray = [];
                                        this.$Message.error({content:'No protein Sequence', duration:3});
                                        this.proteinTableCollapseChange(true)
                                      }
                                      else{
                                        this.protienItemSelected = true;
                                        this.proteinSequenceArray = [];
                                        this.proteinSequenceArray = this.proteinSequence.split('').map((item)=>{
                                            let obj = {
                                              val:item,
                                              des:'',
                                              type:''
                                            }
                                            return obj;
                                        });
                                        this.proteinTableCollapseChange(false)
                                        this.changeNum();
                                        this.sequenceTableHeader.accession = params.row.reportedAccession; 
                                        this.sequenceTableHeader.coverage = params.row.sequenceCoverage
                                      }
                                      
                                      let query = {
                                          proteinAccession:params.row.reportedAccession,
                                          projectAccession:this.$route.params.id,
                                          assayAccession:params.row.assayAccession,
                                          sortConditions:'projectAccession',
                                          sortDirection:'DESC',
                                          page: 0,
                                          pageSize: 1000
                                      }
                                      this.getPeptidesEvidences(query);
                                      if (history.pushState) {
                                          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?reportedAccession=' + query.proteinAccession + '&assayAccession=' + query.assayAccession + '&sortConditions='+ query.sortConditions + '&sortDirection='+query.sortDirection + '&page=' + query.page +'&pageSize=' + query.pageSize ;
                                          window.history.pushState({path:newurl},'',newurl);
                                      } 
                                  }
                                  else{
                                    this.proteinSequenceArray = [];
                                    this.protienItemSelected = false;
                                    this.proteinTableCollapseChange(true)
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
                  key: 'reportedAccession',
                  sortable: 'custom',
                  minWidth: 80,
                  // ellipsis:true
              },
              {
                  title: '#Peptides',
                  key: 'numberPeptides',
                  sortable: 'custom',
                  minWidth: 70,
                  //className:'peptideID'
              },
              {
                  title: '#PSMs',
                  key: 'numberPSMs',
                  sortable: 'custom',
                  minWidth: 50,
                  //className:'peptideID'
              },
              {
                  title: 'Coverage',
                  key: 'sequenceCoverage',
                  sortable: 'custom',
                  minWidth: 55,
                  //className:'peptideID'
              },
              {
                  title: 'Assay',
                  key: 'assayAccession',
                  sortable: 'custom',
                  minWidth: 70,
                  // ellipsis:true
              },
              {
                  title: 'Confidence Score',
                  key: 'bestSearchEngineScore',
                  sortable: 'custom',
                  minWidth: 120,
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
                                    let routeData = this.$router.resolve({path:'/markdownpage/resultpage#protein_confidence_score'});
                                    window.open(routeData.href, '_blank');
                                }
                              }
                          }),
                          h('span','Confidence Score')
                      ])
                  }
                  // ellipsis:true
              },
              {
                  title: 'Pass submitter Threshold',
                  key: 'isThreshold',
                  //sortable: true,
                  minWidth: 60,
                  align: 'center',
                  render: (h, params) => {
                      var className;
                      var iconColor;
                      if(params.row.isThreshold){
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
                                  //marginLeft: '20px'
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
                  title: 'Validated by PRIDE',
                  key: 'valid',
                  //sortable: true,
                  minWidth: 60,
                  align: 'center',
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
                                  //marginLeft: '20px'
                              },
                          }),
                          // h('span', {
                          //     on: {
                          //         click: () => {

                          //         }
                          //     }
                          // }, params.row.type),
                      ]);
                  },
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
                                    let routeData = this.$router.resolve({path:'/markdownpage/resultpage#validated_by_pride_pipelines'});
                                    window.open(routeData.href, '_blank');
                                }
                              }
                          }),
                          h('span','Validated by PRIDE')
                      ])
                  }
              },
              {
                  title: 'PTMs',
                  key: 'ptms',
                  width:1,
                  className:'peptidePTMs'
                  // ellipsis:true
              },
              {
                  title: 'Protein Sequence',
                  key: 'proteinSequence',
                  width:1,
                  className:'peptidePTMs'
                  // ellipsis:true
              },
          ],
          proteinTableResults:[],
          peptideProteinAccession:'',
          peptideAssayAccession:'',
          peptideTableLoading:false,
          peptideTableColumn: [
              {
                  type: 'index',
                  width: 30,
                  align: 'center'
              },
              {
                  title: '#',
                  //minWidth: 30,
                  width:30,
                  align: 'center',
                  render: (h, params) => {
                      return h('Checkbox', {
                          props: {
                              value: params.row.select
                          },
                          on: {
                              'on-change': (val) => {
                                  this.peptideTableResults.map(x => {
                                      x.select= false;
                                      return x;
                                  });
                                  this.peptideTableResults[params.index].select= val;
                                  if(val){
                                    //console.log('params.row',params.row)
                                    let query = {
                                          reportedProtein:params.row.proteinAccession,
                                          peptideEvidenceAccession:params.row.accession,
                                          peptideSequence:params.row.peptideSequence,
                                          projectAccession:this.$route.params.id,
                                          assayAccession: params.row.assayAccession,
                                          resultType:'FULL',
                                          sortConditions:'projectAccession',
                                          sortDirection:'DESC',
                                      }
                                    //console.log('accession',params.row.accession)
                                    this.getSpectra(query);
                                    // this.peptideProteinAccession = params.row.reportedaccession
                                    // this.peptideAssayAccession = params.row.assayAccession
                                    // this.getPeptidesEvidences();
                                    // if (history.pushState) {
                                    //     var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?accession=' + this.$route.params.id + '%3A' + this.peptideAssayAccession + '%3A'+ this.peptideProteinAccession;
                                    //     window.history.pushState({path:newurl},'',newurl);
                                    // }
                                  }
                                  else{
                                    this.psmTableResults = [];
                                    // if (history.pushState) {
                                    //     var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname
                                    //     window.history.pushState({path:newurl},'',newurl);
                                    // }
                                    // this.peptideTableResults=[];
                                  }
                              }
                          }
                      });
                  }
              },
              {
                  title: 'Protein Accession',
                  key: 'proteinAccession',
                  //sortable: true,
                  minWidth: 140,
                  //align: 'center',
                  // ellipsis:true
              },
              {
                  title: 'Peptide Sequence',
                  key: 'peptideSequence',
                  //sortable: true,
                  minWidth: 140,
                  //align: 'center',
                  render: (h, params) => {
                      // var className;
                      // var iconColor;
                      //console.log('params.row',params.row);
                      let highlightChar=[];
                      if(params.row.peptideSequence){
                          if(params.row.ptms&&params.row.ptms.length>0){
                             for(let i=0; i< params.row.ptms.length; i++){
                                let positionMap = params.row.ptms[i].positionMap;
                                for(let j=0; j<positionMap.length; j++){
                                    let item = {
                                      pos:positionMap[j].key,
                                      val:params.row.ptms[i].modification.name+';'+params.row.ptms[i].modification.accession
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
                                                h('Tooltip',{ 
                                                    props: {content:highlightChar[j].val ,placement:"right"},
                                                },[
                                                    h('span', {
                                                        style: {color:'red'}
                                                    }, sequenceChar[i]),
                                                ])
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
                  //sortable: true,
                  minWidth: 75,
                  //align: 'center',
                  //className:'peptideID'
              },
              {
                  title: 'Start',
                  key: 'startPostion',
                  //sortable: true,
                  minWidth: 60,
                  //align: 'center',
                  // ellipsis:true
              },
              {
                  title: 'End',
                  key: 'endPostion',
                  //sortable: true,
                  minWidth: 60,
                  //align: 'center',
                  // ellipsis:true
              },
              {
                  title: 'Peptide-level FDR',
                  key: 'peptidelevelFDR',
                  //sortable: true,
                  minWidth: 140,
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
                                    let routeData = this.$router.resolve({path:'/markdownpage/resultpage#peptide_level_fdr'});
                                    window.open(routeData.href, '_blank');
                                }
                              }
                          }),
                          h('span','Peptide-level FDR')
                      ])
                  }
              },
              {
                  title: 'Pass submitter Threshold',
                  key: 'isThreshold',
                  //sortable: true,
                  minWidth: 60,
                  align: 'center',
                  render: (h, params) => {
                      var className;
                      var iconColor;
                      if(params.row.isThreshold){
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
                                  //marginLeft: '20px'
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
                  title: 'Validated by PRIDE',
                  key: 'isValid',
                  //sortable: true,
                  minWidth: 60,
                  align: 'center',
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
                                  //marginLeft: '20px'
                              },
                          }),
                          // h('span', {
                          //     on: {
                          //         click: () => {

                          //         }
                          //     }
                          // }, params.row.type),
                      ]);
                  },
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
                                    let routeData = this.$router.resolve({path:'/markdownpage/resultpage#validated_by_pride_pipelines'});
                                    window.open(routeData.href, '_blank');
                                }
                              }
                          }),
                          h('span','Validated by PRIDE')
                      ])
                  }
              },
              {
                  title: 'PTMs',
                  key: 'ptms',
                  width:1,
                  className:'peptidePTMs'
                  // ellipsis:true
              },
              {
                  title: 'assayAccession',
                  key: 'assayAccession',
                  width:1,
                  className:'peptidePTMs'
                  // ellipsis:true
              },
              {
                  title: 'accession',
                  key: 'accession',
                  width:1,
                  className:'peptidePTMs'
                  // ellipsis:true
              },
          ],
          peptideTableResults:[],
          psmTableLoading:false,
          psmTableColumn: [
              {
                  title: '#',
                  //minWidth: 30,
                  width: 30,
                  align: 'center',
                  render: (h, params) => {
                      return h('Checkbox', {
                          props: {
                              value: params.row.select
                          },
                          on: {
                              'on-change': (val) => {
                                  this.psmTableResults.map(x => {
                                      x.select= false;
                                      return x;
                                  });
                                  this.psmTableResults[params.index].select= val;
                                  if(val){
                                      this.psmItemSelected = true;
                                      this.getSpectrum(params.row.usi);
                                  } 
                                  else
                                      this.psmItemSelected = false;
                                    
                                  this.spectrumTableCollapseChange(!val);
                                  
                                  
                                  //this.showSpectrum(val, params.row.peptideSequence, params.row.peaks, params.row.charge, params.row.precursorMZ, params.row.variableMods)
                              }
                          }
                      });
                  }
              },
              // {
              //     title: 'Protein Accession',
              //     key: 'proteinAccession',
              //     sortable: true,
              //     minWidth: 140,
              //     // ellipsis:true
              // },
              {
                  title: 'Peptide Sequence',
                  key: 'peptideSequence',
                  //sortable: true,
                  minWidth: 140,
                  render: (h, params) => {
                      // var className;
                      // var iconColor;
                      //console.log('psmTableColumn',params.row)
                      let highlightChar=[];
                      if(params.row.peptideSequence){
                          if(params.row.ptms&&params.row.ptms.length>0){
                             for(let i=0; i< params.row.ptms.length; i++){
                                let positionMap = params.row.ptms[i].positionMap;
                                //console.log('positionMap',positionMap);
                                for(let j=0; j<positionMap.length; j++){
                                    let item = {
                                      pos:positionMap[j].key,
                                      val:params.row.ptms[i].modification.name+';'+params.row.ptms[i].modification.accession
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
                                                h('Tooltip',{ 
                                                    props: {content: highlightChar[j].val,placement:"right"}
                                                },[
                                                  h('span', {
                                                      style: {color:'red'}
                                                  }, sequenceChar[i]),
                                                ])
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
                  //sortable: true,
                  minWidth: 75,
                  //className:'peptideID'
              },
              // {
              //     title: 'Start',
              //     key: 'startPostion',
              //     sortable: true,
              //     minWidth: 60,
              //     // ellipsis:true
              // },
              // {
              //     title: 'End',
              //     key: 'endPostion',
              //     sortable: true,
              //     minWidth: 60,
              //     // ellipsis:true
              // },
              {
                  title: 'PSM-level FDR',
                  key: 'psmlevelFDR',
                  //sortable: true,
                  minWidth: 130,
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
                                    let routeData = this.$router.resolve({path:'/markdownpage/resultpage#combined_psm_fdr'});
                                    window.open(routeData.href, '_blank');
                                }
                              }
                          }),
                          h('span','PSM-level FDR')
                      ])
                  }
              },
              {
                  title: 'Charge',
                  key: 'charge',
                  minWidth: 60,
                  // ellipsis:true
              },
              {
                  title: 'Pass submitter Threshold',
                  key: 'isThreshold',
                  //sortable: true,
                  minWidth: 60,
                  align: 'center',
                  render: (h, params) => {
                      var className;
                      var iconColor;
                      if(params.row.isThreshold){
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
                                  //marginLeft: '20px'
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
                  title: 'Validated by PRIDE',
                  key: 'isValid',
                  //sortable: true,
                  minWidth: 60,
                  align: 'center',
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
                                  //marginLeft: '20px'
                              },
                          }),
                          // h('span', {
                          //     on: {
                          //         click: () => {

                          //         }
                          //     }
                          // }, params.row.type),
                      ]);
                  },
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
                                    let routeData = this.$router.resolve({path:'/markdownpage/resultpage#validated_by_pride_pipelines'});
                                    window.open(routeData.href, '_blank');
                                }
                              }
                          }),
                          h('span','Validated by PRIDE')
                      ])
                  }
              },
              {
                  title: 'More',
                  key: 'more',
                  //sortable: true,
                  minWidth: 60,
                  align: 'center',
                  render: (h, params) => {
                      if(params.row.psmMoreArray && params.row.psmMoreArray.length>0){
                          return  h('Dropdown', {
                                    props: {
                                      placement: 'bottom-end'
                                    },
                                    style: {
                                      textAlign: 'left'
                                    },
                                    on: {
                                      'on-click': (value) => {
                                        console.log(value)
                                      }
                                    }
                                }, [
                                  h('div', {
                                    class: {
                                      member_operate_div: true
                                    }
                                  }, [
                                      h('Icon', {
                                          props: {
                                            type: 'ios-list-outline',
                                            size: 20
                                          },
                                          style: {
                                            //marginLeft: '5px' 
                                          }
                                        })
                                      ]),
                                      h('DropdownMenu', {
                                        slot: 'list'
                                      }, 
                                      params.row.psmMoreArray.map((obj)=>{
                                          return h('DropdownItem', {
                                              props: {name: obj.name}  
                                          }, obj.value);  
                                      }))
                          ]);
                      }
                      else
                        return h('span',{},'No Options')
                  }
              },
              {
                  title: 'PTMs',
                  key: 'ptms',
                  width:0.1,
                  className:'psmPTMs'
                  // ellipsis:true
              },
              {
                  title: 'Peaks',
                  key: 'peaks',
                  width:0.1,
                  className:'psmPTMs'
                  // ellipsis:true
              },
              {
                  title: 'PrecursorMZ',
                  key: 'precursorMZ',
                  width:0.1,
                  className:'psmPTMs'
                  // ellipsis:true
              },
              {
                  title: 'VariableMods',
                  key: 'variableMods',
                  width:0.1,
                  className:'psmPTMs'
                  // ellipsis:true
              },
              {
                  title: 'Usi',
                  key: 'usi',
                  width:0.1,
                  className:'psmPTMs'
                  // ellipsis:true
              },    
              
          ],
          psmTableResults:[],
          protienItemSelected:false,
          psmItemSelected:false,
          //selectedProteinTableItem:{},
          spectrumSpinShow:false,
          spectrumTableShow:false,
          spectrumTableCollapse:true,
          proteinPage:0,
          proteinPageSize:20,
          proteinTotal:0,
          proteinSortDirection:'DESC',
          proteinSortConditions:'projectAccession',
          proteinSortType:'',
          proteinSortOrder:'',
          proteinSortOptions:[
              {
                key:'reportedAccession',
                label:'Accession'
              },
              {
                key:'assayAccession',
                label:'Assay'
              },
              {
                key:'numberPeptides',
                label:'Peptides'
              },
              {
                key:'numberPSMs',
                label:'PSMs'
              },
              {
                key:'sequenceCoverage',
                label:'Coverage'
              },
              {
                key:'bestSearchEngineScore.value',
                label:'Confidence Score'
              },
          ],
          peptideSortOptions:[
              {
                key:'peptideSequence',
                label:'Peptide Sequence'
              },
              // {
              //   key:'confidenceScore',
              //   label:'Peptide-level FDR'
              // },
          ],
          countArray:[],
          sequenceTableHeader:{
            accession:'',
            peptides:'',
            matched:'',
            distinct:'',
            coverage:''
          },
          headerLegend:[
            {
                background:'#ff98f1',
                value:'PTMs',
                key:'ptms'
            },
            {
                background:'#6bdc48ba',
                value:'Fit',
                key:'fit'
            },
            {
                background:'#fff239',
                value:'Fuzzy Fit',
                key:'fuzzyfit'
            }
          ],
          //peptideSortType:'',
          peptidePage:0,
          peptidePageSize:20,
          peptideTotal:0,
          msRunApi: this.$store.state.baseApiURL + '/msruns/byProject', 
          proteinEvidencesApi: this.$store.state.baseApiURL+ '/proteinevidences',
          peptideEvidencesApi: this.$store.state.baseApiURL+ '/peptideevidences',
          spectraApi: this.$store.state.baseApiURL+ '/spectra',
          spectrumApi: this.$store.state.baseApiURL+ '/spectrum',
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      console.log('to.query',to.query);
      if(to.query)
        this.getProteinEvidences(to.query);
      next();
    },
    components: {
      NavBar
    },
    methods:{
      getProteinEvidences(q){
          this.proteinTableLoading = true;
          let query = q || this.proteinQuery;
          //console.log('this.proteinQuery',this.proteinQuery)
          //console.log('query',query)
          this.$http
              .get(this.proteinEvidencesApi,{params: query})
              .then(function(res){
                this.proteinTableResults=[];
                //this.peptideTableResults=[];
                //this.peptideTotal = 0;
                this.proteinTableLoading = false;
                if(res.body && res.body._embedded){
                  //console.log('getProteinEvidences',res.body)
                  console.log('getProteinEvidences',res.body._embedded)
                  let proteinEvidences = res.body._embedded.proteinevidences;
                  this.proteinTotal = res.body.page.totalElements;
                  for(let i=0; i < proteinEvidences.length; i++){
                      var item = {
                        reportedAccession: proteinEvidences[i].reportedAccession,
                        assayAccession: proteinEvidences[i].assayAccession,
                        numberPeptides: proteinEvidences[i].numberPeptides,
                        //sequenceCoverage: proteinEvidences[i].sequenceCoverage == 'Infinity' ? '' : Math.round(proteinEvidences[i].sequenceCoverage * 10000)/10000,
                        numberPSMs: proteinEvidences[i].numberPSMs,
                        bestSearchEngineScore: proteinEvidences[i].bestSearchEngineScore.value || '',
                        valid: proteinEvidences[i].valid,
                        ptms: proteinEvidences[i].ptms,
                        proteinSequence: proteinEvidences[i].proteinSequence,
                        select:false,
                      }

                      if(proteinEvidences[i].sequenceCoverage == 'Infinity' || proteinEvidences[i].sequenceCoverage== 'NaN')
                        item.sequenceCoverage = ''
                      else
                        item.sequenceCoverage =  (Math.round(proteinEvidences[i].sequenceCoverage * 10000)/10000 * 100).toFixed(2) + '%'
                       
                      //add isThreshold
                      if(proteinEvidences[i].additionalAttributes){
                          let found = false;
                          for(let j=0; j<proteinEvidences[i].additionalAttributes.length; j++){
                              //console.log('protein1',proteinEvidences[i].additionalAttributes[j].name);
                              //console.log('protein2',proteinEvidences[i].additionalAttributes[j].value);
                              if(proteinEvidences[i].additionalAttributes[j].name == 'Pass submitter threshold'){
                                found =true;
                                item.isThreshold = proteinEvidences[i].additionalAttributes[j].value == 'true' ? true : false
                                //console.log('protein3',proteinEvidences[i].additionalAttributes[j].name,proteinEvidences[i].additionalAttributes[j].value);
                                break;
                              }
                          }
                          if(!found)
                            item.isThreshold = false
                      } 
                      //console.log('protein',item);

                      this.proteinTableResults.push(item);
                  }
                  // if(this.proteinTableResults.length>0){
                  //     this.peptideProteinAccession = this.proteinTableResults[0].reportedaccession
                  //     this.peptideAssayAccession = this.proteinTableResults[0].assayAccession
                  // }
                }
              },function(err){
                  this.proteinTotal = 0;
                  this.proteinTableResults = [];
                  this.proteinTableLoading = false;
                  this.$Message.error({content:'Search Error', duration:3});
              });
      },
      getPeptidesEvidences(q){
          this.peptideTableLoading = true;
          let query = q || this.peptideQuery;
          //query.proteinAccession = this.peptideProteinAccession
          //query.assayAccession = this.peptideAssayAccession
          //console.log('getPeptidesEvidences',query)
          this.$http
              .get(this.peptideEvidencesApi,{params: query})
              .then(function(res){
                //console.log('getPeptidesEvidences',res.body);
                this.peptideTableResults=[];
                this.peptideTableLoading = false;
                this.peptideTotal = res.body.page.totalElements;
                if(res.body && res.body._embedded){
                  let peptideevidences = res.body._embedded.peptideevidences;
                  console.log('peptideevidences',peptideevidences)
                  for(let i=0; i < peptideevidences.length; i++){
                      var item = {
                        accession: peptideevidences[i].accession,
                        peptideSequence: peptideevidences[i].peptideSequence,
                        decoy: peptideevidences[i].decoy,
                        isValid: peptideevidences[i].isValid,
                        startPostion: peptideevidences[i].startPostion,
                        endPostion: peptideevidences[i].endPostion,
                        ptms:peptideevidences[i].ptms,
                        proteinAccession: peptideevidences[i].proteinAccession,
                        assayAccession:peptideevidences[i].assayAccession,
                        select:false,
                      }
                      //add peptidelevelFDR for item
                      for(let j=0; j<peptideevidences[i].properties.length; j++){
                          if(peptideevidences[i].properties[j].name && peptideevidences[i].properties[j].name.indexOf('FDR')!=-1){
                              item.peptidelevelFDR = parseFloat(peptideevidences[i].properties[j].value).toExponential(3)
                              break;
                          }
                      }

                      //add isThreshold
                      let found = false;
                      for(let j=0; j<peptideevidences[i].properties.length; j++){
                          //console.log(peptideevidences[i].properties[j].name)
                          //console.log(peptideevidences[i].properties[j].value)
                          if(peptideevidences[i].properties[j].name && peptideevidences[i].properties[j].name.indexOf('threshold')!=-1){
                              found = true;
                              item.isThreshold = peptideevidences[i].properties[j].value == 'true' ? true : false
                              break;
                          }
                      }
                      if(!found)
                          item.isThreshold = false

                      this.peptideTableResults.push(item);

                  }
                  if(this.protienItemSelected && this.proteinSequenceArray.length>0){
                      this.sequenceTableHeader.peptides = this.peptideTableResults.length;
                      this.highLightSequence();
                  }
                   //console.log(this.peptideTableResults)
                  
                }
                else{
                  this.$Message.success({content:'No Peptides', duration:3});
                  this.peptideTotal = 0;
                }
              },function(err){
                  this.peptideTotal = 0;
                  this.peptideTableResults=[];
                  this.peptideTableLoading = false;
                  this.$Message.error({content:'Peptide Search Error', duration:3});
              });
      },
      getSpectra(q){
          let query = q || this.spectraQuery
          this.psmTableLoading = true;
          this.$http
              .get(this.spectraApi,{params: query})
              .then(function(res){
                this.psmTableResults=[];
                this.psmTableLoading = false;
                if(res.body && res.body._embedded){
                  let psm = res.body._embedded.spectraevidences;
                  console.log('psm',psm)
                  for(let i=0; i < psm.length; i++){
                      var item = {
                        //proteinAccession: psm[i].projectAccession,
                        peptideSequence: psm[i].peptideSequence,
                        decoy: psm[i].decoy,
                        isValid: psm[i].valid,
                        charge:psm[i].charge,
                        precursorMZ:psm[i].precursorMZ,
                        ptms:psm[i].ptms,
                        usi:psm[i].usi,
                        select:false,
                        psmMoreArray:[]
                      }
                      //add psmlevelFDR for item
                      for(let j=0; j<psm[i].attributes.length; j++){
                          if(psm[i].attributes[j].name && psm[i].attributes[j].name.indexOf('FDR')!=-1){
                              item.psmlevelFDR = parseFloat(psm[i].attributes[j].value).toExponential(3)
                              break;
                          }
                      }
                      //add isThreshold
                      let found = false;
                      for(let j=0; j<psm[i].attributes.length; j++){
                          if(psm[i].attributes[j].name && psm[i].attributes[j].name.indexOf('threshold')!=-1){
                              //console.log(psm[i].attributes[j].value);
                              found = true;
                              item.isThreshold = psm[i].attributes[j].value == 'true' ? true : false
                              break;
                          }
                      }
                      if(!found)
                          item.isThreshold = false

                      //add for More option
                      for(let j=0; j<psm[i].attributes.length; j++){
                          let tempItem = {
                            name:psm[i].attributes[j].name,
                            value:psm[i].attributes[j].name+': '+psm[i].attributes[j].value
                          }
                          item.psmMoreArray.push(tempItem)
                      }

                      //add peaks for item
                      if(psm[i].intensities){
                          let peaksArray = [];
                          for(let j=0; j<psm[i].intensities.length; j++){
                              let item = {
                                mz:psm[i].mzs[j],
                                intensity:psm[i].intensities[j]
                              }
                              peaksArray.push(item)
                          }
                          item.peaks = peaksArray;
                      }
                      //add variableMods for item
                      if(psm[i].ptms){
                          let variableModsArray = [];
                          for(let j=0; j<psm[i].ptms.length; j++){
                              for(let k=0; k<psm[i].ptms[j].positionMap.length; k++){
                                  let item = {
                                    index:psm[i].ptms[j].positionMap[k].key,
                                    modMass:parseFloat(psm[i].ptms[j].modification.value),
                                    aminoAcid: psm[i].peptideSequence.split('')[psm[i].ptms[j].positionMap[k].key-1]
                                  };
                                  variableModsArray.push(item)
                              }
                          }
                          item.variableMods = variableModsArray;
                      }
                      this.psmTableResults.push(item);
                  }
                  //console.log('this.psmTableResults[0]',this.psmTableResults[0])
                  //this.psmTableResults[0].select = true; 
                  //this.showSpectrum(this.psmTableResults[0].select, this.psmTableResults[0].peptideSequence, this.psmTableResults[0].peaks);
                }
                else{
                  this.$Message.success({content:'No PSMs', duration:3});
                }
              },function(err){
                  this.psmTableResults=[];
                  this.psmTableLoading = false;
                  this.$Message.error({content:'No PSM', duration:3});
              });
      },
      getSpectrum(usi){
        let query = {
          usi:usi
        }
        this.$http
              .get(this.spectrumApi,{params: query})
              .then(function(res){
                console.log('getSpectrum',res.body);
                if(res.body){
                  let psm = res.body;
                  let peptideSequence = psm.peptideSequence;
                  let charge = psm.charge;
                  let precursorMZ = psm.precursorMZ;
                  let peaks;
                  let variableMods;

                  //add peaks for item
                  if(psm.intensities){
                      let peaksArray = [];
                      for(let j=0; j<psm.intensities.length; j++){
                          let item = {
                            mz:psm.mzs[j],
                            intensity:psm.intensities[j]
                          }
                          peaksArray.push(item)
                      }
                      peaks = peaksArray;
                  }
                  //add variableMods for item
                  if(psm.ptms){
                      let variableModsArray = [];
                      for(let j=0; j<psm.ptms.length; j++){
                          for(let k=0; k<psm.ptms[j].positionMap.length; k++){
                              let item = {
                                index:psm.ptms[j].positionMap[k].key,
                                modMass:parseFloat(psm.ptms[j].modification.value),
                                aminoAcid: psm.peptideSequence.split('')[psm.ptms[j].positionMap[k].key-1]
                              };
                              variableModsArray.push(item)
                          }
                      }
                      variableMods = variableModsArray;
                  }
                  //console.log();
                  this.showSpectrum(true, peptideSequence, peaks, charge, precursorMZ, variableMods)
                }
                else{
                  this.$Message.success({content:'No PSMs', duration:3});
                }
              },function(err){
                  this.psmTableResults=[];
                  this.$Message.error({content:'No PSM', duration:3});
              });
      },
      proteinPageChange(page){
          this.proteinPage = page-1;
          if(this.$route.query && this.$route.query.proteinAccession)
            return

          let query = {
              projectAccession :this.$route.params.id,
              sortConditions:this.proteinSortConditions,
              sortDirection:this.proteinSortDirection,
              page : this.proteinPage,
              pageSize :this.proteinPageSize,
              reportedAccession:this.proteinAccessionInputModel,
          }
          this.getProteinEvidences(query);
      },
      proteinPageSizeChange(size){
          this.proteinPageSize = size;
          if(this.$route.query && this.$route.query.proteinAccession)
            return

          let query = {
              projectAccession :this.$route.params.id,
              sortConditions:this.proteinSortConditions,
              sortDirection:this.proteinSortDirection,
              page : this.proteinPage,
              pageSize :this.proteinPageSize,
              reportedAccession:this.proteinAccessionInputModel,
          }
          this.getProteinEvidences(query);
      },
      proteinTableSortChange(item){
        if(item.order == 'asc')
            this.proteinSortDirection = 'ASC'
        else
            this.proteinSortDirection = 'DESC'

        if(item.order == 'normal')
          this.proteinSortConditions = 'projectAccession'
        else
          for(let i=0; i< this.proteinSortOptions.length; i++){
              //console.log(this.proteinSortOptions[i].key,item.key)
              if(this.proteinSortOptions[i].key.indexOf(item.key)!= -1 ){
                  this.proteinSortConditions = this.proteinSortOptions[i].key
                  break
              }
          }
        let query = {
              projectAccession :this.$route.params.id,
              sortConditions:this.proteinSortConditions,
              sortDirection:this.proteinSortDirection,
              page : this.proteinPage,
              pageSize :this.proteinPageSize,
              reportedAccession:this.proteinAccessionInputModel,
          }
        console.log('sort',query.sortConditions, query.sortDirection)
        this.getProteinEvidences(query);
      },
      peptidePageChange(page){
          this.peptidePage = page-1;
          this.getPeptidesEvidences();
          
      },
      peptidePageSizeChange(size){
          this.peptidePageSize = size;
          this.getPeptidesEvidences();
      },
      refreshProteinTable(){
          console.log('refreshProteinTable');
          this.proteinAccessionInputModel = '';
          let query = {
              projectAccession :this.$route.params.id,
              sortConditions:'projectAccession',
              sortDirection:'DESC',
              page : 0,
              pageSize :20,
              reportedAccession:'',
          }
          this.getProteinEvidences(query);
          //this.$router.push({name: 'molecules', query: query});
          //this.getProteinEvidences(query);
      },
      searchProtein(){ 
          if(this.proteinAccessionInputModel){
              console.log('searchProtein');
              let query = {
                projectAccession:this.$route.params.id,
                reportedAccession:this.proteinAccessionInputModel,
                page:0,
                pageSize:20,
                sortConditions:this.proteinSortDirection,
                sortDirection:this.proteinSortConditions
              }
              this.getProteinEvidences(query);
          }
          else{
              this.$Message.error({content:'Input Accession', duration:3});
          }
      },
      searchPeptide(){
        if(this.peptideSequenceInputModel){
            let query = {
              projectAccession:this.$route.params.id,
              peptideSequence:this.peptideSequenceInputModel,
              sortDirection:'DESC',
              sortConditions:'projectAccession',
              page: 0,
              pageSize: 20
            }
            this.getPeptidesEvidences(query);
        }
        else{
            this.$Message.error({content:'Input Sequence', duration:3});
        }
      },
      refreshPeptideTable(){
          this.peptideSequenceInputModel = ''
          let query = {
            proteinAccession:'',
            projectAccession:this.$route.params.id,
            assayAccession:'',
            sortDirection:'DESC',
            sortConditions:'projectAccession',
            page: 0,
            pageSize: 20
          }
          this.getPeptidesEvidences(query);
      },
      peptideTableSortChange(item){
        let query = {
            proteinAccession:'',
            projectAccession:this.$route.params.id,
            assayAccession:'',
            sortDirection:'DESC',
            sortConditions:item,
            page: 0,
            pageSize: 20
        }
        this.getPeptidesEvidences(query);
      },
      showSpectrum(val, peptideSequence, peaks, charge, precursorMZ,variableMods){
          if(val){
              let iframeDom = document.querySelector("#lorikeetIframe");
              if(peptideSequence){ 
                  if(iframeDom)
                    iframeDom.remove();
                  
                  this.spectrumSpinShow = true;
                  this.spectrumTableShow=false;
                  let iframe = document.createElement('iframe');
                  iframe.src = this.iframeURL;
                  iframe.id = 'lorikeetIframe'
                  iframe.className = 'lorikeet-iframe'
                  iframe.style.width = '100%'
                  iframe.style.height = '940px'
                  iframe.style.borderWidth = '0';
                  document.querySelector(".spectrum-container").appendChild(iframe)
                  document.querySelector("#lorikeetIframe").onload = ()=>{
                    this.spectrumTableShow=true;
                    this.spectrumSpinShow = false;
                    //console.log(peptideSequence,peaks)
                    document.querySelector("#lorikeetIframe").contentWindow.postMessage({sequence: peptideSequence, peaks:peaks, charge: charge, precursorMz: precursorMZ, variableMods:variableMods, /*width:window.innerWidth-1000can not calculate dynamically*/}, "*");
                  }
                  document.querySelector("#lorikeetIframe").onerror = ()=> {
                      this.spectrumTableShow= false;
                      this.spectrumSpinShow = false;
                      this.$Message.error({content:'Spectrum Error', duration:3});
                  };
              }
              else{
                  this.spectrumTableShow = false;
                  this.spectrumSpinShow = false;
              }
          }
          else{
              this.spectrumSpinShow = false;
              this.spectrumTableShow=false;
              document.querySelector("#lorikeetIframe").remove();
          }
      },
      spectrumTableCollapseChange(val){
          this.spectrumTableCollapse = val
          if(this.spectrumTableCollapse){
              document.querySelector('.spectrum-container').style.height = 'auto'
              if(document.querySelector('#lorikeetIframe'))
                document.querySelector('#lorikeetIframe').style.display= 'none'
              if(this.psmItemSelected)
                  this.spectrumTableHint = "Open Table to see the results"
              else
                  this.spectrumTableHint = "Please select one PSM"
          } 
          else{
              document.querySelector('.spectrum-container').style.height = '940px'
              if(this.psmItemSelected){
                  if(document.querySelector('#lorikeetIframe'))
                    document.querySelector('#lorikeetIframe').style.display= 'block'
                  this.spectrumTableHint = ""
              }
              else
                  this.spectrumTableHint = "Please select one PSM"
          }
      },
      proteinTableCollapseChange(val){
          this.proteinSequenceCollapse = val;
          if(this.proteinSequenceCollapse){
              //document.querySelector('.sequence-container').style.height = 'auto'
              document.querySelector('.sequence-container').style.paddingRight = '0'
              document.querySelector('.sequence-container').style.paddingTop = '0'
              if(this.protienItemSelected && this.proteinSequenceArray.length>0){
                this.proteinTableHint = "Open Table to see the results"
                if(document.querySelector('.sequence-tag').classList.contains("sequence-wrapper"))
                    document.querySelector('.sequence-tag').classList.remove("sequence-wrapper");
              }
              else{
                this.proteinTableHint = "Please select one Protein"
                if(document.querySelector('.sequence-tag').classList.contains("sequence-wrapper"))
                    document.querySelector('.sequence-tag').classList.remove("sequence-wrapper");
              }
          }
          else{
              //document.querySelector('.sequence-container').style.height = '496px'
              if(this.protienItemSelected && this.proteinSequenceArray.length>0){
                document.querySelector('.sequence-container').style.paddingRight = '40px'
                document.querySelector('.sequence-container').style.paddingTop = '60px'
                if(!document.querySelector('.sequence-tag').classList.contains("sequence-wrapper"))
                  document.querySelector('.sequence-tag').classList.add("sequence-wrapper");
                this.proteinTableHint = this.proteinSequence;
              }
              else{
                if(document.querySelector('.sequence-tag').classList.contains("sequence-wrapper"))
                    document.querySelector('.sequence-tag').classList.remove("sequence-wrapper");
                this.proteinTableHint = "Please select one Protein"
              }
          }
      },
      change(){
        this.changeNum();
        //this.changeSpectrum();
      },
      changeNum(){
          this.countArray = [];
          let tempDiv = document.querySelector('.sequence-tag');
          let lineNum = Math.floor(tempDiv.clientWidth/100)
          let rowNum = Math.floor(this.proteinSequence.length/(lineNum*10))
          let lastRowNum = this.proteinSequence.length - rowNum * lineNum * 10
          //console.log(lineNum,rowNum,lastRowNum)
          for(let i=0; i<rowNum+1; i++){
              if(i == rowNum)
                this.countArray.push(lineNum*rowNum*10+lastRowNum)
              else
                this.countArray.push(lineNum*(i+1)*10)
          }
      },
      changeSpectrum(){
          let tempDiv = document.querySelector('.spectrum-container');
          document.querySelector("#lorikeetIframe").contentWindow.postMessage({width: window.innerWidth-800}, "*");
      },
      highLightSequence(){
        // if(params.row.ptms){
        //     for (let i=0;i<params.row.ptms.length; i++){
        //         let modification = params.row.ptms[i].modification;
        //         for(let j=0; j<params.row.ptms[i].positionMap; j++){
        //             let key =  params.row.ptms[i].positionMap[j].key;
        //             let x = Math.floor(key/10);
        //             let y = key%10
        //             this.proteinSequenceArray[x][y].type = 'ptm'
        //             this.proteinSequenceArray[x][y].des = modification.accession +';' +modification.name 
        //         }
        //     }
        // }

        this.sequenceTableHeader.matched = 0;
        this.sequenceTableHeader.distinct = 0;
        for(let i=0; i<this.peptideTableResults.length; i++ ){
            let tempProteinSequence = this.peptideTableResults[i].peptideSequence
            let end = this.peptideTableResults[i].endPostion
            let start = this.peptideTableResults[i].startPostion - 1
            let ptms = this.peptideTableResults[i].ptms
            let tempPeptideSequence = this.proteinSequence.slice(start,end)
            if(tempPeptideSequence == tempProteinSequence){
              for (let j =start; j< end; j++)
                this.proteinSequenceArray[j].type = 'fit'
              this.sequenceTableHeader.matched++;
            }
            else{
              for (let j =start; j< end; j++)
                this.proteinSequenceArray[j].type = 'fuzzyfit'
              this.sequenceTableHeader.distinct++
            }

            if(ptms){
              //console.log('ptms',ptms)
                for(let j=0; j<ptms.length; j++){
                    let modification =  ptms[j].modification
                    for(let k=0; k<ptms[j].positionMap.length; k++){
                        //console.log('k',k)
                        let des = modification.name + ';' + modification.accession
                        let key = ptms[j].positionMap[k].key -1 + start
                        //console.log(des,key)
                        this.proteinSequenceArray[key].type = 'ptm'
                        this.proteinSequenceArray[key].des = des
                    }
                }
            }
        }
      }
    },
    watch: {
        peptideTableResults:{
          handler(){
              //this.psmTableResults = [];
              // let iframe = document.querySelector("#lorikeetIframe");
              // if(iframe){
              //   this.spectrumTableShow=false;
              //   this.spectrumSpinShow=false;
              //   iframe.remove();
              // }
          },
          deep:true
        },
        // proteinSequence:{
        //   handler(){
        //       if(this.proteinSequence){
        //         console.log(123)
        //         document.querySelector('.sequence-container').style.height  = '498px'
        //       }
        //       else{
        //         console.log(222)
        //         document.querySelector('.sequence-container').style.height  = '0px'
        //       }
        //   },
        //   deep:false
        // }
    },
    computed:{
      proteinQuery:function(){
          let normalQuery = {}
          normalQuery.projectAccession=this.$route.params.id //'PXD012991'
          normalQuery.sortDirection=this.proteinSortDirection
          normalQuery.sortConditions=this.proteinSortConditions
          normalQuery.page = this.proteinPage
          normalQuery.pageSize = this.proteinPageSize
          return normalQuery;
      },
      peptideQuery:function(){
          let normalQuery = {}
          normalQuery.proteinAccession=''
          normalQuery.projectAccession=this.$route.params.id //this.peptideProjectAccession
          normalQuery.assayAccession=''
          normalQuery.sortDirection='DESC'
          normalQuery.sortConditions='projectAccession'
          normalQuery.page = this.peptidePage
          normalQuery.pageSize = this.peptidePageSize
          return normalQuery;
      },
      spectraQuery:function(){
          let normalQuery = {}
          normalQuery.reportedProtein=''
          normalQuery.peptideEvidenceAccession=''
          normalQuery.peptideSequence=''
          normalQuery.projectAccession=this.$route.params.id //this.peptideProjectAccession
          normalQuery.assayAccession=''
          normalQuery.resultType='COMPACT'
          normalQuery.sortDirection='DESC'
          normalQuery.sortConditions='projectAccession'
          return normalQuery;
      },
      tempSequenceArray:function(){
          let tempArray = []
          for(let i=0; i<this.proteinSequenceArray.length; i+=10){
              let item = this.proteinSequenceArray.slice(i,i+10)
              tempArray.push(item) 
          }
          return tempArray;
      }
    },
    mounted: function(){
        //console.log('this.$route',this.$route);
        window.addEventListener("resize", this.change);
        if(Object.keys(this.$route.query).length === 0){
          this.getPeptidesEvidences();
          this.getProteinEvidences();
          this.getSpectra();
          
        }
        else{
          console.log(this.$route.query)
          this.getProteinEvidences(this.$route.query);
        }
    },
    beforeDestroy(){
        window.removeEventListener("resize", this.changeNum);
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
    position: relative;
    height: auto;
    max-height: 496px;
    overflow-y: auto;
  }
  .sequence-container .header{
    position: absolute;
    top:0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .sequence-container .header .info{
    font-weight: bold;
  }
  .sequence-container .header .legender{
    display: flex;
    align-items: start;
  }
  .sequence-container .count{
    position: absolute;
    top:59px;
    right: 0;
    color: rgb(189, 189, 189)
  }
  .download-list-wrapper.psm-container{
    height: 496px !important;
  }
  .spectrum-container{
      height: auto;
   }
  .no-data-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    /*border: 1px solid #5bc0be;*/
    height: 100%;
    width: 100%;
    z-index:-1;
    color:#bdbdbd;
  }
  .sequence-wrapper{
    text-align: left !important;
    color: #495060 !important
  }
  .sequence-block{
    margin-right: 10px;
    display: inline-block;
    font-family: monospace;
    width: 90px;
  }
  .table-header{
    display: flex;
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
  .lorikeet-iframe{
      width: 100%;
      height: 920px;
      border-width:0;
  }
  .table-header a{
      border-bottom-style:none;
  }
  .table-header a:hover{
      border-bottom-style:none;
  }
  .fit{
     background-color:  #6bdc48ba
  }
  .fuzzyfit{
     background-color:  #fff239
  }
  .ptm{
     background-color:  #ff98f1
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
  .peptide-table .ivu-table-header thead tr th:first-child .ivu-table-cell{
    visibility: hidden;
  }
  .psm-table .ivu-table-header thead tr th:first-child .ivu-table-cell{
    visibility: hidden;
  }
  .peptide-table .ivu-table .ivu-table-body th.ivu-table-column-center, td.ivu-table-column-center{
    padding: 0 !important;
  }
  .protein-table .peptidePTMs{
      display: none;
  }
  .peptide-table .peptidePTMs{
      display: none;
  }
  .psm-table .psmPTMs{
      display: none;
  }
  .sort-dropdown .ivu-select-dropdown{
      border-radius:0;
  }
</style>

