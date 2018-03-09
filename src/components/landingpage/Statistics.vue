<template>
  <div class="statistics-container">
    <!--
        <Carousel 
            v-model="value1" 
            loop
            :dots="setting.dots">
           
            <CarouselItem class="carousel-container">
                <Row class="row">
                    <Col span="6">
                        <div class="item-container">
                            <div class="item">
                                <div class="title">Repository</div>
                                <div class="content">200</div>
                            </div>
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item-container">
                            <div class="item">
                                <div class="title">Repository</div>
                                <div class="content">200</div>
                            </div>
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item-container">
                            <div class="item">
                                <div class="title">Repository</div>
                                <div class="content">200</div>
                            </div>
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item-container">
                            <div class="item">
                                <div class="title">Repository</div>
                                <div class="content">200</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </CarouselItem>
            <CarouselItem>
                <Row class="row">
                    <Col span="6">
                        <div class="item-container">
                            <div class="item">
                                <div class="title">Repository</div>
                                <div class="content">200</div>
                            </div>
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item-container">
                            <div class="item">
                                <div class="title">Repository</div>
                                <div class="content">200</div>
                            </div>
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item-container">
                            <div class="item">
                                <div class="title">Repository</div>
                                <div class="content">200</div>
                            </div>
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item-container">
                            <div class="item">
                                <div class="title">Repository</div>
                                <div class="content">200</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </CarouselItem>
        </Carousel>
     -->
    <Row class="row">
        <Col span="6">
            <div class="item-container">
                <div class="item">
                    <div class="title">Repository</div>
                    <div class="content">200</div>
                </div>
            </div>
        </Col>
        <Col span="6">
            <div class="item-container">
                <div class="item">
                    <div class="title">Repository</div>
                    <div class="content">200</div>
                </div>
            </div>
        </Col>
        <Col span="6">
            <div class="item-container">
                <div class="item">
                    <div class="title">Repository</div>
                    <div class="content">200</div>
                </div>
            </div>
        </Col>
        <Col span="6">
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
        width: 80%;
        height: 300px;
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
        background: #0bb1b1;
       
    }
</style>
