<template>
  <div class="moleculo-container">
    <div class="panel nav"><NavBar page="archive"/></div>
    <div class="content">
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="24">
              <div class="visualization-wrapper">
                  <Card>
                      <p slot="title">Search Spectra</p>
                      <div class="search-container">
                          <div class="search-input">     
                              <div class="search-input-wrapper peptidome">
                                  <div class="fake-input">
                                    <div class="tag-wrapper">
                                        <!-- <Tag class="tag-in-search-input" v-for="(item,index) in tagArray" :key="index" closable @on-close="tagDelete">{{item}}</Tag> -->
                                        <!-- <Select
                                            ref="searchRef"
                                            v-model="selectTemp"
                                            filterable
                                            remote
                                            placeholder="input here"
                                            :remote-method="searchInputChange"
                                            :loading="searchInputLoading"
                                            @on-open-change="searchInputLoadingDropdownOpen"
                                            style="width:500px">
                                            <Option v-for="(item, index) in autoCompleteArray" :value="item" :key="index">{{item}}</Option>
                                        </Select> -->
                                        <Input class="tag-input" v-model="keyword" placeholder="input here" size="small"></Input>
                                    </div>
                                    <Icon type="ios-search"></Icon>
                                  </div>
                              </div>
                              <!--
                              <AutoComplete
                                  class="archive-search-input"
                                  v-model="keyword"
                                  @on-search="keywordSearch"
       
                                  icon="ios-search"
                                  :filter-method="autoCompleteFilter"
                                  placeholder="input here"
                                  style="width: 100%" 
                                  size="large">
                              </AutoComplete>
                            -->
                          </div>

                          <div class="search-filter">
                            <!--
                              <div class="filter-wrapper">
                                  <div class="filter-condition">
                                      <Select ref="fieldRef" class="filter-selector" v-model="fieldValue" style="width:200px" @on-change="fieldChange">
                                          <Option v-for="item in fieldSelectors" :value="item.value" :label="item.label" :key="item.value" >
                                                  <span>{{ item.label }}</span>
                                                  <span style="float:right;color:#ccc">{{item.number}}</span>
                                          </Option>
                                      </Select>
                                  </div>
                                  <span class="separator">></span>
                                  <div class="filter-condition ">
                                      <Select ref="containRef" class="filter-selector input-search-needed" v-model="containValue" style="min-width:200px" size="small" filterable remote :remote-method="querySpecificFacets" :loading="querySpecificFacetsLoading" @on-change="containChange" loading-text="loading..." @on-open-change="containDropdownOpen" @on-query-change="queryChange">
                                          <Option v-for="item in containSelectors" :value="item.value" :label="item.label" :key="item.value">
                                            <span>
                                                  <span>{{ item.label }}</span>
                                                  <span style="color:#ccc"><span v-if="item.number">(</span>{{item.number}}<span v-if="item.number">)</span></span>
                                            </span>
                                          </Option>
                                      </Select>
                                  </div>
                              </div>
                            -->
                              <div class="search-button">
                                  <a class="button search-button" @click="submitSearch">Search</a>
                              </div>
                          </div>
                          <!-- <div class="search-condition-container">
                            <div class="tag-container">
                                <Tag type="border" v-for="(item,index) in tagArray" :key="index" closable @on-close="tagDelete">{{item}}</Tag>
                            </div>
                          </div>
                          <div v-for="(item, index) in filterCombination" class="search-condition-container">
                            <div class="tag-container">
                                <Tag type="border" closable @on-close="conditionDelete(index,item)">
                                  <Dropdown>
                                      <a class="dropdown-action" href="javascript:void(0)">
                                          {{item.condition}}
                                          <Icon type="arrow-down-b"></Icon>
                                      </a>
                                      <DropdownMenu slot="list">
                                          <DropdownItem @click.native="conditionChange(index,'And')">And</DropdownItem>
                                          <DropdownItem @click.native="conditionChange(index,'Not')">Not</DropdownItem>
                                          <DropdownItem @click.native="conditionChange(index,'Or')">Or</DropdownItem>
                                      </DropdownMenu>
                                  </Dropdown>
                                  <span class="search-condition">{{item.field}} > {{item.contains}} </span>
                                </Tag>
                            </div>
                          </div> -->
                      </div>
                  </Card>   
              </div>
          </Col>
      </Row>
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="24">
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
                     <div v-if="!psmItemSelected" class="page-container">
                       <Page :total="spectraTotal" :page-size="spectraPageSize" :current="spectraPage" size="small" show-sizer show-total @on-change="spectraPageChange" @on-page-size-change="spectraPageSizeChange"></Page>
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
          peptideProteinAccession:'',
          spectraAssayAccession:'',
          peptideTableLoading:false,
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
                                      //console.log(params.row)
                                      this.getSpectrum(params.row.usi);
                                  }
                                  else{
                                      this.psmItemSelected = false;
                                      this.getSpectra();
                                  }
                                      
                                  
                                  if (history.pushState) {
                                        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?usi=' + params.row.usi;
                                        window.history.pushState({path:newurl},'',newurl);
                                    }

                                  this.spectrumTableCollapseChange(!val);
                                  

                                  // this.showSpectrum(val, params.row.peptideSequence, params.row.peaks, params.row.charge, params.row.precursorMZ, params.row.variableMods)
                              }
                          }
                      });
                  }
              },
              {
                  title: 'Accession',
                  key: 'accession',
                  //sortable: true,
                  minWidth: 75,
                  render: (h, params) => {
                      return h('div', [
                          h('a', {
                              on: {
                                  click: () => {
                                      this.$router.push({name:'dataset',params:{id:params.row.accession}});
                                      //console.log('params',params)
                                  }
                              }
                          }, params.row.accession),
                      ]);
                  }
              },
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
                  minWidth: 60,
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
                  title: 'PrecursorMZ',
                  key: 'precursorMZ',
                  minWidth: 80,
                  // ellipsis:true
              },
              {
                  title: 'Charge',
                  key: 'charge',
                  minWidth: 40,
                  // ellipsis:true
              },
              {
                  title: 'Pass submitter Threshold',
                  key: 'isThreshold',
                  //sortable: true,
                  minWidth: 150,
                  align: 'center',
                  render: (h, params) => {
                      var className
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
          spectraPage:1,
          spectraPageSize:20,
          spectraTotal:0,
          spectraSortDirection:'DESC',
          spectraSortConditions:'projectAccession',
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
          selectTemp:'',
          keyword:'',
          searchInputLoading:false,
          autoCompleteArray:[],
          //peptideSortType:'',
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
        this.getSpectra(to.query);
      next();
    },
    components: {
      NavBar
    },
    methods:{
      getSpectra(q){
          console.log('getSpectra111',q)
          let query = q || this.spectraQuery
          this.keyword = q ? q.peptideSequence : ''
          this.psmTableLoading = true;
          this.$http
              .get(this.spectraApi,{params: query})
              .then(function(res){
                this.psmTableResults=[];
                this.psmTableLoading = false;
                if(res.body && res.body._embedded){
                  this.spectraTotal = res.body.page.totalElements;
                  //this.spectraPage = res.body.page.number;
                  //this.spectraPageSize = res.body.page.size;
                  let psm = res.body._embedded.spectraevidences;
                  console.log('psm',res.body._embedded)
                  for(let i=0; i < psm.length; i++){
                      var item = {
                        //proteinAccession: psm[i].projectAccession,
                        peptideSequence: psm[i].peptideSequence,
                        accession: psm[i].usi.split(':')[1],
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
                      if(psm[i].attributes){
                          for(let j=0; j<psm[i].attributes.length; j++){
                              if(psm[i].attributes[j].name && psm[i].attributes[j].name.indexOf('FDR')!=-1){
                                  item.psmlevelFDR = parseFloat(psm[i].attributes[j].value).toExponential(3)
                                  break;
                              }
                          }
                      }
                      //add isThreshold
                      let found = false;
                      for(let j=0; j<psm[i].attributes.length; j++){
                          if(psm[i].attributes[j].name && psm[i].attributes[j].name.indexOf('threshold')!=-1){
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
                      if(psm[i].intensifties){
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
                      
                      if(psm[i].ptms){
                          //add variableMods for item
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
          let query = {usi:usi};
          this.$http
              .get(this.spectrumApi,{params: query})
              .then(function(res){
                this.psmTableResults=[];
                this.psmTableLoading = false;
                if(res.body){
                  let psm = res.body;
                  console.log('usi',psm)
                      var item = {
                        //proteinAccession: psm[i].projectAccession,
                        peptideSequence: psm.peptideSequence,
                        accession: psm.usi.split(':')[1],
                        decoy: psm.decoy,
                        isValid: psm.valid,
                        charge:psm.charge,
                        precursorMZ:psm.precursorMZ,
                        ptms:psm.ptms,
                        usi:psm.usi,
                        select:true,
                        psmMoreArray:[]
                      }
                      this.keyword = item.peptideSequence;
                      //add psmlevelFDR for item
                      for(let j=0; j<psm.attributes.length; j++){
                          if(psm.attributes[j].name && psm.attributes[j].name.indexOf('FDR')!=-1){
                              item.psmlevelFDR = parseFloat(psm.attributes[j].value).toExponential(3)
                              break;
                          }
                      }
                      //add isThreshold
                      let found = false;
                      for(let j=0; j<psm.attributes.length; j++){
                          if(psm.attributes[j].name && psm.attributes[j].name.indexOf('threshold')!=-1){
                              found = true;
                              item.isThreshold = psm.attributes[j].value == 'true' ? true : false
                              break;
                          }
                      }
                      if(!found)
                          item.isThreshold = false

                      //add for More option
                      for(let j=0; j<psm.attributes.length; j++){
                          let tempItem = {
                            name:psm.attributes[j].name,
                            value:psm.attributes[j].name+': '+psm.attributes[j].value
                          }
                          item.psmMoreArray.push(tempItem)
                      }

                      if(psm.intensities){
                          //add peaks for item
                          let peaksArray = [];
                          for(let j=0; j<psm.intensities.length; j++){
                              let item = {
                                mz:psm.mzs[j],
                                intensity:psm.intensities[j]
                              }
                              peaksArray.push(item)
                          }
                          item.peaks = peaksArray;
                      }
                      
                      if(psm.ptms){
                          //add variableMods for item
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
                          item.variableMods = variableModsArray;
                      }
                      
                      this.psmTableResults.push(item);

                      this.spectrumTableCollapseChange(!true);
                      this.showSpectrum(true, item.peptideSequence, item.peaks, item.charge, item.precursorMZ, item.variableMods)
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
      spectraPageChange(page){
          console.log(page)
          this.spectraPage = page;
          //console.log('spectraPageChange',this.spectraPage)
          // if(this.$route.query && this.$route.query.proteinAccession)
          //   return
          let query = {
            //reportedProtein:params.row.proteinAccession,
            //peptideEvidenceAccession:params.row.accession,
            peptideSequence:this.keyword,
            sortConditions:'projectAccession',
            sortDirection:'DESC',
            page:this.spectraPage-1,
            pageSize :this.spectraPageSize,
          }
    
          this.$router.push({name: 'spectra', query: query});
      },
      spectraPageSizeChange(size){
          this.spectraPageSize = size;
          // if(this.$route.query && this.$route.query.proteinAccession)
          //   return

          let query = {
            //reportedProtein:params.row.proteinAccession,
            //peptideEvidenceAccession:params.row.accession,
            peptideSequence:this.keyword,
            sortConditions:'projectAccession',
            sortDirection:'DESC',
            page:this.spectraPage-1,
            pageSize :this.spectraPageSize,
          }
          this.$router.push({name: 'spectra', query: query});
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
              document.querySelector('.spectrum-container').style.height = '730px'
              if(this.psmItemSelected){
                  if(document.querySelector('#lorikeetIframe'))
                    document.querySelector('#lorikeetIframe').style.display= 'block'
                  this.spectrumTableHint = ""
              }
              else
                  this.spectrumTableHint = "Please select one PSM"
          }
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
                  iframe.style.height = '720px'
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
      },
      searchInputChange (query, splitBool) {
          if(splitBool){
            //console.log('searchInputChange',query);
            this.tadAdd(query);
            this.$refs.searchRef.setQuery(null);
          }

          if(query !== ''){
             // console.log('query',query);
              this.searchInputLoading = false;
              // this.$http
              //     .get(this.autoCompleteApi + query)
              //     .then(function(res){
              //        this.autoCompleteArray=res.body;
              //     },function(err){

              //     });
          }
          else{
            this.autoCompleteArray = [];
          }
      },
      searchInputLoadingDropdownOpen(open){
          if(open){
              window.addEventListener('mousedown', this.searchInputBlur, false);
              window.addEventListener('touchstart', this.searchInputBlur, false);
          }
          else{
            window.removeEventListener('mousedown', this.searchInputBlur, false);
            window.removeEventListener('touchstart', this.searchInputBlur, false);
          }
      },
      submitSearch(){
        //let temp = this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').value;
        // if(temp && this.tagArray.length == 0){
        //   this.$refs.searchRef.setQuery(null);
        // }
        let query = {
            //reportedProtein:params.row.proteinAccession,
            //peptideEvidenceAccession:params.row.accession,
            peptideSequence:this.keyword,
            sortConditions:'projectAccession',
            sortDirection:'DESC',
        }
        console.log('submitSearch',query);
        if(this.keyword === this.$route.query.peptideSequence){
          location.reload();
        }
        else
          this.$router.push({name: 'spectra', query: query});
        //this.$Message.success({content:'new result', duration:1});
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
      spectraQuery:function(){
          let normalQuery = {}
          normalQuery.reportedProtein=''
          normalQuery.peptideEvidenceAccession=''
          normalQuery.peptideSequence=''
          normalQuery.projectAccession=this.$route.params.id //this.peptideProjectAccession
          normalQuery.assayAccession=''
          normalQuery.sortDirection='DESC'
          normalQuery.sortConditions='projectAccession'
          return normalQuery;
      },
    },
    mounted: function(){
        //window.addEventListener("resize", this.change);
        if(Object.keys(this.$route.query).length === 0){
          console.log('111');
          //this.getPeptidesEvidences();
          //this.getProteinEvidences();
          let query = {
            page: this.spectraPage-1,
            pageSize: this.spectraPageSize
          }
          this.getSpectra(query);
        }
        else{
          if('usi' in this.$route.query){
            this.getSpectrum(this.$route.query.usi);
          }
          else{
              if(this.$route.query.page)
                  this.spectraPage = parseInt(this.$route.query.page) + 1;
              if(this.$route.query.pageSize){
                  let tempPageSize = parseInt(this.$route.query.pageSize);
                  if(tempPageSize == 10 || tempPageSize == 20 || tempPageSize == 30 || tempPageSize == 40)
                    this.spectraPageSize = parseInt(this.$route.query.pageSize)
                  else 
                    this.spectraPageSize = 20
              }
              this.getSpectra(this.$route.query);
          } //if('peptideSequence' in this.$route.query)
            

          //this.getProteinEvidences(this.$route.query);
        }
    },
    beforeDestroy(){
        //window.removeEventListener("resize", this.changeNum);
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
    padding: 30px 0 30px 0;
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
      height: 720px;
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
  .search-input{
    text-align: center;
    margin-bottom: 10px;
  }
  .search-input-wrapper{
    position: relative;
  }
  .search-input-wrapper .fake-input{
    padding-right: 32px;
    border-radius: 3px !important;
        font-size: 14px;
    padding: 6px 7px;
    height: 36px;
    display: flex;
    align-items: center;
    width: 100%;
    line-height: 1.5;
        border: 1px solid #5bc0be;
            color: #495060;
                background-color: #fcfcfc;
    background-image: none;
    cursor: text;
    text-align:left;
  }
  .search-input-wrapper .tag-wrapper{
    display: inline-block;
    width: 100%
   /* position: absolute;*/
  }

  .search-input-wrapper .tag-wrapper .tag-in-search-input:hover{
      opacity: 1 !important;
  }
  .search-input-wrapper .tag-wrapper .tag-in-search-input{
      background: none !important;
  }
  .search-input-wrapper .tag-wrapper .ivu-select{
      width: auto
  }
  .search-filter{
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: space-between;
  }
  .search-button a{
      padding: 8px 10px;
      font-size: 12px;
      width: 100%;
      margin-bottom: 0;
      margin-top: 5px;
      /*padding: 20px 85px;
      font-size: 24px;*/
      font-weight: 700;
      background-color: #5bc0be;
      border-radius: 3px;
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
  .search-input .tag-input .ivu-input{
      width: 100%;
      height: 29px;
      line-height: 32px;
      padding: 0 0 0 4px;
      display: inline-block;
      font-size: 14px;
      outline: 0;
      border: none !important;
      box-sizing: border-box;
      color: #495060;
      background-color: transparent;
      position: relative;
      margin:0 !important;
      box-shadow:none !important;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-selection{
      border:none !important;
      box-shadow:none !important;
      background: none;
      padding:0;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-selection input:focus{
      border:none !important;
      box-shadow:none !important;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-selection input{
      border:none !important;
      box-shadow:none !important;
      background: none;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-dropdown{
      /*display: none;*//******this will be removed when autocomplete function needed********/
    }
    .peptide-table .peptideID{
      display: none;
    }
    .search-input-wrapper.peptidome .ivu-select-dropdown{
      display: none;
    }
</style>

