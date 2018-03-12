<template>
  <div class="statistics-container">
    <Row class="row">
        <Col span="6">
            <div class="item-container">
                <div class="item">
                      <test></test>
                </div>
            </div>
        </Col>
        <Col span="6">
            <div class="item-container">
                <div class="item">
                      <test></test>
                </div>
            </div>
        </Col>
        <Col span="6">
            <div class="item-container">
                <div class="item">
                      <test></test>
                </div>
            </div>
        </Col>
        <Col span="6">
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
        display: flex;
        align-items: center;
    }

    .item-container{
        text-align: center;
        margin: 50px 10px;
    }

    .item{
       
       

       
    }
</style>
