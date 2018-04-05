<template>
    <div class="submit-data-container">
        <div class="panel nav"><Nav/></div>
        <div class="markdown-wrapper">
            <vue-markdown class="markdown-body" :source="source"></vue-markdown>
        </div>
    </div>
</template>
<script>
    import Nav from '@/components/landingpage/Nav'
    export default {
        data () {
            return {
                source: '',
            }
        },
        components: {
            Nav,
        },
        methods:{
            markdownQuery(){
                this.$http
                  .get("/static/markdown/test.md")
                  .then(function(res){
                    console.log(res);
                    this.source = res.body;
                  },function(err){
                   
                  }); 
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
        background: #F0F0F3;
    }
    .markdown-wrapper{
        width: 80%;
        margin: 0 auto;
        padding: 90px 0;
    }
</style>
