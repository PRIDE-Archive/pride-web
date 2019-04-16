<template>
  <div class="archive-container">
      <div class="panel nav"><NavBar page="archive"/></div>
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
                                <Select class="filter-selector input-search-needed" v-model="containValue" style="min-width:200px" size="small" filterable multiple remote :remote-method="querySpecificFacets" :loading="querySpecificFacetsLoading" @on-change="containChange" loading-text="loading...">
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
                  <p slot="title" class="resource-list-title-container">
                    <span>Resources List</span>
                    <span>
                        <span>Sort by: </span>
                        <div class="sortOption">
                            <Select v-model="sortType" size="small" style="width:95px" @on-change="sortChange">
                                <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                
                    </span>
                  </p>
                  <Spin size="large" fix v-if="loading"></Spin>
                  <Card v-for="publicationItem in publicaitionList" class="resource-item" v-bind:key = "publicationItem.accession">
                      <router-link class="resource-id" :to="{name:'dataset',  params: { id: publicationItem.accession}}">{{publicationItem.accession}}</router-link><span v-if="publicationItem.submissionType == 'COMPLETE'"><Icon type="checkmark-round"></Icon></span> 
                      <p class="resource-title">{{publicationItem.title}}</p> 
                      <p>Species: <span v-for="item in publicationItem.species">{{item}} </span></p>
                      <span>Project description: <read-more class="readMore" more-str="(More)" :text="publicationItem.projectDescription" link="#" less-str="Less" :max-chars="200"></read-more></span>
                      <p>Made public: {{publicationItem.publicationDate}}</p>
                      <Dropdown class="dataset-wrapper" v-for="datesetItem in publicationItem.projectTags">
                          <a v-if="datesetItem == 'Biological'" class="button biological-dataset-button" href="javascript:void(0)">
                             <Icon type="ios-pricetag"></Icon>
                              {{datesetItem}} Dataset
                          </a>
                          <a v-else-if="datesetItem == 'Biomedical'" class="button biomedical-dataset-button" href="javascript:void(0)">
                             <Icon type="ios-pricetag"></Icon>
                              {{datesetItem}} Dataset
                          </a>
                          <a v-else-if="datesetItem == 'Highlighted'" class="button highlighted-dataset-button" href="javascript:void(0)">
                             <Icon type="ios-pricetag"></Icon>
                              {{datesetItem}} Dataset
                          </a>
                          <a v-else-if="datesetItem == 'Technical'" class="button technical-dataset-button" href="javascript:void(0)">
                             <Icon type="ios-pricetag"></Icon>
                              {{datesetItem}} Dataset
                          </a>
                          <a v-else class="button gray-dataset-button" href="javascript:void(0)">
                             <Icon type="ios-pricetag"></Icon>
                              {{datesetItem}} Dataset
                          </a>
                          <DropdownMenu slot="list">
                              <DropdownItem>{{datesetItem}} Dataset</DropdownItem>
                          </DropdownMenu>
                      </Dropdown>
      
                  </Card>
                  
                  <div class="page-container">
                    <Page :total="total" :page-size="pageSize" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                  </div>
              </Card>
          </Row>
      </div>
  </div>
</template>

<script>
  import NavBar from '@/components/ebi/Nav'
  export default {
    name: 'archive',
    data(){
      return {
          keyword:'',
          fieldValue:'',
          containValue:[],
          loading:true,
          querySpecificFacetsLoading:false,
          autoCompleteWords:['aaa','bbb','ccc','ddd'],
          facetsURL:'http://ves-pg-41:9020/facet/projects',
          searchConfigURL:'/static/facets/config.json',
          queryArchiveProjectListApi:'http://ves-pg-41:9020/search/projects',
          containItemSearch:'',
          fieldSelectors:[],
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
          configRes:'',
      }
    },
    components: {
      NavBar
    },
    methods:{
      setFilter(){
          this.$http
            .get(this.facetsURL + '?dateGap=%2B1YEAR&facetPageSize=100')
            .then(function(res){
                let facetsMap = res.body._embedded.facets;
                console.log(facetsMap);
                this.$http
                    .get(this.searchConfigURL)
                    .then(function(configRes){
                      this.configRes = configRes;
                      this.fieldSelectors = [];
                      let archiveObj = configRes.body.archive;
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
            },function(err){

            });
      },
      queryArchiveProjectList(){
          this.publicaitionList = [];
          this.loading = true; 
          this.$http
            .get(this.queryArchiveProjectListApi + this.query)
            .then(function(res){
              this.total = res.body.page.totalElements;
                this.loading = false;
                let projectsList = res.body._embedded.compactprojects;
                for(let i=0; i<projectsList.length; i++){
                    let item = {
                        accession: projectsList[i].accession,
                        title: projectsList[i].title,
                        species: projectsList[i].species,
                        projectDescription: projectsList[i].projectDescription,
                        publicationDate: projectsList[i].publicationDate,
                        projectTags: projectsList[i].projectTags,
                        submissionType: projectsList[i].submissionType
                    }
                    this.publicaitionList.push(item);
                }
            },function(err){

            });
           
      },
      querySpecificFacets(keyword){
          if (keyword !== '') {
              this.querySpecificFacetsLoading= true;
              let fieldValue='';
              for(let i in this.configRes.body.archive){
                if(this.configRes.body.archive[i].name == this.fieldValue){
                    fieldValue = i;
                    break;
                }
              }
              this.$http
                .get(this.facetsURL + '?dateGap=%2B1YEAR' + '&filter='+fieldValue+'=='+keyword)
                .then(function(res){
                    let facetsMap = res.body._embedded.facets;


                    
                   
                    for(let j in facetsMap){
                        if(facetsMap[j].field == fieldValue){
                          
                          break;
                        }
                    }
                    //console.log('facetsMap',facetsMap);
                    this.containSelectors=[];
                     this.querySpecificFacetsLoading= false;

                     for(let i in this.fieldSelectors){
                        if(this.fieldSelectors[i].value == this.fieldValue){
                            //this.fieldSelectors[i].containItems = this.containSelectors;
                        }
                     }
                },function(err){

                });
               
            
          } else {
              
          }
         
        /*
        console.log(keyword);
        this.querySpecificFacetsLoading= true;
          this.$http
            .get(this.facetsURL + '?dateGap=%2B1YEAR' + '&filter='+this.fieldValue+'='+keyword)
            .then(function(res){
                 this.querySpecificFacetsLoading= false;
            },function(err){

            });
           */
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
                    if(!found){
                      this.fieldSelectors[i].containItems[j].check = false;
                      //console.log(this.containValue);
                      /*
                      let newItem = {
                          value: facetsMap[j].values[k].value,
                          label: facetsMap[j].values[k].value,
                          check: false,
                          number: facetsMap[j].values[k].count
                      };
                      this.fieldSelectors[i].containItems.push(newItem);*/
                    }
                    

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
      submitSearchCondition(){
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

        console.log('this.keyword',this.keyword);
        //this.keyword = value;
      },
      submitSearch(){
        this.$Message.success({content:'new result', duration:1});
      },
      pageChange(page){
          this.page = page-1;
          this.setFilter();
          this.queryArchiveProjectList();
      },
      pageSizeChange(size){
          this.pageSize = size;
          this.setFilter();
          this.queryArchiveProjectList();
      },
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
        this.queryArchiveProjectList();
      },
      updateQuery(){
        this.sort = 'publication_date';
        this.page = 0;
        this.pageSize = 20;
      }
    },

    watch: {
      filterCombination: function (val) {
          //combine keyword (this.keyword) and filters together (val)
          //this.submitSearch();
      },

    },
    computed:{
      query:function(){
          let keyword= this.keyword? 'keyword='+this.keyword+'&' : '';
          let filter = this.filter? 'filter='+this.filter+'&' : '';
          let page='page='+this.page+'&';
          let pageSize='pageSize='+this.pageSize;
          return '?'+keyword+filter+page+pageSize;
          
      }
    },
    mounted: function(){
        this.updateQuery();
        this.setFilter();
        this.queryArchiveProjectList();
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
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #5bc0be;
        border-radius: 3px;
    }
    .biomedical-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #bd7edc;
        border-radius: 3px;
    }
    .highlighted-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #e2c94c;
        border-radius: 3px;
    }
    .technical-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #6acaef;
        border-radius: 3px;
    }
    .gray-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
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
    .readMore{
      display: inline;
    }
</style>

<style>
    .page .ivu-select-dropdown-list{
      margin-left: 0 !important;
    }
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
</style>
