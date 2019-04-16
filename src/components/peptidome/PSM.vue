<template>
  <div class="psm-container">
      <div class="panel nav"><NavBar page="landingpage"/></div>
      <div class="browse-data-container">
          <Row>
            <Card>
                <p slot="title">PSM Results</p>
                <div class="psm-search-container">
                <!--<Table class="peptide-table" :loading="loading" border :columns="columns5" :data="results" size="small" @on-row-click="rowClick"></Table>-->
                <Table class="psm-detail-table" :loading="loading" border :columns="peptidesCol" :data="results" size="small"></Table>
                </div>
                <div class="page-container">
                  <Page :total="total" :page-size="size" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
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
          queryPSMListApi:'https://www.ebi.ac.uk:443/pride/ws/cluster/cluster/'+this.$route.params.id+'/psm',
          q:'',
          peptide:'',
          modFilters:'',
          sequence:'',
          project:'',
          speciesFilters:'',
          sort:'',
          order:'desc',
          facets:false,
          highligts:false,
          page:0,
          size:20,
          total:0,
          loading: true,
          results: [],
          peptidesCol: [
                    {
                        title: 'Peptide',
                        key: 'peptide',
                        align:'center',
                        render: (h, params) => {
                            return h('div', [
                              h('a', {
                                on: {
                                    click: () => {
                                        
                                    }
                                }
                              }, params.row.peptide),
                            ]);
                        }
                    },
                    {
                        title: 'Project',
                        key: 'project',
                        sortable: false,
                        align:'center',
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
                        title: 'Assay',
                        key: 'assay',
                        sortable: false,
                        align:'center',
                        render: (h, params) => {
                            return h('div', [
                                 h('Tooltip',//first item
                                    {
                                        props: {
                                            content: 'Show assay details',
                                        },
                                    },//second item
                                    [
                                       h('a', {
                                            on: {
                                                click: () => {
                                                    this.$router.push({name:'assay',params:{id:params.row.assay}});
                                                }
                                            }
                                        }, params.row.assay),
                                    
                                    ]//third item
                                ),
                            ]);
                        }
                        
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
                        width:100
                        
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
                    {
                        title: 'Search engine score',
                        key: 'searchenginescore',
                        sortable: false,
                        align:'center',
                        ellipsis:true
                    },
                    {
                        title: 'Search database',
                        key: 'searchdatabase',
                        sortable: false,
                        align:'center',
                        minWidth: 150,
                    },
                    {
                        title: 'Delta m/z',
                        key: 'deltaMZ',
                        sortable: false,
                        align:'center',
                        width:100,
                        ellipsis:true
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
            .get(this.queryPSMListApi+this.query)
            .then(function(res){
                this.loading=false;
                this.total = res.body.totalResults;
                for(let i=0; i < res.body.psms.length; i++){
                  let tempdeltaMZ;
                  if((res.body.psms[i].deltaMZ).toFixed(2) == 0)
                    tempdeltaMZ = '0.00'
                  else
                    tempdeltaMZ = (res.body.psms[i].deltaMZ).toFixed(2)
                  var item = {
                      peptide:res.body.psms[i].sequence,
                      project: res.body.psms[i].projectAccession,
                      assay: res.body.psms[i].assayAccession,
                      species: res.body.psms[i].species,
                      tissue: res.body.psms[i].tissues,
                      instrument: res.body.psms[i].instruments,
                      searchengine: res.body.psms[i].searchEngine,
                      searchenginescore: res.body.psms[i].searchEngineScores,
                      searchdatabase: res.body.psms[i].searchDatabase,
                      deltaMZ: tempdeltaMZ

                      //(res.body.results[i].maxRatio*100).toFixed(1) + '%'
                  }
                  this.results.push(item);
                }
            },function(err){

            });
      },
      updateQuery(){
        this.sequence = this.$route.query.sequence || '';
        this.project = this.$route.query.project || '';
        console.log(this.query);
      }
    },
    computed:{
      query:function(){
          let sequence = this.sequence ? 'sequence='+this.sequence + '&' : '';
          let project = this.project ? 'project='+this.project + '&' : '';
          //let mod = 'mod=NONE'
          let mod='mod=NONE&';
          let page='page='+this.page+'&';
          let size='size='+this.size;
          return '?'+sequence+project+mod+page+size;
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
  .psm-container{
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
    .psm-detail-table table{
      margin-bottom: 0 !important;
    }

    .psm-detail-table a{
        color:#495060;
    }
    .psm-detail-table a:hover{
        color:#5bc0be;
        border-bottom-style:dotted;
    }
    .psm-detail-table .ivu-tooltip-inner{
        white-space:normal;
    }
</style>
