<template>
  <div class="news-container">
     <Row class="row" type="flex">
        <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
            <div class="item-container">
                <div class="item-title">
                  <div>Documentation</div>
                </div>
                <div class="item">
                    <div class="title">Documentation Content</div>
                    <div class="content">{{info.document}}</div>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
            <div class="item-container">
                <div class="item-title">
                  <div>Tweets</div>
                </div>
                <div class="item">
                    <div class="title">Tweets Contents</div>
                    <div class="content">{{info.tweet}}</div>
                </div>
            </div>
        </Col>
        <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
            <div class="item-container">
                <div class="item-title">
                  <div>Citation</div>
                </div>
                <div class="item">
                    <div class="title">Citation Content</div>
                    <div class="content">{{info.citation}}</div>
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
                },
                info:{
                    document: 0,
                    tweet: 0,
                    citation: 0,
                }
            }
        },
        methods:{
            documentQuery(){
                this.$Message.success({content:'documents update', duration:1});
                this.info.document = Math.floor(Math.random()* 1000);
                /*
                this.$http
                  .get("/document/get")
                  .then(function(res){
                    this.info.document = res.body.data.documentNum;
                  },function(err){
                   
                  }); 
                */
            },
            tweetQuery(){
                this.$Message.success({content:'documents update', duration:1});
                this.info.tweet = Math.floor(Math.random()* 1000);
                /*
                this.$http
                  .get("/tweet/get")
                  .then(function(res){
                    this.info.tweet = res.body.data.tweetNum;
                  },function(err){
                    
                  }); 
                */  
            },
            citationQuery(){
                this.$Message.success({content:'documents update', duration:1});
                this.info.citation = Math.floor(Math.random()* 1000);
                /*
                this.$http
                  .get("/citation/get")
                  .then(function(res){
                    this.info.citation = res.body.data.citationNum;
                  },function(err){
                    
                  });   
                */
            },
        },
        mounted:function(){
            this.documentQuery();
            this.tweetQuery();
            this.citationQuery();
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
    .item-title{
        font-size:18px;
        margin-bottom: 20px;
    }
</style>
