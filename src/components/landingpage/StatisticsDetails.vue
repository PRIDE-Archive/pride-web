<template>
    <div class="peptide-detail-container">
        <NavBar page="landingpage"/>
        <div class="content-container">
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="24">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Submitted datasets properties tree</p>
                             <!--
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Species distribution for all the PSMs within the cluster.
                                    </div>
                                </Tooltip>

                             </p>
                            -->
                             <div class="card-content-pie">
                                 <Spin fix v-if="sunburstPrideShow"></Spin>
                                 <TreetPride></TreetPride>
                             </div>

                        </Card>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="12">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">{{submissionTitle}}</p>

                             <p slot="extra">
                               <a class="submission-options" @click="queryLine('year')">Year</a> <a class="submission-options" @click="queryLine('month')">Month</a>
                             </p>

                             <div class="card-content-pie">
                                 <Spin fix v-if="linePrideShow"></Spin>
                                 <LinePride></LinePride>
                             </div>

                        </Card>
                    </div>
                </Col>
                <Col span="12">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Submitted datasets properties</p>

                             <p slot="extra">
                                  <Select v-model="facetsType" size="small" style="width:125px" @on-change="facetsTypeChange">
                                      <Option v-for="item in facetsTypeList" :value="item" :key="item">{{ item }}</Option>
                                  </Select>
                             </p>

                             <div class="card-content-pie">
                                 <Spin fix v-if="piePrideShow"></Spin>
                                 <PiePride></PiePride>
                             </div>

                        </Card>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="12">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">MS Evidences</p>
                             <!--
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Modification distribution for all the PSMs within the cluster.
                                    </div>
                                </Tooltip>
                             </p>
                             -->
                             <div class="card-content-pie">
                                 <Spin fix v-if="barHorizontalShow"></Spin>
                                 <BarHorizontalPride></BarHorizontalPride>
                             </div>
                        </Card>
                    </div>
                </Col>
                <Col span="12">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Submitted datasets per country</p>
                             <!--
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Modification distribution for all the PSMs within the cluster.
                                    </div>
                                </Tooltip>
                             </p>
                             -->
                             <div class="card-content-pie">
                                 <Spin fix v-if="mapPrideShow"></Spin>
                                 <MapPride></MapPride>
                             </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    import TreetPride from './statistics_chart/Tree.vue'
    import SunburstPride from './statistics_chart/Sunburst.vue'
    import SankeyPride from './statistics_chart/Sankey.vue'
    import LinePride from './statistics_chart/Line.vue'
    import PiePride from './statistics_chart/Pie.vue'
    import MapPride from './statistics_chart/Map.vue'
    import BarHorizontalPride from './statistics_chart/BarHorizontal.vue'
    import NavBar from '@/components/ebi/Nav'
    import store from "@/store/store.js"
    export default {
        data () {
            return {
                treePrideApi: this.$store.state.baseApiURL + '/stats/SUBMISSIONS_PER_CATEGORIES',
                sunburstPrideApi: this.$store.state.baseApiURL + '/stats/SUBMISSIONS_PER_CATEGORIES',
                sankeyPrideApi: this.$store.state.baseApiURL + '/stats/SUBMISSIONS_PER_MONTH',
                mapPrideApi: this.$store.state.baseApiURL +'/stats/SUBMISSIONS_PER_COUNTRY',
                linePrideYearApi: this.$store.state.baseApiURL + '/stats/SUBMISSIONS_PER_YEAR',
                //linePrideMonthApi: this.$store.state.baseApiURL + '/stats/SUBMISSIONS_PER_MONTH',
                linePrideMonthApi: this.$store.state.baseApiURL + '/stats/submissions-monthly', 
                barHorizontalApi: this.$store.state.baseApiURL + '/stats/EVIDENCES_IN_ARCHIVE',
                sunburstPrideShow:true,
                sankeyPrideShow:true,
                mapPrideShow:true,
                linePrideShow:true,
                piePrideShow:true,
                treePrideShow:true,
                barHorizontalShow:true,
                facetsType:'INSTRUMENT',
                facetsTypeList:['INSTRUMENT','DISEASES','ORGANISM','ORGANISM_PART','MODIFICATIONS'],
                submissionTitle: ''
            }
        },
        components: {
            TreetPride,
            SunburstPride,
            SankeyPride,
            LinePride,
            PiePride,
            MapPride,
            BarHorizontalPride,
            NavBar,
        },
        methods: {
           queryTree(){
              this.treePrideShow=true;
              this.$http
                .get(this.treePrideApi)
                .then(function(res){
                  this.treePrideShow=false;
                  this.$bus.$emit('show-tree', res.body);
                },function(err){

                });
           },
           querySunburst(){
                this.sunburstPrideShow=true;
                this.$http
                  .get(this.sunburstPrideApi)
                  .then(function(res){
                    this.sunburstPrideShow=false;
                    this.$bus.$emit('show-sunburst', res.body);
                  },function(err){

                  });
           },
           querySankey(){
                this.sankeyPrideShow=true;
                this.$http
                  .get(this.sankeyPrideApi)
                  .then(function(res){
                    this.sankeyPrideShow=false;
                    this.$bus.$emit('show-sankey', res.body.speciesCounts);
                  },function(err){

                  });
           },
           queryLine(item){
                this.linePrideShow=true;
                let temp = item || 'year'
                let api = temp == 'year' ? this.linePrideYearApi:this.linePrideMonthApi;
                this.submissionTitle = temp == 'year' ? 'Public Submitted datasets':'Number of Submissions per month';
                this.$http
                  .get(api)
                  .then(function(res){
                    this.linePrideShow=false;
                    this.$bus.$emit('show-line', res.body);
                  },function(err){

                  });
           },
           queryMap(){
                this.mapPrideShow=true;
                this.$http
                  .get(this.mapPrideApi)
                  .then(function(res){
                    this.mapPrideShow=false;
                    this.$bus.$emit('show-map', res.body);
                  },function(err){

                  });
           },
           facetsTypeChange(facets){
              this.piePrideShow=true;
              this.$http
                  .get( this.$store.state.baseApiURL + '/stats/SUBMISSIONS_PER_'+facets)
                  .then(function(res){
                      this.piePrideShow=false;
                      this.$bus.$emit('show-pie', res.body);
                  },function(err){

                  });
           },
           queryBarHorizontal(){
                this.$http
                  .get(this.barHorizontalApi)
                  .then(function(res){
                    this.barHorizontalShow=false;
                    this.$bus.$emit('show-bar-horizontal', res.body);
                  },function(err){

                  });
           },
        },
        computed:{

        },
        mounted: function(){
            this.queryTree();
            this.querySunburst();
            this.querySankey();
            this.queryLine();
            this.queryMap();
            this.facetsTypeChange('INSTRUMENT');
            this.queryBarHorizontal();
        },
    }
</script>
<style scoped>
    .content-container{
        padding-top: 50px;
    }
    .visualization-wrapper{
        padding: 0px 20px 0 20px;
    }
    .visualization-wrapper.title{
        padding: 0px 20px 0px 20px;
    }
    .title-wrapper{
        border-bottom: 1px solid #99999945;
    }
    .peptide-property-wrapper{
        margin: 10px 0 5px 0;
    }
    .card-content-table{
        padding: 20px 0px;
    }
    .project-title{
      margin-bottom: 40px;
      color:rgb(100, 102, 100);
    }
    .property-item{
        font-size: 14px;
        margin-right: 20px;
    }
    .button-wrapper{
        padding: 0 20px;
        display: flex;
         text-align: center;
         justify-content:space-between;
    }
    .button-wrapper a{

        padding: 6px 8px;
        font-size: 12px;
        width:80px;
        /*padding: 20px 85px;
        font-size: 24px;*/
        font-weight: 700;
        background-color: #5bc0be;
        border-radius: 3px;
        color:white;
        border-bottom-style:none;
    }
    .button-wrapper .left{
        margin-right: 2px;
    }
    .button-wrapper .right{
        margin-left: 2px;
    }
    .lorikeet-iframe{
        width: 100%;
        height: 720px;
        border-width:0;
    }
    .tooltip-content{
        white-space: normal
    }
    .submission-options{
      border-bottom-style:none !important;
    }
    .code-row-bg{
      margin-bottom: 50px;
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
<style>
    .peptide-detail-table table{
        margin-bottom: 0 !important;
    }
    .peptide-detail-table table thead th{
        padding: 0 !important;
    }
    .peptide-detail-table table tbody td{
        padding: 0 !important;
    }
    .peptide-detail-table .ivu-table-body{
        height: 263px !important;
    }
    .peptide-detail-table a{
        color:#495060;
    }
    .peptide-detail-table a:hover{
        color:#5bc0be;
        border-bottom-style:dotted;
    }
    .peptide-detail-table .ivu-tooltip-inner{
        white-space:normal;
    }
</style>
