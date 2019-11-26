<template>
  <div class="annotate-container">
      <div class="panel nav"><NavBar/></div>
      <div class="browse-data-container">
          <Row>
              <div class="title">
                  Welcome to Pride Annotation System
              </div>
              <div class="step-wrapper">
                  <Steps :current="annotationStep">
                      <Step title="Search" content="Find your project to annotate"></Step>
                      <Step title="Check" content="Confirm your project information"></Step>
                      <Step title="Sample" content="Give the number of samples"></Step>
                      <Step title="Annotate" content="Add the raw file"></Step>
                  </Steps>
              </div>
          </Row>
          <div v-if="annotationStep == 3" class="stepFour">
              <!--<Spin size="large" fix v-if="loading"></Spin>-->
              <Row>
                <selfTable class="sample-class-table"></selfTable>
                <div class="button-wrapper">
                    <div class="search-button">
                        <a class="button search-button" @click="back">Back</a>
                    </div>
                    <div class="annotation-page">
                      <Page :total="total" :page-size="pageSize" size="small" show-total @on-change="pageChange"></Page>
                    </div>
                    <div class="search-button right">
                        <a class="button search-button" @click="annotationSave">Save</a>
                        <a class="button search-button" @click="annotationConfirm">Confirm</a>
                    </div>
                </div>
              </Row>
          </div>
      </div>
  </div>
</template>

<script>
  import NavBar from '@/components/ebi/Nav'
  import store from "@/store/store.js"
  import selfTable from './table.vue'
  var paramsFromLandingPage='';
  export default {
    name: 'annotate',
    data(){
      return {
            annotationStep:3,
            title:'',
            keyword:'',
            loading:true,
            total:0,
            pageSize:100
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      console.log('to.params',to.params);
      console.log('beforeRouteUpdate',to.query);
      //this.$bus.$emit('submit-search', {params: to.params, query: to.query});
      next();
    },
    components: {
      NavBar,
      selfTable
    },
    methods:{
      back(){
        let projectAccession = localStorage.getItem("projectAccession")
        if(projectAccession){
            this.$Modal.confirm({
                title: 'Uncompleted Annotaion',
                content: '<p>Do you want to delete the uncompleted annotation?</p>',
                onOk: () => {
                    console.log('ok');
                    localStorage.clear();
                    this.$router.push({path:'/annotation/'+this.$route.params.id+'/sample'});
                    
                },
                onCancel: () => {
                   
                }
            });
        }
        else
          this.$router.push({path:'/annotation/'+this.$route.params.id+'/sample'});
      },
      pageChange(page){
        console.log(page)
        this.$bus.$emit('annotation-page',{page:page,pageSize:this.pageSize});
      },
      annotationConfirm(){
          this.$Modal.confirm({
              title: 'Finish Annotation',
              content: '<p>Do you want to submit this annotation?</p>',
              onOk: () => {
                  this.$bus.$emit('annotation-confirm');
              },
              onCancel: () => {
                  
              }
          });
      },
      annotationSave(){
          this.$bus.$emit('annotation-save');
      },
      localStorageCheck(){
          var tempProjectAccession = localStorage.getItem("tempProjectAccession");
          if(tempProjectAccession &&  tempProjectAccession!= this.$route.params.id){
            this.$Message.error({content:'Wrong Project Accession', duration:1});
            this.$router.push({path:'/annotation'});
          }

          let sampleNumber = +localStorage.getItem("samplesNum")
          let fractionNumber = +localStorage.getItem("fractionsNum")
          this.total = sampleNumber * fractionNumber;
      },
    },
    watch: {

    },
    computed:{
  
    },
    mounted: function(){
      this.localStorageCheck();
      //this.queryConfig();
      //this.updateCondition();//move into queryConfig function
      //this.queryArchiveProjectList();//move into queryConfig function
      //this.setFilter();//move into queryConfig function
      //this.searchInputListener();
    },
    created(){
      
    },
    beforeDestroy(){
          
    },
    beforeRouteEnter(to,from,next){
      //console.log('from',from);
      if(from.name == 'landingpage' && from.params.keyword)
        paramsFromLandingPage = from.params.keyword;
      next(vm=>{
        let username = localStorage.getItem('username') || '';
        if(!username){
          vm.$Message.error({content:'Please Login', duration:2})
          vm.$router.push({name:'annotation'})
        }
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .annotate-container{
    width: 100%;
  }
  .title{
    font-size: 35px;
    color: #454548;
    margin-bottom: 50px;
  }
  .step-wrapper{
    margin-bottom: 50px;
  }
  .button-wrapper{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .button-wrapper .search-button{
    width: 70px;
  }
  .button-wrapper .search-button.right{
    width: auto;
  }
  .browse-data-container{
    width: 80%;
    margin:0 auto;
    padding: 90px 0;
  }
  .input-number{
    width: 60px;
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
  .modal-column-name{
    font-size: 14px;
    color: #5bc0be;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .new-column-checkbox{
        display: flex;
        flex-direction: column;
  }
  .checkbox-item-wrapper{
    display: flex;
  }
  .sample-class-table{
    margin-bottom: 20px;
  }
  
</style>
<style > 
  .annotation-page a{
    text-decoration:none !important;
    border-bottom-style:none !important;
  }
</style>
