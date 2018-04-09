<template>
  <div class="archive-container">
      <div class="panel nav"><Nav/></div>
      <div class="browse-data-container">
          <Row class="search-row">
              <Card>
                <p slot="title">Search</p>
              
                <div class="search-container">
                    <div class="search-input">
                       <Input class="archive-search-input" v-model="keyword" placeholder="Enter something..." style="width: 100%" size="large">
                         <!--<Button slot="append" @click="submitSearchCondition">Search</Button>-->
                       </Input>
                    </div>
                    <div class="search-filter">
                        <div class="filter-wrapper">
                            <div class="filter-condition">
                                <Select class="filter-selector" v-model="fieldValue" style="width:200px" @on-change="fieldChange">
                                    <Option v-for="item in fieldSelectors" :value="item.value" :key="item.value" >
                                            <span>{{ item.label }}</span>
                                            <span style="float:right;color:#ccc">{{item.number}}</span>
                                    </Option>
                                </Select>
                            </div>
                            <span class="separator">></span>
                            <div class="filter-condition">
                                <Select class="filter-selector input-search-needed" v-model="containValue" style="width:200px" size="small" filterable multiple >
                                    <Option v-for="item in containSelectors" :value="item.value" :key="item.value" @click.native="containChange">
                                            <span>{{ item.label }}</span>
                                            <span style="color:#ccc"><span v-if="item.number">(</span>{{item.number}}<span v-if="item.number">)</span></span>
                                    </Option>
                                </Select>
                            </div>
                        </div>

                        <div class="search-button">
                            <a class="button search-button">Search</a>
                        </div>
                    </div>
                    <div v-if="keyword" class="search-condition-container">
                      <div class="tag-container">
                          <Tag type="border" closable>
                            <span class="search-condition first">{{keyword}}</span>
                          </Tag>
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
                    </div>
                </div>
              </Card>
          </Row>
          <Row>
              <Card>
                  <p slot="title" class="resource-list-title-container">
                    <span>Resources List</span>
                    <span>
                        <span>Sort by</span>
                        <!--
                        <a class="sort-action">Accession</a>
                        <a class="sort-action">Title</a>
                        <a class="sort-action">Relevance</a>
                        <a class="sort-action">Publication Date<Icon type="ios-arrow-up"></Icon></a>
                      -->
                    </span>
                  </p>
                  <Card v-for="publicationItem in publicaitionList" class="resource-item" v-bind:key = "publicationItem.id">
                      <a class="resource-id">{{publicationItem.id}}</a>
                      <p class="resource-title">{{publicationItem.name}}</p>
                      <p>Species: {{publicationItem.species}}</p>
                      <span>Project description: {{publicationItem.description}}</span><a @click="getDetailedResource(publicationItem.id)" class="detailed-resouce">(More)</a>
                      <p>Made public: {{publicationItem.date}}</p>
                      <Dropdown class="dataset-wrapper" v-for="datesetItem in publicationItem.dataset">
                          <a class="button dataset-button" href="javascript:void(0)">
                             <Icon type="ios-pricetag"></Icon>
                              {{datesetItem}} 
                          </a>
                          <DropdownMenu slot="list">
                              <DropdownItem>{{datesetItem}}</DropdownItem>
                          </DropdownMenu>
                      </Dropdown>
      
                  </Card>
                  
                  <div class="page-container">
                    <Page :total="200" :page-size="20" size="small" show-sizer show-total class-name="page"></Page>
                  </div>
              </Card>
          </Row>
      </div>
  </div>
</template>

<script>
  import Nav from '@/components/landingpage/Nav'
  export default {
    name: 'archive',
    data(){
      return {
          keyword:'',
          fieldValue:'Species',
          containValue:['Any','London'],
          containItemSearch:'',
          fieldSelectors:[
              {
                  value: 'Species',
                  label: 'Species',
                  check: false,
                  containItems:[
                      {
                          value: 'Any',
                          label: 'Any',
                          check: true,
                          number:''

                      },
                      {
                          value: 'London',
                          label: 'London',
                          check: true,
                          number:'100'
                      },
                      {
                          value: 'Sydney',
                          label: 'Sydney',
                          check: true,
                           number:'157'
                      },  
                      {
                          value: 'Ottawa',
                          label: 'Ottawa',
                          check: true,
                          number:'345'
                      },
                      {
                          value: 'Paris',
                          label: 'Paris',
                          check: true,
                          number:'3421'
                      },
                      {
                          value: 'Canberra',
                          label: 'Canberra',
                          check: true,
                          number:'32'
                      }
                  ],
              },
              {
                  value: 'Tissue',
                  label: 'Tissue',
                  check: false,
                  containItems:[
                      {
                          value: 'Any',
                          label: 'Any',
                          check: true,
                          number:''

                      },
                      {
                          value: 'London',
                          label: 'London',
                          check: false,
                          number:'100'
                      },
                      {
                          value: 'Ottawa',
                          label: 'Ottawa',
                          check: false,
                          number:'345'
                      },
                  ],
              },
              {
                  value: 'Disease',
                  label: 'Disease',
                  check: false,
                  containItems:[
                      {
                          value: 'Any',
                          label: 'Any',
                          check: true,
                          number:''

                      },
                      {
                          value: 'London',
                          label: 'London',
                          check: false,
                          number:'100'
                      },
                      {
                          value: 'Sydney',
                          label: 'Sydney',
                          check: false,
                           number:'157'
                      },  
                      {
                          value: 'Ottawa',
                          label: 'Ottawa',
                          check: false,
                          number:'345'
                      },
                  ],
              },  
              {
                  value: 'Modification',
                  label: 'Modification',
                  check: false,
                  containItems:[
                      {
                          value: 'Any',
                          label: 'Any',
                          check: true,
                          number:''

                      },
                      {
                          value: 'London',
                          label: 'London',
                          check: false,
                          number:'100'
                      },
                      {
                          value: 'Sydney',
                          label: 'Sydney',
                          check: false,
                           number:'157'
                      },  
                  ],
              },
              {
                  value: 'Instrument',
                  label: 'Instrument',
                  check: false,
              },
              {
                  value: 'Experiment type',
                  label: 'Experiment type',
                  check: false,
              },
              {
                  value: 'Project lags',
                  label: 'Project lags',
                  check: false,
              },
              {
                  value: 'Submission type',
                  label: 'Submission type',
                  check: false,
              }
          ],
          containSelectors:[
              {
                  value: 'Any',
                  label: 'Any',
                  check: true,
                  number:''

              },
              {
                  value: 'London',
                  label: 'London',
                  check: true,
                  number:'100'
              },
              {
                  value: 'Sydney',
                  label: 'Sydney',
                  check: true,
                   number:'157'
              },  
              {
                  value: 'Ottawa',
                  label: 'Ottawa',
                  check: true,
                  number:'345'
              },
              {
                  value: 'Paris',
                  label: 'Paris',
                  check: true,
                  number:'3421'
              },
              {
                  value: 'Canberra',
                  label: 'Canberra',
                  check: true,
                  number:'32'
              }
          ],
          publicaitionList:[
            {
              id:'PXD008343',
              completeState:false,
              name: 'CRISPR/Cas9-mediated knockout and endogenous complex analysis of Cluap1/ IFT38',
              species: 'Homo sapiens (Human)',
              description:'CRISPR/Cas9-mediated gene-editing allows manipulation of a gene',
              date:'2018-04-04',
              dataset:['Biological Dataset']
            },
            {
              id:'PXD008267',
              completeState:true,
              name: 'Proteomic profiling of human iPSC-derived pancreatic endocrine cells for the identification of clinical biomarkers ',
              species: 'Homo sapiens (Human)',
              description:'Great progresses have been made for generating in vitro pluripot',
              date:'2005-08-16',
              dataset:['Biological Dataset']
            },
            {
              id:'PXD008970',
              completeState:false,
              name: 'Protein citrullination in human tissues',
              species: 'Homo sapiens (Human)',
              description:'Citrullination is a post-translational modification of arginine',
              date:'2018-04-04',
              dataset:['ProteomeTools','Biological Dataset']
            }
          ],
          filterCombination:[
              {
                condition:'And',
                field:'Species',
                contains:'xxxxx'
              },
              {
                condition:'And',
                field:'Species',
                contains:'bbbbb'
              },
              {
                condition:'And',
                field:'Species',
                contains:'ccccc'
              },
          ]
      }
    },
    components: {
      Nav
    },
    methods:{
      getDetailedResource(id){

      },
      conditionChange(index,condition){
        console.log(condition);
        this.filterCombination[index].condition = condition;
      },
      fieldChange(e){
        console.log(e);
        for(let i in this.fieldSelectors){
          if(this.fieldSelectors[i].value == this.fieldValue){
              this.containSelectors = this.fieldSelectors[i].containItems;
              this.containValue = ['Any'];
              break;
          }
        }
      },
      containChange(selectedValue){
          let value = selectedValue.target.outerText.split(" ")[0];
          console.log(selectedValue.target);
          if(value == "Any"){

            for(let i in this.fieldSelectors){
                if(this.fieldSelectors[i].value == this.fieldValue){
                    this.containValue =[];
                    this.containValue = this.fieldSelectors[i].containItems;
                }
                break;
            }
          }
        
       
          
        
        /*
        //update contains data in fieldSlecetors
        for(let i in this.fieldSelectors){
            if(this.fieldSelectors[i].value == this.fieldValue){
                if(selectedValue != 'Any'){
                    for(let j in this.fieldSelectors[i].containItems){
                      if(this.fieldSelectors[i].containItems[j].value == selectedValue){
                        this.fieldSelectors[i].containItems[j].check = check;
                        break;
                      }
                    }
                }
                else{
                    for(let j in this.fieldSelectors[i].containItems)
                        this.fieldSelectors[i].containItems[j].check = check;
                }
                break;
            }
        }

        if(check){
            let item={
                condition:'And',
                field:this.fieldValue,
                contains:selectedValue
            };
            this.filterCombination.push(item);
            
            
        }
        else{
          for(let i=0; i<this.filterCombination.length; i++){
            if(this.filterCombination[i].field == this.fieldValue && this.filterCombination[i].contains == selectedValue){
              this.filterCombination.splice(i,1);
              break;
            }
          }
        }*/
      },
      submitSearchCondition(){

      },
      conditionDelete(index,item){
        this.filterCombination.splice(index,1);
        console.log(item);
      },

      
    },
   
    mounted: function(){
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .archive-container{
    width: 100%;
   
  }
  .browse-data-container{
    width: 80%;
    margin:0 auto;
    padding: 90px 0;
  }
  .search-filter{
    display: flex;
    margin-bottom: 2rem;
    justify-content: space-between;
  }
  .search-row{
    margin-bottom: 20px;
  }
  .search-condition:not(.first){
    display: inline-block;
    padding-left: 8px;
    border-left: 1px solid #e9eaec;
  }
  .search-input{
    text-align: center;
  }
  .refine-name{
    font-size: 12px;
  }
  .tag-container{
    display: inline-block;
  }
  .page-container{
    text-align: center;
  }
  .filter-condition{
    display: inline-block;
  }
  .search-condition-container{
    display: inline-block;
  }
  .search-condition-container .ivu-tag{
    overflow: visible !important;
    z-index: 2 !important;
    opacity: 1 !important;
    height: 30px;
    line-height: 30px;
  }
  .search-condition-container a{
    border:none;
  }
  .resource-list-title-container{
    display: flex;
    justify-content: space-between;
  }
  .sort-action{
    font-size: 12px;
    font-weight: normal;
    color: #495060;
    border:none;
  }
  .search-button a{
        padding: 8px 10px;
        font-size: 12px;
        width: 100%;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        font-weight: 700;
        background-color: #5bc0be;
        border-radius: 3px;
    }
    .resource-item{
      margin-bottom: 20px;
    }
    .resource-id{
      font-size: 14px;
    }
    .resource-title{
      font-weight: bold;
    }
    .detailed-resouce{
      margin-left: 5px;
    }
    .dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #5bc0be;
        border-radius: 3px;
    }
    .dataset-wrapper{
      margin-right: 5px;
    }
    .search-item-input-wrapper{
      position: absolute;
      top:5px;
      width: 100%;
      text-align: center;
      padding-bottom: 5px;
      border-bottom: 1px solid rgb(200,200,200,0.5);
    }
    .archive-search-input{
      margin-bottom: 10px;
    }
    .dropdown-action{
      width: 50px;
    }
    .separator{
      margin: 0 5px;
    }
</style>

<style>
    .page .ivu-select-dropdown-list{
      margin-left: 0 !important;
    }
    .archive-search-input input{
      border-radius: 3px;
    }
    .search-item-input input{
      margin-bottom: 0 !important;
    }
    .filter-selector.input-search-needed ul{
      /*padding-top: 35px;*/
    }
    .filter-selector .ivu-select-item-selected{
      color: inherit !important;
      background: inherit !important;
    }
    .filter-selector .ivu-checkbox-wrapper{
      width: 100% !important;
      margin: 0 auto !important;
    }
    .filter-selector .ivu-select-input{
      margin-bottom: 0;
      box-shadow: none;
    }
     .filter-selector .ivu-select-input:focus{
          border: none;
    }
    .filter-selector .ivu-tag{
      background: none ;
    }
    .filter-selector .ivu-select-multiple .ivu-select-item-selected:after{
      line-height: 0.8 !important;
      font-size: 22px;
      margin-right: 5px;
      float:left;
    }
    .filter-selector .ivu-select-input{
      height: 30px;
      line-height: 30px;
    }
    .filter-selector .ivu-tag{
      display: none;
      margin:2px 4px 2px 0;
    }
    .filter-selector .ivu-select-selection{
      border-radius: 3px;
    }
</style>
