<template>
  <div class="archive-container">
      <div class="panel nav"><NavBar page="peptidome"/></div>
      <div class="browse-data-container">
          <Row class="search-row">
              <Card>
                <p slot="title">Search</p>
                <div class="search-container">
                    <div class="search-input">
                        <div class="search-input-wrapper peptidome">
                            <div class="fake-input">
                              <div class="tag-wrapper">
                                  <Tag class="tag-in-search-input" v-for="(item,index) in tagArray" :key="index" closable @on-close="tagDelete">{{item}}</Tag>
                                  <Select
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
                                  </Select>
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
                        <div class="search-button">
                            <a class="button search-button" @click="submitSearch">Search</a>
                        </div>
                    </div>
                    <div class="search-condition-container">
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
                    </div>
                </div>
              </Card>
          </Row>
           <Row>
            <Card>
                <p slot="title">Results</p>
                <div class="search-container">
                <Table class="peptide-table" :loading="loading" border :columns="peptideTableColumn" :data="peptideTableResults" size="small" @on-row-click="rowClick"></Table>
                </div>
                <div class="page-container">
                  <Page :total="total" :page-size="pageSize" size="small" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </div>
            </Card>
          </Row>
      </div>
  </div>
</template>

<script>
  import NavBar from '@/components/Nav'
  import store from "@/store.js"
  var paramsFromLandingPage='';
  export default {
    name: 'peptidome',
    data(){
      return {
          keyword:'',
          selectTemp:'',
          searchInputLoading:false,
          fieldValue:'',
          containValue:'',
          loading:true,
          querySpecificFacetsLoading:false,
          highlightKeyword:'',
          HighlightKeywordSensitive:false,
          //facetsURL: this.$store.state.baseApiURL_new + '/facet/projects', // this api is totally different for the old one 
          facetsURL: this.$store.state.baseApiURL + '/facet/projects',
          searchConfigURL: this.$store.state.baseURL + '/config/facets/config.json', 
          projectItemsConfigURL: this.$store.state.baseURL + '/config/projectItems/config.json',
          // queryClusterListApi: this.$store.state.baseApiURL_new+'/peptidesummary', // this one does not work
          queryClusterListApi: this.$store.state.baseApiURL+'/peptidesummary', // this one does not work either
          autoCompleteApi: this.$store.state.baseApiURL_new + '/search/autocomplete?keyword=',
          containItemSearch:'',
          fieldSelectors:[],
          currentPage:1,
          containSelectors:[{ //Need to be initial value to make sure "No match data" hint will not be shown.
              value: '',
              label: '',
              check: false,
              number: ''
          }],
          filterCombination:[],
          sortType:'Date',
          publicaitionList:[],
          sortList:[
            {
                value: 'Accession',
                label: 'Accession'
            },
            {
                value: 'Title',
                label: 'Title'
            },
            {
                value: 'Relevance',
                label: 'Relevance'
            },
            {
                value: 'Date',
                label: 'Date'
            }
          ],
          page:0,
          pageSize:20,
          filter:'',
          sort:'publication_date',
          total:0,
          facetsConfigRes:'',
          projectItemsConfigRes:'',
          hightlightMode:false,
          hightlightItemArray:[],
          tagArray:[],
          projectItemsSpecies:'',
          projectItemsProjectDescription:'',
          projectItemsPublicationDate:'',
          normalQuery:{},
          autoCompleteArray:[],
          peptideTableColumn: [
              {
                  title: 'Peptide',
                  key: 'peptide',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: 'Protein Accession',
                  key: 'precharge',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: 'Protein Name',
                  key: 'proteinname',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: 'Gene',
                  key: 'gene',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              {
                  title: 'Organism',
                  key: 'organism',
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
                  title: '#Projects',
                  key: 'projects',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              // {
              //     title: '#Species',
              //     key: 'species',
              //     sortable: true,
              //     minWidth: 150,
              //     ellipsis:true
              // },
              {
                  title: 'Best FDR-score',
                  key: 'ratio',
                  sortable: true,
                  minWidth: 150,
                  ellipsis:true
              },
              // {
              //     title: 'ID',
              //     key: 'ID',
              //     width:1,
              //     //maxWidth:0,
              //     className:'peptideID'
              // }
          ],
          peptideTableResults:[]
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      this.updateCondition(to.query);
      this.queryClusterList(to.query);
      next();
    },
    components: {
      NavBar
    },
    methods:{
      searchInputChange (query, splitBool) {
          if(splitBool){
            this.tadAdd(query);
            this.$refs.searchRef.setQuery(null);
          }
          if(query !== ''){
              console.log('query',query);
              this.searchInputLoading = false;
              this.$http
                  .get(this.autoCompleteApi + query)
                  .then(function(res){
                     this.autoCompleteArray=res.body;
                  },function(err){

                  });
          }
          else{
            this.autoCompleteArray = [];
          }
      },
      setFilter(){
          this.$http
            .get(this.facetsURL + '?dateGap=%2B1YEAR&facetPageSize=100')
            .then(function(res){
              console.log('facest',res)
                let facetsMap = res.body._embedded.facets;
                this.fieldSelectors = [];
                    let archiveObj = this.facetsConfigRes.body.archive;
                    for(let i in archiveObj){
                        let item = {
                            value: archiveObj[i].name,
                            label: archiveObj[i].name,
                            containItems:[]
                        }
                        for(let j in facetsMap){
                            if(facetsMap[j].field == i){
                              for(let k=0; k<facetsMap[j].values.length; k++){
                                  let containItem = {
                                      value: facetsMap[j].values[k].value,
                                      label: facetsMap[j].values[k].value,
                                      check: false,
                                      number: facetsMap[j].values[k].count
                                  }
                                  item.containItems.push(containItem);
                              }
                              break;
                            }
                        }
                        this.fieldSelectors.push(item);
                    }
                    this.fieldValue = this.fieldSelectors[0].value;
                    this.containSelectors = this.fieldSelectors[0].containItems;
            },function(err){

            });
      },
      setSearchCondition(){
          let condition='';       
          for(let i=0; i<this.filterCombination.length; i++){
            for(let j in this.facetsConfigRes.body.archive){
              if(this.facetsConfigRes.body.archive[j].name == this.filterCombination[i].field){
                   condition += j+'='+this.filterCombination[i].contains+','
                break;
              }
            }
          }
          this.filter = condition.replace(/,$/gi,'');
      },
      queryClusterList(q){
          this.peptideTableResults = [];
          this.loading = true;
          let query = q || this.$route.query;
          query.dateGap = '+1YEAR';
          let pageSizeFound = false;
          for(let i in query){
              if(i == 'pageSize'){
                  pageSizeFound = true;
                  break;
              }
          }
          if(!pageSizeFound)
            query.pageSize = this.pageSize;
          let newquery = '';
          for(let i in query){
              if(i == 'keyword')
                newquery=newquery+'keyword='+query[i] + '&';
              else if(i == 'page' || i == 'pageSize')
                newquery=newquery+i+'='+query[i] + '&';
              
          }
          var reg=/&$/gi; 
          newquery = newquery.replace(reg,'');
          this.$http
            .get(this.queryClusterListApi+'?'+newquery)
            .then(function(clusterRes){
                this.loading=false;
                this.total = clusterRes.body.page.totalElements;
                for(let i=0; i < clusterRes.body._embedded.peptideSummaries.length; i++){
                  console.log(clusterRes.body._embedded.peptideSummaries[i].bestSearchEngineScore)
                  var item = {
                      peptide:clusterRes.body._embedded.peptideSummaries[i].peptideSequence,
                      precharge:clusterRes.body._embedded.peptideSummaries[i].proteinAccession,
                      ratio: (clusterRes.body._embedded.peptideSummaries[i].bestSearchEngineScore*100).toFixed(3),
                      spectra: clusterRes.body._embedded.peptideSummaries[i].psmsCount,
                      projects: clusterRes.body._embedded.peptideSummaries[i].projectAccessions.length,
                      proteinname: clusterRes.body._embedded.peptideSummaries[i].proteinName,
                      organism: clusterRes.body._embedded.peptideSummaries[i].organism,
                      gene: clusterRes.body._embedded.peptideSummaries[i].gene,
                  }
                  this.peptideTableResults.push(item);
                }
            },function(err){

            }); 
      },
      queryChange(query){
        if(query === ''){
            for(let i=0; i<this.fieldSelectors.length; i++){
                if(this.fieldSelectors[i].value == this.fieldValue){
                    this.containSelectors = this.fieldSelectors[i].containItems;
                    break;
                }
            }
        }
      },
      gotoDetails(id){
          this.$router.push({name:'dataset',params:{id:id}});
      },
      setHighlightKeywords(){
          this.highlightKeyword = this.keyword.split(',');
      },
      querySpecificFacets(keyword){
          if(this.containSelectors[0] && !this.containSelectors[0].value || this.containValue == keyword)
            return;
         
          if(keyword.length<4 && keyword.length>0) {
              this.querySpecificFacetsLoading = true;
              for(let i=0; i<this.fieldSelectors.length; i++){
                  if(this.fieldSelectors[i].value == this.fieldValue){
                      let itemArray=[];
                      var re = new RegExp(keyword,'i');
                      for(let j=0; j<this.fieldSelectors[i].containItems.length; j++){
                          if(this.fieldSelectors[i].containItems[j].value.match(re)){
                              let item = {
                                  value: this.fieldSelectors[i].containItems[j].value,
                                  label: this.fieldSelectors[i].containItems[j].label,
                                  check: false,
                                  number: this.fieldSelectors[i].containItems[j].number,
                              }
                              itemArray.push(item);
                          }
                      }
                      this.containSelectors=itemArray;
                      if(this.containSelectors.length>0){
                          this.querySpecificFacetsLoading = false;
                          break;
                      }
                      else{
                          for(let i in this.facetsConfigRes.body.archive){
                              if(this.facetsConfigRes.body.archive[i].name == this.fieldValue){
                                  this.$http
                                    .get(this.facetsURL + '?dateGap=%2B1YEAR' + '&filter='+i+'=='+keyword)
                                    .then(function(res){
                                         if(res.body._embedded && res.body._embedded.facets){
                                              let facetsArray = res.body._embedded.facets;
                                              let fieldFind = false;
                                              for(let j=0; j<facetsArray.length; j++){
                                                  if(this.facetsConfigRes.body.archive[facetsArray[j].field] && this.facetsConfigRes.body.archive[facetsArray[j].field].name == this.fieldValue && facetsArray[j].values.length>0){
                                                      fieldFind = true;
                                                      this.querySpecificFacetsLoading = false;
                                                      let itemArray = [];
                                                      for(let k=0; k<facetsArray[j].values.length; k++){
                                                            let item = {
                                                                value: facetsArray[j].values[k].value,
                                                                label: facetsArray[j].values[k].value,
                                                                check: false,
                                                                number: facetsArray[j].values[k].count,
                                                            }
                                                            itemArray.push(item);
                                                      }
                                                      this.containSelectors = itemArray;
                                                  }
                                              }
                                              if(!fieldFind){
                                                  this.querySpecificFacetsLoading = false;
                                              }
                                         }
                                    },function(err){
                                        this.querySpecificFacetsLoading = false;
                                    });
                                  break;
                              }
                          }
                      }
                  }
              }
          }
          else if(keyword.length>=4) { 
              this.querySpecificFacetsLoading = true;
              for(let i in this.facetsConfigRes.body.archive){
                  if(this.facetsConfigRes.body.archive[i].name == this.fieldValue){
                      this.$http
                        .get(this.facetsURL + '?dateGap=%2B1YEAR' + '&filter='+i+'=='+keyword)
                        .then(function(res){
                             if(res.body._embedded && res.body._embedded.facets){
                                  let facetsArray = res.body._embedded.facets;
                                  let fieldFind = false;
                                  for(let j=0; j<facetsArray.length; j++){
                                      if(this.facetsConfigRes.body.archive[facetsArray[j].field] && this.facetsConfigRes.body.archive[facetsArray[j].field].name == this.fieldValue && facetsArray[j].values.length>0){
                                          fieldFind = true;
                                          this.querySpecificFacetsLoading = false;
                                          let itemArray = [];
                                          for(let k=0; k<facetsArray[j].values.length; k++){
                                                let item = {
                                                    value: facetsArray[j].values[k].value,
                                                    label: facetsArray[j].values[k].value,
                                                    check: false,
                                                    number: facetsArray[j].values[k].count,
                                                }
                                                itemArray.push(item);
                                          }
                                          this.containSelectors = itemArray;
                                      }
                                  }
                                  if(!fieldFind){
                                      this.querySpecificFacetsLoading = false;
                                  }
                             }
                        },function(err){
                            this.querySpecificFacetsLoading = false;
                        });
                      break;
                  }
              }
          }
      },
      containDropdownOpen(open){
          if(!open && this.$refs.containRef.isFocused){
            this.$refs.containRef.toggleMenu();
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
      searchInputBlur(e){
        this.$nextTick(()=>{
            e.target.click();
        });
      },
      /*
      keywordChange(keyword){
          if(keyword == ';'){
            this.keyword = ''
            console.log(123);
            return;
          }
          if(keyword.charAt(keyword.length-1) ==';')
            console.log(keyword);
      },
      */
      autoCompleteFilter (value, option) {
          return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      conditionChange(index,condition){
        this.filterCombination[index].condition = condition;
        this.setSearchCondition();
      },
      fieldChange(){
          console.log('fieldChange');
        for(let i in this.fieldSelectors){
          if(this.fieldSelectors[i].value == this.fieldValue){
              /*
                this.containSelectors=[{ //Need to be initial value to make sure "No match data" hint will not be shown.
                    value: '',
                    label: '',
                    check: false,
                    number: ''
                }],
              */
              this.containSelectors = this.fieldSelectors[i].containItems
              this.containValue='';
              this.$refs.containRef.setQuery(null);
              break;
          }
        }
      },
      containChange(){
          if(this.containValue){
              this.$refs.containRef.toggleMenu();
              let filterCombinationFound =false;
              for(let j=0; j<this.filterCombination.length; j++){
                  if(this.filterCombination[j].field == this.fieldValue && this.filterCombination[j].contains == this.containValue){
                    filterCombinationFound = true;
                    break;
                  }
              }
              if(!filterCombinationFound){
                  let item={
                      condition:'And',
                      field:this.fieldValue,
                      contains:this.containValue
                  };
                  this.filterCombination.push(item);
                  this.setSearchCondition();
              }
          }
      },
      tadAdd(item){
        this.tagArray.push(item);
        this.setKeywords();
      },
      tagDelete(event, name){
          const index = this.tagArray.indexOf(name);
          this.tagArray.splice(index, 1);
          this.setKeywords();
      },
      setKeywords(){
          this.keyword='';
          for(let i=0; i<this.tagArray.length; i++){
              this.keyword += this.tagArray[i]+',';
          }
          this.keyword = this.keyword.replace(/,$/gi,'');
      },
      conditionDelete(index,item){
        this.filterCombination.splice(index,1);
        this.$refs.containRef.setQuery(null);
        this.setSearchCondition();
      },
      /*
      keywordSearch(value){
        this.keyword = value;
      },
      */
      submitSearch(){
        let temp = this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').value;
        if(temp && this.tagArray.length == 0){
          this.tadAdd(temp);
          this.$refs.searchRef.setQuery(null);
        }
        
        this.hightlightMode = !!this.keyword;

        this.$router.push({name: 'peptidesearch', query: this.query});
      },
      pageChange(page){
          this.page = page-1;
          this.setFilter();
          this.$router.push({name: 'peptidesearch', query: this.query});
      },
      pageSizeChange(size){
          this.pageSize = size;
          this.setFilter();
          this.$router.push({name: 'peptidesearch', query: this.query});
      },
      /*new api has no sort funtions
      sortChange(type){
        console.log(type);
        if(type == 'Title')
          this.sort = 'project_title'
        else if(type == 'Accession')
          this.sort = 'id'
        else if(type == 'Relevance')
          this.sort = 'score'
        else if(type == 'Date')
          this.sort = 'publication_date';

        this.setFilter();
        this.queryClusterList();
      },*/
      updateCondition(q){
          let query = q || this.$route.query;
          for(let i in query){
              if(i == 'keyword'){
                  this.tagArray=[];
                  if(query[i]){
                      let keywordArray = query[i].split(',');
                      for(let i=0; i<keywordArray.length;i++){
                          this.tadAdd(keywordArray[i]);
                      }
                  }
              }
              else if(i == 'filter'){
                if(query[i]){
                    let filterArray = query[i].split(',');
                    console.log('filterArray',filterArray);
                    this.filterCombination=[];
                      for(let i=0; i<filterArray.length;i++){
                          let facetsArray = filterArray[i].split('=')
                          let item={
                              condition:'And',
                              field: this.facetsConfigRes.body.archive[facetsArray[0]].name,     
                              contains:facetsArray[1]
                          };
                          this.filterCombination.push(item);
                      }
                }
              }
              else if(i =='page'){
                this.currentPage = parseInt(query[i])+1;
              }
              else if(i =='pageSize'){
                  let tempPageSize = parseInt(query[i]);
                  if(tempPageSize == 10 || tempPageSize == 20 || tempPageSize == 30 || tempPageSize == 40)
                    this.pageSize = parseInt(query[i]);
                  else 
                    this.pageSize = 20;
              }
          }
      },
      searchInputListener(){
          this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').addEventListener('keydown',(e)=>{
              if(e.keyCode == 13 || e.keyCode == 188){
                  e.preventDefault();
                  e.stopPropagation();
              }
          });

          this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').addEventListener('keyup',(e)=>{  
              if(e.keyCode == 13 || e.keyCode == 188){
                  e.preventDefault();
                  e.stopPropagation();
                  if(e.target.value)
                    this.searchInputChange(e.target.value, true);
              }
          });
      },
      queryFormatter(query){
          console.log('query',query);
          let queryTemp = '?';
          for(let i in query){
              if(query[i] && i == 'keyword'){
                  queryTemp = queryTemp + i + '='+query[i]
              }
              else if(query[i] && i == 'filter'){
                console.log('query[i]',query[i]);
              }
          }
      },
      queryConfig(){
          this.$http
            .get(this.searchConfigURL)
            .then(function(facetsConfigRes){
                this.facetsConfigRes = facetsConfigRes;
                this.$http
                  .get(this.projectItemsConfigURL)
                  .then(function(projectItemsConfigRes){
                      this.projectItemsConfigRes = projectItemsConfigRes.body.projectItems;
                      this.setFilter();
                      this.updateCondition();
                      this.queryClusterList();
                  },function(err){

                  });
            },function(err){

            });
      },
      rowClick(row,index){
        this.$router.push({name:'peptidedetails',query:{keyword:row.peptide, proteinAccession:row.precharge}});
      },
    },
    /*
    watch: {
      filterCombination: function (val) {
          //combine keyword (this.keyword) and filters together (val)
          //this.submitSearch();
      },
    },
    */
    computed:{
      //this variable is not used anymore and only for updating this.normalQuery;
      query:function(){
          //let keyword= this.keyword? 'keyword='+this.keyword+'&' : '';
          //let filter = this.filter? 'filter='+this.filter+'&' : '';
          //let page='page='+this.page+'&';
          //let pageSize='pageSize='+this.pageSize;
          let normalQuery = {}
          for(let i=0; i<this.tagArray.length; i++){

          }
          if(this.keyword)
            normalQuery.keyword = this.keyword;
          if(this.filter)
            normalQuery.filter = this.filter;
          normalQuery.page = this.page;
          normalQuery.pageSize = this.pageSize;
          return normalQuery;
          
      }
    },
    mounted: function(){
      this.queryConfig();
      this.searchInputListener();
    },
    beforeRouteEnter(to,from,next){
      if(from.name == 'landingpage' && from.params.keyword)
        paramsFromLandingPage = from.params.keyword;
      
      next();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .archive-container{
    width: 100%;
   
  }
  .browse-data-container{
    width: 95%;
    margin:0 auto;
    padding: 90px 0;
  }
  .search-filter{
    display: flex;
    margin-bottom: 0.5rem;
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
    font-weight: 700;
    background-color: #5bc0be;
    border-radius: 3px;
    }
  .resource-item{
    margin-bottom: 20px;
  }
  .resource-item .project-info{
    font-weight: 400;
  }
  .resource-id{
    font-size: 14px;
    margin-right: 2px;
  }
  .resource-title{
    font-weight: bold;
  }
  .detailed-resouce{
    margin-left: 5px;
  }
  .biological-dataset-button{
    padding: 2px 3px;
    font-size: 12px;
    margin-bottom: 0;
    background-color: #5bc0be;
    border-radius: 3px;
  }
  .biomedical-dataset-button{
    padding: 2px 3px;
    font-size: 12px;
    margin-bottom: 0;
    background-color: #bd7edc;
    border-radius: 3px;
  }
  .highlighted-dataset-button{
    padding: 2px 3px;
    font-size: 12px;
    margin-bottom: 0;
    background-color: #e2c94c;
    border-radius: 3px;
  }
  .technical-dataset-button{
    padding: 2px 3px;
    font-size: 12px;
    margin-bottom: 0;
    background-color: #6acaef;
    border-radius: 3px;
  }
  .gray-dataset-button{
    padding: 2px 3px;
    font-size: 12px;
    margin-bottom: 0;
    background-color: #999c9c;
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
  .matched-items{
    color: #948d8d;
  }
  .readMore{
    display: inline;
  }
</style>

<style>
  .page .ivu-select-dropdown-list{
    margin-left: 0 !important;
  }
  .search-item-input input{
    margin-bottom: 0 !important;
  }
  .filter-selector .ivu-select-item-selected{
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
    background:none !important;
  }
  .filter-selector .ivu-tag{
    background: none ;
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
    display: none;
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
  .filter-selector .ivu-select-selection{
    height: 30px !important;
    line-height: 30px !important;
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
  .resource-item .readMore p{
    display: inline !important;
  }
  .resource-item .readMore span{
    display: inline !important;
  }
  .resource-item .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header{
    padding-left: 0px;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .resource-item .ivu-collapse{
    border:none;
    background: none;
  }
  .resource-item .ivu-collapse-content > .ivu-collapse-content-box{
    padding-top: 0;
    padding-bottom: 0;
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
  .peptide-table table{
    margin-bottom: 0 !important;
  }
  .peptide-table .peptideID{
    display: none;
  }
  .search-input-wrapper.peptidome .ivu-select-dropdown{
    /*display: none;*/
  }
</style>
