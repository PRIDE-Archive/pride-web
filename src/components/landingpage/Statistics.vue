<template>
  <div class="statistics-container">
    <Row class="row">
        <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 8}" :lg="{ span: 8}">
            <div class="item-container">
                <div class="item">
                      <Sunburst></Sunburst>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 8}" :lg="{ span: 8}">
            <div class="item-container">
                <div class="item">
                      <Sankey></Sankey>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 8}" :lg="{ span: 8}">
            <div class="item-container">
                <div class="item">
                      <MapPride></MapPride>
                </div>
            </div>
        </Col>
    </Row>
  </div>
</template>
<script>
    import LineSimple from './statistics_chart/LineSimple.vue'
    import Sunburst from './statistics_chart/Sunburst.vue'
    import Sankey from './statistics_chart/Sankey.vue'
    import MapPride from './statistics_chart/Map.vue'
    import test from './statistics_chart/test.vue'
    export default {
        data () {
            return {
                value1: 0,
                setting: {
                    dots: 'none',
                },
                landingPageJsonURL:'/static/landingPage/landing_page.json'
            }
        },
        components: {
            LineSimple,
            Sunburst,
            Sankey,
            MapPride,
            test
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
        margin: 50px 10px;
    }

    .item{
       
       

       
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
