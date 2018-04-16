<template>
    <div class="test-container">
       
    </div>
</template>
<script>
    
    export default {
        data () {
        
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
       
    }
</script>
<style>
 
</style>
<style scoped>
    .test-container{
        width:100%;
        height: 100%;
    }
</style>
