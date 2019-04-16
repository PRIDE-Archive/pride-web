<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
            <Affix :offset-top="20">
                <div class="menu-wrapper">
                    <Menu mode="vertical" :active-name="activeName" @on-select="menuSlect">
                        <MenuItem name="one">
                            <Icon type="ios-paper"></Icon>
                            Docs One
                        </MenuItem>
                        <MenuItem name="two">
                            <Icon type="ios-paper"></Icon>
                            Docs Two
                        </MenuItem>
                        <MenuItem name="three">
                            <Icon type="ios-paper"></Icon>
                            Docs Three
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
    import NavBar from '@/components/ebi/Nav'
    import store from "@/store/store.js"
    export default {
        data () {
            return {
                source: '',
                markdownURL:this.$store.state.baseURL + '/static/markdown/documentationPage/content.md',
                activeName:'one'
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
               let num = this.$route.query.num;
               this.goAnchor(num);
            });
            next();
        },
        components: {
            NavBar,
        },
        methods:{
            markdownQuery(){
                this.$http
                  .get(this.markdownURL)
                  .then(function(res){
                    this.source = res.body;
                    this.$nextTick(function(){
                        this.activeName = this.$route.query.num;
                        this.goAnchor(this.$route.query.num);
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
                if(this.$route.query.num == name){
                    let anchor = this.$el.querySelector('#'+name);
                    document.documentElement.scrollTop = anchor.offsetTop;
                    return;
                }
                this.activeName = name;
                this.$router.replace({name:'pridedocs',query: { num: name }});
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
    .menu-wrapper .ivu-menu-vertical{
        width: 200px !important;
    }
    .ivu-menu{
        z-index: 100;
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
