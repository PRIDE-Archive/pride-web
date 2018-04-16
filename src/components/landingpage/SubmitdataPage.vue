<template>
    <div class="submit-data-container">
        <div class="panel nav"><Nav/></div>
        <div class="content-container">
            <Affix :offset-top="20">
                <div class="menu-wrapper">
                    <Menu mode="vertical" active-name="one" @on-select="menuSlect">
                        <MenuItem name="one">
                            <Icon type="ios-paper"></Icon>
                            Step One
                        </MenuItem>
                        <MenuItem name="two">
                            <Icon type="ios-paper"></Icon>
                            Step Two
                        </MenuItem>
                        <MenuItem name="three">
                            <Icon type="ios-paper"></Icon>
                            Step Three
                        </MenuItem>
                        <MenuItem name="four">
                            <Icon type="ios-paper"></Icon>
                            Step Four
                        </MenuItem>
                        <MenuItem name="five">
                            <Icon type="ios-paper"></Icon>
                            Step Five
                        </MenuItem>
                    </Menu>
                </div>
            </Affix>
           
               
            <div class="markdown-wrapper">
                <vue-markdown class="markdown-body" :source="source"></vue-markdown>
                <!--<vue-markdown :anchor-attributes="anchorAttrs">[A link to a website](https://google.com)</vue-markdown>-->
            </div>
                
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
        beforeRouteUpdate:function (to, from, next) {
            this.$nextTick(function(){
               let step = this.$route.query.step;
               this.goAnchor(step);
            });
            next();
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
                    this.$nextTick(function(){
                       this.goAnchor(this.$route.query.step);
                    });
                   
                  },function(err){
                   
                  }); 
            },
            goAnchor(selector) {
                if(selector){
                    let anchor = this.$el.querySelector('#'+selector);
                    document.documentElement.scrollTop = anchor.offsetTop;
                }
                else
                    document.documentElement.scrollTop = 0;
            },
            menuSlect(name){
                this.$router.replace({name:'submitdatapage',query: { step: name }});
            },
        },
        mounted:function(){
            this.markdownQuery();
        },
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
    .menu-wrapper .ivu-menu-vertical{
        position: absolute;
        min-width: 100px;
    }
    .markdown-wrapper{
        margin-left: 240px;
    }
    .content-container{
        padding: 90px 0;
        margin: 0 auto;
    }

    .markdown-body{
        display: inline-block;
    }
    @media (min-width: 768px) { 
        .content-container{
            width: 750px;
        }
        .menu-wrapper .ivu-menu-vertical{
            width: 200px !important;
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
