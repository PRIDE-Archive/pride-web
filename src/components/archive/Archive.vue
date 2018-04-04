<template>
  <div class="archive-container">
      <!--<div class="panel nav"><Nav/></div>-->
      <div class="browse-data-container">
          <Row class="search-row">
              <Card>
                <p slot="title">Search</p>
                <div class="search-container">
                  <div class="search-input">
                     <Input v-model="value4" icon="ios-search" placeholder="Enter something..." style="width: 400px"></Input>
                  </div>
                  <div class="search-filter">
                      <div class="filter-wrapper">
                          <Select v-model="fieldValue" style="width:200px">
                              <Option v-for="item in fieldSelectors" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                      </div>
                      <div class="filter-wrapper">
                          <Select v-model="containValue" style="width:200px">
                              <Option v-for="item in containSelectors" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                      </div>
                  </div>
                </div>
                <div class="search-condition-container">
                  <div class="tag-container">
                      <Tag type="border" closable>
                        <span class="search-condition">And</span>
                        <Dropdown trigger="click">
                            <a href="javascript:void(0)">
                                abcasdsa
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>And</DropdownItem>
                                <DropdownItem>Not</DropdownItem>
                                <DropdownItem>Or</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                      </Tag>
                  </div>
                  <div class="tag-container">
                      <Tag type="border" closable>
                        <span class="search-condition">And</span>
                        <Dropdown trigger="click">
                            <a href="javascript:void(0)">
                                abcasdsa
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>And</DropdownItem>
                                <DropdownItem>Not</DropdownItem>
                                <DropdownItem>Or</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                      </Tag>
                  </div>
                </div>
              </Card>
          </Row>
          <Row>
              <Card>
                  <p slot="title">Publication List</p>
                  <li v-for="item in publicaitionList" class="item" v-bind:key = "item._id">
                      <p>Content of card</p>
                      <p>Content of card</p>
                      <p>Content of card</p>
                  </li>
                  
                  <div class="page-container">
                    <Page :total="40" size="small" show-elevator show-sizer></Page>
                  </div>
              </Card>
          </Row>
      </div>
  </div>
</template>

<script>
 
  export default {
    name: 'archive',
    data(){
      return {
          fieldValue:'Species',
          containValue:'Contains',
          fieldSelectors:[
              {
                  value: 'Fields',
                  label: 'Fields'
              },
              {
                  value: 'Species',
                  label: 'Species'
              },
              {
                  value: 'Tissue',
                  label: 'Tissue'
              },
              {
                  value: 'Disease',
                  label: 'Disease'
              },  
              {
                  value: 'Modification',
                  label: 'Modification'
              },
              {
                  value: 'Instrument',
                  label: 'Instrument'
              },
              {
                  value: 'Experiment type',
                  label: 'Experiment type'
              },
              {
                  value: 'Project lags',
                  label: 'Project lags'
              },
              {
                  value: 'Submission type',
                  label: 'Submission type'
              }
          ],
          containSelectors:[
              {
                  value: 'Contains',
                  label: 'Contains'
              },
              {
                  value: 'London',
                  label: 'London'
              },
              {
                  value: 'Sydney',
                  label: 'Sydney'
              },  
              {
                  value: 'Ottawa',
                  label: 'Ottawa'
              },
              {
                  value: 'Paris',
                  label: 'Paris'
              },
              {
                  value: 'Canberra',
                  label: 'Canberra'
              }
          ],
          publicaitionList:[
            {
              id:'PRD000005',
              name: 'GPMDB Submission: Aurum Spectra ',
              species: 'Homo sapiens (Human)',
              description:'Project description: Not available (More)',
              date:'2005-08-16'
            },
            {
              id:'PRD000005',
              name: 'GPMDB Submission: Aurum Spectra ',
              species: 'Homo sapiens (Human)',
              description:'Project description: Not available (More)',
              date:'2005-08-16'
            },
            {
              id:'PRD000005',
              name: 'GPMDB Submission: Aurum Spectra ',
              species: 'Homo sapiens (Human)',
              description:'Project description: Not available (More)',
              date:'2005-08-16'
            }
          ]
      }
    },
    methods:{
    
    },
   
    mounted: function(){
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .archive-container{
    width: 80%;
    margin:0 auto;
    /*position: absolute;
    top: 37px;
    left: 0;
    right: 0;
    z-index: 1000;
    */
  }
  .browse-data-container{
    padding: 90px 0;
  }
  .search-container{
    display: flex;
    justify-content:space-between;

  }
  .search-filter{
    display: flex;
  }
  .search-row{
    margin-bottom: 20px;
  }
  .search-condition{
    display: none;
  }
  .tag-container{
    display: inline-block;
  }
  .page-container{
    text-align: center;
  }
  .filter-wrapper{
    margin-left: 10px;
  }
  .search-condition-container .ivu-tag{
    overflow: visible !important;
    z-index: 1000 !important;
    opacity: 1 !important;
  }
  .search-condition-container a{
    border:none;
  }
  .search-condition-container .ivu-select-dropdown{
    
  }
</style>
