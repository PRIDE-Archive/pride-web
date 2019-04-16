<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="markdown-wrapper">
            <vue-markdown class="markdown-body" :source="source"></vue-markdown>
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
                markdownURL: this.$store.state.baseURL + '/static/markdown/citationPage/content.md',
            }
        },
        components: {
            NavBar,
        },
        methods:{
            markdownQuery(){
                this.$http
                  .get(this.markdownURL)
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
    }
    .markdown-wrapper{
        width: 80%;
        margin: 0 auto;
        padding: 90px 0;
    }
</style>
