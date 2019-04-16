<template>
    <div class="peptide-download-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="jumbotron">
            <div class="container">
                <p class="head">Cluster Results Files</p>
                <p class="text">These cluster results files are derived from the <a>PRIDE Cluster results</a>. They classified the PRIDE Cluster results in different files that can be use by the community for different analyses and aims. For example the Unidentified clusters with at least 100 spectra can be use to look for new peptide identifications, variants, modifications that are difficult to identified with common search engine strategies; the Phospho clusters contains all reliable phosphorilated clusters. Other files can be found in the PRIDE Cluster <a>FTP</a>.</p>
            </div>
        </div>
        <div class="album">
            <div class= "container">
                <Spin size="large" fix v-if="spinShow"></Spin>
                <div class="head">Latest Release (Release: {{releaseDate}}, Version: {{version}})</div>
                <transition-group tag="ul" name="slideIn" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter">
                   <Card v-for="(item,index) in resultFiles" class="item" v-bind:key = "index">
                        <p slot="title">{{item.name}}</p>
                        <div class="card-content">
                            <p>{{item.description}}</p>
                        </div>
                       <div class="button-wrapper">
                            <a v-for="downloadMethod in item.downloadURLs" :href="downloadMethod.url">{{downloadMethod.type}} Download</a>
                        </div>
                        
                   </Card>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '@/components/ebi/Nav'
    export default {
        data () {
            return {
                clusterLatestApi:"https://www.ebi.ac.uk:443/pride/ws/cluster/result/latest",
                spinShow:true,
                value1: '',
                releaseDate:'',
                version:'',
                resultFiles: []
            }
        },
        components: {
          NavBar
        },
        methods: {
            beforeEnter:function(el){
              el.style['transition-delay'] = el.style['-webkit-transition-delay'] = (this._transIndex++/20)+'s';
            },
            afterEnter:function(el){
              el.removeAttribute('style');
            },
            queryClusterLatest(){
                this.$http
                  .get(this.clusterLatestApi)
                  .then(function(res){
                    console.log(res);
                    this.spinShow = false;
                    this.releaseDate = res.body.releaseDate;
                    this.version = res.body.version;
                    this.resultFiles = res.body.resultFiles;
                  },function(err){

                  });
            }
        },
        mounted: function(){
            this.queryClusterLatest();
        },
    }
</script>
<style scoped>
    .jumbotron{
        text-align: center;
    }
    .jumbotron .container{
        margin: 0 auto;
        padding: 100px 50px;
        max-width: 1000px;

    }
    .jumbotron .head{
        font-size: 35px;
        font-weight: 200px;
        margin-bottom: 50px;
    }
    .jumbotron .text{
        font-size: 14px;
    }
    .item{
        display: inline-block;
        margin: 0 15px;
        margin-bottom: 30px;
        overflow: hidden;
        transition: all 0.15s ease-out;
        -webkit-transition: all 0.15s ease-out;
    }
    .album{
        padding-top: 60px;
        padding-bottom: 30px;
        background-color:#f8f9fa!important;
        
    }
    .album .container{
        width: 90%;
        margin:0 auto;
        position: relative;
    }
    .album .container .head{
        font-size: 20px;
        margin: 0 15px;
        margin-bottom: 30px;
    }
     
    .card-content{
        height: 80px;
        display: flex;
        flex-direction:column;
    }
    .button-wrapper{
        display: flex;
         margin: 5px auto 0 auto; 
         text-align: center;
         justify-content:space-around;
    }
    .button-wrapper a{

        padding: 6px 8px;
        font-size: 12px;
        width:120px;
        /*padding: 20px 85px;
        font-size: 24px;*/
        font-weight: 700;
        background-color: #5bc0be;
        border-radius: 3px;
        color:white;
        border-bottom-style:none;
    }
    @media (max-width: 700px) { 
      .item{ 
        width: calc((100% - 0px) / 1 - 1px);
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }
    @media (max-width: 1015px) and (min-width: 701px){ 
      .item{ 
        width: calc((100% - 60px) / 2 - 1px);
      }
    }
    @media (max-width: 1510px) and (min-width: 1016px){ 
      .item{ 
        width: calc((100% - 90px) / 3 - 1px);
      }
      .button-wrapper a{

            padding: 6px 6px;
            font-size: 12px;
            width:110px;

        }
    }
    @media (max-width: 1910px) and (min-width: 1511px){ 
      .item{ 
        width: calc((100% - 120px) / 4 - 1px);
      }
    }
    @media (min-width: 1911px){ 
      .item{ 
        width: calc((100% - 150px) / 5 - 1px);
      }
    }
</style>