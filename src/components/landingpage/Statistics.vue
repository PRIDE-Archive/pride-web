<template>
  <div class="statistics-container">
    <Row class="row">
        <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 8}" :lg="{ span: 8}">
            <div class="item-container">
                <div class="item">
                      <Spin fix v-if="treePrideShow"></Spin>
                      <TreePrideSimple></TreePrideSimple>
                      <a class="static-more-button" @click="gotoStaticDetails">More</a>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 8}" :lg="{ span: 8}">
            <div class="item-container">
                <div class="item">
                      <Spin fix v-if="linePrideShow"></Spin>
                      <LinePrideSimple></LinePrideSimple>
                      <a class="static-more-button" @click="gotoStaticDetails">More</a>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 8}" :lg="{ span: 8}">
            <div class="item-container">
                <div class="item">
                      <Spin fix v-if="mapPrideShow"></Spin>
                      <MapPrideSimple></MapPrideSimple>
                      <a class="static-more-button" @click="gotoStaticDetails">More</a>
                </div>
            </div>
        </Col>
    </Row>
    <!--
    <div class="button-wrapper">
        <a class="button statistic-button" @click="">More Data</a>
    </div>
    -->
  </div>
</template>
<script>
    import LinePrideSimple from './statistics_chart/LineSimple.vue'
    import SunburstPrideSimple from './statistics_chart/SunburstSimple.vue'
    import SankeyPrideSimple from './statistics_chart/SankeySimple.vue'
    import MapPrideSimple from './statistics_chart/MapSimple.vue'
    import TreePrideSimple from './statistics_chart/TreeSimple.vue'
    import store from "@/store/store.js"
    export default {
        data () {
            return {
                treePrideApi: this.$store.state.baseApiURL + '/stats/SUBMISSIONS_PER_CATEGORIES',
                sankeyPrideApi: this.$store.state.baseApiURL + '/stats/SUBMISSIONS_PER_MONTH',
                mapPrideApi: this.$store.state.baseApiURL + '/stats/SUBMISSIONS_PER_COUNTRY',
                //linePrideApi: this.$store.state.baseApiURL + '/stats/SUBMISSIONS_PER_YEAR',
                linePrideApi: this.$store.state.baseApiURL + '/stats/submissions-monthly',
                treePrideShow:true,
                sankeyPrideShow:true,
                mapPrideShow:true,
                linePrideShow:true,
            }
        },
        components: {
            LinePrideSimple,
            SunburstPrideSimple,
            SankeyPrideSimple,
            MapPrideSimple,
            TreePrideSimple
        },
        methods:{
            gotoStaticDetails(){
                this.$router.push({name:'statisticsdetails'})
            },
            queryTree(){
                this.$http
                  .get(this.treePrideApi)
                  .then(function(res){
                    this.treePrideShow=false;
                    this.$bus.$emit('show-simple-tree', res.body);
                  },function(err){

                  });
           },
           querySankey(){
                this.$http
                  .get(this.sankeyPrideApi)
                  .then(function(res){
                    this.sankeyPrideShow=false;
                    this.$bus.$emit('show-simple-sankey', res.body);
                  },function(err){

                  });
           },
           queryLine(){
                this.$http
                  .get(this.linePrideApi)
                  .then(function(res){
                    this.linePrideShow=false;
                    console.log(res.body);
                    this.$bus.$emit('show-simple-line', res.body);
                  },function(err){

                  });
           },
           queryMap(){
                this.$http
                  .get(this.mapPrideApi)
                  .then(function(res){
                    this.mapPrideShow=false;
                    this.$bus.$emit('show-simple-map', res.body);
                  },function(err){

                  });
           },
        },
        mounted: function(){
            this.queryTree();
            this.querySankey();
            this.queryLine();
            this.queryMap();
        },
    }
</script>
<style scoped>
    .statistics-container{
        width:80%;
        height: 100%;
        position: relative;
        padding: 50px 0;
        margin:0 auto;
    }
    .carousel-container{
        display:block;
    }
    .row{
        margin:0 auto;
        max-width: 100% !important;
    }

    .item-container{
        text-align: center;
        margin: 10px 15px;
    }

    .item{
        position: relative;
        border: 1px solid #ececec;
        border-radius: 6px;
    } 
    .static-more-button{
        position: absolute;
        top: 5px;
        right: 10px;
        border-bottom-style:none !important;
    }
    .button-wrapper{
        text-align: center;
    }
       
    .statistic-button{
        margin: 0 auto;
        padding: 20px 85px;
        text-decoration: none;
        text-transform: uppercase;
        background-color: #5bc0be;
        font-size: 24px;
        border-radius: 6px;
    }
    @media (min-width: 768px) { 
        .statistics-container{
            width: 750px;
        }
    }
    @media (min-width: 992px) { 
        .statistics-container{
            width: 970px;
        }
    }
    @media (min-width: 1200px) {
        .statistics-container{
            width: 1170px;
        }
    }
    @media (min-width: 1600px) {
        .statistics-container{
            width: 1552px;
        }
    }
</style>
