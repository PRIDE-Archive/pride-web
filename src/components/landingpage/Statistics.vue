<template>
  <div class="statistics-container">
    <Row class="row">
        <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 6}" :lg="{ span: 6}">
            <div class="item-container">
                <div class="item">
                      <test></test>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 6}" :lg="{ span: 6}">
            <div class="item-container">
                <div class="item">
                      <test></test>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 6}" :lg="{ span: 6}">
            <div class="item-container">
                <div class="item">
                      <test></test>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 6}" :lg="{ span: 6}">
            <div class="item-container">
                <div class="item">
                      <test></test>
                </div>
            </div>
        </Col>
    </Row>
  </div>
</template>
<script>
    import test from './statistics_chart/test.vue'
    export default {
        data () {
            return {
                value1: 0,
                setting: {
                    dots: 'none',
                }
            }
        },
        components: {
            test
        },
    }
</script>
<style scoped>
    .statistics-container{
        width:100%;
        height: 100%;
        position: relative;
        padding: 90px 0;
    }
    .carousel-container{
        display:block;
    }
    .row{
        width: 90%;
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
        .row{
            width: 750px;
        }
    }
    @media (min-width: 992px) { 
        .row{
            width: 970px;
        }
    }
    @media (min-width: 1200px) {
        .row{
            width: 1170px;
        }
    }
    @media (min-width: 1600px) {
        .row{
            width: 1552px;
        }
    }
</style>
