<template>
  <div class="archive-container">
      <Card id="sample-card" class="card annotation">
          <p slot="title" class="resource-list-title-container">
            <span>Sample</span>
          </p>
          <p slot="extra" class="sample-table-extra">
            <span class="icon-hint-text">Add Property</span><Icon type="plus-round" @click="showModal" size="20"></Icon>
            <span class="icon-hint-text">Add Sample</span><Icon class="add-row-icon" type="plus-round" @click="addRow" size="20"></Icon>
          </p>
          <div class="card-content">
              <div class="draggable-class">
                  <div class="table-col" v-for="(itemCol,i) in sampleCol" :key="itemCol.key">
                      <div class="table-row first handle"><Icon v-if="itemCol.key!='accession'" class="icon-in-th-left" type="ios-minus-outline" @click="removeAll(itemCol.key,'sampledata')" size="14"></Icon>{{itemCol.name}}<Icon class="icon-in-th-right" type="ios-close-outline" v-if="!itemCol.required" @click="deleteCol(itemCol,i)" size="14"></Icon></div>
                      <div class="table-row" v-for="(itemRow,j) in sampleData.slice(rowStart,rowEnd)">
                            <div v-if="itemCol.key!='accession'">
                                  <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].value ? 'close-circled':''" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-change="labelQuery(itemCol,itemRow)" @on-focus="focus($event,itemCol,itemRow,'sampledata',j)" @on-blur="inputBlur(itemRow[itemCol.key])">
                                  </Input>
                                  <!-- <Dropdown class="dropdown-remote" trigger="custom" :visible="itemRow[itemCol.key].dropdown" placement="bottom-end" @on-click="dropdownClick($event,itemRow[itemCol.key])" @on-clickoutside="blur(itemRow[itemCol.key])">
                                      <DropdownMenu slot="list">
                                          <DropdownItem v-if="dropdownOptions.length == 0" name="nodata">No data
                                              <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAll('no data',itemCol,itemRow,'sampledata',j)"></Icon>
                                          </DropdownItem>
                                          <DropdownItem v-for="item in dropdownOptions" :name="item.name" :key="item.name">{{item.name}}
                                              <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAll(item.name,itemCol,itemRow,'sampledata',j)"></Icon>
                                          </DropdownItem>
                                      </DropdownMenu>
                                  </Dropdown> -->
                            </div>
                            <div v-else>
                                <div class="accession-col">
                                    <Icon v-if="sampleData.length>1 && j == sampleData.length-1" class="icon-in-row" type="ios-close-outline" @click="deleteRow(itemRow,j)" size="14"></Icon>
                                    <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].value ? 'close-circled':''" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-change="labelQuery(itemCol,itemRow)" @on-blur="inputBlur(itemRow[itemCol.key])">
                                    </Input>
                                    <!-- <span>{{itemRow.accession}}</span> -->
                                </div>
                            </div>
                            <div class="copy-icon"><Icon @click="showCopyModal(itemRow[itemCol.key],itemCol.key,j)" type="ios-copy-outline" size="16"></Icon></div>
                      </div>
                  </div>
                  <div class="table-col" v-for="(itemCol,i) in msRunCol" :key="itemCol.key">
                      <div class="table-row first msrun"><Icon v-if="itemCol.key!='fractionid'" class="icon-in-th-left" type="ios-minus-outline" @click="removeAll(itemCol.key,'msrundata')" size="14"></Icon>{{itemCol.name}}</div>
                      <div class="table-row" v-for="(itemRow,j) in msRunArray.slice(rowStart,rowEnd)" :key="j" :class="{hideRow:itemRow.disable}">
                            <div v-if="itemCol.key=='label' || itemCol.key=='labelReagent'">
                            <!--<div v-if="itemCol.key=='label'">-->
                                  <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].value ? 'close-circled':''" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-change="labelQuery(itemCol,itemRow)" @on-focus="focus($event,itemCol,itemRow,'msrundata',j)" @on-blur="inputBlur(itemRow[itemCol.key])"></Input>
                                  <!-- <Dropdown class="dropdown-remote" trigger="custom" :visible="itemRow[itemCol.key].dropdown" placement="bottom-end" @on-click="dropdownClick($event,itemRow[itemCol.key])" @on-clickoutside="blur(itemRow[itemCol.key])">
                                      <DropdownMenu slot="list">
                                          <DropdownItem v-if="dropdownOptions.length == 0" name="nodata">No data
                                              <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAll('no data',itemCol,itemRow,'msrundata',j)"></Icon>
                                          </DropdownItem>
                                          <DropdownItem v-for="item in dropdownOptions" :name="item.name" :key="item.name">{{item.name}}
                                              <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAll(item.name,itemCol,itemRow,'msrundata',j)"></Icon>
                                          </DropdownItem>
                                      </DropdownMenu>
                                  </Dropdown> -->
                            </div>
                            <div v-else-if="itemCol.key=='msrun'">
                              <div class="msRun-button-wrapper" v-if="itemRow[itemCol.key].value">
                                  <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].value ? 'close-circled':''" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-blur="inputBlur(itemRow[itemCol.key])"></Input>
                                  <!-- <Tooltip max-width="200" class="show-button-tooltip" placement="right">
                                      <a class="button search-button finish" @click="showMsRunTable(itemRow,j)">Finish</a> 
                                      <div class="tooltip-content" slot="content">
                                          {{itemRow[itemCol.key].file}}
                                      </div>
                                  </Tooltip>
                                  <Icon color="rgba(0, 0, 0, 0.6)" type="ios-close"  size="16" style="margin-left:5px" @click="itemRow[itemCol.key].file=''"/> -->
                              </div>
                              <div v-else>
                                    <a class="button search-button" @click="showMsRunTable(itemRow,j)">Edit</a> 
                              </div>
                            </div>
                            <div v-else>
                                <div class="accession-col">
                                  <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].value ? 'close-circled':''" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-change="labelQuery(itemCol,itemRow)"  @on-blur="inputBlur(itemRow[itemCol.key])"></Input>
                                  <!-- <span>{{itemRow.fractionid.value}}</span> -->
                                </div>
                            </div>
                            <div class="copy-icon"><Icon @click="showCopyModal(itemRow[itemCol.key],itemCol.key,j)" type="ios-copy-outline" size="16"></Icon></div>
                      </div>
                  </div>
              </div>
              <div class="sample-table-extra add-row-icon">
                <!--  <Icon class="add-row-icon" type="plus-round" @click="addRow" size="20"></Icon><span>Add Sample</span> -->
              </div>
          </div>
          <Dropdown class="dropdown-remote" :style="{left:dropdown.left + 'px', top:dropdown.top + 'px'}" trigger="custom" :visible="dropdown.visible" placement="bottom-end" @on-click="dropdownClick($event,dropdown.row[dropdown.col.key])">
              <DropdownMenu slot="list">
                  <DropdownItem v-if="dropdownOptions.length == 0" name="nodata">No data
                      <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAll('no data',dropdown.col,dropdown.row,dropdown.type,dropdown.index)"></Icon>
                  </DropdownItem>
                  <DropdownItem v-for="item in dropdownOptions" :name="item.name" :key="item.name">{{item.name}}
                      <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAll(item.name,dropdown.col,dropdown.row,dropdown.type,dropdown.index)"></Icon>
                  </DropdownItem>
              </DropdownMenu>
          </Dropdown>
          <Spin class="table-spin" v-if="tableLoading"></Spin>  
      </Card>
      <Modal
          title="Add Column"
          v-model="addColumnBool"
          :closable="false"
          @on-ok="addCol"
          @on-visible-change="modalVisibleChange">
          <Table border ref="addPropertyTable" class="add-col-table" :columns="newCol" :data="newData" @on-selection-change="newColSelectChange"></Table>
      </Modal>
      <Modal
          title="Copy"
          v-model="copyModalBool"
          :closable="false"
          @on-ok="copy"
          @on-visible-change="copyModalVisibleChange">
          <Input id="text-to-copy" v-model="copyValue" type="textarea" placeholder="Enter something..." :rows="8"/>
      </Modal>
      <div v-if="drawerShowBool" class="annotate-drawer-container">
          <!-- <div class="annotate-drawer-wrapper" @wheel.stop="wheel" @wheel.prevent="wheel"> -->
          <div class="annotate-drawer-wrapper">
            <div class="annotate-drawer" :class="{ active: drawerShowBool }">
                <div class="header"><span>MsRUN Table</span><a @click="hideMsRunTable"><Icon color="rgba(0, 0, 0, 0.6)" type="ios-close"  size="20"/></a></div>
                <div class="content">
                  <Table border ref="selection" class="msrun-modal-table" :columns="msRunModalTableCol" :data="msRunModalTableData" height="400"></Table>
                </div>
                <div class="footer">
                    <a class="button search-button" @click="msRunAnnotate">OK</a>
                    <a class="button search-button" @click="hideMsRunTable">Cancel</a>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { ModelSelect } from 'vue-search-select'
  import store from "@/store/store.js"
  import { Base64 } from 'js-base64';
  export default {
    name: 'archive',
    data(){
      return {
          getSampleAttributesApi: 'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/sampleAttributes', 
          getValuesByAttributeApi: 'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/valuesByAttribute',
          labelQueryApi:'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/labelingValues',
          labelReagentQueryApi:'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/reagentValues',
          msRunApi:'http://wwwdev.ebi.ac.uk/pride/ws/archive/msruns/byProject',
          tokenApi:'http://wwwdev.ebi.ac.uk/pride/ws/archive/getAAPToken', 
          updateSampleApi:'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/'+this.$route.params.id+'/updateSampleMsRuns',
          visible:true,
          loading1:false,
          addColumnBool:false,
          drawerShowBool:false,
          newColumnNameSelectedArray:[],
          inputDeleteAllIcon:'',
          newCol:[
              {
                  type: 'selection',
                  width: 70,
                  align: 'center'
              },
              {
                  title: 'Name',
                  key: 'name',
              },
              {
                  title: 'cvLabel',
                  key: 'cvLabel',
                  width:0.1,
                  className:'new-col-table', 
              },
              {
                  title: 'accession',
                  key: 'accession',
                  width:0.1,
                  className:'new-col-table' 
              },
              {
                  title: 'required',
                  key: 'required',
                  width:0.1,
                  className:'new-col-table' 
              },
              {
                  title: 'name',
                  key: 'name',
                  width:0.1,
                  className:'new-col-table' 
              },
              {
                  title: 'orignalname',
                  key: 'orignal_name',
                  width:0.1,
                  className:'new-col-table' 
              },
              {
                  title: 'key',
                  key: 'key',
                  width:0.1,
                  className:'new-col-table' 
              }
          ],
          newData:[],
          msRunModalTableCol:[
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
                                  this.msRunModalTableData.map(x => {
                                      x.select= false;
                                      return x;
                                  });
                                  this.msRunModalTableData[params.index].select= val;
                                  if(val)
                                    this.selectedFileItem = params;
                                  else
                                    this.selectedFileItem={};
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
          msRunModalTableData:[],
          sampleCol:[],
          sampleData:[],
          dropdownOptions:[],
          experimentType:'',
          sampleNumber:0,
          fractionNumber:0,
          trNumber:0,
          msRunCol:[
              {
                //experimentType:res.body[i].first,
                //required: res.body[i].second == 'REQUIRED'? true:false,
                //cvLabel:res.body[i].third.cvLabel.toLowerCase(),
                //accession:res.body[i].third.accession,
                name:'FractionID',
                //orignal_name:res.body[i].third.name,
                key: 'fractionid',
              },
              {
                //experimentType:res.body[i].first,
                //required: res.body[i].second == 'REQUIRED'? true:false,
                //cvLabel:res.body[i].third.cvLabel.toLowerCase(),
                //accession:res.body[i].third.accession,
                name:'Label',
                //orignal_name:res.body[i].third.name,
                key: 'label',
              },
              
              {
                //experimentType:res.body[i].first,
                //required: res.body[i].second == 'REQUIRED'? true:false,
                //cvLabel:res.body[i].third.cvLabel.toLowerCase(),
                //accession:res.body[i].third.accession,
                name:'LabelReagent',
                //orignal_name:res.body[i].third.name,
                key: 'labelReagent',
              },

              {
                //experimentType:res.body[i].first,
                //required: res.body[i].second == 'REQUIRED'? true:false,
                //cvLabel:res.body[i].third.cvLabel.toLowerCase(),
                //accession:res.body[i].third.accession,
                name:'MSRun',
                //orignal_name:res.body[i].third.name,
                key: 'msrun',
              }
          ],
          msRunArray:[],
          accessionKey:0,
          msRunTableRowID:'',
          selectedFileItem:{},
          copyArray:[],
          copyModalBool:false,
          copyContent:'',
          copyValue:'',
          pasteIndex:null,
          timeoutId:0,
          dropdown:{
            left:0,
            top:0,
            visible:false,
            row:null,
            col:null,
            index:null,
            type:null,
          },
          rowStart:0,
          rowEnd:100,
          tableLoading:false
      }
    },
    components: {
      draggable,
      ModelSelect
    },
    methods:{
          getSampleAttributes(){
                this.sampleData=[];
                this.sampleCol=[
                    {
                        name:'Accession',
                        key:'accession',
                        required:true,
                    },
                ];
                this.$http
                      .get(this.getSampleAttributesApi)
                      .then((res)=>{
                          console.log(res.body);
                          let sampleDataItem={};//temp sampledata item for table rows
                          for(let i=0; i<res.body.length; i++){

                              if(res.body[i].first == this.experimentType){
                                  let item = {
                                    experimentType:res.body[i].first,
                                    required: res.body[i].second == 'REQUIRED'? true:false,
                                    cvLabel:res.body[i].third.cvLabel.toLowerCase(),
                                    accession:res.body[i].third.accession,
                                    name:this.titleCase(res.body[i].third.name),
                                    orignal_name:res.body[i].third.name,
                                    key: this.titleCase(res.body[i].third.name).toLowerCase().replace(/\s/ig,''),
                                  }
                                  //we are creating sample table columns
                                  if(item.required)
                                    this.sampleCol.push(item);
                                  this.newData.push(item);
                                  //we are creating sample table rows
                                  //sampleDataItem.accession={};//we will apply for the value for ac
                                  sampleDataItem[item.key]={
                                      value:'',
                                      dropdown:false,
                                      accession:'null',
                                      accessionKey:this.accessionKey,
                                      cvLabel:'null',
                                      col:item,
                                      icon:'',
                                      checked:true,
                                  }
                              }
                          }
                          let projectAccession = localStorage.getItem("projectAccession")
                          if(!projectAccession){
                              for(let k=0; k<this.sampleNumber * this.fractionNumber; k++){
                                    let item = JSON.parse(JSON.stringify(sampleDataItem))
                                    item.accession={
                                        value:"PXD_S"+(k+1),
                                        dropdown:false,
                                        accession:'null',
                                        accessionKey:this.accessionKey++,
                                        cvLabel:'null',
                                        col:this.sampleCol[0],
                                        icon:'',
                                        checked:true,
                                    }
                                    //if(item.col.required)
                                      this.sampleData.push(item)
                              }    
                          }
                      },function(err){
                          
                      });
          },
          getMSRunTableData(){
              this.msRunModalTableData=[];
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
                          this.msRunModalTableData.push(item);
                      }
                  },function(err){

                  });
          },
          // organismSampleQuery(itemCol,itemRow){
          //     let searchValue = itemRow[itemCol.key].value;
          //     if(searchValue)
          //         itemRow[itemCol.key].icon = 'close-circled'
          //     else{
          //         itemRow[itemCol.key].icon= '';
          //         this.dropdown.visible = false;
          //         return;
          //     }
          //     this.dropdownOptions=[];
          //     let query={
          //       attributeAccession: itemCol.accession,
          //       ontologyAccession: itemCol.cvLabel,
          //       keyword:searchValue
          //     }
          //     clearTimeout(this.timeoutId);
          //     this.timeoutId = 0;
          //     this.timeoutId = setTimeout( ()=> {
          //          this.$http
          //             .get(this.getValuesByAttributeApi,{params: query})
          //             .then(function(res){
          //               if(this.timeoutId == 0)
          //                 return;
          //               if(!itemRow[itemCol.key].active)
          //                 return;
          //               if(res.body.length>0 || searchValue){
          //                 //itemRow[itemCol.key].dropdown=true;
          //                 this.dropdown.visible = true
          //               }

          //               this.dropdownOptions=res.body;
          //               if(this.dropdownOptions.length == 0){
          //                   itemRow[itemCol.key].value==searchValue;
          //               }
          //             },function(err){

          //             });
          //     }, 500);
          // },
          labelQuery(itemCol,itemRow){
              let searchValue = itemRow[itemCol.key].value;
              if(searchValue)
                  itemRow[itemCol.key].icon = 'close-circled'
              else{
                  itemRow[itemCol.key].icon= '';
                  this.dropdown.visible = false;
                  return;
              }
              this.dropdownOptions=[];
              /*
              let query={
                attributeAccession: itemCol.accession,
                ontologyAccession: itemCol.cvLabel,
                keyword:searchValue
              }*/
              if(itemCol.key=='label'){
                  let query={
                    keyword:searchValue
                  }
                  clearTimeout(this.timeoutId);
                  this.timeoutId = 0;
                  this.timeoutId = setTimeout( ()=> {
                      this.$http
                        .get(this.labelQueryApi,{params: query})
                        .then(function(res){
                          if(this.timeoutId == 0)
                            return;
                          if(!itemRow[itemCol.key].active)
                            return;
                          if(res.body.length>0 || searchValue){
                            this.dropdown.visible = true
                          }

                          this.dropdownOptions=res.body;
                          if(this.dropdownOptions.length == 0){
                              itemRow[itemCol.key].value==searchValue;
                          }
                        },function(err){

                        });
                  }, 500);
              }
              else if(itemCol.key=='labelReagent'){ 
                let query={
                    keyword: searchValue,
                }
                clearTimeout(this.timeoutId);
                this.timeoutId = 0;
                this.timeoutId = setTimeout( ()=> {
                    this.$http
                      .get(this.labelReagentQueryApi,{params: query})
                      //.get(this.labelQueryApi,{params: query})
                      .then(function(res){
                        if(this.timeoutId == 0)
                          return;
                        if(!itemRow[itemCol.key].active)
                          return;
                        if(res.body.length>0 || searchValue)
                          this.dropdown.visible = true


                        this.dropdownOptions=res.body;
                        if(this.dropdownOptions.length == 0){
                            itemRow[itemCol.key].value==searchValue;
                        }
                      },function(err){

                      });
                }, 500);
              }
              else if(itemCol.key=='msrun'){
                  let query={
                      accession: this.$route.params.id,
                  }
                  clearTimeout(this.timeoutId);
                  this.timeoutId = 0;
                  this.timeoutId = setTimeout( ()=> {
                      this.$http
                        .get(this.msRunApi,{params: query})
                        //.get(this.labelQueryApi,{params: query})
                        .then(function(res){
                          if(this.timeoutId == 0)
                            return;
                          if(!itemRow[itemCol.key].active)
                            return;
                          if(res.body.length>0 || searchValue)
                            this.dropdown.visible = true

                          this.dropdownOptions=res.body;
                          if(this.dropdownOptions.length == 0){
                              itemRow[itemCol.key].value==searchValue;
                          }
                        },function(err){

                        });
                  }, 500);
              }
              else{
                let query={
                  attributeAccession: itemCol.accession,
                  ontologyAccession: itemCol.cvLabel,
                  keyword:searchValue
                }
                clearTimeout(this.timeoutId);
                this.timeoutId = 0;
                this.timeoutId = setTimeout( ()=> {
                     this.$http
                        .get(this.getValuesByAttributeApi,{params: query})
                        .then(function(res){
                          if(this.timeoutId == 0)
                            return;
                          if(!itemRow[itemCol.key].active)
                            return;
                          if(res.body.length>0 || searchValue){
                            //itemRow[itemCol.key].dropdown=true;
                            this.dropdown.visible = true
                          }

                          this.dropdownOptions=res.body;
                          if(this.dropdownOptions.length == 0){
                              itemRow[itemCol.key].value==searchValue;
                          }
                        },function(err){

                        });
                }, 500);
              }
              this.$forceUpdate();
          },
          titleCase(str) {
            str=str.toLowerCase().split(" ");
            for(var i=0;i<str.length;i++){
              var char=str[i].charAt(0);
              str[i]=str[i].replace(char,function(s){return s.toUpperCase();});
            }
            str=str.join(" ");
            return str;
          },
          focus(e,itemCol,itemRow,type,index){
              let left = e.target.parentNode.parentNode.parentNode.offsetLeft-document.querySelector('.card-content').scrollLeft;
              let top = e.target.parentNode.parentNode.parentNode.offsetTop;

              itemRow[itemCol.key].active=true;

              this.dropdown.focus = itemCol.key+index
              this.dropdown.visible = false
              this.dropdown.index = index
              this.dropdown.type = type
              this.dropdown.col = itemCol
              this.dropdown.row = itemRow
              this.dropdown.top = top
              this.dropdown.left =left

              console.log(this.dropdown);
              if(!itemRow[itemCol.key].value)
                return;
              //itemRow[itemCol.key].dropdown = false;
              // if(itemCol.key == "label" || itemCol.key =="labelReagent")
              //   this.labelQuery(itemCol,itemRow);
              // else
              //   this.organismSampleQuery(itemCol,itemRow)

              this.labelQuery(itemCol,itemRow);
          },
          inputBlur(item){
            this.pasteIndex = null;
            this.blur(item)
          },
          blur(item){
              console.log('blurblur',item);
              item.active=false;
              //item.dropdown = false;
              if(item.col.required){
                if(item.value)
                  item.checked=true;
                else
                  item.checked=false;
              }
              let lastFocus = this.dropdown.focus;
              setTimeout(()=>{ 
                if(lastFocus != this.dropdown.focus)
                  return;
                this.dropdown.visible = false
                this.dropdown.index = null
                this.dropdown.type = null
                this.dropdown.col = null
                this.dropdown.row = null
              },100);
          },
          removeInputContent(item){
              //item.dropdown = false;
              item.value="";
              item.icon="";
          },
          showModal(){
            this.newColumnNameSelectedArray=[];
            this.addColumnBool=true;
          },
          showCopyModal(item,col,row){
            this.pasteIndex = {item,row,col};
            this.copyValue='';
            this.copyArray=[];
            this.copyModalBool=true;
          },
          addCol(){
              let keyArray = [];
              for(let i=0; i<this.newColumnNameSelectedArray.length; i++){
                  let item = {
                    experimentType:this.experimentType,
                    required: false,
                    cvLabel:this.newColumnNameSelectedArray[i].cvLabel,
                    accession:this.newColumnNameSelectedArray[i].accession,
                    name:this.newColumnNameSelectedArray[i].name,
                    orignal_name:this.newColumnNameSelectedArray[i].orignal_name,
                    key: this.newColumnNameSelectedArray[i].key + Date.now()
                  }
                  keyArray.push(item);
                  this.sampleCol.push(item);
              }
              //console.log('keyArray', keyArray);
              for(let i=0; i<this.sampleData.length; i++){
                  for(let j=0; j<keyArray.length; j++){
                      this.$set(this.sampleData[i], keyArray[j].key,{
                          value:'',
                          dropdown:false,
                          accession:'null',
                          cvLabel:'null',
                          col:keyArray[j],
                          icon:'',
                          checked:true,
                      })
                  }
              }
          },
          copy(){
            document.querySelector('#text-to-copy textarea').select();
            document.execCommand('copy');
            this.paste();
          },
          paste(){
            if(this.pasteIndex && this.copyValue){
              setTimeout(()=>{
                this.tableLoading=true;
                let msrunBool = null;
                let tempArray = this.copyValue.split('\n');
                console.log(this.sampleNumber * this.fractionNumber)
                console.log(this.pasteIndex.row)
                console.log(tempArray.length)
                if((this.sampleNumber * this.fractionNumber - this.pasteIndex.row) < tempArray.length){
                  this.tableLoading=false;
                  this.$Message.error({content:'Not enough rows to paste, please check', duration:2});
                  return
                }
                for(let i in this.msRunArray[0]){
                    if(this.pasteIndex.col == i){
                      msrunBool = true;
                      break;
                    }
                }
                if(!msrunBool)
                  for(let i=0; i< tempArray.length; i++){
                      if(this.sampleData[parseInt(this.pasteIndex.row)+parseInt(i)]){
                        this.sampleData[parseInt(this.pasteIndex.row)+parseInt(i)][this.pasteIndex.col].value= tempArray[i];
                        this.sampleData[parseInt(this.pasteIndex.row)+parseInt(i)][this.pasteIndex.col].icon= 'close-circled';
                        this.sampleData[parseInt(this.pasteIndex.row)+parseInt(i)][this.pasteIndex.col].checked = true;
                      }
                  }
                else{
                  if(this.pasteIndex.col != 'msrun')
                      for(let i=0; i< tempArray.length; i++){
                          if(this.msRunArray[parseInt(this.pasteIndex.row)+parseInt(i)]){
                            this.msRunArray[parseInt(this.pasteIndex.row)+parseInt(i)][this.pasteIndex.col].value= tempArray[i];
                            this.msRunArray[parseInt(this.pasteIndex.row)+parseInt(i)][this.pasteIndex.col].icon= 'close-circled';
                            this.msRunArray[parseInt(this.pasteIndex.row)+parseInt(i)][this.pasteIndex.col].checked = true;
                          }
                      }
                  else{
                      for(let i=0; i< tempArray.length; i++){
                          if(this.msRunArray[parseInt(this.pasteIndex.row)+parseInt(i)]){
                            let found = false;
                            for(let j=0; j<this.msRunModalTableData.length; j++){
                                if(tempArray[i] == this.msRunModalTableData[j].name){
                                  found = true;
                                  break;
                                }
                            }
                            if(found){
                                this.msRunArray[parseInt(this.pasteIndex.row)+parseInt(i)][this.pasteIndex.col].value= tempArray[i];
                                this.msRunArray[parseInt(this.pasteIndex.row)+parseInt(i)][this.pasteIndex.col].icon= 'close-circled';
                                this.msRunArray[parseInt(this.pasteIndex.row)+parseInt(i)][this.pasteIndex.col].checked = true;
                            }
                          }
                      }
                  }
                }
                this.blur(this.pasteIndex.item);
              },80)
            }
          },
          modalVisibleChange(stat){
              if(!stat)
                this.$refs.addPropertyTable.selectAll(false);
          },
          copyModalVisibleChange(stat){
              console.log(stat)
              //if(!stat)
                //this.$refs.addPropertyTable.selectAll(false);
          },
          addRow(){
            let item={};
            for(let i=0;i<this.sampleCol.length;i++){
                item[this.sampleCol[i].key] = {
                    value:'',
                    dropdown:false,
                    accession:'null',
                    accessionKey:this.accessionKey,
                    cvLabel:'null',
                    col:this.sampleCol[i],
                    icon:'',
                    checked:true,
                } 
            }
            item.accession={
                value:"PXD_S"+(this.sampleData.length+1),
                dropdown:false,
                accession:'null',
                accessionKey:this.accessionKey++,
                cvLabel:'null',
                col:this.sampleCol[0],
                icon:'',
                checked:true,
            }
            //console.log('this.sampleCol.length+1',this.sampleData.length+1);
            this.sampleData.push(item);
          },
          deleteCol(itemCol, index){
            this.sampleCol.splice(index,1);
            let key = itemCol.key;
            for(let i=0; i<this.sampleData.length; i++){
                for(let j in this.sampleData[i]){
                    if(j == key){
                      delete this.sampleData[i][key]
                      break;
                    }
                }
            }
          },
          deleteRow(itemRow, index){
              this.sampleData.splice(index,1);
              // //update row index
              // for(let i=0; i<this.sampleData.length; i++){
              //   this.sampleData[i].accession.value = "PXD_S"+(i+1);
              // }
          },
          dropdownClick(e,item){
            item.dropdown=false;
            if(e == "nodata" && !item.value){
                item.icon="";
                return;
            }
            item.value=e;
            item.checked=true;
            
            for(let i=0; i<this.dropdownOptions.length;i++){
                if(this.dropdownOptions[i].name==e){
                    item.accession = this.dropdownOptions[i].accession;
                    item.cvLabel = this.dropdownOptions[i].cvLabel;
                    break;
                }
            }
            this.blur(item)
          },
          newColSelectChange(selection){
              this.newColumnNameSelectedArray=selection;
          },
          applyAll(name,itemCol,itemRow,type,index){
               this.tableLoading=true;
               let tempValue = itemRow[itemCol.key].value;
               this.dropdownClick(name,itemRow[itemCol.key]);
               this.$nextTick(()=>{ //make the value bind with the input first and then apply this value to all the other rows
                  if(type == 'sampledata')
                    for(let i=index;i<this.sampleData.length; i++){
                        let newItem =  JSON.parse(JSON.stringify(itemRow[itemCol.key]));
                        if(tempValue == this.sampleData[i][itemCol.key].value || !this.sampleData[i][itemCol.key].value)
                          this.sampleData[i][itemCol.key] = newItem;
                        
                    }
                  else if(type == 'msrundata'){
                    for(let i=index;i<this.msRunArray.length; i++){
                        let newItem =  JSON.parse(JSON.stringify(itemRow[itemCol.key]));
                        if(tempValue == this.msRunArray[i][itemCol.key].value || !this.msRunArray[i][itemCol.key].value)
                          this.msRunArray[i][itemCol.key] = newItem;
                    }
                  }
                  this.blur(itemRow[itemCol.key]);
              });
          },
          removeAll(key,type){
              this.tableLoading=true;
              //console.log(key,type);
              if(type == 'sampledata')
                for(let i=0;i<this.sampleData.length; i++){
                    this.sampleData[i][key].value = '';
                    if(this.sampleData[i][key].col.required)
                        this.sampleData[i][key].checked = false;
                }
              else if(type == 'msrundata')
                for(let i=0;i<this.msRunArray.length; i++){
                    this.msRunArray[i][key].value = '';
                    if(this.msRunArray[i][key].col.required)
                        this.msRunArray[i][key].checked = false;
                }
          },
          init(){
            let tempSampleData = JSON.parse(localStorage.getItem("sampleData"));
            let tempMSRunArray = JSON.parse(localStorage.getItem("msRunArray"));
            if(tempSampleData)
              this.sampleData = tempSampleData;
            if(tempMSRunArray)
              this.msRunArray = tempMSRunArray;

            this.experimentType = localStorage.getItem('selectedExperimentType')
            this.sampleNumber  = +localStorage.getItem("samplesNum")
            this.fractionNumber = +localStorage.getItem("fractionsNum")
            this.trNumber = +localStorage.getItem("trNum")
          },
          confirm(){
              let results = [];
              let tempAccession='';
              let sampleDataCheckPass=true;
              let msRunCheckPass= true;
              console.log('this.sampleData',this.sampleData);
              console.log('this.msRunArray',this.msRunArray)
              //check for sample data completed
              for(let i=0; i<this.sampleData.length; i++){
                  for(let j in this.sampleData[i]){
                        if(j=='accession'){
                            tempAccession = this.sampleData[i][j];
                            continue;
                        }
                        else if(j=="accessionKey"){
                          continue;
                        }
                        else{
                            if(!this.sampleData[i][j].value && this.sampleData[i][j].col.required){
                                sampleDataCheckPass=false;
                                this.sampleData[i][j].checked=false;
                            }
                            else{
                                 this.sampleData[i][j].checked=true;
                            }
                        }
                  }
              }
              //check for msruntable data completed
              for(let i=0; i<this.msRunArray.length; i++){
                   for(let j in this.msRunArray[i]){
                          if(j=='fractionid'){
                              continue;
                          }
                          else if(j=="accessionKey"){
                            continue;
                          }
                          else if(j=="msrun"){
                            //we should change this code when msrun table is ready.
                            continue;
                          }
                          else if(j=="label"){
                              if(!this.msRunArray[i][j].value && this.msRunArray[i][j].col.required){
                                  msRunCheckPass=false;
                                  this.msRunArray[i][j].checked=false;
                              }
                              else{
                                  this.msRunArray[i][j].checked=true;

                              }
                          }
                    }
              }
              console.log('sampleDataCheckPass',sampleDataCheckPass);
              console.log('msRunCheckPass',msRunCheckPass);
              if(sampleDataCheckPass&&msRunCheckPass){
              //if(true){
                  console.log('pass');
                  let submitData = [];
                  for(let i=0; i<this.sampleData.length; i++){
                      let item = {};
                      item.projectAccession = this.$route.params.id;
                      item.sampleAccession = this.sampleData[i].accession.value;
                      item.fractionAccession = this.msRunArray[i].fractionid.value;
                      item.msRunAccession = this.msRunArray[i].msrun.value;
                      item.sampleProperties = [];
                      for(let j in this.sampleData[i]){
                          let sampleItem = {};
                          if(j == 'accession' || j == 'accessionKey' || j == 'disable')
                            continue;
                          else{
                              sampleItem.key={};
                              sampleItem.key.accession=this.sampleData[i][j].col.accession; 
                              sampleItem.key.cvLabel=this.sampleData[i][j].col.cvLabel;
                              sampleItem.key.name=this.sampleData[i][j].col.name;
                              sampleItem.key.value=this.sampleData[i][j].col.orignal_name;
                              sampleItem.value={};
                              sampleItem.value.accession=this.sampleData[i][j].accession;
                              sampleItem.value.cvLabel=this.sampleData[i][j].cvLabel;
                              sampleItem.value.name=this.sampleData[i][j].col.name;
                              sampleItem.value.value=this.sampleData[i][j].value;
                              item.sampleProperties.push(sampleItem);
                          }  
                      }
                      item.msrunProperties = [];//TODO 
                      let sampleLable={
                          accession: this.msRunArray[i].label.accession,
                          cvLabel: this.msRunArray[i].label.cvLabel,
                          name: this.msRunArray[i].label.value,
                          value: ''
                      }
                      item.sampleLabel = sampleLable;
                      let labelReagent = {
                          accession: this.msRunArray[i].labelReagent.accession,
                          cvLabel: this.msRunArray[i].labelReagent.cvLabel,
                          name: this.msRunArray[i].labelReagent.value,
                          value: ''
                      }
                      item.labelReagent = labelReagent;

                      if(!this.sampleData[i].disable)
                        submitData.push(item);
                  }
                  let sendData = {};
                  sendData.SampleMSRunTable = {};
                  sendData.SampleMSRunTable.sampleMSRunRows = submitData;
                  console.log('sendData',sendData)
                  this.$http
                      .put(this.updateSampleApi,sendData,{
                        headers: {
                          'Authorization':'Bearer '+ localStorage.getItem('token')
                        }
                      })
                      .then(function(res){
                        console.log('success',res);
                        this.$Message.success({content:'Annotation Success', duration:1});
                        localStorage.clear();
                        this.$router.push({path:'/annotation'});
                      },function(err){
                        console.log('err',err);
                        if(err.body.error == 'TOKEN_EXPIRED'){
                            this.logout();
                        }
                        this.$Message.error({content:'Annotation Error', duration:1});
                      });
              }
              else{
                this.$Message.error({content:'Fill required content', duration:1});
              }
          },
          save(){

              let sampleDataStr = JSON.stringify(this.sampleData);
              let msRunArrayStr = JSON.stringify(this.msRunArray);
              if(this.sampleData.length>0)
                this.localStorageItemAdd('sampleData', sampleDataStr);

              if(this.msRunArray.length>0)
                this.localStorageItemAdd('msRunArray', msRunArrayStr);


              localStorage.setItem('projectAccession',this.$route.params.id);
              localStorage.setItem('selectedExperimentType',this.experimentType);
              localStorage.setItem('samplesNum',this.sampleNumber);
              localStorage.setItem('fractionsNum',this.fractionNumber);
              localStorage.setItem('trNum',this.trNumber);

              this.$Message.success({content:'Save Successfully', duration:1});
              //let sampleDataB64 = Base64.encode(sampleDataStr)  TODO for backend.
          },
          logout(){
            localStorage.setItem('username','');
            localStorage.setItem('token','');
            this.$router.push({name:'annotation'})
          },
          localStorageItemAdd(key,data){
              localStorage.setItem(key,data);
          },
          localStorageItemRemove(key){
              localStorage.removeItem(key);
          },
          msRunAnnotate(){
            if(!this.selectedFileItem.row){
              this.$Message.error({content:'Choose one file at least', duration:1});
              return;
            }
            for(let i of this.msRunArray){
                if(i.fractionid.id == this.msRunTableRowID){
                    i.msrun.value = this.selectedFileItem.row.name;
                    i.msrun.accession = this.selectedFileItem.row.accession;
                    break;
                }
            }
            this.hideMsRunTable();
          },
          showMsRunTable(itemRow,index){
            this.drawerShowBool=true;
            this.msRunTableRowID = itemRow.fractionid.id;
          },
          hideMsRunTable(){
            this.drawerShowBool=false;
            this.msRunTableRowID = '';
            //this.selectedFileItem={};
          },
          removeAnnotationFile(){

          },
          wheel(e){
            //console.log(e)
          },
          pageChange(data){
            this.rowStart = (data.page-1)*data.pageSize;
            this.rowEnd = data.page*data.pageSize;

            console.log(this.rowStart,this.rowEnd);
          }
    },
    watch: {
        sampleData:{
          handler(){
            if(this.sampleData.length>0 || this.msRunArray.length>0)
              setTimeout(()=>{
                this.tableLoading=false;
              },50)
            if(!JSON.parse(localStorage.getItem("msRunArray")))
              this.msRunArray=this.sampleData.map((sampleItem,index)=>{
                  let item={
                        label:{
                              value:'',
                              dropdown:false,
                              accession:'null',
                              cvLabel:'null',
                              col:{
                                required:true
                              },
                              icon:'',
                              checked:true,
                        },
                        labelReagent:{
                              value:'',
                              dropdown:false,
                              accession:'null',
                              cvLabel:'null',
                              col:{
                                required:true
                              },
                              icon:'',
                              checked:true,
                        },
                        msrun:{
                              value:'',
                              dropdown:false,
                              accession:'null',
                              cvLabel:'null',
                              col:{
                                required:true
                              },
                              icon:'',
                              checked:true,
                        },
                        fractionid:{
                              id:sampleItem.accession+'_F'+(index+1),
                              value:'F'+(index+1),
                              dropdown:false,
                              accession:'null',
                              cvLabel:'null',
                              col:{},
                              icon:'',
                              checked:true,
                        },
                        accessionKey:sampleItem.accessionKey,
                        disable:sampleItem.disable
                  }
                  return item;
              })
            else
              return;
          },
          deep:true
        },
        msRunArray:{
          handler(){
            if(this.msRunArray.length>0)
              setTimeout(()=>{
                this.tableLoading=false;
              },50)
          },
          deep:true
        },
    },
    
    mounted: function(){
      this.getSampleAttributes();
      this.getMSRunTableData();
      this.init();
    },
    computed:{

    },
    created(){
      this.$bus.$on('annotation-confirm', this.confirm);
      this.$bus.$on('annotation-save', this.save);
      this.$bus.$on('annotation-page', this.pageChange);
    },
    beforeCreate:function(){
      this.$bus.$off('annotation-confirm');
      this.$bus.$off('annotation-save');
      this.$bus.$off('annotation-page');
    },
    beforeRouteEnter(to,from,next){
     
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .draggable-class{
    display: flex;
  }
  .table-col:first-child{
      border-left: 1px solid #e9eaec;
  }
  .table-col{
      flex:1;
      min-width: 200px;
      border-right: 1px solid #e9eaec;
  }
   .table-col:last-child{
      min-width: 350px;
  }
  .table-row:first-child{
      min-width: 100px;
      border-top: 1px solid #e9eaec;
      background-color: #f8f8f9;
      align-items: center;
      height:40px; 
      display: flex;
      white-space: nowrap;
      overflow: hidden;
      justify-content: center;
      font-weight: 700;
      font-size: 12px;
  }
  .table-row:first-child.msrun{
      background-color: #75bfbecf;
  }
  .table-row{
      border-bottom: 1px solid #e9eaec;
      padding: 10px 20px 10px 5px;
      position: relative;
      height:45px;
  }
  .table-row.first{
    cursor: all-scroll;
    padding:10px 20px;
  }
  .table-row .copy-icon{
    position: absolute;
    right: 5px;
    top: 12px;
    display: none;
    cursor: pointer;
  }
  .table-row:hover .copy-icon{
    display: block;
  }
  .icon-in-th-right{
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
  .icon-in-th-left{
    position: absolute;
    left: 3px;
    cursor: pointer;
  }
  .icon-in-row{
    /*position: absolute;
    left: 10px;*/
    cursor: default;
    margin-right: 5px;
  }
  .add-col-table{
    /*height: 500px;*/
  }
  .accession-col{
    text-align: center;
    position: relative;
    min-width: 80px;
    display: flex;
    align-items: center;
  }
  .card{
    margin-bottom: 20px;
  }
  .search-button{
      padding: 5px;
      font-size: 12px;
      width: 95%;
      margin-left: 11px;
      margin-bottom: 0;
      /*padding: 20px 85px;
      font-size: 24px;*/
      font-weight: 700;
      background-color: #5bc0be;
      border-radius: 3px;
  }
  .search-button.finish{
      background-color: #73d66d;
  }
  .annotate-drawer-container{
    display:flex;
  }
  .annotate-drawer-container .mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.6);
    height: 100%;
    z-index: 1000;
  }
  .annotate-drawer-container .annotate-drawer-wrapper{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(55,55,55,.6);
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }
  .annotate-drawer-container .annotate-drawer-wrapper .annotate-drawer{
    display:flex;
    flex-direction:column;
    height: 100%;
    position: fixed;
    top: 0;
    left:100%;
    bottom: 0;
    width:500px;
    background-color: #fff;
  }
  .annotate-drawer-container .annotate-drawer-wrapper .annotate-drawer.active{
    transform: translateX(-100%);
    transition: 0.5s transform;
  }
  .annotate-drawer-container .annotate-drawer-wrapper .annotate-drawer .header{
    display:flex;
    justify-content:space-between;
    padding: 10px;
    border-bottom: 1px solid #00000026;
  }
  .annotate-drawer-container .annotate-drawer-wrapper .annotate-drawer .content{
    flex:1;
    padding: 30px 10px 30px 10px;
  } 
  .annotate-drawer-container .annotate-drawer-wrapper .annotate-drawer .footer{
    display:flex;
    justify-content: flex-end;
    padding: 10px;
    border-top: 1px solid #00000026;
  }
  .annotate-drawer-container .annotate-drawer-wrapper .annotate-drawer .footer a{
    padding: 8px 10px;
    margin-left: 10px;
    width:70px;
  }
  .annotate-drawer-container .annotate-drawer-wrapper .annotate-drawer span{
    font-size: 14px;
    font-weight: bold;
  }
  .annotate-drawer-container .annotate-drawer-wrapper .annotate-drawer .header a{
    border-bottom-style: none;
  } 
  .sample-table-extra{
      display: flex;
      align-items: center;
  }
  .sample-table-extra span{
      font-size: 12px;
      color: #999;
      margin:0 10px;
  }
  .sample-table-extra.add-row-icon{
      margin-top: 10px;
  }
  .sample-table-extra i:hover{
    cursor: pointer;
    opacity:0.6;
  }
  .tooltip-content{
      white-space: normal
  }
  .msRun-button-wrapper{
      display: flex;
      align-items: center;
  }
  .msRun-button-wrapper i:hover{
    cursor: pointer;
    opacity:0.6;
  }
  .hideRow{
    display: none;
  }
  .table-spin{
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    /* text-align: center; */
    justify-content: center;
    align-items: center;
    background-color: #f7f7f78f;
  }
</style>

<style>
    .add-col-table .new-col-table{
        display: none;
    }
    .add-col-table table{
        margin-bottom:0 !important;
    }
    /*.add-col-table tbody th, table tbody td, table thead th, table thead td, table tfoot th, table tfoot td{
        padding: 0 !important;
    }*/
    .dropdown-remote{
      position: absolute;
    }
    .dropdown-remote .ivu-select-dropdown{
        top: 30px !important;
        left: 0 !important;
        width: 300px;    
        max-height: 400px;
        overflow: scroll;
    }
    .dropdown-remote .ivu-select-dropdown .ivu-dropdown-item{
        position: relative;
    }
    .apply-all-button{
        position: absolute;
        left: 0;
        top: 0;
        padding: 7px 3px;
        display: none;
        z-index: 2000;
    }
    .dropdown-remote .ivu-select-dropdown .ivu-dropdown-item:hover > .apply-all-button{
        display: inline-block;
    }
    .inputError .ivu-input{
        border: 1px solid red !important;
    }
    .table-row input{
        background-color:white;
        border:none;
        box-shadow:none;
    }
    .table-row:hover input{
        /*border: 1px solid #5bc0be;*/
    }
    .table-row .ivu-input-wrapper .ivu-icon-close-circled{
      display: none;
    }
    .table-row:hover .ivu-input-wrapper .ivu-icon-close-circled{
      display: inline-block;
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
    .show-button-tooltip{
      width:100%;
    }
    .show-button-tooltip .ivu-tooltip-rel{
      width:100%;
      display: flex;
      align-items: center;
    }
    .show-button-tooltip .ivu-tooltip-inner{
      max-width:600px;
    }
    .card.annotation .card-content{
      overflow-x: auto;
      /*position: relative;*/
    }
</style>
