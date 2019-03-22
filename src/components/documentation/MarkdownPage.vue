<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
            <Affix :offset-top="20">
                <div class="menu-wrapper">
                    <Menu mode="vertical" :active-name="activeName" @on-select="menuSlect">
                        <MenuItem v-for="item in tableList" :name="item.name" :key="item.name">
                            <Icon type="ios-paper"></Icon>{{item.content}}
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
                activeName:'',
                landingPageJsonURL: this.$store.state.baseURL + '/static/landingPage/landing_page.json',
                tableList:[],
                /*
                anchorAttrs: {
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    tag:'test'
                }*/
            }
        },
        /*
        beforeRouteEnter:function (to, from, next) {
            console.log('params',to.params);
            next();
        },*/
        beforeRouteUpdate:function (to, from, next) {
            if(to.params.subpage != from.params.subpage){
                this.markdownQuery(to.params.subpage);
            }
            else{
                this.$nextTick(function(){
                    this.goAnchor(location.hash.replace(/\#/,''));
                    this.$nextTick(function(){
                        this.activeName = location.hash.replace(/\#/,'');
                    });
                });
            }
            
            next();
        },
        components: {
            NavBar,
        },
        methods:{
            markdownQuery(subpage){
                this.source = '';
                this.activeName='';
                this.tableList=[];
                this.markdownURL = this.$store.state.baseURL + '/static/markdown/'+subpage+'/content.md';
                this.$http
                  .get(this.markdownURL)
                  .then(function(res){
                    this.source = res.body;
                    this.$nextTick(function(){
                        this.addID();
                        this.goAnchor(location.hash.replace(/\#/,''));
                        //this.changeDefaultAction();
                        this.$nextTick(function(){
                            this.activeName = location.hash.replace(/\#/,'');
                        });
                    });

                  },function(err){
                    this.$router.replace({name:'404'});
                  });
            },
            goAnchor(selector) {
                //console.log('selector',selector);
                if(selector){
                    let anchor = document.getElementById(selector);
                    if(anchor)
                        document.documentElement.scrollTop = anchor.offsetTop;
                }
                else
                    document.documentElement.scrollTop = 0;
            },
            menuSlect(name){
                if(location.hash.replace(/\#/,'') == name){
                    let anchor = document.getElementById(name);
                    //console.log(anchor);
                    document.documentElement.scrollTop = anchor.offsetTop;
                    return;
                }
                this.activeName = name;
                location.hash = name;
            },
            addID(){
                let list = document.querySelector('.markdown-body').querySelectorAll('h2');
                for(let i=0; i<list.length; i++){
                    var title = list[i].innerHTML.replace(/(^\s*)|(\s*$)/g,'');
                    var id = list[i].innerHTML.replace(/(^\s*)|(\s*$)/g,'').replace(/\s/g,'_').toLowerCase();
                    var item = {
                        name: id,
                        content: title
                    }
                    list[i].setAttribute('id',id);
                    if(i!=0)
                        this.tableList.push(item);
                }
                document.addEventListener('scroll', ()=> {
                    if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                        this.activeName =list[list.length-1].getAttribute('id');
                        return;
                    }
                    if(document.documentElement.scrollTop == 0){
                        this.activeName = '';
                        return;
                    }
                    for(let i=list.length-1; i>0; i--){
                        if(list[i].offsetTop - document.documentElement.scrollTop <= 0){
                            //console.log(list[i].getAttribute('id'));
                            this.activeName =list[i].getAttribute('id');
                            break;
                        }
                    }
                });
            },
            /*
            changeDefaultAction(){
                var aList = this.$el.querySelectorAll('a');
                for(let i=0; i<aList.length; i++){
                    let path = aList[i].getAttribute('href');
                    if(path.match(/\/markdownpage/)){
                        aList[i].addEventListener('click',function(e){
                            e.preventDefault();
                            e.stopPropagation();
                            let path = this.getAttribute('href');
                            let subpage = actionPath.split('/')[0].split('#')[0];
                            let id = actionPath.split('/')[0].split('#')[1];
                            this.$router.push({path:'/markdownpage/'+subpage+'#'+id});
                            //this.$router.push({name:'/markdownpage#123',params: { subpage: subpage }, query: { step: id }});
                        }.bind(this), false);
                    }
                }
            },
            */
           
        },
        mounted:function(){
            this.markdownQuery(this.$route.params.subpage);
        
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
        padding: 90px 0 200px 0px;
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
