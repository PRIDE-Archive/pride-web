<template>
  <div class="archive-container">
      <div class="panel nav"><NavBar page="archive"/></div>
      <div class="browse-data-container">
          <Row class="search-row">
              <Card style="width:100%">
                <p slot="title">Search</p>
                <div class="search-container">
                    <div class="search-input">
                       
                        <div class="search-input-wrapper">
                            <div class="fake-input">
                              <div class="tag-wrapper">
                                  <Tag class="tag-in-search-input" v-for="(item,index) in tagArray" :key="index" :name="item" closable @on-close="tagDelete">{{item}}</Tag>
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
                    </div>
                    <div class="search-filter">
                        <div class="filter-wrapper">
                            <div class="filter-condition">
                                <Select ref="fieldRef" class="filter-selector" v-model="fieldValue" style="width:200px" @on-change="fieldChange">
                                    <Option v-for="item in fieldSelectors" :value="item.value" :label="item.label" :key="item.value" >
                                            <span>{{ item.label }}</span>
                                            <span style="float:right;color:#ccc">{{item.number}}</span>
                                    </Option>
                                </Select>
                            </div>
                            <span class="separator">:</span>
                            <div class="filter-condition ">
                                <Select ref="containRef" class="filter-selector input-search-needed" v-model="containValue" style="min-width:200px" size="small" filterable remote :remote-method="querySpecificFacets" :loading="querySpecificFacetsLoading" @on-change="containChange" loading-text="loading..." @on-open-change="containDropdownOpen" @on-query-change="queryChange">
                                    <Option v-for="item in containSelectors" :value="item.value" :label="item.label" :key="item.value">
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
                    <div class="search-condition-container">
                      <div class="tag-container">
                          <Tag type="border" v-for="(item,index) in tagArray" :key="index" :name="item" closable @on-close="tagDelete">{{item}}</Tag>
                      </div>
                    </div>
                    <div v-for="(item, index) in filterCombination" class="search-condition-container">
                      <div class="tag-container">
                          <Tag type="border" closable @on-close="conditionDelete(index,item)">
                            {{item.field}}: {{item.contains}}
                          </Tag>
                      </div>
                    </div>
                </div>
              </Card>
          </Row>
          <Row>
              <Card style="width:100%">
                  <p slot="title" class="resource-list-title-container">
                    <span>List of Datasets ({{total}})</span>
                    <span v-if="publicaitionList.length>0" class="sort-wrapper">
                        <Button class= "download-button" size="small" @click="datasetJSON()">Download JSON</Button>
                        <span>Order by: </span>
                        <div class="sortOption"> 
                            <a class="order-action"><Icon v-if="order=='DESC'" type="md-arrow-dropdown" size="22" @click="orderChange('ASC')"/></a>
                            <a class="order-action"><Icon v-if="order=='ASC'" type="md-arrow-dropup" size="22" @click="orderChange('DESC')"/></a>
                        </div>
                        <span style="margin-left: 10px">Sort by: </span>
                        <div class="sortOption">
                            <Select v-model="sortType" size="small" style="width:95px" @on-change="sortChange">
                                <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div class="sortOption page">
                            <span style="margin-left: 5px">Page: </span>
                            <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                        </div>

                    </span>
                  </p>
                  <Spin size="large" fix v-if="loading"></Spin>
                  <Card v-if="publicaitionList.length>0" v-for="publicationItem in publicaitionList" class="resource-item" v-bind:key = "publicationItem.accession">
                      <div style="width:85%; display: inline-block;" >
                            <router-link class="resource-id" :to="{name:'dataset',  params: { id: publicationItem.accession}}"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.accession}}</text-highlight></router-link><span v-if="publicationItem.submissionType == 'COMPLETE'"><Icon type="checkmark-round"></Icon></span> 
                            <p class="resource-title"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.title}}</text-highlight></p> 
                            <p><span class="project-info">{{projectItemsSpecies}}: </span> <span v-for="item in publicationItem.species"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item}}</text-highlight>;</span><a class="more-action" style="margin-left: 5px"v-if= "publicationItem.organisms.length>3" @click="gotoDetails(publicationItem.accession)">(More)</a></p>
                            <span><span class="project-info">{{projectItemsProjectDescription}}: </span><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.projectDescription}}</text-highlight>
                              <a class="more-action" @click="gotoDetails(publicationItem.accession)">(More)</a>
                            </span>
                            <p><span class="project-info">{{projectItemsSubmitters}}: </span><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.submitters}}</text-highlight></p>
                            <p><span class="project-info">{{projectItemsPublicationDate}}: </span><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.publicationDate}}</text-highlight></p>
                            <p><span class="project-info">{{projectItemsDownloadCount}}: </span><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.downloadCount}}</text-highlight></p>
                            <Dropdown class="dataset-wrapper" v-for="(datesetItem, index) in publicationItem.projectTags" :key="index">
                                <a v-if="datesetItem == 'Biological'" class="button biological-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                                   <Icon type="ios-pricetag"></Icon>
                                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight>
                                </a>
                                <a v-else-if="datesetItem == 'Biomedical'" class="button biomedical-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                                   <Icon type="ios-pricetag"></Icon>
                                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight>
                                </a>
                                <a v-else-if="datesetItem == 'Highlighted'" class="button highlighted-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                                   <Icon type="ios-pricetag"></Icon>
                                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight>
                                </a>
                                <a v-else-if="datesetItem == 'Technical'" class="button technical-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                                   <Icon type="ios-pricetag"></Icon>
                                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight>
                                </a>
                                <a v-else class="button gray-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                                   <Icon type="ios-pricetag"></Icon>
                                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight>
                                </a>
                            </Dropdown>
                            <Collapse v-if="hightlightMode" simple>
                                <Panel>
                                    <span>Matched Items</span>
                                    <p class="matched-items" v-for="highlightItem in publicationItem.hightlightItemArray" slot="content">
                                        <span class="project-info">{{highlightItem.name}}: </span>
                                       <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{highlightItem.content}}</text-highlight>
                                    </p>
                                </Panel>
                            </Collapse>
                      </div>
                      
                      <!-- <div style="width:15%; display: inline-block; position: absolute;">
                            <Spin style="position: absolute; right: 30px; top: 30px;"   size="small" v-if="iconLoading"></Spin>
                            <span v-else>
                                <svgLogo v-if="publicationItem.icon.id" :icon="publicationItem.icon"></svgLogo> 
                                <Poptip v-else trigger="hover" placement="left" style="position: absolute; right: 0;">
                                  <img :src="archive_logo" width="60px" height="60px">
                                  <div class="" slot="title" style="display: flex; justify-content: space-between; align-items: center; width: 150px" >
                                    <span>Omics score: 0</span>
                                    <Icon type="md-help-circle" @click="gotoIconHelpPage"/>
                                  </div>
                                  <div class="" slot="content">
                                    <div><span style="margin-right: 5px">0</span><span>Views</span></div>
                                    <div><span style="margin-right: 5px">0</span><span>Connections</span></div>
                                    <div><span style="margin-right: 5px">0</span><span>Citations</span></div>
                                    <div><span style="margin-right: 5px">0</span><span>Reanalyses</span></div>
                                    <div><span style="margin-right: 5px">0</span><span>Downloads</span></div>
                                  </div>
                                </Poptip>
                            </span>
                      </div> -->

                  </Card>
                  
                  <div v-if="publicaitionList.length>0" class="page-container">
                    <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                  </div>
                  <div style="text-align: center;"v-if="publicaitionList.length==0">
                    <p style="margin-top: 20px; color: #a7a7a7">Sorry, no projects found for search term <span style="color: #5bc0be">{{keyword}}</span> and the current set of active filters. Try with a different combination of search term and filters.</p>
                    <p style="margin: 20px 0; color: #a7a7a7; cursor: pointer">
                      If you were looking for a specific project and it was not found, it may still be held private. If you think it should be public you can request its publication <a style="color: #5bc0be" @click="gotoPublish">here</a>.
                    </p>


                  </div>
              </Card>
          </Row>
      </div>
      <chat-popup type="search"></chat-popup>
  </div>
</template>

<script>
  import NavBar from '@/components/Nav'
  import store from "@/store.js"
  import svgLogo from "@/components/svg/archive"
  import ChatPopup from '@/components/ChatPopup.vue';
  var paramsFromLandingPage='';
  export default {
    name: 'archive',
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
          facetsURL: this.$store.state.baseApiURL_new + '/facet/projects',
          searchConfigURL: this.$store.state.baseURL + '/config/facets/config.json', 
          projectItemsConfigURL: this.$store.state.baseURL + '/config/projectItems/config.json',
          queryArchiveProjectListApi: this.$store.state.baseApiURL_new + '/search/projects',
          autoCompleteApi: this.$store.state.baseApiURL_new + '/search/autocomplete?keyword=',
          downLoadJSONApi: this.$store.state.baseApiURL_new + '/projects/download', 
          containItemSearch:'',
          fieldSelectors:[],
          currentPage:1,
          containSelectors:[{ //Need to be initial value to make sure "No match data" hint will not be shown.
              value: '',
              label: '',
              check: false,
              number: ''
          }],
          //containSelectors:[],
          filterCombination:[],
          sortType:'Date',
          publicaitionList:[],
          sortList:[
            {
                value: 'Accession',
                label: 'Accession'
            },
            {
                value: 'Relevance',
                label: 'Relevance'
            },
            {
                value: 'Submission Date',
                label: 'Submission Date'
            },
            {
                value: 'Publication Date',
                label: 'Publication Date'
            },
            {
              value: "Number of Downloads",
              label: "Number of Downloads"
            },
            {
              value: "Avg Number of Downloads",
              label: "Avg Number of Downloads"
            },
          ],
          page:0,
          pageSize:20,
          filter:'',
          sort:'',
          order:'DESC',
          total:0,
          facetsConfigRes:'',
          projectItemsConfigRes:'',
          hightlightMode:false,
          hightlightItemArray:[],
          tagArray:[],
          projectItemsSpecies:'',
          projectItemsProjectDescription:'',
          projectItemsPublicationDate:'',
          projectItemsDownloadCount:'',
          projectItemsSubmitters:'',
          normalQuery:{},
          autoCompleteArray:[],
          archive_logo: this.$store.state.baseURL + '/archive_logo.png',
          iconURL:'https://www.omicsdi.org/ws/dataset/search?query=',
          iconLoading:false,
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      // console.log('to query',to.query);
      /*
      let filter = to.query.split('?')[1].split('filter');
      if(filter.length>1)
        filter.split("=");
      console.log('filter',filter);*/
        if(to.query.refresh){
           window.location = window.location.pathname
           next();
        }
        
        this.updateCondition(to.query);
      
        this.queryArchiveProjectList(to.query);
        //this.$bus.$emit('submit-search', {params: to.params, query: to.query});
        next();
        
      
    },
    components: {
      NavBar,
      svgLogo,
      ChatPopup
    },
    methods:{
      searchInputChange (query, splitBool) {
          if(splitBool){
            if(this.checkRepeateKeyword(query)){
              this.$Message.error({content:'Keywords Repeated!', duration:1});
              return
            }
            //console.log('searchInputChange',query);
            this.tadAdd(query);
            this.$refs.searchRef.setQuery(null);
          }

          if(query !== ''){
              // console.log('query',query);
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
      checkRepeateKeyword(query){
        let bool = false
        for(let i =0; i<this.tagArray.length; i++){
          if(query == this.tagArray[i]){
            bool = true
            break;
          }
        }
        return bool
      },
      setFilter(){//only for filter/facet not for keywords, but we need the keywords to query the filter/facet
          let searchKeywordForFacet = this.keyword ? ('&keyword='+this.keyword) : '' // this one is different from the querySpecificFacets
          this.$http
            .get(this.facetsURL + '?facetPageSize=100'+ searchKeywordForFacet)
            .then(function(res){
                // console.log('res setFilter',res);
                
                           /*
                          "project_identified_ptms_facet": {
                              "name": "Modification"
                          },
                          "additionalAttributes":{
                              "name":"XXXX"
                          },
                          "experimentalFactors":{
                              "name":"XXXX"
                          },
                          "softwares":{
                              "name":"XXXX"
                          },
                          "updatedDate":{
                              "name":"XXXX"
                          },*/
                
                let facetsMap = res.body;
                let temp_fieldSelectors=[]
                this.fieldSelectors = [];
                    let archiveObj = this.facetsConfigRes.body.archive;
                    for(let i in archiveObj){
                        let item = {
                            value: archiveObj[i].name,
                            label: archiveObj[i].name,
                            containItems:[]
                        }
                        for(let j in facetsMap){
                            if(j == i){
                              for(let k in facetsMap[j]){
                                  let containItem = {
                                      value: k,
                                      label: k,
                                      check: false,
                                      number: facetsMap[j][k]
                                  }
                                  item.containItems.push(containItem);
                              }
                              break;
                            }
                        }
                        temp_fieldSelectors.push(item);
                    }
                     // this.fieldSelectors = temp_fieldSelectors
                    this.fieldSelectors = this.sortFieldSelectors(temp_fieldSelectors);
                    // console.log('this.fieldSelectors ',this.fieldSelectors )
                    this.fieldValue = this.fieldSelectors[0].value;
                    //console.log( this.fieldSelectors[0].value);
                    //console.log('this.fieldValue',this.fieldValue);
                    this.containSelectors = this.fieldSelectors[0].containItems;
            },function(err){

            });
      },
      sortFieldSelectors(temp_fieldSelectors){
        for(let i=0; i<temp_fieldSelectors.length; i++){
          // console.log(temp_fieldSelectors[i].value)
          if(temp_fieldSelectors[i].value.indexOf('Date')<0){ // we do the sort only for the item without date keyword
            // console.log(temp_fieldSelectors[i].value)
            temp_fieldSelectors[i].containItems = temp_fieldSelectors[i].containItems.sort((a, b) => b.number - a.number)
          }
        }
        return temp_fieldSelectors
      },
      setSearchCondition(){
          let condition='';       
          for(let i=0; i<this.filterCombination.length; i++){
            for(let j in this.facetsConfigRes.body.archive){
              if(this.facetsConfigRes.body.archive[j].name == this.filterCombination[i].field){
                   condition += j+'=='+this.filterCombination[i].contains+','
                break;
              }
            }
          }
          this.filter = condition.replace(/,$/gi,'');
          // console.log(this.filter)
      },
      queryArchiveProjectList(q){
          this.publicaitionList = [];
          this.loading = true;
          let query = q || this.$route.query;
          // query.dateGap = '+1YEAR';
          let pageSizeFound = false;
          for(let i in query){
              if(i == 'pageSize'){
                  pageSizeFound = true;
                  break;
              }
          }
          if(!pageSizeFound)
            query.pageSize = this.pageSize;

          if(this.keyword)
            this.hightlightMode = true;
          else{
            //for highlight mode
            this.hightlightMode = false;
            if(Object.hasOwn(query, 'keyword'))
              delete query.keyword;
          }
          this.$http
            .get(this.queryArchiveProjectListApi,{params: query})
            .then(function(res){
                this.total = res.headers.map.total_records ? parseInt(res.headers.map.total_records) : 0;
                this.loading = false;
                if(res.body && res.body.length>0){
                      this.setHighlightKeywords();
                      let projectsList = res.body;
                      for(let i=0; i<projectsList.length; i++){
                          let item = {
                              accession: projectsList[i].accession,
                              title: projectsList[i].title,
                              organisms: projectsList[i].organisms || [], //for show more species link in UI
                              species: projectsList[i].organisms || [],
                              projectDescription: projectsList[i].projectDescription.replace(/\s*$/g,"").slice(0,200) + '...',
                              publicationDate: projectsList[i].publicationDate,
                              downloadCount: projectsList[i].downloadCount,
                              projectTags: projectsList[i].projectTags || [],
                              submissionType: projectsList[i].submissionType || '',
                              hightlightItemArray:[],
                              icon:{
                                  id: "",
                                  source: "",
                                  title: "",
                                  description: "",
                                  keywords: [],
                                  organisms: [],
                                  publicationDate: "",
                                  score: null,
                                  omicsType: [],
                                  citationsCount: 0,
                                  connectionsCount: 0,
                                  reanalysisCount: 0,
                                  viewsCount: 0,
                                  downloadCount: 0,
                                  citationsCountScaled: 0,
                                  connectionsCountScaled: 0,
                                  reanalysisCountScaled: 0,
                                  viewsCountScaled: 0,
                                  downloadCountScaled: 0,
                                  claimable: false
                              }
                          }
                          if(item.species.length>3){
                            item.species=item.species.slice(0,4)
                          }
                          //for submitters:
                          item.submitters='';
                          for(let j=0; j< projectsList[i].submitters.length; j++){
                              item.submitters += (projectsList[i].submitters[j]+',');
                              //if no need to hightlight, it could be removed.
                              // let hightlightItem={
                              //     name:this.projectItemsConfigRes[j],
                              //     content:item.submitters.replace(/,$/gi,'')
                              // }
                              // item.hightlightItemArray.push(hightlightItem);
                          }
                          item.submitters = item.submitters.replace(/,$/gi,'')
                          // highlights are from the backend reply in each item of projectList
                          for(let j in projectsList[i].highlights){
                              let content='';
                              for(let k=0; k<projectsList[i].highlights[j].length;k++){
                                //let temp = projectsList[i].highlights[j].k;
                                content += (projectsList[i].highlights[j][k]+'').replace(/<(\w+|\/\w+)>/g,'')+',';
                              }
                              let hightlightItem={

                                  name:this.projectItemsConfigRes[j] ? this.projectItemsConfigRes[j] : j,
                                  content:content.replace(/,$/gi,'')
                              }
                              item.hightlightItemArray.push(hightlightItem);
                          }

                          this.projectItemsSpecies = this.projectItemsConfigRes['organisms'];
                          this.projectItemsProjectDescription = this.projectItemsConfigRes['projectDescription'];
                          this.projectItemsPublicationDate = this.projectItemsConfigRes['publicationDate'];
                          this.projectItemsDownloadCount = this.projectItemsConfigRes['downloadCount'];
                          this.projectItemsSubmitters = this.projectItemsConfigRes['submitters'];
                          this.publicaitionList.push(item);  
                      }
                      this.generateIcons()
                }
                else{
                  this.$Message.error({content:'No results', duration:1});
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
          if(this.keyword)
            this.highlightKeyword = this.keyword.split(',');
          // console.log('this.highlightKeyword',this.highlightKeyword);
      },
      querySpecificFacets(keyword){//this keyword will be passed into this function automatically from the facet input
          if(this.containSelectors[0] && !this.containSelectors[0].value || this.containValue == keyword)
            return;
          let searchKeywordForFacet = this.keyword ? ('keyword='+this.keyword) : '' // it will be used to filter the facet if we have input something in the search input. As facet could be searched in two part: facet input and search input.
          if(keyword.length<4 && keyword.length>0) {
              this.querySpecificFacetsLoading = true;
              for(let i=0; i<this.fieldSelectors.length; i++){
                //console.log('aaa');
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
                                    .get(this.facetsURL + '?filter='+i+'=='+keyword + searchKeywordForFacet)
                                    .then(function(res){
                                        // console.log("facetsURL",res.body);
                                         if(res.body){
                                              let facetsArray = res.body;
                                              let fieldFind = false;
                                              for(let j in facetsArray){
                                                //console.log('ddd');
                                                  if(this.facetsConfigRes.body.archive[j] && this.facetsConfigRes.body.archive[j].name == this.fieldValue && Object.keys(facetsArray[j]).length>0){
                                                      fieldFind = true;
                                                      this.querySpecificFacetsLoading = false;
                                                      let itemArray = [];
                                                      for(let k in facetsArray[j]){
                                                        //console.log('eee');
                                                            let item = {
                                                                value: k,
                                                                label: k,
                                                                check: false,
                                                                number: facetsArray[j][k],
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
                        .get(this.facetsURL + '?filter='+i+'=='+keyword + searchKeywordForFacet)
                        .then(function(res){
                            //console.log(res.body._embedded);
                             if(res.body){
                                  let facetsArray = res.body;
                                  let fieldFind = false;
                                  for(let j in facetsArray){
                                      if(this.facetsConfigRes.body.archive[j] && this.facetsConfigRes.body.archive[j].name ==  this.fieldValue && Object.keys(facetsArray[j]).length>0){
                                          fieldFind = true;
                                          this.querySpecificFacetsLoading = false;
                                          let itemArray = [];
                                          for(let k in facetsArray[j]){
                                            //console.log('eee');
                                                let item = {
                                                    value: k,
                                                    label: k,
                                                    check: false,
                                                    number: facetsArray[j][k],
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
          //console.log( this.$refs.containRef);
          //console.log('aaaaaa');
          if(!open && this.$refs.containRef.isFocused){
            this.$refs.containRef.toggleMenu();
            //this.$Message.success({content:'repeated item', duration:1});
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
      keywordChange(keyword){
        /*
        if(keyword == ';'){
          this.keyword = ''
          console.log(123);
          return;
        }
        if(keyword.charAt(keyword.length-1) ==';')
          console.log(keyword);*/
      },
      autoCompleteFilter (value, option) {
          return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      conditionChange(index,condition){
        this.filterCombination[index].condition = condition;
        this.setSearchCondition();
      },
      fieldChange(){
          // console.log('fieldChange');
          for(let i in this.fieldSelectors){
            if(this.fieldSelectors[i].value == this.fieldValue){
                /*
                this.containSelectors=[{ //Need to be initial value to make sure "No match data" hint will not be shown.
                    value: '',
                    label: '',
                    check: false,
                    number: ''
                }],*/
               //console.log('fieldChange his.fieldValue', this.fieldValue);
                //console.log('fieldChange this.containSelectors',this.containSelectors);
                this.containSelectors = this.fieldSelectors[i].containItems
                this.containValue='';
                this.$refs.containRef.setQuery(null);
                break;
            }
          }
      },
      containChange(){
        // console.log('containChange');
          if(this.containValue){
              this.$refs.containRef.toggleMenu();
              let filterCombinationFound =false;
              for(let j=0; j<this.filterCombination.length; j++){
                  if(this.filterCombination[j].field == this.fieldValue && this.filterCombination[j].contains == this.containValue){
                    filterCombinationFound = true;
                    //this.$Message.success({content:'repeated item', duration:1});
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
        /*
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
        */
      },
      keywordSearch(value){

        //console.log('this.keyword',this.keyword);
        //this.keyword = value;
      },
      submitSearch(){
        let temp = this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').value;
        if(temp && this.tagArray.length == 0){
          this.tadAdd(temp);
          this.$refs.searchRef.setQuery(null);
        }
        this.$router.push({name: 'archive', query: this.query});
        //this.$Message.success({content:'new result', duration:1});
      },
      pageChange(page){
          this.page = page-1;
          this.setFilter();
          this.$router.push({name: 'archive', query: this.query});
      },
      pageSizeChange(size){
          this.pageSize = size;
          this.setFilter();
          this.$router.push({name: 'archive', query: this.query});
      },
      sortChange(type){
        // console.log(type);
        if(type == 'Relevance')
          console.log('Relevance doesnt need a field');
        else if(type == 'Accession')
          this.sort = 'accession'
        else if(type == 'Submission Date')
          this.sort = 'submissionDate';
        else if(type == 'Publication Date')
          this.sort = 'publicationDate';
        else if(type == 'Number of Downloads')
          this.sort = 'downloadCount';
        else if(type == 'Avg Number of Downloads')
          this.sort = 'avgDownloadsPerFile';
       
        this.setFilter();
        this.$router.push({name: 'archive', query: this.query});
      },
      orderChange(type){
        this.order = type;
        this.setFilter();
        this.$router.push({name: 'archive', query: this.query});
      },
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
                    // console.log(query[i])
                    let filterArray = query[i].split(',');
                    // console.log('filterArray',filterArray);
                    this.filterCombination=[];
                      for(let i=0; i<filterArray.length;i++){
                          let facetsArray = filterArray[i].split('==')
                          let item={
                              condition:'And',
                              field: this.facetsConfigRes.body.archive[facetsArray[0]].name,     
                              contains:facetsArray[1]
                          };
                          // console.log('test',item)
                          this.filterCombination.push(item);
                          //this.tadAdd(keywordArray[i]);
                      }
                }
              }
              else if(i =='page'){
                this.currentPage = parseInt(query[i])+1;
                //console.log(this.currentPage );
              }
              else if(i =='pageSize'){
                  let tempPageSize = parseInt(query[i]);
                  if(tempPageSize == 10 || tempPageSize == 20 || tempPageSize == 30 || tempPageSize == 40)
                    this.pageSize = parseInt(query[i]);
                  else 
                    this.pageSize = 20;
              }
          }
          this.setFilter();
          //console.log();
        //this.normalQuery = {keyword:this.keyword, page:0, pageSize:20}
      },
      searchInputListener(){
          this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').addEventListener('keydown',(e)=>{
              if(e.keyCode == 13 || e.keyCode == 188){
                  e.preventDefault();
                  e.stopPropagation();
                  //this.searchInputChange(',');
              }
          });

          this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').addEventListener('keyup',(e)=>{
           // console.log('123');
           
              if(e.keyCode == 13 || e.keyCode == 188){
                  e.preventDefault();
                  e.stopPropagation();
                  if(e.target.value)
                    this.searchInputChange(e.target.value, true);
              }
          });
      },
      // queryFormatter(query){
      //     console.log('query',query);
      //     let queryTemp = '?';
      //     for(let i in query){
      //         if(query[i] && i == 'keyword'){
      //             queryTemp = queryTemp + i + '=='+query[i]
      //         }
      //         else if(query[i] && i == 'filter'){
      //           console.log('query[i]',query[i]);
      //         }
      //     }
      // },
      queryConfig(){
          this.$http
            .get(this.searchConfigURL)
            .then(function(facetsConfigRes){
                this.facetsConfigRes = facetsConfigRes;
                this.$http
                  .get(this.projectItemsConfigURL)
                  .then(function(projectItemsConfigRes){
                      this.projectItemsConfigRes = projectItemsConfigRes.body.projectItems;
                      //we do not put the setFilter function in here due to some logic issue. We need to do the updateCondition, after that, the filter could set based on the new conditions. Because, setfilter needs keywords for facet query in backend. Keywords will be updated after updateCondition.
                      this.updateCondition();
                      this.queryArchiveProjectList();
                  },function(err){

                  });
            },function(err){

            });
      },
      searchByLabel(filter){

        this.tagArray =[];
        this.setKeywords();
        this.filter = filter
       
        this.$router.push({name: 'archive', query: this.query});
        // console.log(this.query);
      },
      gotoPublish(){
        if(this.keyword.match(/PXD/))
          this.$router.push({name:'publish',params:{id:this.keyword}, query:{r:'other'}});
        else
          this.$Message.error({content:'Wrong Accession', duration:1});
      },
      generateIcons(){
          let query = ''
          for(let i=0; i<this.publicaitionList.length; i++){
              if(i+1 == this.publicaitionList.length)
                query+=this.publicaitionList[i].accession
              else  
                query+=this.publicaitionList[i].accession+'+OR+'
          }
          this.iconLoading = true
          this.$http
              .get(this.iconURL + query)
              .then(function(res){
                 this.iconLoading =false
                 let iconList = res.body.datasets
                 // console.log('resresres',res)
                 for(let i=0;i<iconList.length; i++){
                    // console.log('id',iconList[i].id)
                    for(let j=0;j<this.publicaitionList.length;j++){
                      
                      // console.log('this.publicaitionList[i].accession',this.publicaitionList[j].accession)
                      // console.log('iconList[i].id',iconList[i].id)
                      if(this.publicaitionList[j].accession == iconList[i].id){
                        // console.log('iconList[i]',iconList[i])
                        // console.log('this.publicaitionList[j]',this.publicaitionList[j])
                        this.publicaitionList[j].icon = iconList[i]

                        // if(this.publicaitionList[j].accession == 'PXD028666')
                        //   console.log('PXD028666',this.publicaitionList[j].icon)
                        break;
                      }
                    }
                 }
                 // console.log('XXXXX',this.publicaitionList)

                 // for(let i=0; i<this.publicaitionList.length; i++){
                 //  console.log('ididididid',this.publicaitionList[i].icon.id)
                 // }
                 // this.publicaitionList[i].icon = {
                 //        id: "E-GEOD-25401",
                 //        source: "arrayexpress-repository",
                 //        title:
                 //          "Adipose Tissue MicroRNAs as Regulators of CCL2 Production in Human Obesity [gene expression]",
                 //        description:
                 //          "We used an unbiased systems biology approach to study the regulation of gene expression in human adipose tissue focusing on inflammation. We show that microRNAs play a major role as regulators of CCL2 production in obesity. Abdominal subcutaneous adipose needle biopsies were obtained from women (n=56) with a wide variation in BMI. From the biopsies we prepared and hybridised biotinylated complementary RNA to GeneChip Human Gene 1.0 ST Arrays (Affymetrix Inc., Santa Clara, CA),  labelled RNA to Affymetrix miRNA arrays, and bisulphite converted DNA to Illumina Infinium HumanMethylation27 beadchips using standardised protocols (Affymetrix Inc., Illumina Inc.) . Subsequent analyses of gene expression was performed using the Affymetrix GeneChip Operating Software version 1.4. To allow comparisons of transcript levels between samples, all samples were subjected to an all-probeset scaling-to-target signal of 100.",
                 //        keywords: ["transcription profiling by array"],
                 //        organisms: [
                 //          {
                 //            acc: "9606",
                 //            name: "Homo sapiens"
                 //          }
                 //        ],
                 //        publicationDate: "20120812",
                 //        score: null,
                 //        omicsType: ["Genomics"],
                 //        citationsCount: 0,
                 //        connectionsCount: 2,
                 //        reanalysisCount: 0,
                 //        viewsCount: 8,
                 //        downloadCount: 15,
                 //        citationsCountScaled: 0,
                 //        connectionsCountScaled: 0.0000011610767593651,
                 //        reanalysisCountScaled: 0,
                 //        viewsCountScaled: 0.0024676125848241827,
                 //        downloadCountScaled: 0.00036681094563861783,
                 //        claimable: false
                 // },
              },function(err){
                this.iconLoading =false
              });
      },
      gotoIconHelpPage(){
        window.open('http://blog.omicsdi.org/post/rosette-chart/')
      },
      // datasetJSON(){
      //   this.loading = true
      //   this.$http
      //     .get(this.downLoadJSONApi)
      //     .then(function(res){
      //        this.loading = false
      //        // console.log('datasetJSON res',res)

      //         let a = document.createElement("a");
      //         let file = new Blob([JSON.stringify(res.body, null, 2)], {type: 'application/json'});
      //         a.href = URL.createObjectURL(file);
      //         a.download = 'Pride Dataset.json';
      //         a.click();
      //         document.body.removeChild(a);
      //     },function(err){
      //        this.loading = false
      //        this.$Message.error({content:'Download JSON Error', duration:3});
      //     });
      // }
      datasetJSON(){
        window.open(this.downLoadJSONApi)
      }
    },

    watch: {
      filterCombination: function (val) {
          //combine keyword (this.keyword) and filters together (val)
          //this.submitSearch();
      },

    },
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
          if(this.keyword)// if no keyword, in the normalQuery, we should not put the item 'keyword' inside, this is the backend search requirement
            normalQuery.keyword = this.keyword;

          if(this.filter)
            normalQuery.filter = this.filter;
          if(this.sort)
            normalQuery.sortFields = this.sort;
          if(this.order)
            normalQuery.sortDirection = this.order;
          normalQuery.page = this.page;
          normalQuery.pageSize = this.pageSize;
          // console.log('this.normalQuery',this.normalQuery);
          //return '?'+keyword+filter+page+pageSize;
          return normalQuery;
          
      }
    },
    mounted: function(){
      this.queryConfig();
      //this.updateCondition();//move into queryConfig function
      //this.queryArchiveProjectList();//move into queryConfig function
      //this.setFilter();//move into queryConfig function
      this.searchInputListener();
    },
    created(){
      
    },
    beforeDestroy(){
          
    },
    beforeRouteEnter(to,from,next){
      //console.log('from',from);
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
    .resource-item .project-info{
      font-weight: 400;
    }
    .resource-id{
      font-size: 14px;
      margin-right: 2px;
      color:#444;
    }
    .resource-id:hover{
      color:#5bc0be;
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
    /*
    .archive-search-input{
      margin-bottom: 10px;
    }*/
    .dropdown-action{
      width: 50px;
    }
    .separator{
      margin: 0 5px;
    }
    .sortOption{
      display: flex;
      margin-left: 5px;
    }
    .matched-items{
      color: #948d8d;
    }
    .readMore{
      display: inline;
    }
    .sort-wrapper{
      display:flex;
      align-items: center;
    }
    .sortOption .order-action{
      border-bottom:none;
      color:#444;
    }
    .sortOption .order-action:hover{
      color:#5bc0be;

    }
    .download-button{
      padding: 0 !important;
      font-size: 12px;
      font-weight: 700;
      background-color: #5bc0be;
      border-radius: 3px;
      color: #f8f8f8;
      display: inline-block;
      padding: 2px 0px;
      width: 110px;
      margin-right:10px;
      height:20px;
    }
    .download-button:hover{
      opacity: .8;
    }
</style>

<style>
    .page .ivu-select-dropdown-list{
      margin-left: 0 !important;
    }
    /*
    .archive-search-input input{
      border-radius: 3px !important;
      margin-bottom: 0 !important;
    }
    .archive-search-input input:focus{
      border:none !important;
      box-shadow: none !important;
    }
    .archive-search-input .ivu-select-dropdown{
      text-align: left;
    }*/
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
    .sortOption .ivu-select-dropdown{
      width:190px!important;
    }
    .sortOption.page .ivu-select-dropdown{
      width:130px!important;
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
    .resource-item .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header > i{
      margin-right: 0px !important;
    }
    .resource-item .ivu-collapse{
      border:none;
      background: none;
    }
    .resource-item .more-action{
      color: #444;
    }
    .resource-item .more-action:hover{
      color:#5bc0be;
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
    .sortOption.page .ivu-page-total{
      display: none;
    }
    .sortOption.page .ivu-page>li{
      display: none;
    }
    .sortOption.page .ivu-page{
      display: flex;
    }
    .sortOption.page .ivu-page-options-sizer{
      display: flex;
      align-items: center;
    }
    .sortOption.page .ivu-page-options{
      margin-left: 5px;
    }
    .archive-container .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      font-size: 12px;
    }
    .archive-container .ivu-select-single .ivu-select-selection .ivu-select-input{
      font-size: 12px;
      top: 0;
    }
</style>../../components/ChatPopup.vue
