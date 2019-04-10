<template>
  <div class="archive-container">
      <Card class="card">
          <p slot="title" class="resource-list-title-container">
            <span>Sample</span>
          </p>
          <p slot="extra" class="sample-table-extra">
            <span class="icon-hint-text">Add Property</span><Icon type="plus-round" @click="showModal" size="20"></Icon>
          </p>
          <div class="card-content">
              <draggable class="draggable-class" v-model="sampleCol"  :options="{ handle: '.handle' }">
                  <div class="table-col" v-for="(itemCol,i) in sampleCol" :key="itemCol.key">
                      <div class="table-row first handle"><Icon v-if="itemCol.key!='accession'" class="icon-in-th-left" type="ios-minus-outline" @click="removeAll(itemCol.key)" size="10"></Icon>{{itemCol.name}}<Icon class="icon-in-th-right" type="ios-close-outline" v-if="!itemCol.required" @click="deleteCol(itemCol,i)" size="10"></Icon></div>
                      <div class="table-row" v-for="(itemRow,j) in sampleData">
                            <div v-if="itemCol.key!='accession'">
                                  <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].icon" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-change="organismSampleQuery(itemCol,itemRow)" @on-focus="focus(itemRow[itemCol.key])">
                                  </Input>
                                  <Dropdown class="dropdown-remote" trigger="custom" :visible="itemRow[itemCol.key].dropdown" placement="bottom-end" @on-click="dropdownClick($event,itemRow[itemCol.key])" @on-clickoutside="blur(itemRow[itemCol.key])">
                                      <DropdownMenu slot="list">
                                          <DropdownItem v-if="dropdownOptions.length == 0" name="nodata">No data
                                              <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAll('no data', itemRow[itemCol.key],itemCol.key)"></Icon>
                                          </DropdownItem>
                                          <DropdownItem v-for="item in dropdownOptions" :name="item.name" :key="item.name">{{item.name}}
                                              <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAll(item.name, itemRow[itemCol.key],itemCol.key)"></Icon>
                                          </DropdownItem>
                                      </DropdownMenu>
                                  </Dropdown>
                            </div>
                            <div v-else>
                                <div class="accession-col"><Icon v-if="sampleData.length>1 && j == sampleData.length-1" class="icon-in-row" type="ios-close-outline" @click="deleteRow(itemRow,j)" size="14"></Icon><span>{{itemRow.accession}}</span></div>
                            </div>
                      </div>
                  </div>
              </draggable>
              <div class="sample-table-extra add-row-icon">
                 <Icon class="add-row-icon" type="plus-round" @click="addRow" size="20"></Icon><span>Add Sample</span>
              </div>
          </div>
      </Card>
      <Card class="card">
          <p slot="title" class="resource-list-title-container">
            <span>File</span>
          </p>
          <!--
          <p slot="extra" class="sample-table-extra">
            <span class="icon-hint-text">Add MsRun</span><Icon type="plus-round" disable size="20"></Icon>
          </p>
           -->
          <div class="card-content">
              <div class="draggable-class">
                  <div class="table-col" v-for="(itemCol,i) in sampleCol" v-if="itemCol.key!='developmentalstage' && itemCol.key!='sex' && itemCol.key!='individualaccession' " :key="itemCol.key">
                      <div class="table-row first">{{itemCol.name}}</div>
                      <div class="table-row" v-for="(itemRow,j) in fileData" :key="j" :class="{hideRow:itemRow.disable}">
                            <div v-if="itemCol.key!='accession'">

                                  <Input size="small" type="text" disabled v-model="itemRow[itemCol.key].value"  >
                                  </Input>
                            </div>
                            <div v-else >
                                <div class="accession-col">
                                  <Icon v-if="!itemRow.hideIcon" class="icon-in-row" type="ios-close-outline" @click="disableFileDataRow(itemRow,j)" size="14"></Icon>
                                  <span>{{itemRow.accession}}</span>
                                </div>
                            </div>
                      </div>
                  </div>
                  <div class="table-col" v-for="(itemCol,i) in msRunCol" :key="itemCol.key">
                      <div class="table-row first msrun">{{itemCol.name}}</div>
                      <div class="table-row" v-for="(itemRow,j) in msRunArray" :key="j" :class="{hideRow:itemRow.disable}">
                            <div v-if="itemCol.key=='label' || itemCol.key=='labelReagent'">
                            <!--<div v-if="itemCol.key=='label'">-->
                                  <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].icon" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-change="labelQuery(itemCol,itemRow)" @on-focus="focus(itemRow[itemCol.key])"></Input>
                                  <Dropdown class="dropdown-remote" trigger="custom" :visible="itemRow[itemCol.key].dropdown" placement="bottom-end" @on-click="dropdownClick($event,itemRow[itemCol.key])" @on-clickoutside="blur(itemRow[itemCol.key])">
                                      <DropdownMenu slot="list">
                                          <DropdownItem v-if="dropdownOptions.length == 0" name="nodata">No data
                                              <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAllFile('no data', itemRow[itemCol.key],itemCol.key)"></Icon>
                                          </DropdownItem>
                                          <DropdownItem v-for="item in dropdownOptions" :name="item.name" :key="item.name">{{item.name}}
                                              <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAllFile(item.name, itemRow[itemCol.key],itemCol.key)"></Icon>
                                          </DropdownItem>
                                      </DropdownMenu>
                                  </Dropdown>
                            </div>
                            <div v-else-if="itemCol.key=='msrun'">
                              <div class="msRun-button-wrapper" v-if="itemRow[itemCol.key].file">
                                  <Tooltip max-width="200" class="show-button-tooltip" placement="right">
                                      <a class="button search-button finish" @click="showMsRunTable(itemRow,j)">Finish</a> 
                                      <div class="tooltip-content" slot="content">
                                          {{itemRow[itemCol.key].file}}
                                      </div>
                                  </Tooltip>
                                  <Icon color="rgba(0, 0, 0, 0.6)" type="ios-close"  size="16" style="margin-left:5px" @click="itemRow[itemCol.key].file=''"/>
                              </div>
                              <div v-else>
                                    <a class="button search-button" @click="showMsRunTable(itemRow,j)">Edit</a> 
                              </div>
                              
                            </div>
                            <div v-else>
                                <div class="accession-col"><span>{{itemRow.fractionid.value}}</span></div>
                            </div>
                      </div>
                  </div>
              </div>
          </div>
      </Card>
      <Modal
          title="Add Column"
          v-model="addColumnBool"
          :closable="false"
          @on-ok="addCol"
          @on-visible-change="modalVisibleChange">
          <Table border ref="addPropertyTable" class="add-col-table" :columns="newCol" :data="newData" @on-selection-change="newColSelectChange"></Table>
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
          labelReagentQueryApi:'http://ves-ebi-4d.ebi.ac.uk:8090/pride/ws/archive/annotator/reagentValues',
          msRunApi:'http://wwwdev.ebi.ac.uk/pride/ws/archive/msruns/byProject',
          tokenApi:'http://ves-ebi-4d.ebi.ac.uk:8090/pride/ws/archive/getAAPToken', 
          updateSampleApi:'http://ves-ebi-4d.ebi.ac.uk:8090/pride/ws/archive/annotator/'+this.$route.params.id+'/updateSampleMsRuns',
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
                                  this.selectedFileItem = params;
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
          // msRunModalTableCol:[
          //     {
          //         align: 'center',
          //         width: 40,
          //         render: (h, params) => {
          //             return h('Checkbox', {
          //                 props: {
          //                     value: params.row.select
          //                 },
          //                 on: {
          //                     'on-change': (val) => {
          //                         this.msRunModalTableData.map(x => {
          //                             x.select= false;
          //                             return x;
          //                         });
          //                         this.msRunModalTableData[params.index].select= val;
          //                         this.selectedFileItem = params;
          //                     }
          //                 }
          //             });
          //         }
          //     },
          //     {
          //         title: 'Name',
          //         //width: 70,
          //         key: 'name',
                  
          //     },
          //     {
          //         title: 'Size (M)',
          //         key: 'size',
          //         //width: 0.1,
          //        // className:'msrun-modal-table-accession'
          //     },
          //     {
          //         title: 'Accession',
          //         key: 'accession',
          //         width: 0.1,
          //         className:'msrun-modal-table-accession'
          //     },
          // ],
          msRunModalTableData:[],
          sampleCol:[
            {
              name:'111',
              key:'key1',
              required:false,
            },
            {
              name:'222',
              key:'key2',
              required:false,
            },
            {
              name:'333',
              key:'key3',
              required:false,
            }
          ],
          fileCol:[],
          sampleData:[
              {
                  key1:{
                    value:'',
                    accession:'',
                    dropdown:false,
                    icon:'',
                    cvLabel:'',
                    col:{},
                    
                  },
                  key2:{
                    value:'',
                    accession:'',
                    dropdown:false,
                    icon:'',
                    cvLabel:'',
                    col:{}
                  },
                  key3:{
                    value:'',
                    accession:'',
                    dropdown:false,
                    icon:'',
                    cvLabel:'',
                    col:{}
                  },
              },
          ],
          fileData:[],
          dropdownOptions:[
            {
              cvLabel:'',
              accession:'',
              name:'123',
            },
            {
              cvLabel:'',
              accession:'',
              name:'222',
            },
            {
              cvLabel:'',
              accession:'',
              name:'333',
            }
          ],
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
                this.fileCol=[{
                  name:'Fraction ID',
                  key:'fractionid',
                  required:true,
                }];
                this.$http
                      .get(this.getSampleAttributesApi)
                      .then((res)=>{
                          let sampleDataItem={};
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
                                  this.sampleCol.push(item);
                                  this.newData.push(item);
                                  sampleDataItem.accession="";
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
                              for(let k=0; k<this.sampleNumber; k++){
                                    let item = JSON.parse(JSON.stringify(sampleDataItem))
                                    item.accession="PXD_S"+(k+1);
                                    item.accessionKey=this.accessionKey++;
                                    this.sampleData.push(item)
                              }    
                          }
                      },function(err){

                      });
          },
          organismSampleQuery(itemCol,item){
              let searchValue = item[itemCol.key].value;
              if(searchValue)
                  item[itemCol.key].icon = 'close-circled'
              else{
                  item[itemCol.key].icon= '';
                  item[itemCol.key].dropdown=false;
                  return;
              }
              this.dropdownOptions=[];
              let query={
                attributeAccession: itemCol.accession,
                ontologyAccession: itemCol.cvLabel,
                keyword:searchValue
              }
              this.$http
                  .get(this.getValuesByAttributeApi,{params: query})
                  .then(function(res){
                    if(!item[itemCol.key].active)
                      return;
                    if(res.body.length>0 || searchValue)
                      item[itemCol.key].dropdown=true;

                    this.dropdownOptions=res.body;
                    if(this.dropdownOptions.length == 0){
                        item[itemCol.key].value==searchValue;
                    }
                  },function(err){

                  });
          },
          labelQuery(itemCol,item){
              let searchValue = item[itemCol.key].value;
              if(searchValue)
                  item[itemCol.key].icon = 'close-circled'
              else{
                  item[itemCol.key].icon= '';
                  item[itemCol.key].dropdown=false;
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
                  this.$http
                      .get(this.labelQueryApi,{params: query})
                      .then(function(res){
                        if(!item[itemCol.key].active)
                          return;
                        if(res.body.length>0 || searchValue)
                          item[itemCol.key].dropdown=true;

                        this.dropdownOptions=res.body;
                        if(this.dropdownOptions.length == 0){
                            item[itemCol.key].value==searchValue;
                        }
                      },function(err){

                      });
              }
              else if(itemCol.key=='labelReagent'){
                let query={
                    keyword: searchValue,
                }
                this.$http
                    .get(this.labelReagentQueryApi,{params: query})
                    //.get(this.labelQueryApi,{params: query})
                    .then(function(res){
                      console.log(res.body)
                      if(!item[itemCol.key].active)
                        return;
                      if(res.body.length>0 || searchValue)
                        item[itemCol.key].dropdown=true;

                      this.dropdownOptions=res.body;
                      if(this.dropdownOptions.length == 0){
                          item[itemCol.key].value==searchValue;
                      }
                    },function(err){

                    });
              }
              else if(itemCol.key=='msrun'){
                  let query={
                      accession: this.$route.params.id,
                  }
                  this.$http
                      .get(this.msRunApi,{params: query})
                      //.get(this.labelQueryApi,{params: query})
                      .then(function(res){
                        if(!item[itemCol.key].active)
                          return;
                        if(res.body.length>0 || searchValue)
                          item[itemCol.key].dropdown=true;

                        this.dropdownOptions=res.body;
                        if(this.dropdownOptions.length == 0){
                            item[itemCol.key].value==searchValue;
                        }
                      },function(err){

                      });
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
          focus(item){
              item.active=true;
              if(!item.value)
                return;
              item.dropdown = false;
              /*
              this.dropdownOptions = [
                  {
                    cvLabel:item.cvLabel,
                    accession:item.accession,
                    name:item.value,
                  },
              ];*/
          },
          blur(item){
              item.active=false;
              item.dropdown = false;
              if(item.value)
                item.checked=true;
          },
          removeInputContent(item){
              //console.log('removeInputContent',item);
              item.dropdown = false;
              item.value="";
              item.icon="";
          },
          showModal(){
            this.newColumnNameSelectedArray=[];
            this.addColumnBool=true;
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
          modalVisibleChange(stat){
              if(!stat)
                this.$refs.addPropertyTable.selectAll(false);
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
            //console.log('this.sampleCol.length+1',this.sampleData.length+1);
            item.accession = "PXD_S"+(this.sampleData.length+1);
            item.accessionKey = this.accessionKey++;
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
              //update row index
              for(let i=0; i<this.sampleData.length; i++){
                this.sampleData[i].accession = "PXD_S"+(i+1);
              }
          },
          disableFileDataRow(itemRow, index){
              itemRow.disable = true;
  
              let foundNum = 0;
              let foundIndex;
              for(let i in this.fileData){
                if(!this.fileData[i].disable && this.fileData[i].accession == itemRow.accession){
                  foundIndex = i;
                  foundNum ++;
                }
              }
              if(foundNum==1){
                this.fileData[foundIndex].hideIcon = true;
              }

              this.$forceUpdate();
              //itemRow.disable = true;
              //this.msRunArray[index].disable = true;
              //console.log('itemRow',itemRow)
              console.log(this.fileData)
              console.log(this.msRunArray)
              console.log(this.msRunArray)
              return;
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
          applyAll(name,item,key){
                console.log(name,item,key);
               this.dropdownClick(name,item);
               this.$nextTick(()=>{ //make the value bind with the input first and then apply this value to all the other rows
                  for(let i=0;i<this.sampleData.length; i++){
                      let newItem =  JSON.parse(JSON.stringify(item));
                      this.sampleData[i][key] = newItem;
                  }
                  this.blur(item);
              });
          },
          applyAllFile(name,item,key){
              this.dropdownClick(name,item);
              this.$nextTick(()=>{ //make the value bind with the input first and then apply this value to all the other rows
                  for(let i=0;i<this.msRunArray.length; i++){
                      let newItem =  JSON.parse(JSON.stringify(item));
                      this.msRunArray[i][key] = newItem;
                  }
              });
          },
          removeAll(key){
              for(let i=0;i<this.sampleData.length; i++){
                console.log('123',this.sampleData[i][key]);
                  this.sampleData[i][key].value = '';
              }
          },
          init(){
            let tempSampleData = JSON.parse(localStorage.getItem("sampleData"));
            //this.tempFileData = JSON.parse(localStorage.getItem("fileData"));
            this.tempMSRunArray = JSON.parse(localStorage.getItem("msRunArray"));
            if(tempSampleData)
              this.sampleData = tempSampleData;
            // if(tempFileData)
            //   this.fileData = tempFileData;
            // if(tempMSRunArray)
            //   this.msRunArray = tempMSRunArray;

            //console.log('this.sampleData',this.sampleData);
            //console.log('this.fileData',this.fileData);

            this.experimentType = localStorage.getItem('selectedExperimentType')
            this.sampleNumber  = +localStorage.getItem("samplesNum")
            this.fractionNumber = +localStorage.getItem("fractionsNum")
            this.trNumber = +localStorage.getItem("trNum")

            //console.log('samplesNum',this.sampleNumber);
            //console.log('fractionsNum',this.fractionNumber);
            //console.log('selectedExperimentType',this.experimentType);
          },
          confirm(){
              let results = [];
              let tempAccession='';
              let sampleDataCheckPass=true;
              let msRunCheckPass= true;
              console.log('this.sampleData',this.sampleData);
              console.log('this.fileData',this.fileData)
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
              //if(sampleDataCheckPass&&msRunCheckPass){
              if(true){
                  console.log('pass');
                  let submitData = [];
                  
                  for(let i=0; i<this.fileData.length; i++){
                      let item = {};
                      item.projectAccession = this.$route.params.id;
                      item.sampleAccession = this.fileData[i].accession;
                      item.fractionAccession = this.msRunArray[i].fractionid.value;
                      item.msRunAccession = this.msRunArray[i].msrun.accession;
                      item.sampleProperties = [];
                      for(let j in this.fileData[i]){
                          let sampleItem = {};
                          if(j == 'accession' || j == 'accessionKey' || j == 'disable')
                            continue;
                          else{
                              sampleItem.key={};
                              sampleItem.key.accession=this.fileData[i][j].col.accession; 
                              sampleItem.key.cvLabel=this.fileData[i][j].col.cvLabel;
                              sampleItem.key.name=this.fileData[i][j].col.name;
                              sampleItem.key.value=this.fileData[i][j].col.orignal_name;
                              sampleItem.value={};
                              sampleItem.value.accession=this.fileData[i][j].accession;
                              sampleItem.value.cvLabel=this.fileData[i][j].cvLabel;
                              sampleItem.value.name=this.fileData[i][j].col.name;
                              sampleItem.value.value=this.fileData[i][j].value;
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

                      if(!this.fileData[i].disable)
                        submitData.push(item);
                  }
                  console.log('submitData',submitData);

                  let sendData = {};
                  sendData.SampleMSRunTable = {};
                  sendData.SampleMSRunTable.sampleMSRunRows = submitData;
                  this.$http
                      .put(this.updateSampleApi,sendData,{
                        headers: {
                          'Authorization':'Bearer '+ sessionStorage.getItem('token')
                        }
                      })
                      .then(function(res){
                        this.$Message.success({content:'Annotation Success', duration:1});
                        //localStorage.clear();
                        //this.$router.push({name:'annotation'});
                      },function(err){
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
              this.$Message.success({content:'Save Successfully', duration:1});
              let sampleDataStr = JSON.stringify(this.sampleData);
              let msRunArrayStr = JSON.stringify(this.msRunArray);
              if(this.sampleData.length>0)
                this.localStorageItemAdd('sampleData', sampleDataStr);
              //if(this.fileData.length>0)
                //this.localStorageItemAdd('fileData', JSON.stringify(this.fileData));
              if(this.msRunArray.length>0)
                this.localStorageItemAdd('msRunArray', msRunArrayStr);


              localStorage.setItem('projectAccession',this.$route.params.id);
              localStorage.setItem('selectedExperimentType',this.experimentType);
              localStorage.setItem('samplesNum',this.sampleNumber);
              localStorage.setItem('fractionsNum',this.fractionNumber);
              localStorage.setItem('trNum',this.trNumber);

              let sampleDataB64 = Base64.encode(sampleDataStr)
              
              //console.log(Base64.decode(sampleDataB64));
          },
          logout(){
            //this.$store.commit('setUser',{username: '', token:''});  
            sessionStorage.setItem('username','');
            sessionStorage.setItem('token','');
            this.$router.push({name:'annotation'})
          },
          localStorageItemAdd(key,data){
              localStorage.setItem(key,data);
          },
          localStorageItemRemove(key){
              localStorage.removeItem(key);
          },
          msRunAnnotate(){
            if(this.msRunModalTableData.length == 0){
              this.$Message.error({content:'Choose one file at least', duration:1});
              return;
            }
            for(let i of this.msRunArray){
                if(i.fractionid.id == this.msRunTableRowID){
                    i.msrun.file = this.selectedFileItem.row.name;
                    i.msrun.accession = this.selectedFileItem.row.accession;
                    break;
                }
            }
            this.hideMsRunTable();
          },
          showMsRunTable(itemRow,index){
            this.drawerShowBool=true;
            this.msRunTableRowID = itemRow.fractionid.id;
            this.msRunModalTableData=[];
            let query={
                accession: this.$route.params.id,
            }
            this.$http
                .get(this.msRunApi,{params: query})
                .then(function(res){
                    //console.log(res.body);
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
          hideMsRunTable(){
            this.drawerShowBool=false;
            this.msRunTableRowID = '';
            this.selectedFileItem={};
          },
          removeAnnotationFile(){

          },
          wheel(e){
            //console.log(e)
          }
    },
    watch: {
        sampleData:{
          handler(){
              this.fileData=[];
              let tempFileData = []
              for(let k=0; k<this.sampleData.length; k++){
                  for(let j=0; j<this.fractionNumber; j++){
                      console.log(this.sampleData[k]);
                      let item = {};
                      for(let m in this.sampleData[k]){
                        //console.log(m)
                        item[m] = this.sampleData[k][m]
                      }
                      //let item = JSON.parse(JSON.stringify(this.sampleData[k]));
                      let found = false;
                      for(let i=0; i<this.msRunArray.length; i++){
                        if(this.msRunArray[i].fractionid.id == item.accession + '_F'+(j+1)){
                            item.disable = this.msRunArray[i].disable ? true : false;
                            found = true;
                            break;
                        }
                      }
                      if(!found)
                        item.disable = false;

                      //console.log(item);
                      this.fileData.push(item);
                  }
              }
              for(let i in this.fileData){
                  let foundNum = 0;
                  let foundIndex;
                  //let pass = false;
                  for(let j in this.fileData){
                    if(!this.fileData[j].disable && this.fileData[j].accession == this.fileData[i].accession){
                      foundIndex = j;
                      foundNum ++;
                    }
                  }
                  if(foundNum==1){
                    this.fileData[foundIndex].hideIcon = true;
                  }
              } 

            
          },
          deep:true
        },
        fileData:{
          handler(){
              let lastAccesstion='';
              let lastIndex=1;
              this.msRunArray=this.fileData.map((fileItem)=>{
                  if(lastAccesstion!=fileItem.accession){
                      lastAccesstion=fileItem.accession;
                      lastIndex=1;
                  }
                  else
                    lastIndex++;

                  let item={
                        label:{
                              value:'',
                              dropdown:false,
                              accession:'null',
                              //accessionKey:this.fileData[i].accessionKey,
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
                              //accessionKey:this.fileData[i].accessionKey,
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
                              //accessionKey:this.fileData[i].accessionKey,
                              cvLabel:'null',
                              col:{
                                required:true
                              },
                              icon:'',
                              checked:true,
                              file:'',
                        },
                        fractionid:{
                              id:fileItem.accession+'_F'+lastIndex,
                              value:'F'+lastIndex,
                              dropdown:false,
                              accession:'null',
                              //accessionKey:this.fileData[i].accessionKey,
                              cvLabel:'null',
                              col:{},
                              icon:'',
                        },
                        accessionKey:fileItem.accessionKey,
                        disable:fileItem.disable
                  }
                  return item;
              })
              if(this.tempMSRunArray){
                for(let i=0; i<this.msRunArray.length; i++){
                    this.msRunArray[i].label.value = this.tempMSRunArray[i].label.value;
                    this.msRunArray[i].label.icon = this.tempMSRunArray[i].label.icon;
                    this.msRunArray[i].labelReagent.value = this.tempMSRunArray[i].labelReagent.value
                    this.msRunArray[i].labelReagent.icon = this.tempMSRunArray[i].labelReagent.icon
                    this.msRunArray[i].msrun.file = this.tempMSRunArray[i].msrun.file
                }
              }
          },
          deep:true
        }
    },
    
    mounted: function(){
      this.getSampleAttributes();
      this.init();
    },
    computed:{

    },
    created(){
      this.$bus.$on('annotation-confirm', this.confirm);
      this.$bus.$on('annotation-save', this.save);
    },
    beforeCreate:function(){
      this.$bus.$off('annotation-confirm');
      this.$bus.$off('annotation-save');
    },
    beforeRouteEnter(to,from,next){
     
    }
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
      
      border-right: 1px solid #e9eaec;
  }
  .table-row:first-child{
      border-top: 1px solid #e9eaec;
      background-color: #f8f8f9;
  
      align-items: center;
      height:40px; 
      display: flex;
      white-space: normal;
      word-break: break-all;
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
      padding: 10px;
      position: relative;
      height:45px;
  }
  .table-row.first{
    cursor: all-scroll
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
  }
  .card{
    margin-bottom: 20px;
  }
  .search-button{
      padding: 5px;
      font-size: 12px;
      width: 100%;
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
    
</style>
