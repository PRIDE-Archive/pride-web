<template>
  <div class="archive-container">
      <Card class="card">
          <p slot="title" class="resource-list-title-container">
            <span>Sample</span>
          </p>
          <p slot="extra">
            <Icon type="plus-round" @click="showModal" size="20"></Icon>
          </p>
          <div class="card-content">
              <draggable class="draggable-class" v-model="sampleCol">
                  <div class="table-col" v-for="(itemCol,i) in sampleCol" :key="itemCol.key">
                      <div class="table-row first">{{itemCol.name}}<Icon class="icon-in-th" type="ios-close-outline" v-if="!itemCol.required" @click="deleteCol(itemCol,i)" size="14"></Icon></div>
                      <div class="table-row" v-for="(itemRow,j) in sampleData">
                            <div v-if="itemCol.key!='accession'">
                                  <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].icon" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-change="organismSampleQuery(itemCol,itemRow)" @on-focus="focus(itemRow[itemCol.key])">
                                  </Input>
                                  <Dropdown class="dropdown-remote" trigger="custom" :visible="itemRow[itemCol.key].dropdown" placement="bottom-end" @on-click="dropdownClick($event,itemRow[itemCol.key])" @on-clickoutside="blur(itemRow[itemCol.key])">
                                      <DropdownMenu slot="list">
                                          <DropdownItem v-if="dropdownOptions.length == 0" name="nodata">No data</DropdownItem>
                                          <DropdownItem v-for="item in dropdownOptions" :name="item.name" :key="item.name">{{item.name}}
                                              <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAll(item.name, itemRow[itemCol.key],itemCol.key)"></Icon>
                                          </DropdownItem>
                                      </DropdownMenu>
                                  </Dropdown>
                            </div>
                            <div v-else>
                                <div class="accession-col"><Icon v-if="sampleData.length>1" class="icon-in-row" type="ios-close-outline" @click="deleteRow(itemRow,j)" size="14"></Icon><span>{{itemRow.accession}}</span></div>
                            </div>
                      </div>
                  </div>
              </draggable>
              <Icon class="add-row-icon" type="plus-round" @click="addRow" size="20"></Icon>
          </div>
      </Card>
      <Card class="card">
          <p slot="title" class="resource-list-title-container">
            <span>File</span>
          </p>
          <div class="card-content">
              <div class="draggable-class">
                  <div class="table-col" v-for="(itemCol,i) in sampleCol" :key="itemCol.key">
                      <div class="table-row first">{{itemCol.name}}</div>

                      <div class="table-row" v-for="(itemRow,j) in fileData">
                            <div v-if="itemCol.key!='accession'">
                                  <Input size="small" type="text" disabled v-model="itemRow[itemCol.key].value"  >
                                  </Input>
                            </div>
                            <div v-else>
                                <div class="accession-col"><span>{{itemRow.accession}}</span></div>
                            </div>
                      </div>
                  </div>
                  <div class="table-col" v-for="(itemCol,i) in msRunCol" :key="itemCol.key">
                      <div class="table-row first msrun">{{itemCol.name}}</div>
                      <div class="table-row" v-for="(itemRow,j) in msRunArray">
                            <div v-if="itemCol.key=='label'">
                                  <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].icon" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-change="labelQuery(itemCol,itemRow)" @on-focus="focus(itemRow[itemCol.key])"></Input>
                                  <Dropdown class="dropdown-remote" trigger="custom" :visible="itemRow[itemCol.key].dropdown" placement="bottom-end" @on-click="dropdownClick($event,itemRow[itemCol.key])" @on-clickoutside="blur(itemRow[itemCol.key])">
                                      <DropdownMenu slot="list">
                                          <DropdownItem v-if="dropdownOptions.length == 0" name="nodata">No data</DropdownItem>
                                          <DropdownItem v-for="item in dropdownOptions" :name="item.name" :key="item.name">{{item.name}}
                                              <Icon class="apply-all-button" type="arrow-down-a" size="15" @click.stop="applyAllFile(item.name, itemRow[itemCol.key],itemCol.key)"></Icon>
                                          </DropdownItem>
                                      </DropdownMenu>
                                  </Dropdown>
                            </div>
                            <div v-else-if="itemCol.key=='msrun'">
                              <a class="button search-button" @click="drawerShowBool=true">Show</a>
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
          <Table border ref="selection" class="add-col-table" :columns="newCol" :data="newData" @on-selection-change="newColSelectChange"></Table>
      </Modal>
      <div v-if="drawerShowBool" class="annotate-drawer-container" v-on:scroll.prevent="onScroll">
          <div class="mask"></div>
          <div class="annotate-drawer-wrapper">
            <div class="annotate-drawer" :class="{ active: drawerShowBool }">
                <div class="header"><span>MsRUN Table</span><a @click="drawerShowBool=false"><Icon color="rgba(0, 0, 0, 0.6)" type="ios-close"  size="20"/></a></div>
                <div class="content">
                  <Table border ref="selection" class="add-col-table" :columns="newCol" :data="newData" @on-selection-change="newColSelectChange" height="400"></Table>
                </div>
                <div class="footer">
                    <a class="button search-button" @click="msRunAnnotate">OK</a>
                    <a class="button search-button" @click="drawerShowBool=false">Cancel</a>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { ModelSelect } from 'vue-search-select'
  export default {
    name: 'archive',
    data(){
      return {
          getSampleAttributesApi: 'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/getSampleAttributes',
          getValuesByAttributeApi: 'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/getValuesByAttribute',
          labelQueryApi:'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/getLabelingValues',
          msRunApi:'http://wwwdev.ebi.ac.uk/pride/ws/archive/msruns/byProject',
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
          projectAccessionMsRun:'',
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
              },{
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
          firstLoad:true,
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
                                  console.log('item',item);
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
                           
                          //console.log('this.fileData',this.fileData);
                          //console.log('this.sampleData',this.sampleData);
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
                    //console.log(item[itemCol.key].active);
                    if(!item[itemCol.key].active)
                      return;
                    if(res.body.length>0 || searchValue)
                      item[itemCol.key].dropdown=true;

                    this.dropdownOptions=res.body;
                    //console.log('this.dropdownOptions',this.dropdownOptions);
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
              console.log('itemCol',itemCol);
               if(itemCol.key=='label'){
                  this.$http
                      .get(this.labelQueryApi)
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
              else if(itemCol.key=='msrun'){
                  let query={
                      accession: this.projectAccessionMsRun,
                  }
                  console.log('msrun',query);
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
              console.log('focusfocusfocusfocusfocusfocus');
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
              console.log('blurblurblurblurblurblurblurblur',item.dropdown);
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
                this.$refs.selection.selectAll(false);
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
          dropdownClick(e,item){
            console.log('dropdownClick',item);
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
              console.log('applyAll clicked',item);
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
              console.log('applyAllFile clicked');
              this.dropdownClick(name,item);
              this.$nextTick(()=>{ //make the value bind with the input first and then apply this value to all the other rows
                  for(let i=0;i<this.msRunArray.length; i++){
                      let newItem =  JSON.parse(JSON.stringify(item));
                      this.msRunArray[i][key] = newItem;
                  }
              });
          },
          init(){
            let tempSampleData = JSON.parse(localStorage.getItem("sampleData"));
            let tempFileData = JSON.parse(localStorage.getItem("fileData"));
            let tempMSRunArray = JSON.parse(localStorage.getItem("msRunArray"));
            if(tempSampleData)
              this.sampleData = tempSampleData;
            if(tempFileData)
              this.fileData = tempFileData;
            if(tempMSRunArray)
              this.msRunArray = tempMSRunArray;

            console.log('this.sampleData',this.sampleData);
            console.log('this.fileData',this.fileData);

            this.firstLoad=false;

            this.projectAccessionMsRun = localStorage.getItem("projectAccession")
            this.experimentType = localStorage.getItem('selectedExperimentType')
            this.sampleNumber  = +localStorage.getItem("samplesNum")
            this.fractionNumber = +localStorage.getItem("fractionsNum")
            console.log('init this.projectAccessionMsRun ',this.projectAccessionMsRun );
            

            //console.log('samplesNum',this.sampleNumber);
            //console.log('fractionsNum',this.fractionNumber);
            //console.log('projectAccession',this.projectAccessionMsRun);
            //console.log('selectedExperimentType',this.experimentType);
          },
          confirm(){
              let results = [];
              let tempAccession='';
              let sampleDataCheckPass=true;
              let msRunCheckPass= true;
              //console.log('this.sampleData',this.sampleData);
              //console.log('this.sampleCol',this.sampleCol);
              console.log('aaaaaaathis.fileData',this.fileData)
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
                          //console.log('j',j);
                           // console.log('this.sampleData[i][j]',this.sampleData[i][j]);
                            if(!this.sampleData[i][j].value && this.sampleData[i][j].col.required){
                                sampleDataCheckPass=false;
                                this.sampleData[i][j].checked=false;
                            }
                            else{
                                 this.sampleData[i][j].checked=true;
                                 /*
                                let item={
                                    accession:tempAccession,
                                    key:{
                                      accession:this.sampleData[i][j].col.accession,
                                      cvLabel:this.sampleData[i][j].col.cvLabel,
                                    },
                                    value:{
                                      accession:this.sampleData[i][j].accession,
                                      cvLabel:this.sampleData[i][j].cvLabel,
                                      value:this.sampleData[i][j].value
                                    }
                                }
                                results.push(item);*/
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
                                  console.log('this.msRunArray[i][j]',this.msRunArray);
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
                  console.log('pass');
                  let submitData = [];
                  for(let i of this.fileData){
                      console.log('i',i);
                      let item = {};
                      item.projectAccession = this.$route.params.id;
                      item.sampleAccession = i.accession;
                      item.sampleProperties = [];
                      for(let j in i){
                          console.log('j',j);
                          console.log('i.j',i[j]);
                          let sampleItem = {};
                          if(j == 'accession' || j == 'accessionKey')
                            continue;
                          else{
                              sampleItem.key={};
                              sampleItem.key.accession=i[j].col.accession;
                              sampleItem.key.cvLabel=i[j].col.cvLabel;
                              sampleItem.key.name=i[j].col.name;
                              sampleItem.key.value=i[j].col.orignal_name;

                              sampleItem.value={};
                              sampleItem.value.accession=i[j].accession;
                              sampleItem.value.cvLabel=i[j].cvLabel;
                              sampleItem.value.name=i[j].col.name;
                              sampleItem.value.value=i[j].value;
                              item.sampleProperties.push(sampleItem);
                          }  
                      }
                      submitData.push(item);
                  }
                  console.log('submitData',submitData);
                //console.log('this.fileData',this.fileData);
                //console.log('this.sampleData',this.sampleData);
                //console.log('msRunArray',this.msRunArray);
                //console.log('results',results);
              }
              else{
                this.$Message.error({content:'Fill required content', duration:1});
              }
          },
          save(){
              this.$Message.success({content:'Save Successfully', duration:1});
              if(this.sampleData.length>0)
                this.localStorageItemAdd('sampleData', JSON.stringify(this.sampleData));
              if(this.fileData.length>0)
                this.localStorageItemAdd('fileData', JSON.stringify(this.fileData));
              if(this.msRunArray.length>0)
                this.localStorageItemAdd('msRunArray', JSON.stringify(this.msRunArray));


              localStorage.setItem('projectAccession',this.$route.params.id);
              localStorage.setItem('selectedExperimentType',this.experimentType);
              localStorage.setItem('samplesNum',this.sampleNumber);
              localStorage.setItem('fractionsNum',this.fractionNumber);

              console.log('save projectAccession',this.projectAccessionMsRun);
          },
          localStorageItemAdd(key,data){
              localStorage.setItem(key,data);
          },
          localStorageItemRemove(key){
              localStorage.removeItem(key);
          },
          msRunAnnotate(){

          },
          dropdownClickOutside(e,item){
            console.log(e,item);
          }
    },
    watch: {
        sampleData:function(){
            this.fileData=[];
            for(let k=0; k<this.sampleData.length; k++){
                for(let j=0; j<this.fractionNumber; j++){
                    this.fileData.push(this.sampleData[k]);
                }
            }     
        },
        fileData:function(){
            if(this.msRunArray.length==0){
                let lastAccesstion='';
                let lastIndex=1;
                for(let i=0; i<this.fileData.length;i++){
                      //label, msrun, fractionid,
                      if(lastAccesstion!=this.fileData[i].accession){
                          lastAccesstion=this.fileData[i].accession;
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
                            },
                            fractionid:{
                                  value:this.fileData[i].accession+'_F'+lastIndex,
                                  dropdown:false,
                                  accession:'null',
                                  //accessionKey:this.fileData[i].accessionKey,
                                  cvLabel:'null',
                                  col:{},
                                  icon:'',
                            },
                            accessionKey:this.fileData[i].accessionKey,
                      }
                      this.msRunArray.push(item);
                }
            }
            else{
                //delete msrun
                for(let i=0;i<this.msRunArray.length;i++){
                    let found = false;
                    for(let j=0;j<this.sampleData.length;j++){
                        if(this.sampleData[j].accessionKey == this.msRunArray[i].accessionKey){
                            found=true;
                            break;
                        }
                    }
                    if(!found){
                        this.msRunArray.splice(i,1);
                        i--;
                    }
                }
                //add msrun
                for(let i=0;i<this.sampleData.length;i++){
                    let found = false;
                    for(let j=0;j<this.msRunArray.length;j++){
                        if(this.sampleData[i].accessionKey == this.msRunArray[j].accessionKey){
                            found=true;
                            break;
                        }
                    }
                    if(!found){
                        for(let k=0;k<this.fractionNumber;k++){
                            let item={
                                  label:{
                                        value:'',
                                        dropdown:false,
                                        accession:'null',
                                        //accessionKey:this.sampleData[i].accessionKey,
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
                                        //accessionKey:this.sampleData[i].accessionKey,
                                        cvLabel:'null',
                                        col:{
                                          required:true
                                        },
                                        icon:'',
                                        checked:true,
                                  },
                                  fractionid:{
                                        value:this.sampleData[i].accession+'_F'+(k+1),
                                        dropdown:false,
                                        accession:'null',
                                        //accessionKey:this.sampleData[i].accessionKey,
                                        cvLabel:'null',
                                        col:{},
                                        icon:'',
                                  },
                                  accessionKey:this.sampleData[i].accessionKey,
                            }
                            this.msRunArray.push(item);
                        }
                    }
                }
            }
        },
        onScroll(){

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
  .icon-in-th{
    position: absolute;
    right: 10px;
    cursor: default;
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
  .add-row-icon{
      margin-top: 5px;
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
    width:256px;
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
    
    padding: 10px;
  } 
  .annotate-drawer-container .annotate-drawer-wrapper .annotate-drawer .footer{
    display:flex;
    position:absolute;
    bottom:10px;
    right:10px;
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
</style>

<style>
    .add-col-table .new-col-table{
        display: none;
    }
    .add-col-table table{
        margin-bottom:0 !important;
    }
    .add-col-table tbody th, table tbody td, table thead th, table thead td, table tfoot th, table tfoot td{
        padding: 0 !important;
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
</style>
