<template>
  <div class="notFound-container">
    <div class = "content">
         <div id="clouds">
            <div class="cloud x1"></div>
            <div class="cloud x1_5"></div>
            <div class="cloud x2"></div>
            <div class="cloud x3"></div>
            <div class="cloud x4"></div>
            <div class="cloud x5"></div>
        </div>
        <div class='c'>
            <div><Icon type="md-sad" size="100"/></div>
            <div class='_404'>{{err}}</div>
            <hr>
            <div class='_1'>Please Wait</div>
            <div class='_2'>We will fix it Soon!</div>
            <a class='btn' @click="backtohome">BACK TO HOME</a>
        </div>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/Nav'
  export default {
    name: 'notfound',
    components: {
      Nav,
    },
    props: ['err'],
    methods:{
      backtohome(){
        this.$router.push({name:'landingpage'});
      }
    },
    data(){
      return {
        msg: ''
      }
    },

    beforeRouteEnter: function(to, from, next){
        //document.getElementById('elixir-banner').setAttribute('display','none');
        next();
    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .notFound-container{

 }
 .content{
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    height: calc(100vh - 200px);
    background: #5bc0be;
    color:#fff;
    font-family: 'Open Sans', sans-serif;
    overflow: hidden;
 }
#clouds{
    z-index: 1000;
}
/*@import url(https://fonts.googleapis.com/css?family=opensans:500);*/

.c{
    text-align: center;
    display: block;
    position: relative;
    width:80%;
    margin:100px auto;
}
._404{
    font-size: 60px;
    position: relative;
    display: inline-block;
    z-index: 2;
    margin-bottom: 20px;
    letter-spacing: 15px;
}
._1{
    text-align:center;
    display:block;
    position:relative;
    letter-spacing: 12px;
    font-size: 4em;
    line-height: 80%;
    margin: 20px 0;
}
._2{
    text-align:center;
    display:block;
    position: relative;
    font-size: 20px;
    margin-bottom: 20px;
}
.text{
    font-size: 70px;
    text-align: center;
    position: relative;
    display: inline-block;
    margin: 19px 0px 0px 0px;
    z-index: 3;
    width: 100%;
    line-height: 1.2em;
    display: inline-block;
}

.btn{
    position: relative;
    display: inline-block;
    width: 358px;
    padding: 5px;
    z-index: 5;
    font-size: 25px;
    margin:0 auto;
    color:#ffffff;
    text-decoration: none;
    margin-right: 10px;
    border-bottom-style:none;
}
.right{
    float:right;
    width:60%;
}

hr{
    padding: 0;
    border: none;
    border-top: 5px solid #fff;
    color: #fff;
    text-align: center;
    margin: 0px auto;
    width: 420px;
    height:10px;
    z-index: -10;
}

.cloud {
    width: 350px; height: 120px;

    background: #FFF;
    background: linear-gradient(top, #FFF 100%);
    background: -webkit-linear-gradient(top, #FFF 100%);
    background: -moz-linear-gradient(top, #FFF 100%);
    background: -ms-linear-gradient(top, #FFF 100%);
    background: -o-linear-gradient(top, #FFF 100%);

    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;

    position: absolute;
    margin: 120px auto 20px;
    z-index:-1;
    transition: ease 1s;
}

.cloud:after, .cloud:before {
    content: '';
    position: absolute;
    background: #FFF;
    z-index: -1
}

.cloud:after {
    width: 100px; height: 100px;
    top: -50px; left: 50px;

    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
}

.cloud:before {
    width: 180px; height: 180px;
    top: -90px; right: 50px;

    border-radius: 200px;
    -webkit-border-radius: 200px;
    -moz-border-radius: 200px;
}

.x1 {
    top:-50px;
    left:100px;
    -webkit-transform: scale(0.3);
    -moz-transform: scale(0.3);
    transform: scale(0.3);
    opacity: 0.9;
    -webkit-animation: moveclouds 15s linear infinite;
    -moz-animation: moveclouds 15s linear infinite;
    -o-animation: moveclouds 15s linear infinite;
}

.x1_5{
    top:-80px;
    left:250px;
    -webkit-transform: scale(0.3);
    -moz-transform: scale(0.3);
    transform: scale(0.3);
    -webkit-animation: moveclouds 17s linear infinite;
    -moz-animation: moveclouds 17s linear infinite;
    -o-animation: moveclouds 17s linear infinite; 
}

.x2 {
    left: 250px;
    top:30px;
    -webkit-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0.6; 
    -webkit-animation: moveclouds 25s linear infinite;
    -moz-animation: moveclouds 25s linear infinite;
    -o-animation: moveclouds 25s linear infinite;
}

.x3 {
    left: 250px; bottom: -70px;

    -webkit-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0.8; 

    -webkit-animation: moveclouds 25s linear infinite;
    -moz-animation: moveclouds 25s linear infinite;
    -o-animation: moveclouds 25s linear infinite;
}

.x4 {
    left: 470px; botttom: 20px;

    -webkit-transform: scale(0.75);
    -moz-transform: scale(0.75);
    transform: scale(0.75);
    opacity: 0.75;

    -webkit-animation: moveclouds 18s linear infinite;
    -moz-animation: moveclouds 18s linear infinite;
    -o-animation: moveclouds 18s linear infinite;
}

.x5 {
    left: 200px; top: 300px;

    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    transform: scale(0.5);
    opacity: 0.8; 

    -webkit-animation: moveclouds 20s linear infinite;
    -moz-animation: moveclouds 20s linear infinite;
    -o-animation: moveclouds 20s linear infinite;
}

@-webkit-keyframes moveclouds {
    0% {margin-left: 1000px;}
    100% {margin-left: -1000px;}
}
@-moz-keyframes moveclouds {
    0% {margin-left: 1000px;}
    100% {margin-left: -1000px;}
}
@-o-keyframes moveclouds {
    0% {margin-left: 1000px;}
    100% {margin-left: -1000px;}
}
</style>

