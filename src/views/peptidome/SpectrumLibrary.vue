<template>
    <div class="peptide-download-container">
        <div class="panel nav"><NavBar page="peptidome"/></div>
        <div class="jumbotron">
            <div class="container">
                <p class="head">Spectrum Libraries</p>
                <p class="text">These spectrum libraries are derived from the PRIDE Cluster results. They contain the consensus spectra of all reliable clusters generated from the public experiments in PRIDE Archive. Therefore, they also contain consensus spectra from labelled experiments as well as a wider array of species.</p>
                <p class="text">The PRIDE Cluster spectral libraries are available in NIST's MSP format, which is highly similar to SpectraST's sptxt format. Thereby, these spectral libaries can be read and processed by most spectral libary search tools.</p>
            </div>
        </div>
        <div class="album">
            <div class= "container">
                <Spin size="large" fix v-if="spinShow"></Spin>
                <div class="head">Latest Release (Release: {{releaseDate}}, Version: {{version}})</div>
                <transition-group tag="ul" name="slideIn" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter">
                   <Card v-for="item in spectrumLibraries" class="item" v-bind:key = "item.taxonomyId">
                        <p slot="title">{{item.speciesScientificName}}</p>
                        <div class="card-content">
                            <p>Common name: {{item.speciesName}}</p>
                            <p>Taxonomy: <a class="taxonomy-action" @click="goToUniprot(item.taxonomyId)" v-if="item.taxonomyId !='0'">{{item.taxonomyId}}</a><span v-else>Unknown</span></p>
                            <p>Number of spectra: {{item.numberOfSpectra}}</p>
                            <p>Number of peptides: {{item.numberOfPeptides}}</p>
                            <p>File Size: {{Math.round(item.fileSize/1024/1024)}}M</p>
                        </div>
                        <div class="button-wrapper">
                            <a v-for="downloadMethod in item.downloadURLs" :href="downloadMethod.url">{{downloadMethod.protocol}} Download</a>
                        </div>
                   </Card>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '@/components/Nav'
    export default {
        data () {
            return {
                spectrumLibraryApi: "https://www.ebi.ac.uk:443/pride/ws/cluster/spectrumLibrary/latest",
                spectrumLibraryJsonURL: this.$store.state.baseURL + '/spectrumLibrary/index.json',
                spinShow:true,
                value1: '',
                releaseDate:'',
                version:'',
                spectrumLibraries: [],
                tempFtp: 'https://ftp.pride.ebi.ac.uk/pub/databases/pride/resources/cluster'
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
            querySpectrumLibrary(){
                this.$http
                  // .get(this.spectrumLibraryApi)
                  .get(this.spectrumLibraryJsonURL)
                  .then(function(res){
                    // console.log('1111',res.body)
                    this.spinShow = false;
                    this.releaseDate = res.body.releaseDate;
                    this.version = res.body.version;
                    let temp = res.body.spectrumLibraries;
                    for(let i=0; i<temp.length; i++){
                        for(let j=0;j<temp[i].downloadURLs.length;j++){
                            if(temp[i].downloadURLs[j].protocol =='FTP'){
                                let tempName = temp[i].downloadURLs[j].url.split('cluster')[1]
                                temp[i].downloadURLs[j].url = this.tempFtp + tempName;
                            }
                        }
                    }
                    this.spectrumLibraries = temp
                  },function(err){

                  });
            },
            goToUniprot(id){
                window.open('http://www.uniprot.org/taxonomy/'+id);
            }
        },
        mounted: function(){
            this.querySpectrumLibrary();
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
        width: 95%;
        margin:0 auto;
         position: relative;
    }
    .album .container .head{
        font-size: 20px;
        margin: 0 15px;
        margin-bottom: 30px;
    }
     
    .card-content{
        height: 130px;
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
        width:150px;
        /*padding: 20px 85px;
        font-size: 24px;*/
        font-weight: 700;
        background-color: #5bc0be;
        border-radius: 3px;
        color:white;
        border-bottom-style:none;
    }
    .taxonomy-action{
        color:#444;
    }
    .taxonomy-action:hover{
        color:#5bc0be;
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
      .button-wrapper a{
            padding: 6px 1px;
            width:120px;
      }
    }
    @media (max-width: 1510px) and (min-width: 1016px){ 
      .item{ 
        width: calc((100% - 90px) / 3 - 1px);
      }
      .button-wrapper a{
            padding: 6px 0px;
            width:125px;
        }
    }
    @media (max-width: 1910px) and (min-width: 1511px){ 
      .item{ 
        width: calc((100% - 120px) / 4 - 1px);
      }
      .button-wrapper a{

        padding: 6px;
       
        width:130px;
      
        }
    }
    @media (min-width: 1911px){ 
      .item{ 
        width: calc((100% - 150px) / 5 - 1px);
      }
      .button-wrapper a{

        padding: 6px 8px;
       
        width:130px;
      
        }
    }
</style>