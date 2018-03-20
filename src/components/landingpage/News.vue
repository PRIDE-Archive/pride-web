<template>
  <div class="news-container">
     <!--<h1>News</h1>-->
     <Row class="row" type="flex">
            <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="document-text" size="80" color="#5bc0be"></Icon></div>
                    <div class="item-title">
                      <div>Documentation</div>
                    </div>
                    <div class="item-content">
            
                    </div>
                    <Button class="news-button">MORE</Button>
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="social-twitter" size="80" color="#5bc0be"></Icon></div>
                    <div class="item-title">
                      <div>Tweets</div>
                    </div>
                    <div class="item-content tweet">
                        <Timeline :id="'pride_ebi'" :widget-class="`tweet-class`" :sourceType="'profile'" :options="{ tweetLimit: '5   ', chrome:'transparent', linkColor:'#656665', borderColor:'#656665'}"/>
                    </div>
                    <Button class="news-button">SUBSCRIBE</Button>
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 8}" :lg="{ span: 8}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="social-twitch" size="80" color="#5bc0be"></Icon></div>
                    <div class="item-title">
                      <div>Citation</div>
                    </div>
                    <div class="item-content citation">
                        <span class="citing-general">
                            {{citation.lineone}}
                        </span>
                        <span>
                            {{citation.linetwo}} 
                        </span>
                        <span>
                            <a>{{citation.linethree}}</a>
                        </span>
                        <span>
                             {{citation.linefour}}
                        </span>
                        
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
                },
                citation:{
                    lineone:'',
                    linetwo:'',
                    linethree:'',
                    linefour:'',
                }
            }
        },
        methods:{
            documentQuery(){
                this.$http
                  .get("/api/test")
                  .then(function(res){
                    this.citation.lineone = res.body.data.citation.lineone;
                    this.citation.linetwo = res.body.data.citation.linetwo;
                    this.citation.linethree = res.body.data.citation.linethree;
                    this.citation.linefour = res.body.data.citation.linefour;
                  },function(err){
                   
                  }); 
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
        width:80%;
        height: 100%;
        position: relative;
        padding: 90px 0;
        margin:0 auto;
    }
    .row{
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
    .item-content{
        display: flex;
        flex-direction:column;
        color: #666;
        height:300px;
        background-color: white;
        margin-bottom: 20px;
    }
    .item-content.citation{
        font-size: 16px;
        text-align: justify;
        /*padding: 10px 0;*/
    }
    .item-content span{
        margin-bottom: 5px;
    }
    .item-content .citing-general{
        margin-bottom: 10px;
        font-size:18px;
        font-weight: bold;
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
    .news-button:hover{
            opacity: .8;
        /*
        background-color:#5bc0be;
        color:#f8f8f8;
        border: 1px solid #5bc0be !important;
        */
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
        .news-container{
            width: 750px;
        }
        
    }
    @media (min-width: 992px) { 
        .news-container{
            width: 970px;
        }
        
    }
    @media (min-width: 1200px) {
        .news-container{
            width: 1170px;
        }
        .item-container{
            /*margin: 15px 50px;*/
        }
    }
    
    @media (min-width: 1600px) {
        .news-container{
            width: 1300px;
        }
    }
</style>
