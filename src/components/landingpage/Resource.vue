<template>
  <div class="resource-container">
    <Carousel 
        v-model="value1" 
        loop
        :dots="setting.dots">
        <CarouselItem>
            <div class="bg bgone"></div>
        </CarouselItem>
        <CarouselItem>
            <div class="bg bgtwo"></div>
        </CarouselItem>
        <CarouselItem>
            <div class="bg bgthree"></div>
        </CarouselItem>
        <CarouselItem>
            <div class="bg bgfour"></div>
        </CarouselItem>
    </Carousel>
    <div class="button-container">
        <a class="button resource-button" @click="showCluster">PRIDE Cluster</a>
        <a class="button resource-button" @click="showArchive">PRIDE Archive</a>
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
        },
        methods:{
            showCluster(){
                this.$Message.success({content:'Cluster Coming Soon', duration:1});
            },
            showArchive(){
                this.$Message.success({content:'Archive Coming Soon', duration:1});
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
    .bg{
        height: 550px;
    }
    .bgone{
        background-image: url("~/src/assets/landing_page_bg/test1.jpg");
        background-position: center center; 
        background-size: cover;
    }
    .bgtwo{
        background-image: url("~/src/assets/landing_page_bg/test2.jpg");
        background-position: center center; 
        background-size: cover;
    }
    .bgthree{
        background-image: url("~/src/assets/landing_page_bg/test3.jpg");
        background-position: center center; 
        background-size: cover;
    }
    .bgfour{
        background-image: url("~/src/assets/landing_page_bg/test4.jpg");
        background-position: center center; 
        background-size: cover;
    }
    .button-container{
        position: absolute;
        top: 60%;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
    }
    .resource-button{
        padding: 12px 30px 14px 30px;
        font-size: 18px;
        /*padding: 20px 85px;
        font-size: 24px;*/
        margin: 0 30px;
        background-color: rgb(9, 177, 177);
    }
</style>
