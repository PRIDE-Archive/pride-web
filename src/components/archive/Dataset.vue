<template>
  <div class="dataset-container">
      <div class="panel nav"><Nav/></div>
      <div class="content">
          <Row>
            <Col span="24">
              <!--
                <Breadcrumb separator=">">
                    <BreadcrumbItem to="/">Home</BreadcrumbItem>
                    <BreadcrumbItem to="/components/breadcrumb">Pride</BreadcrumbItem>
                    <BreadcrumbItem>PXD006887</BreadcrumbItem>
                </Breadcrumb>
              -->
               <h2 class="project-title">Project PXD006887</h2>
                <div class="tags">
                    <span class="type-tag-wrapper">
                      <Icon class="type-tag" type="ios-pricetag-outline"></Icon>
                      <a>Biological Dataset</a>
                    </span>
                    <span>
                      <Icon class="download-tag" type="ios-download-outline"></Icon><a>Download</a>
                    </span>
                </div>
            </Col>
          </Row>
          <Row :gutter="48">
              <Col span="16">
                  <div>
                    <Card class="card">
                          <p slot="title">Summary</p>
                          <div class="summary-content-header">Title</div>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <div class="summary-content-header">Description</div>
                          <p>We subjected podocytes (either differentiated or undifferentiated) to a pulse with stable isotope labeled amino acids for 24, 48, 72 and 96h.</p>
                          <div class="summary-content-header">Sample Processing Protocol</div>
                          <p>Proteins were dissolved in urea buffer containing 8M urea and 50mM ammonium bicarbonate supplemented with 1X PIM (Roche complete protease inhibitor tabl. EDTA-free). After sonification for 30 s on 10% power, the protein lysates were centrifuged with 14,000 rpm for 30 min at 4°C followed by transfer of the supernatant to a new tube and measurement of protein concentrations with the help of a commercial BCA kit (Thermo Fisher Scientific). For the reduction of disulfide bonds the samples were exposed to Dithiothreitol (DTT, 10mM) for 1 hour at room temperature (RT). Alkylation was performed with Iodacetamide (IAA, 40mM) in the dark Proteins were digested overnight at RT using a 1:100 ratio of trypsin (1μg trypsin per 100 μg protein from each sample). Adding of 0.5 % formic acid the next morning stopped this process.</p>
                          <div class="summary-content-header">Data Processing Protocol</div>
                          <p>Samples were analyzed using MaxQuant as indicated in the method section of the paper.</p>
                          <div class="summary-content-header">Contact</div>
                          <p>Markus Rinschen, Kidney research center cologne </p>
                          <p>Markus Rinschen, University Hospital Cologne ( lab head )</p>
                          <div class="summary-content-header">Submission Date</div>
                          <p>07/07/2017</p>
                          <div class="summary-content-header">Publication Date</div>
                          <p>01/05/2018</p>
                    </Card>
                    <Card class="card">
                        <p slot="title">Publication</p>
                        <p>Schroeter CB, Koehler S, Kann M, Schermer B, Benzing T, Brinkkoetter PT, Rinschen MM. Protein half-life determines expression of proteostatic networks in podocyte differentiation. FASEB J. 2018:fj201701307R PubMed: 29694247</p>
                    </Card>
                  </div>
                 <!--
                  <Tabs :animated="false">
                    <TabPane label="Summary">
                      <div class="tab-container">
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                          <h2>Title</h2>
                          <p>Analysis of isotope incorporation in differentiated and undifferentiated podocytes</p>
                      </div>
                    </TabPane>
                    <TabPane label="Publication">
                      <div class="tab-container">
                        <p>Schroeter CB, Koehler S, Kann M, Schermer B, Benzing T, Brinkkoetter PT, Rinschen MM. Protein half-life determines expression of proteostatic networks in podocyte differentiation. FASEB J. 2018:fj201701307R PubMed: 29694247</p>
                      </div>
                    </TabPane>
                  </Tabs>
                -->
              </Col>
              <Col span="8">
                  <Card class="card">
                       <p slot="title">Description</p>
                       <div class="summary-content-header">Species</div>
                       <p>Homo sapiens (Human)</p>
                       <div class="summary-content-header">Tissue</div>
                       <p>kidney</p>
                       <div class="summary-content-header">Instrument</div>
                       <p>Q Exactive</p>
                       <div class="summary-content-header">Software</div>
                       <p>kidney </p>
                       <div class="summary-content-header">Tissue</div>
                       <p>Not available</p>
                       <div class="summary-content-header">Modification</div>
                       <p>No PTMs are included in the dataset</p>
                       <div class="summary-content-header">Quantification</div>
                       <p>Not available</p>
                       <div class="summary-content-header">Experiment Type</div>
                       <p>Shotgun proteomics</p>
                  </Card>
              </Col>
          </Row>
          
      </div>
  </div>
</template>

<script>
  import Nav from '@/components/landingpage/Nav'
  export default {
    name: 'archive',
    data(){
      return {
         
      }
    },
    components: {
      Nav
    },
    methods:{
    
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .dataset-container{
    width: 100%;
  }
  .content{
    width: 80%;
    margin:0 auto;
    padding: 40px 0;
    min-height: calc(100vh - 505px);
  }
  .tab-container{
    /*min-height: calc(100vh - 685px);*/
  }
  .card{
    margin-top: 30px;
  }
  .project-title{
      margin: 20px 0;
      color:rgb(100, 102, 100);
  }
  .tags{
    font-size: 16px;
    color:rgb(100, 102, 100);
  }
  .tags a{
    color:rgb(100, 102, 100);
  }
  .tags a:hover{
    color: #5bc0be;;
  }
  .download-tag{
    font-size: 21px;
    margin-right: 5px;
  }
  .type-tag{
    font-size: 17px;
    margin-right: 1px;
  }
  .type-tag-wrapper{
    margin-right: 10px;
  }
  .summary-content-header{
    font-size: 14px;
    color: #5bc0be;
    font-weight: bold;
    margin-top: 10px;
  }
  .card p{
    text-align: justify;
  }
  .card .summary-content-header:first-child{
    margin-top: 0px;
  }
</style>
