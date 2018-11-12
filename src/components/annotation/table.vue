<template>
  <div class="archive-container">
    <Card class="card">
        <p slot="title" class="resource-list-title-container">
          <span>Sample</span>
        </p>
        <p slot="extra">
          <!--<Icon type="android-more-horizontal" @click="showModal" size="20"></Icon>-->
          <Icon type="plus-round" @click="showModal" size="20"></Icon>
        </p>
        
        <div class="card-content">
            <draggable class="draggable-class" v-model="sampleCol">
                <div class="table-col" v-for="(itemCol,i) in sampleCol" :key="itemCol.key">
                    <div class="table-row first">{{itemCol.name}}<Icon class="icon-in-th" type="ios-close-outline" v-if="!itemCol.required" @click="deleteCol(itemCol,i)" size="14"></Icon></div>

                    <div class="table-row" v-for="(itemRow,j) in sampleData">
                          <!--<input type="text" name="firstname" v-model="sampleData[j][itemCol.key]" @change="someHandler">-->
                          <!--
                          <Select
                              v-model="sampleData[j][itemCol.key]"
                              filterable
                              remote
                              :remote-method="remoteMethod1"
                              :loading="loading1">
                              <Option v-for="(option, index) in options1" :value="option.name" :key="index">{{option.name}}</Option>
                          </Select>
                          -->
                          <!--
                          <select v-model="sampleData[j][itemCol.key]">
                            <option disabled value="">Please select one</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                          </select>-->

                          <!--
                          <model-select :options="options1"
                                        v-model="sampleData[j][itemCol.key]"
                                        placeholder="select item">
                          </model-select>
                          -->
                         
                            
                          <div v-if="itemCol.key!='accession'">
                                <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].icon" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-change="organismSampleQuery(itemCol,itemRow)" @on-focus="focus(itemRow[itemCol.key])" @on-blur="blur(itemRow[itemCol.key])">
                                </Input>
                                <Dropdown class="dropdown-remote" trigger="custom" :visible="itemRow[itemCol.key].dropdown" placement="bottom-end" @on-click="dropdownClick($event,itemRow[itemCol.key],itemCol)">
                                    <DropdownMenu class="dropdown-remote111"  slot="list">
                                        <DropdownItem v-if="options1.length == 0" name="nodata">No data</DropdownItem>
                                        <DropdownItem v-for="item in options1" :name="item.name" :key="item.name">{{item.name}}
                                            <Icon class="apply-all-button" type="arrow-down-a" size="15" @click="applyAll(item.name,itemRow,itemCol)"></Icon>
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
            <button @click="check">123</button>
            <button @click="confirm">2222</button>
       
        </div>
    </Card>
    <Card class="card">
        <p slot="title" class="resource-list-title-container">
          <span>File</span>
        </p>
        <!--
        <p slot="extra">
          <Icon type="plus-round" @click="showModal" size="20"></Icon>
        </p>
        -->
        <div class="card-content">
            <draggable class="draggable-class" v-model="fileCol">
                <div class="table-col" v-for="(itemCol,i) in fileCol" :key="itemCol.key">
                    <div class="table-row first">{{itemCol.name}}<!--<Icon class="icon-in-th" type="ios-close-outline" v-if="!itemCol.required" @click="deleteCol(itemCol,i)" size="14"></Icon>--></div>

                    <div class="table-row" v-for="(itemRow,j) in fileData">
                          <!--<input type="text" name="firstname" v-model="sampleData[j][itemCol.key]" @change="someHandler">-->
                          <!--
                          <Select
                              v-model="sampleData[j][itemCol.key]"
                              filterable
                              remote
                              :remote-method="remoteMethod1"
                              :loading="loading1">
                              <Option v-for="(option, index) in options1" :value="option.name" :key="index">{{option.name}}</Option>
                          </Select>
                          -->
                          <!--
                          <select v-model="sampleData[j][itemCol.key]">
                            <option disabled value="">Please select one</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                          </select>-->

                          <!--
                          <model-select :options="options1"
                                        v-model="sampleData[j][itemCol.key]"
                                        placeholder="select item">
                          </model-select>
                          -->
                         
                            
                          <div v-if="itemCol.key!='fractionid'">
                                <Input :class="{inputError:!itemRow[itemCol.key].checked}" size="small" type="text" v-model="itemRow[itemCol.key].value" :icon="itemRow[itemCol.key].icon" @on-click ="removeInputContent(itemRow[itemCol.key])" @on-change="organismSampleQuery(itemCol,itemRow)" @on-focus="focus(itemRow[itemCol.key])" @on-blur="blur(itemRow[itemCol.key])">
                                </Input>
                                <Dropdown class="dropdown-remote" trigger="custom" :visible="itemRow[itemCol.key].dropdown" placement="bottom-end" @on-click="dropdownClick($event,itemRow[itemCol.key],itemCol)">
                                    <DropdownMenu class="dropdown-remote111"  slot="list">
                                        <DropdownItem v-if="options1.length == 0" name="nodata">No data</DropdownItem>
                                        <DropdownItem v-for="item in options1" :name="item.name" :key="item.name">{{item.name}}
                                            <!--<Icon class="apply-all-button" type="arrow-down-a" size="15" @click="applyAll(item.name,itemRow,itemCol)"></Icon>-->
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                          </div>
                          <div v-else>
                              <div class="accession-col"><!--<Icon v-if="fileData.length>1" class="icon-in-row" type="ios-close-outline" @click="deleteRow(itemRow,j)" size="14"></Icon>--><span>{{itemRow.fractionid}}</span></div>
                          </div>
                    </div>
                </div>
            </draggable>
        </div>
    </Card>


    <!--
       <table style="width:100%">
          <tr>

            <draggable v-model="tempSampleCol">
            
                    <th v-for="item in tempSampleCol" :key="item.key">{{item.name}}</th>
                
            </draggable>
            
          </tr>
          <tr v-for="item in sampleData">
            <td v-for="item in tempSampleCol">
                <div>
                    <input type="text" name="firstname" @change="someHandler">
                    <ul>
                      <li>Coffee</li>
                      <li>Tea</li>
                      <li>Milk</li>
                    </ul>
                </div>
            </td>
          </tr>
        </table>
      -->
      <Modal
          title="Add Column"
          v-model="addColumnBool"
          :closable="false"
          @on-ok="addCol">

          <Table border ref="selection" class="add-col-table" :columns="newCol" :data="newData" @on-selection-change="newColSelectChange"></Table>
      </Modal>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { ModelSelect } from 'vue-search-select'
  export default {
    name: 'archive',
    props: ['selectedExperimentType','samplesNum','fractionsNum'],
    data(){
      return {
          getSampleAttributesApi: 'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/getSampleAttributes',
          getValuesByAttributeApi: 'http://wwwdev.ebi.ac.uk/pride/ws/archive/annotator/getValuesByAttribute',
          msRunApi:'',
          visible:true,
          loading1:false,
          addColumnBool:false,
          model13:'',
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
                  width:1,
                  className:'new-col-table', 
              },
              {
                  title: 'accession',
                  key: 'accession',
                  width:1,
                  className:'new-col-table' 
              },
              {
                  title: 'required',
                  key: 'required',
                  width:1,
                  className:'new-col-table' 
              },
              {
                  title: 'name',
                  key: 'name',
                  width:1,
                  className:'new-col-table' 
              },
              {
                  title: 'orignalname',
                  key: 'orignal_name',
                  width:1,
                  className:'new-col-table' 
              },
              {
                  title: 'key',
                  key: 'key',
                  width:1,
                  className:'new-col-table' 
              }
              /*
              experimentType:res.body[i].first,
              required: res.body[i].second == 'REQUIRED'? true:false,
              cvLabel:res.body[i].third.cvLabel.toLowerCase(),
              accession:res.body[i].third.accession,
              name:this.titleCase(res.body[i].third.name),
              orignal_name:res.body[i].third.name,
              key: this.titleCase(res.body[i].third.name).toLowerCase().replace(/\s/ig,'')






              {
                  title: 'Organism',
                  key: 'organism',
                  width:1,
              },
              {
                  title: 'Organism Part',
                  key: 'organismpart',
                  width:1,
              },
              {
                  title: 'Disease',
                  key: 'disease',
                  width:1,
              },
              {
                  title: 'Cell Type',
                  key: 'celltype',
                  width:1,
              },
              {
                  title: 'Developmental Stage',
                  key: 'developmentalstage',
                  width:1,
              },
              {
                  title: 'Strain',
                  key: 'strain',
                  width:1,
              },
              {
                  title: 'Sex',
                  key: 'sex',
                  width:1,
              },
              {
                  title: 'Individual Accession',
                  key: 'individualaccession',
                  width:1,
              },*/
          ],
          newData:[
          /*
            {
                name: 'Organism',
                cvLabel: 'efo',
                accession: 'OBI:0100026',
                required:true,
                orignalname:'organism',
                key:'organism'
            },
            {
                name: 'Organism Part',
                cvLabel: 'efo',
                accession: 'EFO:0000635',
                required:true,
                orignalname:'',
                key:''
            },
            {
                name: 'Disease',
                cvLabel: 'efo',
                accession: 'EFO:0000408',
                required:true,
                orignalname:'',
                key:''
            },
            {
                name: 'Cell Type',
                cvLabel: 'efo',
                accession: 'EFO:0000324',
                required:true,
                orignalname:'cell type',
                key:'celltype'
            },
            {
                name: 'Developmental Stage',
                cvLabel: 'efo',
                accession: 'EFO:0000399',
                required:true,
                orignalname:'',
                key:''
            },
            {
                name: 'Strain',
                cvLabel: 'efo',
                accession: 'EFO:0005135',
                required:false,
                orignalname:'',
                key:''
            },
            {
                name: 'Sex',
                cvLabel: 'efo',
                accession: 'PATO:0000047',
                required:true,
                orignalname:'',
                key:''
            },
            {
                name: 'Individual Accession',
                cvLabel: 'pride',
                accession: 'PRIDE:0000505',
                required:true,
                orignalname:'',
                key:''
            },*/
          ],
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
          options1:[
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
          experimentType:this.selectedExperimentType,
          sampleNumber:this.samplesNum,
          fractionNumber:this.fractionsNum
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
                          let fileDataItem={};
                          for(let i=0; i<res.body.length; i++){
                              if(res.body[i].first == this.experimentType){
                                  //console.log('res.body[i]',res.body[i]);
                                  let item = {
                                    experimentType:res.body[i].first,
                                    required: res.body[i].second == 'REQUIRED'? true:false,
                                    cvLabel:res.body[i].third.cvLabel.toLowerCase(),
                                    accession:res.body[i].third.accession,
                                    name:this.titleCase(res.body[i].third.name),
                                    orignal_name:res.body[i].third.name,
                                    key: this.titleCase(res.body[i].third.name).toLowerCase().replace(/\s/ig,''),
                                  }
                                  //console.log('item',item);
                                  this.sampleCol.push(item);
                                  this.newData.push(item);
                                  sampleDataItem.accession="";
                                  sampleDataItem[item.key]={
                                      value:'',
                                      dropdown:false,
                                      accession:'null',
                                      cvLabel:'null',
                                      col:item,
                                      icon:'',
                                      checked:true,
                                  }


                                  this.fileCol.push(item);
                                  fileDataItem.fractionid="";
                                  fileDataItem[item.key]={
                                      value:'',
                                      dropdown:false,
                                      accession:'null',
                                      cvLabel:'null',
                                      col:item,
                                      icon:'',
                                      checked:true,
                                  }
                              }
                          }

                          //add extra two cols for fileCol
                          let extraItem1 = {
                              experimentType:this.experimentType,
                              required: true,
                              cvLabel:'null',
                              accession:'null',
                              name:'Label',
                              orignal_name:'Label',
                              key: 'label'
                          }
                          fileDataItem.label={
                              value:'',
                              dropdown:false,
                              accession:'null',
                              cvLabel:'null',
                              col:extraItem1,
                              icon:'',
                              checked:true,
                          }
                          let extraItem2 = {
                              experimentType:this.experimentType,
                              required: true,
                              cvLabel:'null',
                              accession:'null',
                              name:'MSRun',
                              orignal_name:'MSRun',
                              key: 'msrun'
                          }
                          fileDataItem.msrun={
                              value:'',
                              dropdown:false,
                              accession:'null',
                              cvLabel:'null',
                              col:extraItem2,
                              icon:'',
                              checked:true,
                          }
                          this.fileCol.push(extraItem1);
                          this.fileCol.push(extraItem2);
                          //console.log('this.sampleCol',this.sampleCol);
                          //console.log('tempSampleData',tempSampleData);
                          for(let k=0; k<this.sampleNumber; k++){

                              let item = JSON.parse(JSON.stringify(sampleDataItem))
                              item.accession="PXD_S"+(k+1);
                              this.sampleData.push(item)

                              for(let j=0; j<this.fractionNumber; j++){
                                  let item = JSON.parse(JSON.stringify(fileDataItem));
                                  item.fractionid = "PXD_S"+(k+1)+'_F'+(j+1);
                                  this.fileData.push(item);
                              }
                          }     

                         
                          console.log('this.fileData',this.fileData);
                          console.log('this.sampleData',this.sampleData);
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
              //console.log('this.tempParams',this.tempParams);
              //this.organismSampleLoading = true;
              
              this.options1=[];
              let query={
                attributeAccession: itemCol.accession,
                ontologyAccession: itemCol.cvLabel,
                keyword:searchValue
              }
              this.$http
                  .get(this.getValuesByAttributeApi,{params: query})
                  .then(function(res){
                    if(res.body.length>0 || searchValue)
                      item[itemCol.key].dropdown=true;

                    this.options1=res.body;
                    console.log('this.options1',this.options1);
                    if(this.options1.length == 0){
                        item[itemCol.key].value==searchValue;
                    }
                  },function(err){

                  });
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
          remoteMethod1(){

          },
          check(){
            console.log('this.sampleData',this.sampleData);
            console.log('this.sampleCol',this.sampleCol);
          },
          
          focus(item){
              if(!item.value)
                return;
              item.dropdown = true;
              this.options1 = [
                  {
                    cvLabel:item.cvLabel,
                    accession:item.accession,
                    name:item.value,
                  },
              ];
          },
          blur(item){
            item.dropdown = false;
            if(item.value)
              item.checked=true;
            //console.log
          },
          removeInputContent(item){
              console.log('item',item);
              item.dropdown = false;
              item.value="";
              item.icon="";
            //console.log(this.sampleData);
          },
          showModal(){
            this.newColumnNameSelectedArray=[];
            this.addColumnBool=true;
          },
          addCol(){
              let keyArray = [];
              let item;
              let d = new Date();
              let time = d.getTime();
              let found;
              console.log('item',this.newColumnNameSelectedArray);
              
              for(let i=0; i<this.newColumnNameSelectedArray.length; i++){
                  found = false;
                  for(let j=0; j<this.sampleCol.length; j++){
                      if(this.sampleCol[j].name == this.newColumnNameSelectedArray[i].name){
                          found=true;
                          item = {
                            experimentType:this.sampleCol[j].experimentType,
                            required: false,
                            cvLabel:this.sampleCol[j].cvLabel,
                            accession:this.sampleCol[j].accession,
                            name:this.sampleCol[j].name,
                            orignal_name:this.sampleCol[j].orignal_name,
                            key: this.sampleCol[j].key + time
                          }
                          console.log('found true', item);
                          break;
                      }
                  }
                  if(!found){
                      item = {
                        experimentType:this.experimentType,
                        required: false,
                        cvLabel:this.newColumnNameSelectedArray[i].cvLabel,
                        accession:this.newColumnNameSelectedArray[i].accession,
                        name:this.newColumnNameSelectedArray[i].name,
                        orignal_name:this.newColumnNameSelectedArray[i].orignal_name,
                        key: this.newColumnNameSelectedArray[i].key
                      }
                  }
                  console.log('item',item);
                  keyArray.push(item.key);
                  this.sampleCol.push(item);
                  this.fileCol.push(item);
              }
              console.log('keyArray', keyArray);

              for(let i=0; i<this.sampleData.length; i++){
                  for(let j=0; j<keyArray.length; j++){
                      this.sampleData[i][keyArray[j]]= {
                          value:'',
                          dropdown:false,
                          accession:'null',
                          cvLabel:'null',
                          col:item,
                          icon:'',
                          checked:true,
                      };
                  }
              }
              for(let i=0; i<this.fileData.length; i++){
                  for(let j=0; j<keyArray.length; j++){
                      this.fileData[i][keyArray[j]]= {
                          value:'',
                          dropdown:false,
                          accession:'null',
                          cvLabel:'null',
                          col:item,
                          icon:'',
                          checked:true,
                      }
                  }
              }
              for(let i=0; i<this.newData.length;i++){
                  //this.newData[i]._checked=false;
              }
            
          },
          addRow(){
            let item={};
            for(let i=0;i<this.sampleCol.length;i++){
                //console.log('this.sampleCol[i]',this.sampleCol);
                item[this.sampleCol[i].key] = {
                    value:'',
                    dropdown:false,
                    accession:'null',
                    cvLabel:'null',
                    col:this.sampleCol[i],
                    icon:'',
                    checked:true,
                } 
            }
            console.log('this.sampleCol.length+1',this.sampleData.length+1);
            item.accession = "PXD_S"+(this.sampleData.length+1);
            //console.log('itemitem',item);
            this.sampleData.push(item);
            //console.log('this.sampleData',this.sampleData);
          },
          deleteCol(itemCol, index){
          
            this.sampleCol.splice(index,1);
            //console.log('before this.sampleData',this.sampleData);
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
              console.log('index',index);
              console.log('itemRow',itemRow);
              this.sampleData.splice(index,1);

              /*for(let i=0; i<this.sampleData.length; i++){
                this.sampleData[i].accession = "PXD_S"+(i+1);
              }*/
              for(let i=0; i<this.fileData.length; i++){
                console.log('itemRow.accession',itemRow.accession);
                if(!this.fileData[i].fractionid.indexOf(itemRow.accession)){
                    this.fileData.splice(i,1);
                    i--;
                }
              }
          },
          dropdownClick(e,itemRow,itemCol){
            //console.log('dropdownClick',e,itemRow,itemCol);
            itemRow.dropdown=false;
            if(e == "nodata" && !itemRow.value){
                itemRow.icon="";
                return;
            }
            itemRow.value=e;
            itemRow.checked=true;
            
            for(let i=0; i<this.options1.length;i++){
                if(this.options1[i].name==e){
                    itemRow.accession = this.options1[i].accession;
                    itemRow.cvLabel = this.options1[i].cvLabel;
                    //itemRow.col=itemCol;
                    break;
                }
            }
            //console.log('itemRow',itemRow);
            //console.log('itemCol',itemCol);
            //console.log('dropdownClick',this.sampleData);
            //console.log(e,item);
          },
          newColSelectChange(selection){
              this.newColumnNameSelectedArray=selection;
              //console.log('newColSelectChange',selection);
          },
          applyAll(name,row,col){
               this.$nextTick(()=>{ //make the value bind with the input first and then apply this value to all the other rows
                  for(let i=0;i<this.sampleData.length; i++){
                      let item = JSON.parse(JSON.stringify(row))
                      console.log('item',item);
                      this.sampleData[i][col.key] = item[col.key]
                  }
              });
          },
          confirm(){
              let results = [];
              let tempAccession='';
              let checkPass=true;
              for(let i=0; i<this.sampleData.length; i++){
                  for(let j in this.sampleData[i]){
                        if(j=='accession'){
                            tempAccession = this.sampleData[i][j];
                            continue;
                        }
                        else{
                            if(!this.sampleData[i][j].value && this.sampleData[i][j].col.required){
                                checkPass=false;
                                this.sampleData[i][j].checked=false;
                            }
                            else{
                                 this.sampleData[i][j].checked=true;
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
                                results.push(item);
                            }
                        }
                  }
              }
              if(checkPass){
                console.log('results',results);
              }
              else{
                this.$Message.error({content:'Fill required content', duration:1});
              }
             // console.log('results',results);
          }
    },
    watch: {

    },
    
    mounted: function(){
      //console.log('this.selectedExperimentType',this.selectedExperimentType);
      //console.log('this.samplesNum',this.samplesNum);
      this.getSampleAttributes();
     
    },
    computed:{
      /*
      experimentType:function(){
          console.log(1231231231);
          //this.getSampleAttributes();
          return this.selectedExperimentType;
      },
      sampleNumber:function(){
          console.log('this.samplesNum',this.samplesNum);
        return this.samplesNum;
      }*/
    },
    created(){
      
    },
    beforeDestroy(){
          
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
  left:2px;
}
.inputError .ivu-input{
    border: 1px solid red !important;
}
</style>
