<template>
  <div class="archive-container">
      <div class="panel nav"><NavBar page="peptidome"/></div>
      <div class="browse-data-container">
          <Row class="search-row">
              <Card>
                <p slot="title">Search</p>
                <div class="search-container">
                    <div class="search-input">
                        <AutoComplete
                            class="archive-search-input"
                            v-model="keyword"
                            :data="autoCompleteWords"
                            @on-search="keywordSearch"
                            icon="ios-search"
                            :filter-method="autoCompleteFilter"
                            placeholder="input here"
                            style="width: 100%" 
                            size="large">
                        </AutoComplete>
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
                            <div class="filter-condition ">
                                <Select class="filter-selector input-search-needed" v-model="containValue" style="min-width:200px" size="small" filterable multiple  @on-change="containChange" placeholder="">
                                    <Option v-for="item in containSelectors" :value="item.value" :key="item.value">
                                      <span>
                                            <span>{{ item.label }}</span>
                                            <span style="color:#ccc"><span v-if="item.number">(</span>{{item.number}}<span v-if="item.number">)</span></span>
                                      </span>
                                    </Option>
                                </Select>
                            </div>
                        </div>

                        <div class="search-button">
                            <a class="button search-button" @click="submitSearch">Search</a>
                        </div>
                    </div>
                    <div v-if="keyword" class="search-condition-container">
                      <div class="tag-container">
                          <Tag type="border" closable @on-close="keywordDelete">
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
                <p slot="title">Results</p>
                <div class="search-container">
                <Table class="peptide-table" :loading="loading" border :columns="columns5" :data="results" size="small" @on-row-click="rowClick"></Table>
                </div>
                <div class="page-container">
                  <Page :total="total" :page-size="size" size="small" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </div>
            </Card>
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
          queryClusterListApi:'https://www.ebi.ac.uk:443/pride/ws/cluster/cluster/list',
          searchConfigURL: this.$store.state.baseURL + '/static/facets/config.json',
          q:'',
          peptide:'',
          modFilters:'',
          speciesFilters:'',
          sort:'',
          order:'desc',
          facets:true,
          highligts:false,
          page:0,
          size:20,
          total:0,
          keyword:'',
          fieldValue:'',
          containValue:[],
          autoCompleteWords:['aaa','bbb','ccc','ddd'],
          containItemSearch:'',
          fieldSelectors:[],
          containSelectors:[],
          filterCombination:[],
          loading: true,
          //filterInitBool:false,
          columns5: [

              {
                  title: 'Peptide',
                  key: 'peptide',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: 'Pre Charge',
                  key: 'precharge',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: 'Pre m/z',
                  key: 'premz',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: '#Spectra',
                  key: 'spectra',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: 'Projects',
                  key: 'projects',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: '#Species',
                  key: 'species',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: 'Ratio',
                  key: 'ratio',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: 'ID',
                  key: 'ID',
                  width:1,
                  //maxWidth:0,
                  className:'peptideID'
              }
          ],
          results: [],
          facetsMap:{},
      }
    },
    components: {
      NavBar
    },
    methods:{
      setFilter(){
          //if(!this.filterInitBool)
          this.$http
            .get(this.searchConfigURL)
            .then(function(configRes){
             // this.filterInitBool=true;
              this.fieldSelectors = [];
              for(let i in this.facetsMap){
                if(configRes.body.peptidome[i] && configRes.body.peptidome[i].name){
                    let item = {
                      value: configRes.body.peptidome[i].name,
                      label: configRes.body.peptidome[i].name,
                      containItems:[]
                    }
                    for(let j in this.facetsMap[i]){
                      let containItem = {
                          value: j,
                          label: j,
                          check: false,
                          number: this.facetsMap[i][j]
                      }
                      item.containItems.push(containItem);
                    }
                    this.fieldSelectors.push(item);
                }
                else{
                    console.error("Please check config.json in peptidomeSearch Folder");
                }
               
              }
              this.fieldValue = this.fieldSelectors[0].value;
              this.containSelectors = this.fieldSelectors[0].containItems;
  
            },function(err){

            });
      },
      autoCompleteFilter (value, option) {
          return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      conditionChange(index,condition){
        this.filterCombination[index].condition = condition;
      },
      fieldChange(){
        for(let i in this.fieldSelectors){
          if(this.fieldSelectors[i].value == this.fieldValue){
              this.containSelectors = this.fieldSelectors[i].containItems;
              this.containValue=[];
              for(let j=0; j<this.fieldSelectors[i].containItems.length; j++){
                if(this.fieldSelectors[i].containItems[j].check)
                  this.containValue.push(this.fieldSelectors[i].containItems[j].value); 
              }
              break;
          }
        }
      },
      containChange(){
        for(let i=0; i< this.fieldSelectors.length; i++){
            if(this.fieldSelectors[i].value == this.fieldValue){
                for(let j=0; j<this.fieldSelectors[i].containItems.length; j++){
                    let found = false;
                    for(let k=0; k<this.containValue.length; k++){
                       if(this.fieldSelectors[i].containItems[j].value == this.containValue[k]){
                            this.fieldSelectors[i].containItems[j].check = true;
                            found = true;
                            break;
                        }
                    }
                    if(!found)
                      this.fieldSelectors[i].containItems[j].check = false;
                    

                    let filterCombinationFound = false;
                    for(let m=0; m<this.filterCombination.length; m++){
                        if(this.filterCombination[m].field == this.fieldValue && this.filterCombination[m].contains == this.fieldSelectors[i].containItems[j].value){
                          filterCombinationFound = true;
                          if(!this.fieldSelectors[i].containItems[j].check)
                            this.filterCombination.splice(m,1);

                          break;
                        }
                    }
                    if(!filterCombinationFound){
                        if(this.fieldSelectors[i].containItems[j].check){
                            let item={
                                condition:'And',
                                field:this.fieldValue,
                                contains:this.fieldSelectors[i].containItems[j].value
                            };
                            this.filterCombination.push(item);
                        }
                    }
                }
                break;
            }
        }
      },
      queryClusterListCondition(){
      },
      keywordDelete(){
          this.keyword = '';
      },
      conditionDelete(index,item){
        this.filterCombination.splice(index,1);
        if(item.field == this.fieldValue)
           this.containValue.splice(this.containValue.indexOf(item.contains),1) 
        else{
          for(let i=0; i<this.fieldSelectors.length; i++){
              if(this.fieldSelectors[i].value == item.field){
                  for(let j=0; j<this.fieldSelectors[i].containItems.length; j++){
                    if(this.fieldSelectors[i].containItems[j].value == item.contains){
                        this.fieldSelectors[i].containItems[j].check =false;
                        break;
                    }
                  }
                  break;
              }
          }
        }
      },
      keywordSearch(value){

      },
      pageChange(page){
          this.page = page-1;
          this.queryClusterList();
      },
      pageSizeChange(size){
          this.size = size;
          this.queryClusterList();
      },
      sortChange(){
        this.$Message.success({content:'sortChange', duration:1});
      },
      rowClick(row,index){
        this.$router.push({name:'peptidedetails',params:{id:row.ID}});
      },
      queryClusterList(){
        this.results=[];
        this.loading=true;
        this.$http
            .get(this.queryClusterListApi+this.query)
            .then(function(clusterRes){
                this.loading=false;
                this.total = clusterRes.body.totalResults;
                this.facetsMap = clusterRes.body.facetsMap;
                this.setFilter();
                //console.log('this.facetsMap',this.facetsMap);
                for(let i=0; i < clusterRes.body.results.length; i++){
                  var item = {
                      ID:clusterRes.body.results[i].id,
                      peptide: clusterRes.body.results[i].sequence,
                      precharge: clusterRes.body.results[i].averagePrecursorCharge,
                      premz: clusterRes.body.results[i].averagePrecursorMz.toFixed(2),
                      spectra: clusterRes.body.results[i].totalNumberOfSpectra,
                      projects: clusterRes.body.results[i].totalNumberOfProjects,
                      species: clusterRes.body.results[i].totalNumberOfSpecies,
                      ratio: (clusterRes.body.results[i].maxRatio*100).toFixed(1) + '%'
                  }
                  this.results.push(item);
                }
            },function(err){

            });
      },
      updateQuery(){
          this.q = this.$route.query.q || '';
      },
      submitSearch(){
          this.q = this.keyword;
          let tempSpeciesFilters = '';
          let tempModFilters='';
          for (let i in this.filterCombination){
              if(this.filterCombination[i].condition == 'And'){
                  if(this.filterCombination[i].field == 'Species')
                      tempSpeciesFilters += this.filterCombination[i].contains + ',';
                  else if(this.filterCombination[i].field == 'Modifications')
                      tempModFilters += this.filterCombination[i].contains + ',';
              }
          }
          this.speciesFilters = tempSpeciesFilters.replace(/,$/gi,""); 
          this.modFilters = tempModFilters.replace(/,$/gi,"");

          this.queryClusterList();
      }


     
    },

    watch: {
      filterCombination: function (val) {
          //combine keyword (this.keyword) and filters together (val)
          //this.queryClusterList();
      },
    },
    computed:{
      query:function(){
          let q=this.q?'q='+this.q+'&' : '';
          let peptide=this.peptide?'peptide='+this.peptide+'&' : '';
          let modFilters=this.modFilters?'modFilters='+this.modFilters+'&' : '';
          let speciesFilters=this.speciesFilters?'speciesFilters='+this.speciesFilters+'&' : '';
          let sort=this.sort?'sort='+this.sort+'&' : '';
          let order= this.order?'order='+this.order+'&' : '';
          let facets='facets='+this.facets+'&';
          let highligts='highligts='+this.highligts+'&';
          let page='page='+this.page+'&';
          let size='size='+this.size;
          return '?'+q+peptide+modFilters+speciesFilters+sort+order+facets+highligts+page+size;
      }
    },
    mounted: function(){
        this.updateQuery();
        this.queryClusterList();
    },
    created(){
       
    },
    beforeDestroy(){
          
    },
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
    margin-top: 20px;
  }
  .filter-condition{
    display: inline-block;
    margin-top: 5px; 
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
  .search-condition-container .ivu-select-dropdown .ivu-dropdown-menu{
    min-width: 50px;
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
        margin-top: 5px;
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
    .sortOption{
      display: inline-block;
      margin-left: 5px;
    }
</style>

<style>
    .archive-search-input input{
      border-radius: 3px !important;
      margin-bottom: 0 !important;
    }
    .archive-search-input .ivu-select-dropdown{
      text-align: left;
    }
    .search-item-input input{
      margin-bottom: 0 !important;
    }
    .filter-condition .filter-selector .ivu-select-item-selected{
      color: rgba(91, 192, 190, 0.9) !important;
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
      display: none;
    }
    .filter-selector .ivu-select-item-selected::after{
      line-height: 0.8 !important;
      font-size: 22px;
      margin-right: 5px;
      float:left;
      display: none !important; 
    }
    .tag-container .ivu-tag-border.ivu-tag-closable:after{
        /*display: none !important;*/
    }
    .filter-selector .ivu-select-input{
      height: 30px;
      line-height: 30px;
    }
    .filter-selector .ivu-tag{
      /*display: none;*/
      margin:2px 4px 2px 0;
    }
    .filter-selector .ivu-select-selection{
      border-radius: 3px;
    }
    .filter-selector.input-search-needed .ivu-select-dropdown{
      width: 200px !important;
      left:243px !important;
    }
    .filter-selector .ivu-icon-ios-close-empty{
      display: none;
    }
    .sortOption .ivu-select-selection{
      height: 18px !important;
      line-height: 18px !important;
    }
    .sortOption .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      height: 17px !important;
      line-height: 17px !important;
    }
    .sortOption .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder{
      height: 18px !important;
      line-height: 18px !important;
    }
    .sortOption .ivu-select-selection .ivu-select-selected-value{
      font-weight: normal !important;

    }
    .sortOption .ivu-select-dropdown .ivu-select-item{
      font-weight: normal !important;

    }
    .peptide-table table{
      margin-bottom: 0 !important;
    }
            .peptide-table .peptideID{
      display: none;
    }
</style>
