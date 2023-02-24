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
                          <Input id="spectra-bar-pride" v-model="keyword" placeholder="search" size="large" @on-keyup.enter.prevent="submitSearch">
                              <span slot="prepend" style="width: 100px">USI</span>
                              <Button slot="append" @click="submitSearch">Search</Button>
                          </Input>
                          <div style="margin-top: 10px; display: flex; justify-content: space-between;">
                            <span>
                              Example:
                              <Tooltip content="mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555" style="margin-left: 5px">
                                <div slot="content">
                                    <p>mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555:VLHPLEGAVVIIFK/2</p>
                                </div>
                                  <a @click="gotoExampleUSI('mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555:VLHPLEGAVVIIFK/2')" style="color:#666">USI for VLHPLEGAVVIIFK/2</a>
                              </Tooltip>
                              <Tooltip content="mzspec:PXD004939:Rice_phos_ABA_3h_20per_F1_R2:scan:2648" style="margin-left: 5px">
                                <div slot="content">
                                    <p>mzspec:PXD004939:Rice_phos_ABA_3h_20per_F1_R2:scan:2648:DAEKS[UNIMOD:21]PIN[UNIMOD:7]GR/2</p>
                                </div>
                                  <a @click="gotoExampleUSI('mzspec:PXD004939:Rice_phos_ABA_3h_20per_F1_R2:scan:2648:DAEKS[UNIMOD:21]PIN[UNIMOD:7]GR/2')" style="color:#666">DAEKSPINGR</a>
                              </Tooltip>
                            </span>
                            <a href="#" slot="extra" @click.prevent="gotoUSI" style="color:#666">
                                What is USI?
                            </a>
                          </div>
                          <Spin size="large" fix v-if="spinShow"></Spin>
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
                    <span><Icon type="md-stats" size="14" style="margin-right: 5px"/>Spectrum</span> 
                    <span v-if="spectrumFound" class="right">
                        <a v-if="spectrumTableFoldBool" href="javascript:void(0)"><Icon type="md-arrow-dropright" size="20" @click="spectrumTableFold(false)"></Icon></a>
                        <a v-else href="javascript:void(0)"><Icon type="md-arrow-dropdown" size="20" @click="spectrumTableFold(true)"></Icon></a>
                    </span>
                 </p>
                 <div class="spectrum-container">
                    <div style="color:#bdbdbd; text-align: center;">
                        <span v-if ="spectrumTableFoldBool">{{spectrumTableHint}}</span>
                    </div>
                 </div>
              </Card>
            </div>
        </Col>
      </Row>
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="24">
              <div class="visualization-wrapper">
                  <Card class="card usi">
                      <p slot="title" class="table-header"> 
                          <span><Icon type="md-reorder" size="14" style="margin-right: 5px"/>USI Details <span v-if="bestSearch" style="color:#d37878">[Spectrum Match Found in PRIDE Archive]</span></span>
                          <span v-if="spectrumFound" class="right">
                              <Input v-if ="!usiTableFoldBool" type="text" v-model="usiTableSearchKeyword" placeholder="" size="small" suffix="ios-search" style="margin-right: 10px; width:auto" @on-change="searchUSIDetailsTable">
                              </Input>
                              <a v-if="usiTableFoldBool" href="javascript:void(0)"><Icon type="md-arrow-dropright" size="20" @click="usiTableFold(false)"></Icon></a>
                              <a v-else href="javascript:void(0)"><Icon type="md-arrow-dropdown" size="20" @click="usiTableFold(true)"></Icon></a>
                          </span>
                      </p>
                      <div class="download-list-wrapper usi-container">
                          <div style="color:#bdbdbd; text-align: center;">
                              <span v-if ="usiTableFoldBool">{{usiTableHint}}</span>
                          </div>
                          <Table v-if ="spectrumFound" row-key="id" :row-class-name="rowClassName" class="usi-table" :loading="usiTableLoading" border :columns="usiTableColumn" :data="usiTableResults" size="small"></Table>
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
                          <span><Icon type="md-reorder" size="14" style="margin-right: 5px"/>PRIDE Archive PSM Search</span>
                          <span v-if="psmFound" class="right">
                              <!-- <Input v-if ="!psmTableFoldBool" type="text" placeholder="" size="small" suffix="ios-search" style="margin-right: 10px; width:auto" @on-change="searchPSMTable">
                              </Input> -->
                              <a v-if="psmTableFoldBool" href="javascript:void(0)"><Icon type="md-arrow-dropright" size="20" @click="psmTableFold(false)"></Icon></a>
                              <a v-else href="javascript:void(0)"><Icon type="md-arrow-dropdown" size="20" @click="psmTableFold(true)"></Icon></a>
                          </span>
                      </p>
                      <div class="download-list-wrapper psm-container">
                          <div style="color:#bdbdbd; text-align: center;">
                              <span v-if ="psmTableFoldBool">{{psmTableHint}}</span>
                          </div>
                          <Table v-if ="psmFound" class="psm-table" :loading="psmTableLoading" border :columns="psmTableColumn" :data="psmTableResults" size="small"></Table>
                          <div v-if ="psmFound" class="psm-table-page-container">
                            <Page :total="totalPsmTableItem" :page-size="psmTablePageSize" :current="currentPsmTablePage" size="small" show-sizer show-total class-name="page" @on-change="psmTablePageChange" @on-page-size-change="psmTablePageSizeChange"></Page>
                          </div>
                      </div>
                  </Card>
              </div>
          </Col>
      </Row>
      <Row type="flex" justify="center" class="code-row-bg">
          <Col span="24">
              <div class="visualization-wrapper">
                  <Card class="card protein">
                      <p slot="title"> <Icon type="md-quote" size="12" style="margin-right: 5px"/></i>Citations</p> 
                      <div class="citations-container">
                          <ul>
                            <li>
                              Perez-Riverol Y, Bai J, Bandla C, García-Seisdedos D, Hewapathirana S, Kamatchinathan S, Kundu DJ, Prakash A, Frericks-Zipper A, Eisenacher M, Walzer M, Wang S, Brazma A, Vizcaíno JA. The PRIDE database resources in 2022: a hub for mass spectrometry-based proteomics evidences. Nucleic Acids Res. 2022 Jan 7;50(D1):D543-D552. doi: 10.1093/nar/gkab1038. <a href="https://academic.oup.com/nar/article/50/D1/D543/6415112">PMID: 34723319</a>.
                            </li>
                            <Divider />
                            <li>
                              Deutsch EW, Perez-Riverol Y, Carver J, Kawano S, Mendoza L, Van Den Bossche T, Gabriels R, Binz PA, Pullman B, Sun Z, Shofstahl J, Bittremieux W, Mak TD, Klein J, Zhu Y, Lam H, Vizcaíno JA, Bandeira N. Universal Spectrum Identifier for mass spectra. Nat Methods. 2021 Jul;18(7):768-770. doi: 10.1038/s41592-021-01184-6. Epub 2021 Jun 28. <a href="https://www.nature.com/articles/s41592-021-01184-6">PMID: 34183830</a>.
                            </li>
                            <Divider />
                            <li>
                              Hulstaert N, Shofstahl J, Sachsenberg T, Walzer M, Barsnes H, Martens L, Perez-Riverol Y. ThermoRawFileParser: Modular, Scalable, and Cross-Platform RAW File Conversion. J Proteome Res. 2020 Jan 3;19(1):537-542. doi: 10.1021/acs.jproteome.9b00328. Epub 2019 Dec 6. <a href="https://pubs.acs.org/doi/10.1021/acs.jproteome.9b00328">PMID: 31755270</a>.
                            </li>
                          </ul>
                      </div>
                  </Card>
              </div>
          </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/Nav'
  import store from "@/store.js"
  export default {
    name: 'archive',
    data(){
      return {
          iframeURL:this.$store.state.baseURL + '/lorikeet/html/pride.html',
          proteinAccessionInputModel:'',
          peptideSequenceInputModel:'',
          proteinSequence:'',
          proteinSequenceArray:[],
          proteinSequenceFold:true,
          proteinTableLoading: false,
          proteinTableHint:'Please select one Protein',
          spectrumTableHint:'No Spectrum',
          usiTableHint:'No USI Details',
          psmTableHint:'No PSM',
          peptideProteinAccession:'',
          spectraAssayAccession:'',
          peptideTableLoading:false,
          psmTableLoading:false,
          usiTableLoading:false,
          bestSearch:false,
          usiTableColumn: [
              {
                  title: 'Key',
                  key: 'key',
                  width: 250,
                  tree:true,  
                  // renderHeader: (h, params) =>{
                  //     return h('div', [
                  //         h('span', {
                  //             style:{
                  //               color:'#444'
                  //             },
                  //             class:{
                  //               // projectAction:true
                  //             },
                  //         },'Key11'),
                  //     ]);
                  // }
              },
              {
                  title: 'Value',
                  key: 'value',
                  sortable: true,
                  minWidth: 150,
                  align: 'center',
                  render: (h, params) => {
                      // console.log('params',params)
                      if(params.row.key == 'Pubmed Id')
                        return h('div', [
                            h('a', {
                                style:{
                                  color:'#444'
                                },
                                class:{
                                  projectAction:true
                                },
                                on: {
                                    click: () => {
                                        window.open('http://europepmc.org/article/MED/' + params.row.value)
                                    }
                                }
                            }, params.row.value),
                        ]);
                      else if(params.row.key == 'Project Accession')
                        return h('div', [
                            h('a', {
                                style:{
                                  color:'#444'
                                },
                                class:{
                                  projectAction:true
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({name:'dataset',params:{id:params.row.value}});
                                    }
                                }
                            }, params.row.value),
                        ]);
                      else if(params.row.key == 'Project DOI')
                        return h('div', [
                            h('a', {
                                style:{
                                  color:'#444'
                                },
                                class:{
                                  projectAction:true
                                },
                                on: {
                                    click: () => {
                                        window.open('https://www.doi.org/' + params.row.value)
                                    }
                                }
                            }, params.row.value),
                        ]);
                      else 
                        return h('div', [
                            h('span', {
                                style:{
                                  color:'#444'
                                },
                                class:{
                                  // projectAction:true
                                },
                            }, params.row.value),
                        ]);
                  },
                  // renderHeader: (h, params) =>{
                  //     return h('div', [
                  //         h('span', {
                  //             style:{
                  //               color:'#444'
                  //             },
                  //             class:{
                  //               // projectAction:true
                  //             },
                  //         }, 'Value22'),
                  //     ]);
                  // }
              },  
          ],
          psmTableColumn:[
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
                                  this.psmTableResults.forEach(item => {
                                      this.$set(item,'select',false) //select string is the item name from the params.row
                                  })
                                  if(val){ // checkbox is seleted
                                      this.psmTableResults[params.index].select= val;
                                      this.keyword = params.row.usi
                                      console.log('this.keyword',this.keyword)
                                      this.getSpectrum({usi:params.row.usi}) 
                                  }
                                  else{ // checkbox is unseleted
                                      this.keyword = ''
                                      this.getSpectrumFail()//we could remove all the table content, if we deselect the checkbox，it depends our demand
                                  }
                                  if (history.pushState) {
                                    console.log('history.pushState',history.pushState)
                                         var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?usi=' + params.row.usi + '&resultType=FULL';
                                         window.history.pushState({path:newurl},'',newurl);
                                  }
                                  
                              }
                          }
                      });
                  }
              },
              {
                  title: 'Project Accession', 
                  key: 'accession', 
                  width: 140,
                  align: 'center',
                  sortable: true,
              },
              {
                  title: 'Peptidoform',
                  key: 'peptidoform',
                  minWidth: 150,
                  align: 'center',
                  sortable: true,
              },  
              {
                  title: 'USI',
                  key: 'usi',
                  minWidth: 150,
                  align: 'center',
                  sortable: true,
              },  
          ],
          psmTableResults:[],
          usiTableResults:[],
          usiTableResultsRAW:[],
          spectrumSpinShow:false,
          spectrumTableShow:false,
          spectrumTableFoldBool:true,
          usiTableFoldBool:true,
          psmTableFoldBool:true,
          spectrumFound:false,
          psmFound:true,
          spinShow:false,
          psmTableSpinShow:false,
          totalPsmTableItem:0,
          psmTablePageSize:20,
          currentPsmTablePage:1,          
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
          usiTableSearchKeyword:'',
          searchInputLoading:false,
          autoCompleteArray:[],
          msRunApi: this.$store.state.baseApiURL + '/msruns/byProject', 
          proteinEvidencesApi: this.$store.state.baseApiURL+ '/proteinevidences',
          peptideEvidencesApi: this.$store.state.baseApiURL+ '/peptideevidences',
          spectraApi: this.$store.state.baseMoleculesApiURL+ '/spectra/search',
          spectrumApi: this.$store.state.baseMoleculesApiURL+ '/spectrum',
          psmApi: this.$store.state.baseMoleculesApiURL+ '/search/usi',
          tableMappingJsonURL: this.$store.state.baseURL + '/spectrum/tableMapping.json'
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      if(to.query){
        this.getSpectrum(to.query); 
      }
      next();
    },
    components: {
      NavBar
    },
    methods:{
      getSpectrum(q){ // we use "q(query)"" but not "usi string". because beforeRouteupdate only has "to.query" which is the obj not a string. We all use the obj to unform the parameters
          this.spectrumFound = false
          this.spectrumTableHint = 'No Spectrum'
          this.usiTableHint = 'No USI Details'
          this.spectrumTableFold(true)
          this.usiTableFold(true)
          this.removeBestSearchHighlight()
          if(!q.hasOwnProperty("usi")){
            console.log('no usi')
            //When route update, there is no usi item in the url
          }
          else{
                this.spinShow = true
                let query = {usi:q.usi,resultType:'FULL'};
                this.$http
                    .get(this.spectrumApi,{params: query})
                    .then(function(res){
                      this.spinShow = false
                      this.usiTableResults=[]
                      this.usiTableResultsRAW=[]
                      this.usiTableLoading = false
                      if(res.body){
                        this.spectrumFound = true
                        this.spectrumTableHint = 'Click to show more'
                        this.usiTableHint = 'Click to show more'
                        let psm = res.body;
                        let peptideSequence = psm.peptideSequence
                        let charge = psm.precursorCharge
                        let precursorMz = psm.precursorMz
                        // console.log(psm)
                        //calculate peaks for spectrum
                        let peaks 
                        if(psm.intensities){
                            let peaksArray = [];
                            for(let j=0; j<psm.intensities.length; j++){
                                let item = {
                                  mz:psm.masses[j],
                                  intensity:psm.intensities[j]
                                }
                                peaksArray.push(item)
                            }
                            peaks = peaksArray;
                        }
                        //calculate variableMods for spectrum 
                        let variableMods = [];
                        let ntermMod = 0;
                        let ctermMod =  0;
                        if(psm.modifications) {
                          let variableModsArray = [];
                          for (let j = 0; j < psm.modifications.length; j++) {
                            for (let k = 0; k < psm.modifications[j].positionMap.length; k++) {
                              if ((psm.modifications[j].positionMap[k].key != 0) && (psm.modifications[j].positionMap[k].key != peptideSequence.length + 1)) {
                                let item = {
                                  index: psm.modifications[j].positionMap[k].key,
                                  modMass: parseFloat(psm.modifications[j].modification.value),
                                  aminoAcid: psm.peptideSequence.split('')[psm.modifications[j].positionMap[k].key - 1]
                                };
                                variableModsArray.push(item)
                              }else if(psm.modifications[j].positionMap[k].key == 0){
                                ntermMod = parseFloat(psm.modifications[j].modification.value)
                              }else{
                                ctermMod = parseFloat(psm.modifications[j].modification.value)
                              }
                            }
                          }
                          variableMods = variableModsArray;
                        }
                        this.spectrumTableFold(false)
                        this.usiTableFold(false)
                        this.showSpectrum(true, peptideSequence, peaks, charge, precursorMz, variableMods, ntermMod, ctermMod)
                        //for USI Details
                        let array = []
                        let samplePropertiesChildArray = []
                        let propertiesChildArray = []
                        let projectChildArray = []
                        let projectTitle = ''
                        for(let i in psm){
                          if(psm[i]){ // remove the "null" properties in the reply
                             //find the array in the reply, 
                            if( i == 'masses' || i== 'intensities'|| i== '_links') //remove the items what we do not need to have in the table
                              continue
                            if(i == 'bestSearchEngineScore'){//add some more action when bestSearchEngineScore shows up
                              
                              this.addBestSearchHighlight()
                            }
                            if(Array.isArray(psm[i])){
                              for(let j=0;j<psm[i].length;j++){
                                    let item = {}
                                    item.key = psm[i][j].name
                                    item.value = psm[i][j].value
                                    // console.log('item',item)
                                    if(!item.value || item.value.indexOf('not available')!= -1 || item.value.indexOf('not applicable')!= -1)//remove the value of "null", or "not available", or "not applicable"
                                      continue
                                    if(item.key.indexOf('project')!= -1) //find project property
                                      projectChildArray.push(item)
                                    if(item.key.indexOf('project title')!= -1) //query the title content and use later
                                      projectTitle = item.value  
                                    else if(i == 'sampleProperties' && item.key.indexOf('project') == -1)  // deal with the "sampleProperties" array and "properties"
                                      samplePropertiesChildArray.push(item)
                                    else if(i == 'properties' && item.key.indexOf('project') == -1) // deal with the "properties" array 
                                      propertiesChildArray.push(item)
                               }
                            }
                            else{
                              let item = {}
                              item.key = i;
                              item.value = i == 'bestSearchEngineScore'? psm[i].value : psm[i]
                              array.push(item)
                            }
                          }
                        }

                        //add Id for tree table to use
                        for(let i=0; i<samplePropertiesChildArray.length; i++){
                          samplePropertiesChildArray[i].id = '100'+ i
                        }
                        for(let i=0; i<propertiesChildArray.length; i++){
                          propertiesChildArray[i].id = '101'+ i
                        }
                        for(let i=0; i<projectChildArray.length; i++){
                          projectChildArray[i].id = '102'+ i

                          //merge the repeated items. TODO
                        }

                        // after set id, add "sampleProperties" and "properties" to "array"
                        let samplePropertiesItem = {
                          key:'sampleProperties',
                          value:'Expand to view the details',
                          children:samplePropertiesChildArray
                        }
                        let propertiesItem = {
                          key:'properties',
                          value:'Expand to view the details',
                          children:propertiesChildArray
                        }
                        let projectItem = {
                          key:'project',
                          value: projectTitle,
                          children:projectChildArray
                        }

                        array.push(samplePropertiesItem)
                        array.push(propertiesItem)
                        array.unshift(projectItem)

                        // remame the key according to the Json file
                        this.$http
                          .get(this.tableMappingJsonURL)
                          .then(function(res){
                              for(let i=0; i<array.length; i++){
                                //set Id for the array and order the "project" item order
                                array[i].id = '103'+ i
                                //set the key based on json or just capitalized the first 'char'
                                if(array[i].key == 'sampleProperties'){
                                  for(let j=0; j<array[i].children.length; j++){
                                      array[i].children[j].key = res.body[array[i].children[j].key] ? res.body[array[i].children[j].key] : array[i].children[j].key.charAt(0).toUpperCase() + array[i].children[j].key.slice(1)
                                  }
                                }
                                else if(array[i].key == 'properties'){ // the logic is the same with the above "sampleProperties" just in case of any specific tasks need to been done
                                  for(let j=0; j<array[i].children.length; j++){
                                      array[i].children[j].key = res.body[array[i].children[j].key] ? res.body[array[i].children[j].key] : array[i].children[j].key.charAt(0).toUpperCase() + array[i].children[j].key.slice(1)
                                  }
                                }
                                else if(array[i].key == 'project'){ // the logic is the same with the above "sampleProperties" ,but we need to change some specific item orders
                                  for(let j=0; j<array[i].children.length; j++){
                                      array[i].children[j].key = res.body[array[i].children[j].key] ? res.body[array[i].children[j].key] : array[i].children[j].key.charAt(0).toUpperCase() + array[i].children[j].key.slice(1)
                                  }
                                  //change the order here TODO
                                }
                                array[i].key = res.body[array[i].key] ? res.body[array[i].key] : array[i].key.charAt(0).toUpperCase() + array[i].key.slice(1)


                              }
                              // reorder the array, raw table is used to recover the table after search
                              this.usiTableResultsRAW = this.usiTableResults = array
                          },function(err){

                          });
                      }
                      else{
                        this.getSpectrumFail()
                        this.$Message.error({content:'The USI provided is not found in PRIDE Archive. Check the PSM Search for other USIs', duration:3}); // put the error message outside the "getSpectrumFail" function, so that this function could be used when we deselect the checkbox in the PSM table
                      }

                    },function(err){
                        this.getSpectrumFail()
                        this.$Message.error({content:'The USI provided is not found in PRIDE Archive. Check the PSM Search for other USIs', duration:3});
                    });
          }
      },
      getSpectrumFail(){
        this.spinShow = false
        this.spectrumFound = false
        this.spectrumTableHint = 'No Spectrum'
        this.usiTableHint = 'No USI Details'
        this.usiTableResults=[]
        this.usiTableResultsRAW=[]
        this.spectrumTableFold(true)
        this.usiTableFold(true)
        this.removeBestSearchHighlight()
      },
      getPSM(){ // we use "q(query)"" but not "usi string". because beforeRouteupdate only has "to.query" which is the obj not a string. We all use the obj to unform the parameters
          this.psmTableLoading = true
          this.psmFound = false
          this.psmTableResults=[]
          this.psmTableHint = 'No PSMs'
          this.psmTableFold(true)
          this.$http
              .get(this.psmApi,{params: this.psmTableQuery})
              .then(function(res){
                this.psmTableLoading = false
                if(res.body && res.body._embedded){
                  this.psmFound = true
                  let psmTempArray = res.body._embedded.summaryArchiveSpectrumList
                  let array = []
                  this.totalPsmTableItem = psmTempArray.length
                  for(let i=0;i<psmTempArray.length;i++){
                    let item = {}
                    item.id = psmTempArray[i].projectAccession +'_' + i
                    item.select = false
                    item.accession = psmTempArray[i].projectAccession
                    item.peptidoform = psmTempArray[i].peptidoform
                    item.usi = psmTempArray[i].usi
                    array.push(item)
                  }
                  this.psmTableResults=array
                  this.psmTableHint = 'Click to show more'
                  this.psmTableFold(false)
                }
                else{
                  this.psmFound = false
                  this.psmTableHint = 'No PSMs'
                  this.psmTableFold(true)
                }
              },function(err){
                  this.psmFound = false
                  this.psmTableHint = 'No PSMs'
                  this.psmTableLoading = false
                  this.psmTableFold(true)
                  console.log(err)
              });
      },
      spectrumTableFold(val){
          this.spectrumTableFoldBool = val
          if(this.spectrumTableFoldBool){
              if(document.querySelector('.spectrum-container'))
                document.querySelector('.spectrum-container').style.height = 'auto'
              if(document.querySelector('#lorikeetIframe'))
                document.querySelector('#lorikeetIframe').style.display= 'none'
          } 
          else{
              if(document.querySelector('.spectrum-container'))
                document.querySelector('.spectrum-container').style.height = '730px'
              if(document.querySelector('#lorikeetIframe')) {
                if(this.spectrumFound)
                  document.querySelector('#lorikeetIframe').style.display= 'block'
                else
                   document.querySelector('#lorikeetIframe').style.display= 'none' //if spectrum is not found, we have to set display none even if the table is open
              }
          }
      },
      usiTableFold(val){
          this.usiTableFoldBool = val
          if(this.usiTableFoldBool){
            if(document.querySelector('.usi-table'))
              document.querySelector('.usi-table').style.display = 'none'
          }
          else{
            if(document.querySelector('.usi-table'))
              document.querySelector('.usi-table').style.display = 'block'
          } 
      },
      psmTableFold(val){
          this.psmTableFoldBool = val
          if(this.psmTableFoldBool){
            if(document.querySelector('.psm-table'))
              document.querySelector('.psm-table').style.display = 'none'
            if(document.querySelector('.psm-table-page-container'))
              document.querySelector('.psm-table-page-container').style.display = 'none'
          }
          else{
            if(document.querySelector('.psm-table'))
              document.querySelector('.psm-table').style.display = 'block'
            if(document.querySelector('.psm-table-page-container'))
              document.querySelector('.psm-table-page-container').style.display = 'flex'
          } 
      },
      showSpectrum(val, peptideSequence, peaks, charge, precursorMz, variableMods, nTerm, cTerm){
          if(val){
              let iframeDom = document.querySelector("#lorikeetIframe");
              // if(peptideSequence){
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
                    document.querySelector("#lorikeetIframe").contentWindow.postMessage({sequence: peptideSequence,
                      peaks:peaks, charge: charge, precursorMz: precursorMz, variableMods:variableMods, nTerm:nTerm,
                      cTerm: cTerm, /*width:window.innerWidth-1000can not calculate dynamically*/}, "*");
                  }
                  document.querySelector("#lorikeetIframe").onerror = ()=> {
                      this.spectrumTableShow= false;
                      this.spectrumSpinShow = false;
                      this.$Message.error({content:'Spectrum Error', duration:3});
                  };
              // }
              // else{
              //     this.spectrumTableShow = false;
              //     this.spectrumSpinShow = false;
              // }
          }
          else{
              this.spectrumSpinShow = false;
              this.spectrumTableShow=false;
              document.querySelector("#lorikeetIframe").remove();
          }
      },
      rowClassName(row, index){
        if(row.key == 'Best Search Engine Score')
          return 'best-search-usi-row'
        else
          return 'normal-usi-usi-row'
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
                    for(let k=0; k < ptms[j].positionMap.length; k++){
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
      submitSearch(){
        if(!this.keyword){
          this.$Message.error({content:'No keyword', duration:3});
          return
        }
        this.getSpectrum({usi:this.keyword});
        this.getPSM()
        if (history.pushState) {
              var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?usi=' + this.keyword + '&resultType=FULL';
              window.history.pushState({path:newurl},'',newurl);
          }
      },
      gotoUSI(){
        window.open('http://www.ebi.ac.uk/pride/markdownpage/usi')
      },
      gotoExampleUSI(keyword){
        this.keyword = keyword
        this.getSpectrum({usi:keyword});
        this.getPSM()
        if (history.pushState) {
              var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?usi=' + keyword;
              window.history.pushState({path:newurl},'',newurl);
          }
      },
      searchUSIDetailsTable(e){
        let array = []
        
        for(let i=0; i<this.usiTableResultsRAW.length; i++){
          let found = false
          let itemParent = {}
          // console.log(this.usiTableResultsRAW[i].key)
          //for the item has children
          if(this.usiTableResultsRAW[i].hasOwnProperty('children')){
            //for the item who has 'children', also the key and the value has the keyword matched
            if(this.usiTableResultsRAW[i].key.toLowerCase().indexOf(this.usiTableSearchKeyword.toLowerCase()) != -1 || (this.usiTableResultsRAW[i].value+'').toLowerCase().indexOf(this.usiTableSearchKeyword.toLowerCase()) != -1){
              found = true
              itemParent.id = this.usiTableResultsRAW[i].id
              itemParent.key = this.usiTableResultsRAW[i].key
              itemParent.value = this.usiTableResultsRAW[i].value
              itemParent.children = [] //set [] for initial value
            }
            //confirm if the item in children match the keywork
            let tempChildrenArray = []
            let childFound = false
            for(let j=0; j<this.usiTableResultsRAW[i].children.length; j++){
              if(this.usiTableResultsRAW[i].children[j].key.toLowerCase().indexOf(this.usiTableSearchKeyword.toLowerCase()) != -1 || (this.usiTableResultsRAW[i].children[j].value+'').toLowerCase().indexOf(this.usiTableSearchKeyword.toLowerCase()) != -1){
                found = true
                childFound = true
                let itemChild = {}
                itemChild.id = this.usiTableResultsRAW[i].children[j].id
                itemChild.key = this.usiTableResultsRAW[i].children[j].key
                itemChild.value = this.usiTableResultsRAW[i].children[j].value
                tempChildrenArray.push(itemChild)
              }
            }
            if(childFound){
                itemParent.id = this.usiTableResultsRAW[i].id
                itemParent.key = this.usiTableResultsRAW[i].key
                itemParent.value = this.usiTableResultsRAW[i].value
                itemParent.children = tempChildrenArray
            }
          }
          else{
            if(this.usiTableResultsRAW[i].key.toLowerCase().indexOf(this.usiTableSearchKeyword.toLowerCase()) != -1 || (this.usiTableResultsRAW[i].value+'').toLowerCase().indexOf(this.usiTableSearchKeyword.toLowerCase()) != -1){
              found = true
              itemParent.id = this.usiTableResultsRAW[i].id
              itemParent.key = this.usiTableResultsRAW[i].key
              itemParent.value = this.usiTableResultsRAW[i].value
            }
          }
          if(found)
            array.push(itemParent)
        }
        this.usiTableResults = array
      },
      psmTablePageChange(page){
          this.currentPsmTablePage = page;
          this.getPSM()
      },
      psmTablePageSizeChange(size){
          this.psmTablePageSize = size;
          this.getPSM()
      },
      addBestSearchHighlight(){
        this.bestSearch = true
        let header = document.querySelector('.card.usi .ivu-card-head')
        header.style.backgroundColor= '#86d5d4c4'
        header.style.borderTopLeftRadius = '4px'
        header.style.borderTopRightRadius = '4px'
      },
      removeBestSearchHighlight(){
        this.bestSearch = false
        let header = document.querySelector('.card.usi .ivu-card-head')
        header.style.backgroundColor= 'white'
        header.style.borderTopLeftRadius = '0px'
        header.style.borderTopRightRadius = '0px'
      }
    },
    watch: {
        peptideTableResults:{
          handler(){
  
          },
          deep:true
        },
    },
    computed:{
      psmTableQuery:function(){
          let normalQuery = {}
          if(this.keyword)
            normalQuery.spectraUsi = this.keyword
          normalQuery.sortConditions = 'projectAccession' //fix DESC first
          normalQuery.sortDirection = 'DESC' //fix DESC first
          normalQuery.page = this.currentPsmTablePage - 1
          normalQuery.pageSize = this.psmTablePageSize
          normalQuery.includePeptidoform = false
          normalQuery.includePeptideSequence = true
          return normalQuery;   
      },
      // rowClassName:function(){
      //   if(this.bestSearch)
      //     return 'best-search-usi-row'
      //   else
      //     return 'normal-usi-usi-row'
      // },
    },
    mounted: function(){
        //window.addEventListener("resize", this.change);
        if(Object.keys(this.$route.query).length === 0){
          //if there no query, do nothing
        }
        else{
          if('usi' in this.$route.query){
            this.keyword = this.$route.query.usi
            this.getSpectrum({usi:this.$route.query.usi});
            this.getPSM() // keyword is set above, so the "psmTableQuery" will be computed
          }
          else{
             //if there no usi in the query, do nothing
          } 
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
    height: auto;
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
  .citations-container{
    margin-left: 20px;
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
     height: auto;
  }
  .protein-table .ivu-table-header thead tr th:first-child .ivu-table-cell{
    visibility: hidden;
  }
  .peptide-table .ivu-table-header thead tr th:first-child .ivu-table-cell{
    visibility: hidden;
  }
  .psm-table .ivu-table-header thead tr th:first-child .ivu-table-cell{ 
    /*visibility: hidden;*/
  }
  .psm-table .ivu-table-cell .ivu-table-cell-tree{ 
    margin-right: 5px;
    text-align: center;
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
      /*display: none;*/
      border-right: none
  }
  .psm-table .projectAction:hover{
    color:#5bc0be !important;
  }
  .psm-table-page-container{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
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
    #spectra-bar-pride .ivu-input-group-prepend{
        background-color: #5bc0be !important;
        width: 100px;
    }
    #spectra-bar-pride .ivu-input-group-prepend span{
        font-weight:700;
        color: white !important;
        width:100px;
    }
    #spectra-bar-pride .ivu-input-group-append{
        background-color: #5bc0be !important;
        color: #f8f8f8 !important;
        width:100px;
    }
    #spectra-bar-pride .ivu-input-group-append span{
        font-weight:700;
        /*font-size: .85714286em;*/
    }
    #spectra-bar-pride .ivu-select-arrow{
        color: #f8f8f8 !important;
    }
    .psm-table-page-container .page .ivu-select-dropdown-list{
      margin-left: 0 !important;
    }
    .psm-table-page-container .page .ivu-select-dropdown{
      width:90px!important;
    }
    .usi-table .best-search-usi-row td{
      background-color: #86d5d4c4
      /*#5bc0be*/
    }
    .usi-table .normal-usi-usi-row{
      
    }
</style>

