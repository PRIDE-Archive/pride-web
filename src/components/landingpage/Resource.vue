<template>
  <div class="resource-container">
    <Carousel 
        v-model="value1" 
        loop
        :dots="setting.dots">
        <CarouselItem>
            <div class="demo-carousel">1</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">2</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">3</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">4</div>
        </CarouselItem>
    </Carousel>
    <div class="button-container">
        <Button class="resource-button">Cluster</Button>
        <Button class="resource-button">Archive</Button>
    </div>
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
    .resource-container{
        width:100%;
        height: 100%;
        position: relative;
    }
    .demo-carousel {
        height: 100%;
        line-height: 300px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: #506b9e;
    }
    .button-container{
        position: absolute;
        bottom:30%;
        left: 50%;
        margin-left: -182px;
    }
    .resource-button{
        padding: 12px 30px 14px 30px;
        font-size: 18px;
        margin: 0 30px;
    }
</style>
