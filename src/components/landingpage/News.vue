<template>
  <div class="news-container">
     <Row class="row">
        <Col :xs="{ span: 24 }" :sm="{span: 6}" :md="{ span: 6}" :lg="{ span: 6}">
            <div class="item-container">
                <div class="item">
                    <div class="title">Repository</div>
                    <div class="content">200</div>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 6}" :md="{ span: 6}" :lg="{ span: 6}">
            <div class="item-container">
                <div class="item">
                    <div class="title">Repository</div>
                    <div class="content">200</div>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 6}" :md="{ span: 6}" :lg="{ span: 6}">
            <div class="item-container">
                <div class="item">
                    <div class="title">Repository</div>
                    <div class="content">200</div>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 6}" :md="{ span: 6}" :lg="{ span: 6}">
            <div class="item-container">
                <div class="item">
                    <div class="title">Repository</div>
                    <div class="content">200</div>
                </div>
            </div>
        </Col>
     </Row>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                value1: 0,
                setting: {
                    dots: 'none',
                }
            }
        }
    }
</script>
<style scoped>
    .news-container{
        width:100%;
        height: 100%;
        position: relative;
    }
    .row{
        height: 300px;
        width: 80%;
        margin:0 auto;
        display: flex;
        align-items: center;
    }
    .item-container{
        text-align: center;
        margin: 50px 10px;
    }
    .item{
        display: flex;
        flex-direction:column;
        padding: 50px 0;
        background: red;
       
    }
</style>
