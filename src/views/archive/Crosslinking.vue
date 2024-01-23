<template>
  <div class="crosslinking-container">
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
         queryXiviewDataDetailApi: 'https://www.ebi.ac.uk/pride/archive/xiview/ws/projects/',
         preteinKeyword:'',
         xiviewDataTableFoldBool:false,
         accession: '',
         title: '',
         description:'',
         organism:'',
         xiviewDetailTableCol:[
              // {
              //     type: 'index',
              //     width: 70,
              //     align: 'center'
              // },
              {
                  title: 'Accession',
                  key: 'accession',
                  width: 120,
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'Protein Name',
                  key: 'protein_name',
                  sortable: false,
                  align:'left'
              },
              {
                  title: 'Gene Name',
                  key: 'gene_name',
                  width: 130,
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'Peptides',
                  key: 'peptides',
                  width: 130,
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'Crosslinked peptides',
                  key: 'crosslink',
                  width: 180,
                  sortable: true,
                  align:'center'
              },
              {
                  title: 'PDB',
                  key: 'pdb',
                  width: 130,
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
                  width: 200,
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
          this.proteinTableLoading = true
          if(id)
            this.query.query=id
          this.$http
            .get(this.queryXiviewDataDetailApi + id)
            .then(function(res){
              this.xiviewDataTableFold(false)
              this.proteinTableLoading = false
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
               this.proteinTableLoading = false
               this.xiviewDataTableFold(true)
            });
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
      initXiviewDataTable(){
        this.accession = '' 
        this.title = ''
        this.description = ''
        this.proteinTableData = []
        this.totalProtein = 0
        this.pageSizeProtein = 20
        this.pageProtein = 1
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
    },
    computed:{
      query:function(){
          let normalQuery = {}
          normalQuery.query = this.preteinKeyword;
          normalQuery.page = this.pageProtein;
          normalQuery.pageSize = this.pageSizeProtein;
          return normalQuery;  
        }
    },
    mounted: function(){
       this.queryXiviewDataDetails(this.$route.params.id)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .card{
    width: 100%
  }
  .card a{
      color: #495060;
      border-bottom-style: none;
  }
  .card a:hover{
    color: #5bc0be;
  }
  .card-item-wrapper{
    margin-bottom: 10px;
  }
  .crosslinking-container{
    width: 100%;
   
  }
  .browse-data-container{
    width: 90%;
    margin:0 auto;
    padding: 90px 0;
  }
  .page-container{
    text-align: center;
    margin-top: 20px;
  }
  .summary-content-header{
    font-size: 14px;
    color: #5bc0be;
    font-weight: 700;
  }
</style>

<style>
.xiview-table table{
  margin-bottom: 0 !important;
}
</style>
