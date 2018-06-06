<template>
  <div class="notFound-container">
    <div class="panel nav"><Nav/></div>
   
    <Carousel v-model="value1" loop>
        <CarouselItem>
            <!--<span class="info"><i class="fas fa-info"></i> aaa  aa aa a a a  aaaaaa</span>-->
            <div class="demo-carousel"><img src="/static/peptidome/tutorial-1.png" height="443" width="1235"></div>
        </CarouselItem>
        <CarouselItem>
            <!--<span class="info"><i class="fas fa-info"></i> aaa  aa aa a a a  aaaaaa</span>-->
            <div class="demo-carousel"><img src="/static/peptidome/tutorial-2.png" height="443" width="1235"></div>
        </CarouselItem>
        <CarouselItem>
            <!--<span class="info"><i class="fas fa-info"></i> aaa  aa aa a a a  aaaaaa</span>-->
            <div class="demo-carousel"><img src="/static/peptidome/tutorial-3.png" height="443" width="1235"></div>
        </CarouselItem>
    </Carousel>
    <div class = "content">
        <Row class="row" type="flex">
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><i class="fas fa-search"></i></div>
                    <div class="item-title">
                      <div>Search Peptide</div>
                    </div>
                    <div class="item-content">
                        <p><a @click="gotoPeptideSearch">Explore</a> high quality peptide identifications verified by our spectrum clustering pipeline.</p>

                        <p>Example peptides: <a @click="gotoPeptideSearch('ELGITALHIK')">ELGITALHIK</a>, <a @click="gotoPeptideSearch('LSVDYGK')">LSVDYGK</a></p>
                    </div>
                   
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><i class="fas fa-download"></i></div>
                    <div class="item-title">
                      <div>Libraries & Results</div>
                    </div>
                    <div class="item-content docs">
                        <p><a @click="gotoSpectrumLibrary">Download</a> our spectrum libraries to use with your spectrum library searching tool, such as <a>SpectraST</a>. Popular spectrum libraries: <a>Human</a>, <a>Contaminants</a></p>

                        <p><a @click="gotoPeptideDownload">Download</a> our cluster results files with <a>High-quality unidentified human clusters</a>, and <a>Clusters more that 10 spectra and a ratio < 50%</a>.</p>
                    </div>
                    
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><i class="fas fa-wrench"></i></Icon></div>
                    <div class="item-title">
                      <div>Access</div>
                    </div>
                    <div class="item-content">
                        <p>Download original clustering result files from our <a>FTP</a> site.</p>

                        <p><a @click="gotoPeptideAPI">Web API</a> allows programatically access and search clustering results.</p>
                    </div>
                   
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><i class="fas fa-sticky-note"></i></Icon></div>
                    <div class="item-title">
                      <div>Release Note</div>
                    </div>
                    <div class="item-content citation">
                        <p>Release date: 04, 2015</p>

                        <p>This is a beta release of spectrum clustering results on identified spectra from all PRIDE Archive public experiments by April 2015.</p>

                        <p>Please give us your <a>feedbacks</a>.</p>
                    </div>
                    
                </div>
            </Col>
        </Row>
        <Row class="row" type="flex">
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><i class="fas fa-link"></i></div>
                    <div class="item-title">
                      <div>Search Peptide</div>
                    </div>
                    <div class="item-content">
                        <p>Discover original mass spec projects used by PRIDE Cluster project in the submission based <a>PRIDE Archive</a>.</p>

                        <p>Explore quality checked proteome-centric view of mass spec identification results in the <a>PRIDE Proteomes</a>.</p>
                    </div>
                   
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><i class="fab fa-envira"></i></div>
                    <div class="item-title">
                      <div>Libraries & Results</div>
                    </div>
                    <div class="item-content docs">
                        <p>You can contribute to our development on <a>GitHub</a>:</p>

                        <p><a>Algorithms</a>: clustering algorithms and pipeline related codebase.</p>

                        <p><a>Web</a>: cluster web site and web service codebase.</p>
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
                        <p>Learn how we define <a>high quality</a> clustering results.</p>

                        <p>Find out how to <a>interpret</a> the cluster details.</p>

                        <p>Or ask for help directly though our <a>Feedback</a> page.</p>
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
                        <p>If you use PRIDE Cluster, please cite the following paper:</p>

                        <p>Griss J, Perez-Riverol Y, et. al. Recognizing millions of consistently unidentified spectra across hundreds of shotgun proteomics datasets. Nat Methods. 2016 Aug;13(8):651-656. <a>PubMed</a></p>
                    </div>
                    
                </div>
            </Col>
        </Row>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/landingpage/Nav'
  export default {
    name: 'notfound',
    components: {
      Nav,
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
        }
    },
    data(){
      return {
        msg: '',
        value1: 0
      }
    },

   
    mounted(){
    //  console.log(document.getElementById('elixir-banner'));
     // document.getElementById('elixir-banner').attribute('display','none');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .notFound-container{

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
    width:90%;
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
}
.row a{
    color: #666;
}
.row a:hover{
    color: #5bc0be;
    border-bottom-style:dotted;
}
</style>
