<template>
    <div class="submit-data-container">
        <div class="panel nav"><Nav/></div>
        <div class="content-container">
            <Row :gutter="64">
                <Col :xs="{ span: 24 }" :sm="{span: 8}" :md="{ span: 6}" :lg="{ span: 4}">
                    <div class="menu-wrapper">
                         <Menu mode="vertical" :theme="theme1" active-name="1">
                            <MenuItem name="1">
                                <Icon type="ios-paper"></Icon>
                                Step One
                            </MenuItem>
                            <MenuItem name="2">
                                <Icon type="ios-people"></Icon>
                                Step Two
                            </MenuItem>
                            <MenuItem name="4">
                                <Icon type="settings"></Icon>
                                Step Three
                            </MenuItem>
                        </Menu>
                    </div>
                </Col>
                <Col :xs="{ span: 24 }" :sm="{span: 16}" :md="{ span: 18}" :lg="{ span: 20}">
                    <div class="markdown-wrapper">
                        <vue-markdown class="markdown-body" :source="source"></vue-markdown>
                        <!--<vue-markdown :anchor-attributes="anchorAttrs">[A link to a website](https://google.com)</vue-markdown>-->
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    import Nav from '@/components/landingpage/Nav'
    export default {
        data () {
            return {
                source: '',
                markdownURL:'/static/markdown/submitDataPage/content.md',
                /*
                anchorAttrs: {
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    tag:'test'
                }*/
            }
        },
        components: {
            Nav,
        },
        methods:{
            markdownQuery(){
                this.$http
                  .get(this.markdownURL)
                  .then(function(res){
                    this.source = res.body;

                    console.log(this.$route.query.step);
                    this.$nextTick(function(){
                       this.goAnchor();
                    });
                   
                  },function(err){
                   
                  }); 
            },
            goAnchor(selector) {
                let anchor = this.$el.querySelector('h2');
                document.documentElement.scrollTop = anchor.offsetTop;
            }
        },
        mounted:function(){
            this.markdownQuery();
        }
    }
</script>
<style>
 
</style>
<style scoped>
    .submit-data-container{
        width:100%;
        height: 100%;
        background: white;
    }
    .markdown-wrapper{
        margin: 90px 0;
    }
    .menu-wrapper{
        margin: 90px 0;
    }
    .menu-wrapper .ivu-menu-vertical{
        width: 100% !important;
        min-width: 100px;
    }
    .content-container{
        margin: 0 auto;
    }
    @media (min-width: 768px) { 
        .content-container{
            width: 750px;
        }
    }
    @media (min-width: 992px) { 
        .content-container{
            width: 970px;
        }
    }
    @media (min-width: 1200px) {
        .content-container{
            width: 1170px;
        }
    }
    @media (min-width: 1600px) {
        .content-container{
            width: 1552px;
        }
    }
</style>
