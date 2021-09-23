<template>
  <div class="notFound-container">
    <div class="panel nav"><NavBar page="peptidome"/></div>
    <div class="search-container">
        <div class="normal-search-wrapper">
            <Input id="search-bar-pride" v-model="keyword" placeholder="search" size="large" @on-keyup.enter.prevent="submitSearchCondition">
<!--                <Select v-model="selected" slot="prepend" style="width: 100px">-->
<!--                    &lt;!&ndash; <Option value="archive">Archive</Option> &ndash;&gt;-->
<!--                    <Option value="peptidesearch">Search </Option>-->
<!--                </Select>-->
                <Button slot="append" @click="submitSearchCondition">Search</Button>
            </Input>
        </div>
        <div class="search-settings">
            <div class="example-wrapper">
                <a class="example-item" v-for="item in searchExample" v-bind:key = "item" @click="setSearchKeyword(item)">{{item}}></a>
            </div>
        </div>
    </div>
    <div class="plot-container">
        <Row class="row">
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 12}">
                <div class="item-container">
                    <div class="item-title">Peptide and Unique Peptide Comparison</div>
                    <div class="item">
                          <Spin fix v-if="chartShow"></Spin>
                          <BarPeptide></BarPeptide>
                          <!-- <a class="static-more-button" @click="gotoStaticDetails">More</a> -->
                    </div>
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 12}">
                <div class="item-container">
                    <div class="item-title">Organism Data</div>
                    <div class="item">
                          <Spin fix v-if="chartShow"></Spin>
                          <PiePeptide></PiePeptide>
                          <!-- <a class="static-more-button" @click="gotoStaticDetails">More</a> -->
                    </div>
                </div>
            </Col>
            <!-- <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 8}">
                <div class="item-container">
                    <div class="item">
                          <Spin fix v-if="chartShow"></Spin>
                          <BarUniquePeptides></BarUniquePeptides>

                    </div>
                </div>
            </Col> -->
        </Row>
    </div>
    <div class="carousel-container">
        <Carousel v-model="value1" loop>
            <CarouselItem>
                <!--<span class="info"><i class="fas fa-info"></i> aaa  aa aa a a a  aaaaaa</span>-->
                <div class="demo-carousel"><img :src="image1URL" height="443" width="1235"></div>
            </CarouselItem>
            <CarouselItem>
                <!--<span class="info"><i class="fas fa-info"></i> aaa  aa aa a a a  aaaaaa</span>-->
                <div class="demo-carousel"><img :src="image2URL" height="443" width="1235"></div>
            </CarouselItem>
            <CarouselItem>
                <!--<span class="info"><i class="fas fa-info"></i> aaa  aa aa a a a  aaaaaa</span>-->
                <div class="demo-carousel"><img :src="image3URL" height="443" width="1235"></div>
            </CarouselItem>
        </Carousel>
    </div>
    <div class = "content">
        <Row class="row" type="flex">
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><i class="fas fa-link"></i></div>
                    <div class="item-title">
                      <div>Search Peptide</div>
                    </div>
                    <div class="item-content">
                        <p>Discover original mass spec projects used by PRIDE Peptidome project in the submission based <a @click="gotoArchive">PRIDE Archive</a>.</p>

                        <p>Explore all the mass spectra available in PRIDE in PRIDE Spectra Archive <a @click="gotoProteomes">PRIDE Spectra Archive</a>.</p>
                    </div>
                   
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><i class="fab fa-envira"></i></div>
                    <div class="item-title">
                      <div>Source Code</div>
                    </div>
                    <div class="item-content docs">
                        <p>The library used to developed PRIDE peptidome is called sparkMS. The library use Pyspark to group millions of PSMs at peptide + protein level.
                          You can contribute to our development on <a @click="gotoGithub">SparkMS in BigBio</a></p>
                    </div>
                    
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><i class="fas fa-question"></i></div>
                    <div class="item-title">
                      <div>Access</div>
                    </div>
                    <div class="item-content tweet">
                        <p>Learn how we generate Pride Peptidome <a @click="gotoFaq">high quality</a> peptides</p>

                        <p>Find out how to <a @click="gotoUnderstandCluster">interpret</a> peptidome results</p>

                        <p>Or ask for help directly though our <a @click="gotoFeedbacks">Feedback</a> page.</p>
                    </div>
                   
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><i class="fas fa-eye"></i></div>
                    <div class="item-title">
                      <div>Release Note</div>
                    </div>
                    <div class="item-content citation">
                        <p>If you use PRIDE Peptidome, please cite the following paper:</p>
                        <p>Griss J, Perez-Riverol Y, et. al. Recognizing millions of consistently unidentified spectra across hundreds of shotgun proteomics datasets. Nat Methods. 2016 Aug;13(8):651-656. <a @click="gotoPubmed">PubMed</a></p>
                    </div>
                    
                </div>
            </Col>
        </Row>
    </div>
  </div>
</template>
<script>
  import NavBar from '@/components/Nav'
  import store from "@/store.js"
  import BarPeptide from '@/components/chart/BarPeptide.vue'
  import PiePeptide from '@/components/chart/PiePeptide.vue'
  export default {
    name: 'notfound',
    components: {
      NavBar,
      BarPeptide,
      PiePeptide
    },
    data(){
      return {
        keyword:'',
        selected:'peptidesearch',
        searchExample:['TNEEAGDGTTTATVLAR','P10809', 'H2BC3'],
        msg: '',
        value1: 0,
        image1URL: this.$store.state.baseURL + '/peptidome/tutorial-1.png',
        image2URL: this.$store.state.baseURL + '/peptidome/tutorial-2.png',
        image3URL: this.$store.state.baseURL + '/peptidome/tutorial-3.png',
        // barPeptideSimpleShow:false,
        chartShow:true,
        chartDataApi: this.$store.state.baseApiURL + '/stats/peptidome-stats',
      }
    },
    methods:{
        gotoPeptideSearch(query){
            if(typeof query == 'string'){
                this.$router.push({name:'peptidesearch',query:{q:query}});
            }
            else
                this.$router.push({name:'peptidesearch'});
        },
        gotoSpectrumLibrary(){
            this.$router.push({name:'spectrumlibrary'});
        },
        gotoPeptideDownload(){
            this.$router.push({name:'peptidedownload'});
        },
        gotoPeptideAPI(){
           this.$router.push({path:'/markdownpage/peptideAPI'});
        },
        gotoFTP(){
            window.open('ftp://ftp.pride.ebi.ac.uk/pride/data/cluster');
        },
        gotoFeedbacks(){
            window.open('https://www.ebi.ac.uk/support/index.php?query=pride');
        },
        gotoArchive(){
            //this.$Message.success({content:'Archive Coming Soon', duration:1});
            this.$router.push({name:'archive'});
        },
        gotoProteomes(){
            window.open('https://www.ebi.ac.uk/pride/archive/spectra');
        },
        gotoGithub(){
            window.open('https://github.com/bigbio/sparkMS');
        },
        gotoAlgorithms(){
            window.open('https://github.com/spectra-cluster');
        },
        gotoWeb(){
            window.open('https://github.com/PRIDE-Cluster');
        },
        gotoPubmed(){
            window.open('http://www.ncbi.nlm.nih.gov/pubmed/27493588');
        },
        gotoFaq(){
            this.$router.push({path:'/markdownpage/peptidome'});
        },
        gotoUnderstandCluster(){
            this.$router.push({path:'/markdownpage/understandcluster'});
        },
        submitSearchCondition(){
            if(this.selected == 'archive')
                this.$router.push({name:'archive',query:{ keyword: this.keyword }});
            else if(this.selected == 'peptidesearch')
                this.$router.push({name:'peptidesearch',query:{ keyword: this.keyword }});   
        },
        setSearchKeyword(item){
            console.log(item);
            this.keyword = item;
            this.submitSearchCondition();
        },
        queryChartData(){
            this.$http
              .get(this.chartDataApi)
              .then(function(res){
                this.chartShow=false
                // console.log('chart',res)
                this.$bus.$emit('show-pie-peptide', res.body[0]);
                this.$bus.$emit('show-bar-peptide', {peptidesPerProteinsStats:res.body[1],uniquePeptidesPerProteinsStats:res.body[2]});
                
              },function(err){

              });
       },
    },
    mounted(){
        this.queryChartData()
    //  console.log(document.getElementById('elixir-banner'));
     // document.getElementById('elixir-banner').attribute('display','none');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .notFound-container{

 }
 .search-container{
    margin: 0 auto;
    width:100%;
    text-align: center;
    border-radius:6px;
    padding:100px 50px;
    /*background:#fbfdff;*/
    background-color: #fbfdff;
    border-bottom: 1px solid #f3f3f3;
 }
 .carousel-container{
    padding-top:50px;
    border-bottom: 1px solid #f3f3f3;
   background:#fbfdff;
 }
 .search-settings{
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    font-size: 14px;
 }
 .example-wrapper a{
     color: #444;
 }
 .example-wrapper a:hover{
     color: #5bc0be;
 }
 .example-item{
    margin-right: 5px;
 }
 .demo-carousel{
    text-align: center;
    position: relative;
 }
 .info{
    
    position: absolute;
    left: 10px;
    top: 5px;
 }
 .content{
    width:95%;
    height: 100%;
    position: relative;
    padding: 50px 0;
    margin:0 auto;
 }
 .row{
    margin:0 auto;
    display: flex;
    align-items: center;
    max-width: 150rem !important;
 }
.item-container{
    text-align: center;
    margin: 15px;
    padding: 2.78571429em;
}
.item-title{
    margin-bottom: 20px;
}
.item-content{

    display: flex;
    flex-direction:column;
    color: #666;
    height:250px;
    background-color: white;

}
.item-icon{
    font-size: 80px;
    color: rgb(91, 192, 190);
}
.item-title{
    font-size: 18px;
    font-weight: bold;
}
.item-content{
    text-align: justify;
    font-size: 16px;
}
.item-content p{
    margin-top: 10px;
    text-align: justify;
}
.row a{
    color: #666;
}
.row a:hover{
    color: #5bc0be;
    border-bottom-style:dotted;
}
.plot-container{
    margin: 0 auto;
    width:100%;
    height: 100%;
    position: relative;
    padding:30px 50px;
    /*background-color: #fbfdff;*/
    border-bottom: 1px solid #f3f3f3;
 }
.plot-container .item-container{
    text-align: center;
    margin: 10px 15px;
}

.plot-container .item{
    position: relative;
    border: 1px solid #ececec;
    border-radius: 6px;
} 
</style>
<style>
    #search-bar-pride .ivu-input-group-prepend{
        background-color: #5bc0be !important;
    }
    #search-bar-pride .ivu-input-group-prepend span{
        font-weight:700;
    }
    #search-bar-pride .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
        color: white !important;
    }
    #search-bar-pride .ivu-select{
        color: white !important;
    }
    #search-bar-pride .ivu-input-group-append{
        background-color: #5bc0be !important;
        color: #f8f8f8 !important;
        width:100px;
    }
    #search-bar-pride .ivu-input-group-append span{
        font-weight:700;
        /*font-size: .85714286em;*/
    }
    #search-bar-pride .ivu-select-arrow{
        color: #f8f8f8 !important;
    }
</style>