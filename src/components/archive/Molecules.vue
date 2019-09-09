<template>
  <div class="moleculo-container">
    <div class="panel nav"><NavBar page="archive"/></div>
    <div class="content">
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="12">
              <div class="visualization-wrapper">
                  <Card class="card protein">
                      <p slot="title" class="table-header"> 
                          <span><i class="fas fa-download icon-tag"></i>Identified Proteins</span>
                          <span class="right">
                              <Input v-model="proteinAccessionInputModel" placeholder="Enter something..." style="width: 200px" size="small"></Input>
                              <a href="javascript:void(0)"><Icon type="ios-search" size="20" @click="searchProtein"></Icon></a>
                              <a href="javascript:void(0)"><Icon type="ios-refresh-empty" size="24" @click="refreshProteinTable"></Icon></a>
                              <Dropdown placement="bottom-start" class="sort-dropdown" @on-click="proteinTableSortChange">
                                  <a href="javascript:void(0)">
                                      <Icon type="arrow-swap" size="20"></Icon>
                                  </a>
                                  <DropdownMenu slot="list">
                                      <DropdownItem v-for="item in proteinSortOptions" :name="item.key">{{item.label}}</DropdownItem>
                                  </DropdownMenu>
                              </Dropdown>
                              
                          </span>
                      </p>
                      
                     <div class="download-list-wrapper">
                       <!--<div class="summary-content-header">List</div>-->
                       <div class="download-list">
                         <Table class="protein-table" :loading="proteinTableLoading" border :columns="proteinTableColumn" :data="proteinTableResults" size="small" @on-sort-change=""></Table>
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
                        <span v-if="peptideTableLoading==false && peptideTableResults.length<1" class="no-data-wrapper">No data</span>
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
                        <span v-if="psmTableLoading==false && psmTableResults.length<1" class="no-data-wrapper">No data</span>
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
                       <p slot="title">Consensus Spectrum</p>
                       <div class="download-list-wrapper spectrum-container">
                        <span v-if="!spectrumTableShow" class="no-data-wrapper">No data</span>
                        <Spin fix v-if="spectrumSpinShow"></Spin> 
                         <!-- <iframe id="lorikeetIframe" class="lorikeet-iframe" :src="iframeURL"></iframe> -->
                       </div>
                       <!--<Lorikeet></Lorikeet>-->
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
                                  console.log(params.row);
                                  if(val){
                                    let query = {
                                        proteinAccession:params.row.reportedaccession,
                                        projectAccession:this.$route.params.id,
                                        assayAccession:params.row.assayAccession,
                                        sortConditions:'projectAccession',
                                        sortDirection:'DESC',
                                        page: 0,
                                        pageSize: 20
                                    }
                                    this.getPeptidesEvidences(query);
                                    if (history.pushState) {
                                        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?reportedAccession=' + query.proteinAccession + '&assayAccession=' + query.assayAccession + '&sortConditions='+ query.sortConditions + '&sortDirection='+query.sortDirection + '&page=' + query.page +'&pageSize=' + query.pageSize ;
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
                  //sortable: 'custom',
                  minWidth: 200,
                  // ellipsis:true
              },
              {
                  title: '#Peptides',
                  key: 'numberPeptides',
                  //sortable: true,
                  minWidth: 90,
                  //className:'peptideID'
              },
              {
                  title: '#PSMs',
                  key: 'numberPSMs',
                  //sortable: true,
                  minWidth: 75,
                  //className:'peptideID'
              },
              {
                  title: 'Coverage',
                  key: 'sequenceCoverage',
                  //sortable: true,
                  minWidth: 85,
                  //className:'peptideID'
              },
              {
                  title: 'Assay',
                  key: 'assayAccession',
                  //sortable: true,
                  minWidth: 70,
                  // ellipsis:true
              },
              {
                  title: 'Confidence Score',
                  key: 'bestsearchenginescore',
                  //sortable: true,
                  minWidth: 130,
                  // ellipsis:true
              },
              {
                  title: 'Valid',
                  key: 'valid',
                  //sortable: true,
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
          peptideProteinAccession:'',
          peptideAssayAccession:'',
          peptideTableLoading:false,
          peptideTableColumn: [
              {
                  title: '#',
                  minWidth: 30,
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
                                    let accession = this.$route.params.id + '%3A' + params.row.assayAccession + '%3A'+ params.row.proteinAccession + '%3A'+ params.row.peptideSequence
                                    console.log('accession',accession)
                                    this.getPSM(accession);
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
                  key: 'projectAccession',
                  //sortable: true,
                  minWidth: 140,
                  // ellipsis:true
              },
              {
                  title: 'Peptide Sequence',
                  key: 'peptideSequence',
                  //sortable: true,
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
                  //sortable: true,
                  minWidth: 75,
                  //className:'peptideID'
              },
              {
                  title: 'Start',
                  key: 'startPostion',
                  //sortable: true,
                  minWidth: 60,
                  // ellipsis:true
              },
              {
                  title: 'End',
                  key: 'endPostion',
                  //sortable: true,
                  minWidth: 60,
                  // ellipsis:true
              },
              {
                  title: 'Peptide-level FDR',
                  key: 'peptidelevelFDR',
                  //sortable: true,
                  minWidth: 140,
                  // ellipsis:true
              },
              {
                  title: 'Valid',
                  key: 'isValid',
                  //sortable: true,
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
              {
                  title: 'assayAccession',
                  key: 'assayAccession',
                  width:1,
                  className:'peptidePTMs'
                  // ellipsis:true
              },
              {
                  title: 'proteinAccession',
                  key: 'proteinAccession',
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
                  minWidth: 30,
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
                                  this.showSpectrum(val, params.row.peptideSequence, params.row.peaks)
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
                  // ellipsis:true
              },
              {
                  title: 'Valid',
                  key: 'isValid',
                  //sortable: true,
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
                  className:'psmPTMs'
                  // ellipsis:true
              },
              {
                  title: 'Peaks',
                  key: 'peaks',
                  width:1,
                  className:'psmPTMs'
                  // ellipsis:true
              },
          ],
          psmTableResults:[],
          //selectedProteinTableItem:{},
          spectrumSpinShow:false,
          spectrumTableShow:false,
          proteinPage:0,
          proteinPageSize:20,
          proteinTotal:0,
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
          //peptideSortType:'',
          peptidePage:0,
          peptidePageSize:20,
          peptideTotal:0,
          msRunApi: this.$store.state.baseApiURL + '/msruns/byProject', 
          proteinEvidencesApi: this.$store.state.baseApiURL+ '/proteinevidences',
          peptideEvidencesApi: this.$store.state.baseApiURL+ '/peptideevidences',
          spectraApi: this.$store.state.baseApiURL+ '/spectra',
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
          console.log('this.proteinQuery',this.proteinQuery)
          console.log('query',query)
          this.$http
              .get(this.proteinEvidencesApi,{params: query})
              .then(function(res){
                this.proteinTableResults=[];
                //this.peptideTableResults=[];
                //this.peptideTotal = 0;
                this.proteinTableLoading = false;
                if(res.body && res.body._embedded){
                  console.log('getProteinEvidences',res.body)
                  console.log('getProteinEvidences',res.body._embedded)
                  let proteinEvidences = res.body._embedded.proteinevidences;
                  this.proteinTotal = res.body.page.totalElements;
                  for(let i=0; i < proteinEvidences.length; i++){
                      var item = {
                        reportedaccession: proteinEvidences[i].reportedAccession,
                        assayAccession: proteinEvidences[i].assayAccession,
                        numberPeptides: proteinEvidences[i].numberPeptides,
                        //sequenceCoverage: proteinEvidences[i].sequenceCoverage == 'Infinity' ? '' : Math.round(proteinEvidences[i].sequenceCoverage * 10000)/10000,
                        numberPSMs: proteinEvidences[i].numberPSMs,
                        bestsearchenginescore: proteinEvidences[i].bestSearchEngineScore.value || '',
                        valid: proteinEvidences[i].valid,
                        select:false,
                      }
                      if(proteinEvidences[i].sequenceCoverage == 'Infinity' || proteinEvidences[i].sequenceCoverage== 'NaN')
                        item.sequenceCoverage = ''
                      else
                        item.sequenceCoverage =  Math.round(proteinEvidences[i].sequenceCoverage * 10000)/10000

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
          console.log('getPeptidesEvidences',query)
          this.$http
              .get(this.peptideEvidencesApi,{params: query})
              .then(function(res){
                console.log('getPeptidesEvidences',res.body);
                this.peptideTableResults=[];
                this.peptideTableLoading = false;
                this.peptideTotal = res.body.page.totalElements;
                if(res.body && res.body._embedded){
                  let peptideevidences = res.body._embedded.peptideevidences;
                  console.log('peptideevidences',peptideevidences)
                  for(let i=0; i < peptideevidences.length; i++){
                      var item = {
                        projectAccession: peptideevidences[i].projectAccession,
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
                  this.peptideTotal = 0;
                }
              },function(err){
                  this.peptideTotal = 0;
                  this.peptideTableResults=[];
                  this.peptideTableLoading = false;
                  this.$Message.error({content:'Peptide Search Error', duration:3});
              });
      },
      getPSM(accession){
          this.psmTableLoading = true;
          this.$http
              .get(this.peptideEvidencesApi + '/'+ accession +'/psms')
              .then(function(res){
                this.psmTableResults=[];
                this.psmTableLoading = false;
                if(res.body){
                  let psm = res.body;
                  console.log('psm',psm)
                  for(let i=0; i < psm.length; i++){
                      var item = {
                        //proteinAccession: psm[i].projectAccession,
                        peptideSequence: psm[i].peptideSequence,
                        decoy: psm[i].decoy,
                        isValid: psm[i].isValid,
                        //startPostion: psm[i].startPostion,
                        //endPostion: psm[i].endPostion,
                        ptms:psm[i].ptms,
                        select:false,
                      }
                      //add psmlevelFDR for item
                      for(let j=0; j<psm[i].attributes.length; j++){
                          if(psm[i].attributes[j].name && psm[i].attributes[j].name.indexOf('FDR')!=-1){
                              item.psmlevelFDR = parseFloat(psm[i].attributes[j].value).toFixed(10)
                              break;
                          }
                      }
                      //add peaks for item
                      let peaksArray = [];
                      for(let j=0; j<psm[i].intensities.length; j++){
                          let item = {
                            mz:psm[i].mzs[j],
                            intensity:psm[i].intensities[j]
                          }
                          peaksArray.push(item)
                      }
                      item.peaks = peaksArray;
                      this.psmTableResults.push(item);

                  }
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
      getSpectra(){
          let query = {
            projectAccession: this.$route.params.id
          }
          this.psmTableLoading = true;
          this.$http
              .get(this.spectraApi,{params: query})
              .then(function(res){
                this.psmTableResults=[];
                this.psmTableLoading = false;
                if(res.body){
                  let psm = res.body._embedded.spectraevidences;
                  for(let i=0; i < psm.length; i++){
                      var item = {
                        //proteinAccession: psm[i].projectAccession,
                        peptideSequence: psm[i].peptideSequence,
                        decoy: psm[i].decoy,
                        isValid: psm[i].isValid,
                        //startPostion: psm[i].startPostion,
                        //endPostion: psm[i].endPostion,
                        ptms:psm[i].ptms,
                        select:false,
                      }
                      //add psmlevelFDR for item
                      for(let j=0; j<psm[i].attributes.length; j++){
                          if(psm[i].attributes[j].name && psm[i].attributes[j].name.indexOf('FDR')!=-1){
                              item.psmlevelFDR = parseFloat(psm[i].attributes[j].value).toFixed(10)
                              break;
                          }
                      }
                      //add peaks for item
                      let peaksArray = [];
                      for(let j=0; j<psm[i].intensities.length; j++){
                          let item = {
                            mz:psm[i].mzs[j],
                            intensity:psm[i].intensities[j]
                          }
                          peaksArray.push(item)
                      }
                      item.peaks = peaksArray;
                      this.psmTableResults.push(item);
                  }
                  console.log('this.psmTableResults[0]',this.psmTableResults[0])
                  this.psmTableResults[0].select = true; 
                  this.showSpectrum(this.psmTableResults[0].select, this.psmTableResults[0].peptideSequence, this.psmTableResults[0].peaks);
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
      proteinPageChange(page){
          this.proteinPage = page-1;
          if(this.$route.query && this.$route.query.proteinAccession)
            return
          this.getProteinEvidences();
      },
      proteinPageSizeChange(size){
          this.proteinPageSize = size;
          if(this.$route.query && this.$route.query.proteinAccession)
            return
          this.getProteinEvidences();
      },
      proteinTableSortChange(item){
        let query = {
              projectAccession :this.$route.params.id,
              sortConditions:item,
              sortDirection:'DESC',
              page : 0,
              pageSize :20,
              reportedAccession:'',
          }
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
                sortConditions:'projectAccession',
                sortDirection:'DESC',
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
      showSpectrum(val, peptideSequence, peaks){
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
                  iframe.style.height = '720px'
                  iframe.style.borderWidth = '0';
                  document.querySelector(".spectrum-container").appendChild(iframe)
                  document.querySelector("#lorikeetIframe").onload = ()=>{
                    this.spectrumTableShow=true;
                    this.spectrumSpinShow = false;
                    console.log(peptideSequence,peaks)
                    document.querySelector("#lorikeetIframe").contentWindow.postMessage({sequence: peptideSequence, peaks:peaks}, location.origin);
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
              // this.peptideProteinAccession = params.row.reportedaccession
              // this.peptideAssayAccession = params.row.assayAccession
              // this.getPeptidesEvidences();
              // if (history.pushState) {
              //     var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?accession=' + this.$route.params.id + '%3A' + this.peptideAssayAccession + '%3A'+ this.peptideProteinAccession;
              //     window.history.pushState({path:newurl},'',newurl);
              // }
          }
          else{
              this.spectrumSpinShow = false;
              this.spectrumTableShow=false;
              document.querySelector("#lorikeetIframe").remove();
          }
      },
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
          normalQuery.proteinAccession=''
          normalQuery.projectAccession=this.$route.params.id //this.peptideProjectAccession
          normalQuery.assayAccession=''
          normalQuery.sortDirection='DESC'
          normalQuery.sortConditions='projectAccession'
          normalQuery.page = this.peptidePage
          normalQuery.pageSize = this.peptidePageSize
          return normalQuery;
      }
    },
    mounted: function(){
        //console.log('this.$route',this.$route);
        if(Object.keys(this.$route.query).length === 0){
          this.getPeptidesEvidences();
          this.getProteinEvidences();
          this.getSpectra();
          
        }
        else{
          this.getProteinEvidences(this.$route.query);
        }
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
    height: 498px;
  }
  .download-list-wrapper.psm-container{
    height: 496px !important;
  }
   .download-list-wrapper.spectrum-container{
      height: 730px !important;
   }
  .no-data-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    /*border: 1px solid #5bc0be;*/
    height: 100%;
    width: 100%;
    z-index:-1;
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
      height: 720px;
      border-width:0;
  }
  .table-header a{
      border-bottom-style:none;
  }
  .table-header a:hover{
      border-bottom-style:none;
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

