<template>
  <div class="news-container">
     <!--<h1>News</h1>-->
     <Row class="row" type="flex">
            <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="document-text" size="80" color="#656665"></Icon></div>
                    <div class="item-title">
                      <div>Documentation</div>
                    </div>
                    <div class="item">
                        <div class="title">Documentation Content</div>
                        <div class="content">{{info.document}}</div>
                    </div>
                    <Button class="news-button">MORE</Button>
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="social-twitter" size="80" color="#656665"></Icon></div>
                    <div class="item-title">
                      <div>Tweets</div>
                    </div>
                    <div class="item tweet">
                        <Timeline :id="'pride_ebi'" :widget-class="`tweet-class`" :sourceType="'profile'" :options="{ tweetLimit: '5   ', chrome:'transparent', linkColor:'#656665', borderColor:'#656665'}"/>
                    </div>
                    <Button class="news-button">SUBSCRIBE</Button>
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="social-twitch" size="80" color="#656665"></Icon></div>
                    <div class="item-title">
                      <div>Citation</div>
                    </div>
                    <div class="item">
                        <div class="title">Citation Content</div>
                        <div class="content">{{info.citation}}</div>
                    </div>
                    <Button class="news-button">MORE</Button>
                </div>
            </Col>
     </Row>
  </div>
</template>
<script>
    import Timeline from 'vue-tweet-embed/timeline'
    export default {
        components: {
          Timeline
        },
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
        padding: 90px 0;
    }
    .row{
        width: 80%;
        margin:0 auto;
        display: flex;
        align-items: center;
    }
    .item-container{
        text-align: center;
        margin: 15px;
        border: 1px solid #ececec;
        border-radius: 6px;

        padding: 2.78571429em;
    }
    .item{
        display: flex;
        flex-direction:column;
        padding: 20px 0;
        color: #666;
        height:300px;
        background-color: white;
        margin-bottom: 20px;
    }
    .item.tweet{
        padding: 10px 0 !important;
    }
    .item-title{
        font-size:18px;
        margin-bottom: 30px;
    }
    .item-icon{
        margin-bottom: 12px;
    }
    .news-button{
        background: none;
        border: 1px solid #d3d3d3 !important;
        padding: 10px 40px;
        color: #656665;
        font-weight: 700;
        font-size: 12px;
        margin-top: 20px;
    }
    h1{
        color: #656665;
        font-size: 3.14285714em;
        font-weight: bold;
        font-family: Open Sans,Helvetica,Arial,sans-serif;
        margin-bottom: 20px;
        text-align: center;
    }
    .tweet-class{
        overflow-y: scroll;
    }
    ::-webkit-scrollbar {
        width: 1px;
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
        .item-container{
            /*margin: 15px 50px;*/
        }
    }
    
    @media (min-width: 1600px) {
        .row{
            width: 1300px;
        }
    }
</style>
