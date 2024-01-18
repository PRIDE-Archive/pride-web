<template>
  <div class="psm-container">
      <div class="panel nav"><NavBar page="landingpage"/></div>
      <div class="browse-data-container">
          <Row>
            <Card class="card">
                <p slot="title" class="table-header" style="display:flex;justify-content: space-between;">
                    <span>Project Details</span>
                    <span v-if="true" class="right">
                        <a v-if="xiviewDataTableFoldBool" href="javascript:void(0)"><Icon type="md-arrow-dropright" size="20" @click="xiviewDataTableFold(false)"></Icon></a>
                        <a v-else href="javascript:void(0)"><Icon type="md-arrow-dropdown" size="20" @click="xiviewDataTableFold(true)"></Icon></a>
                    </span>
                </p>
                <template v-if="true">
                    <div class="card-item-wrapper">
                        <div class="summary-content-header">Project ID</div>
                        <p>{{accession}}</p>
                    </div>
                    <div class="card-item-wrapper">
                        <div class="summary-content-header" style="margin-top: 30px">Title</div>
                        <p>{{title}}</p>
                    </div>
                    <div class="card-item-wrapper" style="margin-top: 30px">
                        <div class="summary-content-header">Description: </div>
                      <read-more class="readMore" more-str="Read more" :text="description" link="#" less-str="Read less" :max-chars="400"></read-more>
                    </div>
                    <div class="card-item-wrapper">
                        <div class="summary-content-header" style="margin-top: 30px">Organism</div>
                        <p>{{organism}}</p>
                    </div>
                    <div class="card-item-wrapper" style="margin-top: 30px">
                        <div class="summary-content-header">Protein Details</div>
                    </div>
                    <div class="card-item-wrapper">
                      <Table row-key="id" class="xiview-table xiview-table-disabled" :loading="proteinTableLoading" border :columns="xiviewDetailTableCol" :data="xiviewDetailTableData" size="small"></Table>
                    </div>
                    <div style="color:#bdbdbd; text-align: center;">
                          <span v-if ="xiviewDataTableFoldBool">{{xiviewDataTableHint}}</span>
                    </div>
                    <div class="page-container" v-if = "!xiviewDataTableFoldBool">
                        <Page :total="totalProtein" :page-size="pageSizeProtein" :current="pageProtein" size="small" show-sizer show-total @on-change="proteinPageChange" @on-page-size-change="proteinPageSizeChange"></Page>
                    </div>
                </template>
                <template v-else>  
                  <!-- <div style="text-align: center;"> -->
                    <Spin size="small" style="display: flex; justify-content: center;" ></Spin>
                  <!-- </div> -->
                </template>     
            </Card>
          </Row>
      </div>
  </div>
</template>

<script>
  import NavBar from '@/components/Nav'
  export default {
    name: 'archive',
    data(){
      return {
         xiviewDataTableFoldBool:false,
         accession: '',
         title: '',
         description:'',
         organism:'',
         xiviewDetailTableCol:[
              {
                  type: 'index',
                  width: 60,
                  align: 'center'
              },
              {
                  title: 'Accession',
                  key: 'accession',
                  width: 150,
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'Protein Name',
                  key: 'protein_name',
                  width: 400,
                  sortable: false,
                  align:'left'
              },
              {
                  title: 'Gene Name',
                  key: 'gene_name',
                  sortable: true,
                  align:'left'
              },
              {
                  title: 'Peptides',
                  key: 'peptides',
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'Crosslinked peptides',
                  key: 'crosslink',
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'PDB',
                  key: 'pdb',
                  width: 100,
                  sortable: false,
                  align:'center',
                  render: (h, params) => {
                      return h('div', [
                          h('Button', {
                              props: {
                                  type: 'primary',
                                  size: 'small',
                                  disabled: params.row.pdbDisabled
                              },
                              attrs: { id: params.row.pdbDisabled ? 'disableButton':''},
                              style: {
                                  display:'inline-block',
                                  marginRight: '5px',
                                  paddingLeft: '22px',
                                  paddingRight: '22px'
                              },
                              on: {
                                  click: (value) => {
                                      // console.log(value)
                                      // console.log(params.row.link);
                                      //window.location.href = params.row.url.ftp;
                                      window.open(params.row.pdb)
                                     
                                      //this.gotoEuroPMC(params);
                                  }
                              }
                          }, 'PDB'),
                      ]);
                  },
              },
              {
                  title: 'AlphaFoldDB',
                  key: 'alphafolddb',
                  width: 170,
                  sortable: false,
                  align:'center',
                  render: (h, params) => {
                      return h('div', [
                          h('Button', {
                              props: {
                                  type: 'primary',
                                  size: 'small',
                                  disabled: params.row.alphafolddbDisabled
                              },
                              attrs: { id: params.row.alphafolddbDisabled ? 'disableButton':''},
                              style: {
                                  display:'inline-block',
                                  marginRight: '5px',
                                  paddingLeft: '22px',
                                  paddingRight: '22px'
                              },
                              on: {
                                  click: (value) => {
                                      // console.log(value)
                                      // console.log(params.row.link);
                                      //window.location.href = params.row.url.ftp;
                                      window.open(params.row.alphafolddb)
                                     
                                      //this.gotoEuroPMC(params);
                                  }
                              }
                          }, 'AlphaFoldDB'),
                      ]);
                  },
              },
         ],
         xiviewDetailTableData:[],
         pageSizeProtein: 20,
         pageProtein:1,
         totalProtein: 0,
         xiviewDataTableHint:'xiVIEW Data Details',
         proteinTableLoading:false,
      }
    },
    components: {
      NavBar
    },
    methods:{
      queryXiviewDataDetails(id){
          this.xiviewDataTableFold(true)
          this.initXiviewDataTable()
          this.$http
            .get(this.queryXiviewDataDetailApi + id)
            .then(function(res){
              this.xiviewDataTableFold(false)
              let body = res.body[0]
              console.log('queryXiviewDataDetails',body)
              this.accession = body.project_id
              this.title = body.title
              this.description = body.description
              this.organism = body.organism ? body.organism : 'Null'
              this.totalProtein = body.project_sub_details.length
              // console.log('body.project_sub_details.length',body.project_sub_details.length)
              for(let i=0; i<body.project_sub_details.length; i++){
                  let item = {
                    accession: body.project_sub_details[i].protein_accession,
                    protein_name: body.project_sub_details[i].protein_name,
                    gene_name: body.project_sub_details[i].gene_name,
                    peptides: body.project_sub_details[i].number_of_peptides,
                    crosslink: body.project_sub_details[i].number_of_cross_links,
                    pdbDisabled: !body.project_sub_details[i].in_pdbe_kb, 
                    pdb: body.project_sub_details[i].link_to_pdbe ? body.project_sub_details[i].link_to_pdbe : ' https://www.ebi.ac.uk/pdbe/pdbe-kb/proteins/'+ body.project_sub_details[i].protein_accession, //pdbe is self-defined property
                    alphafolddbDisabled: !body.project_sub_details[i].in_alpha_fold_db,
                    alphafolddb: body.project_sub_details[i].link_to_alphafolddb ? body.project_sub_details[i].link_to_alphafolddb : 'https://alphafold.ebi.ac.uk/entry/'+ body.project_sub_details[i].protein_accession,

                  }
                  this.proteinTableData.push(item)//save for original data
                  this.xiviewDetailTableData.push(item);//only used for showup
              }
              //for first pagination when table is loaded
              if(this.totalProtein > this.pageSizeProtein)
                this.xiviewDetailTableData = this.proteinTableData.slice((this.pageProtein-1)*this.pageSizeProtein, (this.pageProtein-1)*this.pageSizeProtein + this.pageSizeProtein)

            },function(err){
               this.xiviewDataTableFold(true)
            });
      },
      xiviewTableFold(val){
          this.xiviewTableFoldBool = val
          if(this.xiviewTableFoldBool){
            if(document.querySelector('.xiview-table'))
              document.querySelector('.xiview-table').style.display = 'none'
            if(document.querySelector('.page-container'))
              document.querySelector('.page-container').style.display = 'none'
          }
          else{
            if(document.querySelector('.xiview-table'))
              document.querySelector('.xiview-table').style.display = 'block'
            if(document.querySelector('.page-container'))
              document.querySelector('.page-container').style.display = 'block'
          } 
      },
      xiviewDataTableFold(val){
          this.xiviewDataTableFoldBool = val
          let divs = document.querySelectorAll('.card-item-wrapper')
          if(this.xiviewDataTableFoldBool){
              divs.forEach(div=>{
                 div.style.display = 'none'
              })
          }
          else{
              divs.forEach(div=>{
                 div.style.display = 'block'
              })
          } 
      },
      proteinPageChange(page){
          console.log('proteinPageChange')
          this.proteinTableLoading = true
          this.pageProtein = page;
          this.xiviewDetailTableData = this.proteinTableData.slice((this.pageProtein-1)*this.pageSizeProtein, (this.pageProtein-1)*this.pageSizeProtein + this.pageSizeProtein)
          setTimeout(()=>{
            this.proteinTableLoading = false
          },500)
      },  
      proteinPageSizeChange(size){
          console.log('proteinPageSizeChange')
          this.proteinTableLoading = true
          this.pageSizeProtein = size;
          this.xiviewDetailTableData = this.proteinTableData.slice((this.pageProtein-1)*this.pageSizeProtein, (this.pageProtein-1)*this.pageSizeProtein + this.pageSizeProtein)
          setTimeout(()=>{
            this.proteinTableLoading = false
          },500)
      },
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
