<template>
  <div class="news-container">
     <div class="title">News</div>
     <Row class="row" type="flex">
            <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="document-text" size="80" color="rgb(9, 177, 177)"></Icon></div>
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
                    <div class="item-icon"><Icon type="social-twitter" size="80" color="rgb(9, 177, 177)"></Icon></div>
                    <div class="item-title">
                      <div>Tweets</div>
                    </div>
                    <div class="item tweet">
                        <Timeline :id="'pride_ebi'" :widget-class="`tweet-class`" :sourceType="'profile'" :options="{ tweetLimit: '5   ', chrome:'transparent', linkColor:'#0bb1b1', borderColor:'#19b9b9'}"/>
                    </div>
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="social-twitch" size="80" color="rgb(9, 177, 177)"></Icon></div>
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
        width: 90%;
        margin:0 auto;
        display: flex;
        align-items: center;
    }
    .item-container{
        text-align: center;
        margin: 15px 30px;
    }
    .item{
        display: flex;
        flex-direction:column;
        padding: 20px 0;
        color: #666;
        height:300px;
        background-color: white;
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
    .title{
        text-align: center;
        margin-bottom: 60px;
        font-size: 28px;
        font-weight: 400;
    }
    .tweet-class{
        
        overflow-y: scroll;
    }
    ::-webkit-scrollbar {
        width: 1px;
    }
</style>
