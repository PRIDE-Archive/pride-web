<template>
  <div class="news-container">
     <!--<h1>News</h1>-->
     <Row class="row" type="flex">
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="wrench" size="75" color="#5bc0be"></Icon></div>
                    <div class="item-title">
                      <div>Tools</div>
                    </div>
                    <div class="item-content tools">
                        <div v-for="(item,index) in toolsSection" :key="index" class="content-wrapper">
                            <div class="content-title">
                                {{item.title}}
                            </div>
                            <div class="content-text">
                                {{item.content}}
                            </div>
                            <a class="content-button" @click="moreButtonAction(item.markdownFolder,item.moreID,item.externalURL)">More</a>
                        </div>

                    </div>
                    <Button class="news-button" @click="moreButtonAction(toolsButton.markdownFolder,toolsButton.moreID,toolsButton.externalURL)">MORE</Button>
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="document-text" size="80" color="#5bc0be"></Icon></div>
                    <div class="item-title">
                      <div>Documentation</div>
                    </div>
                    <div class="item-content docs">
                        <div v-for="(item,index) in documentationSection"  :key="index" class="content-wrapper">
                            <div class="content-title">
                                {{item.title}}
                            </div>
                            <div class="content-text">
                                {{item.content}}
                            </div>
                            <a class="content-button"@click="moreButtonAction(item.markdownFolder,item.moreID,item.externalURL)">More</a>
                        </div>
                    </div>
                    <Button class="news-button" @click="moreButtonAction(documentationButton.markdownFolder,documentationButton.moreID,documentationButton.externalURL)">MORE</Button>
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="social-twitter" size="80" color="#5bc0be"></Icon></div>
                    <div class="item-title">
                      <div>Tweets</div>
                    </div>
                    
                    <Spin class="bsky-spin" v-if="tweetLoading"></Spin>
                   
                    <template v-else>
                        <div class="item-content tweet">
                            <!-- <Timeline :id="'pride_ebi'" :widget-class="`tweet-class`" :sourceType="'profile'" :options="{ tweetLimit: '5   ', chrome:'transparent', linkColor:'#656665', borderColor:'#656665'}"/> -->
                            <div v-for="(item,index) in tweetsSection" :key="index" class="content-wrapper">
                                <div class="content-title bluesky">
                                    <img v-bind:src="blueSkyLogo" style="width:20px" /> {{item.date}}
                                </div>
                                <p class="content-text bluesky" v-for="line of item.content" >
                                    {{line}}
                                </p>
                                <a class="content-button" @click="bskyMoreButtonAction(item.id)">More</a>
                            </div>
                        </div>
                        <Button class="news-button" @click="gotoBsky()"><Icon class="twitter-icon" type="social-twitter"></Icon>Follow @PRIDE</Button>
                    </template>
                </div>
            </Col>
            <Col :xs="{ span: 24 }" :sm="{span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                <div class="item-container">
                    <div class="item-icon"><Icon type="social-twitch" size="80" color="#5bc0be"></Icon></div>
                    <div class="item-title">
                      <div>Citation</div>
                    </div>
                    <div class="item-content citation">
                        <div class="item-content">
                            <div class="content-title">
                                {{citation.lineone}}
                            </div>
                            <div class="content-text">
                                <div>
                                    {{citation.linetwo}}
                                </div>
                                <div>
                                    {{citation.linethree}}
                                </div>
                                <div>
                                     {{citation.linefour}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button class="news-button" @click="moreButtonAction(citation.button.markdownFolder)">MORE</Button>
                </div>
            </Col>
     </Row>
  </div>
</template>
<script>
    import { Tweet, Moment, Timeline } from 'vue-tweet-embed'
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
                toolsSection:[],
                toolsButton:{},
                documentationSection:[],
                documentationButton:{},
                citation:{
                    lineone:'',
                    linetwo:'',
                    linethree:'',
                    linefour:'',
                    button:{}
                },
                tweetsSection:[],
                tweetLoading: false,
                landingPageJsonURL: this.$store.state.baseURL + '/landingPage/landing_page.json',
                blueSkyApi: this.$store.state.baseApiURL_new + '/misc/bluesky-posts',
                blueSkyPostApi: 'https://bsky.app/profile/pride-ebi.bsky.social/post/',
                blueSkyLogo:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAMFBMVEVHcEwRhf4Rhf4Rhf4Rhf4Rhf4Rhf4Rhf4Rhf4Rhf4Rhf4Rhf4Rhf4Rhf4Rhf4Rhf7t/aLrAAAAD3RSTlMASvPZbOWuNxbPgSC/nVvEU+OhAAAAtElEQVQokaWSSwLDIAhER/EfE+5/2+aHQpNVOyvgISAK/K5A3T2jrlMACu+iYlGhI1rg+JQ5PGK3wUE1YoGZv6kwzljElMpuBBaAtQOVzNDQH9AbqLwEJJtbp8s5K6fusCk/RuU0mKZW1678G/Ky0S2RrseR0qYW1u2plAfK/FQV+DpOesBKs/QN5zBtXlrqbiNSZvvx+n1my52l5Sycx0tXKJ2DrCNvtf8tRN8ua6W04F99AP3mF/7GxnNrAAAAAElFTkSuQmCC'
            }
        },
        methods:{
            documentQuery(){
                this.$http
                  .get(this.landingPageJsonURL)
                  .then(function(res){
                    this.documentation = res.body.news.documentation;
                    this.citation.lineone = res.body.news.citation.lineone;
                    this.citation.linetwo = res.body.news.citation.linetwo;
                    this.citation.linethree = res.body.news.citation.linethree;
                    this.citation.linefour = res.body.news.citation.linefour;
                    this.citation.button = res.body.news.citation.button;
                    this.toolsSection = res.body.news.tools.section;
                    this.toolsButton = res.body.news.tools.button;
                    this.documentationSection = res.body.news.documentation.section;
                    this.documentationButton = res.body.news.documentation.button;
                  },function(err){

                  });
            },
            tweetQuery(){
                //this.$Message.success({content:'documents update', duration:1});
                this.info.tweet = Math.floor(Math.random()* 1000);
                this.tweetLoading = true
                this.$http
                  .get(this.blueSkyApi)
                  .then(function(res){
                    // let tweetIDList = []
                    this.tweetLoading = false
                    for(let i =0; i<res.body.length; i++){
                        // tweetIDList.push(res.body[i].id)

                        let item = {}
                        item.content = res.body[i].content.split('\n').filter(Boolean) 
                        item.date = res.body[i].createdAt.split('T')[0]
                        item.id = res.body[i].id
                        this.tweetsSection.push(item)
                    }
                    console.log(this.tweetsSection)
                    console.log('resresres',res.body)

                  },function(err){
                        this.tweetLoading = false
                  });
                
            },
            citationQuery(){
                //this.$Message.success({content:'documents update', duration:1});
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
            moreButtonAction(subpage, id, externalLink){
                if(externalLink){
                    window.open(externalLink);
                    return;
                }
                if(id){
                    id = id.replace(/(^\s*)|(\s*$)/g,'').replace(/\s/g,'_').toLowerCase();
                    this.$router.push({path:'/markdownpage/'+subpage+'#'+id});
                }
                else
                    this.$router.push({path:'/markdownpage/'+subpage});
                //this.$router.push({name:'/markdownpage#123',params: { subpage: subpage }, query: { step: id }});
            },
            bskyMoreButtonAction(id){
                 window.open(this.blueSkyPostApi+id);
            },
            gotoBsky(){
                window.open("https://bsky.app/profile/pride-ebi.bsky.social");
                //location.href="https://twitter.com/pride_ebi"
            }
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
        padding: 50px 0;
        margin:0 auto;
    }
    .row{
        margin:0 auto;
        display: flex;
        align-items: center;
        max-width: 100rem !important;
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
        overflow: scroll;
    }
    .item-content.citation{
        font-size: 16px;
        text-align: justify;
        /*padding: 10px 0;*/
    }
    .item-content.tools{
      text-align: justify;
    }
    .item-content.docs{
      text-align: justify;
    }

    .item-content.citation span:last-child{
        margin-bottom: 0;
    }
    .item-content span{
        margin-bottom: 5px;
    }
    .item-container .item-content .content-title{
        text-align: justify;
        font-family: Helvetica, Roboto, "Segoe UI", Calibri, sans-serif;
        font-size: 21px;
        font-weight: 400;
        line-height: 24px;
        color: rgb(41, 47, 51);
        padding-top: 10px;
    }
    .item-container .item-content .content-title.bluesky{
        border-bottom: 1px solid rgb(0, 0, 0) !important;
        padding-bottom: 10px;
    }
    .item-container .item-content .content-text{
        margin: 10px 0;
        padding: 10px 0;
        border-top: 1px solid rgb(0, 0, 0);
        font-size: 14px;
    }
    .item-container .item-content .content-text.bluesky{
        /*margin-bottom: 2px;*/
        padding: 0;
        border-top: none;
        font-size: 13px;
    }
    .item-title{
        font-size:18px;
        margin-bottom: 30px;
    }
    .item-icon{
        margin-bottom: 12px;
    }
    .content-button{
        float: right;
        color:#444;
        border-bottom-width: 1px;
        border-bottom-style: dotted;
    }
    .content-button:hover{
        color: #5bc0be;
    }
    .news-button{
        background-color: #1b95e0;
        border: none;
        color: #fff;
        font-weight: 900;
        font-size: 12px;
        height: 28px;
        width: 150px;
        border-radius: 4px;
        margin-top: 20px;
        padding: 1px 10px 1px 9px;
    }
    .news-button:hover{
           background-color: #0c7abf;
        /*
        background-color:#5bc0be;
        color:#f8f8f8;
        border: 1px solid #5bc0be !important;
        */
    }
    .twitter-icon{
        margin-right: 10px;
    }
    h1{
        color: #656665;
        font-size: 3.14285714em;
        font-weight: bold;
        font-family: Open Sans,Helvetica,Arial,sans-serif;
        margin-bottom: 20px;
        text-align: center;
    }
    .tweet{
        text-align: justify;
        overflow-y: scroll;
    }
    ::-webkit-scrollbar {
        width: 1px;
    }
    .twitter-follow-button{

    }
    .bsky-spin{
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        /* text-align: center; */
        justify-content: center;
        align-items: center;
        background-color: #f7f7f78f;
    }
    /*@media (min-width: 768px) {
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
    }

    @media (min-width: 1600px) {
        .news-container{
            width: 1300px;
        }
    }
    @media (min-width: 1800px) {
        .news-container{
            width: 1500px;
        }
    }
    @media (min-width: 2000px) {
        .news-container{
            width: 1700px;
        }
    }
    @media (min-width: 2300px) {
        .news-container{
            width: 2000px;
        }
    }*/
</style>
