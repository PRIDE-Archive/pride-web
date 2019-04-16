<template>
  <div class="projects-container">
      <div class="panel nav"><NavBar page="landingpage"/></div>
      <div class="browse-data-container">
          <Row>
            <Card>
                <p slot="title">Projects Results</p>
                <div class="projects-search-container">
                <!--<Table class="peptide-table" :loading="loading" border :columns="columns5" :data="results" size="small" @on-row-click="rowClick"></Table>-->
                <Table class="projects-detail-table" :loading="loading" border :columns="peptidesCol" :data="results" size="small"></Table>
                </div>
                <!--
                <div class="page-container">
                  <Page :total="total" :page-size="size" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </div>
                -->
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
          queryClusterProjectsListApi:'https://www.ebi.ac.uk:443/pride/ws/cluster/cluster/'+this.$route.params.id+'/project',
          q:'',
          peptide:'',
          modFilters:'',
          sequence:'',
          speciesFilters:'',
          //sort:'',
          //order:'desc',
          facets:false,
          highligts:false,
          //page:0,
          //size:20,
          //total:0,
          loading: true,
          results: [],
          peptidesCol: [
                    {
                        title: 'Project',
                        key: 'project',
                        sortable: false,
                        align:'center',
                        width:130,
                        render: (h, params) => {
                            return h('div', [
                                 h('Tooltip',//first item
                                    {
                                        props: {
                                            content: 'Show projects details',
                                        },
                                    },//second item
                                    [
                                       h('a', {
                                            on: {
                                                click: () => {
                                                    this.$router.push({name:'dataset',  params: { id: params.row.project}});
                                                }
                                            }
                                        }, params.row.project),
                                    
                                    ]//third item
                                ),
                            ]);
                        }
                    },
                    {
                        title: 'Title',
                        key: 'title',
                        sortable: false,
                        align:'center',
                        maxWidth:550
                       
                    },
                    {
                        title: 'Species',
                        key: 'species',
                        sortable: false,
                        align:'center',
                       
                    },
                    {
                        title: 'Tissue',
                        key: 'tissue',
                        sortable: false,
                        align:'center',
                        maxWidth:200
                        
                    },
                    {
                        title: 'Disease',
                        key: 'disease',
                        sortable: false,
                        align:'center',
                        width:150
                       
                    },
                    {
                        title: 'Instrument',
                        key: 'instrument',
                        sortable: false,
                        align:'center',
                       
                    },
                    {
                        title: 'Search engine',
                        key: 'searchengine',
                        sortable: false,
                        align:'center',
                        
                    }, 
          ],
      }
    },
    components: {
      NavBar
    },
    methods:{
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
            .get(this.queryClusterProjectsListApi+this.query)
            .then(function(res){
              
                this.loading=false;
                //this.total = res.body.totalResults;
                for(let i=0; i < res.body.clusteredProjects.length; i++){
                  //for species
                  let speciesTemp = '';
                  for(let j=0; j< res.body.clusteredProjects[i].species.length; j++){
                    if(j == 0){
                      speciesTemp = res.body.clusteredProjects[i].species[j];
                    }
                    else
                      speciesTemp += '; '+res.body.clusteredProjects[i].species[j];
                  }
                 
                  //for tissues
                  let tissuesTemp;
                  for(let j=0; j< res.body.clusteredProjects[i].tissues.length; j++){
                    if(j == 0)
                      tissuesTemp = res.body.clusteredProjects[i].tissues[j]
                    else
                      tissuesTemp += '; '+res.body.clusteredProjects[i].tissues[j];
                  }
                  //for diseases
                  let diseasesTemp;
                  for(let j=0; j< res.body.clusteredProjects[i].diseases.length; j++){
                    if(j == 0)
                      diseasesTemp = res.body.clusteredProjects[i].diseases[j]
                    else
                      diseasesTemp += '; '+res.body.clusteredProjects[i].diseases[j];
                  }
                  //for instrument
                  let instrumentTemp;
                  for(let j=0; j< res.body.clusteredProjects[i].instruments.length; j++){
                    if(j == 0)
                      instrumentTemp = res.body.clusteredProjects[i].instruments[j]
                    else
                      instrumentTemp += '; '+res.body.clusteredProjects[i].instruments[j];
                  }
                  //for searchEngines
                  let searchEnginesTemp;
                  for(let j=0; j< res.body.clusteredProjects[i].searchEngines.length; j++){
                    if(j == 0)
                      searchEnginesTemp = res.body.clusteredProjects[i].searchEngines[j]
                    else
                      searchEnginesTemp += '; '+res.body.clusteredProjects[i].searchEngines[j];
                  }

                  var item = {
                      project: res.body.clusteredProjects[i].accession,
                      title: res.body.clusteredProjects[i].title,
                      species: speciesTemp,
                      tissue: tissuesTemp,
                      disease: diseasesTemp,
                      instrument: instrumentTemp,
                      searchengine: searchEnginesTemp

                      //(res.body.results[i].maxRatio*100).toFixed(1) + '%'
                  }
                  this.results.push(item);
                }
            },function(err){

            });
      },
      updateQuery(){
        this.sequence = this.$route.query.sequence;
      }
    },
    computed:{
      query:function(){
          let sequence = 'sequence='+this.sequence + '&';
          //let mod = 'mod=NONE'
          let mod='mod=NONE&';
          //let page='page='+this.page+'&';
          //let size='size='+this.size;
          return '?'+sequence+mod;
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
  .projects-container{
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

    .page-container{
      margin-top: 20px;
    }

</style>

<style>
    .projects-detail-table table{
      margin-bottom: 0 !important;
    }

    .projects-detail-table a{
        color:#495060;
    }
    .projects-detail-table a:hover{
        color:#5bc0be;
        border-bottom-style:dotted;
    }
    .projects-detail-table .ivu-tooltip-inner{
        white-space:normal;
    }
</style>
