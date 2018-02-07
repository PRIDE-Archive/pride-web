<template>
    <div class="tools-container">
        <div class="title"></div>
        <Button class="tools-button" @click="submitData">Submit Data</Button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                keyword:'',
                selected: 'archive',
                value12: '',
                value13: '',
                select1: 'http',
                select2: 'com',
                select3: 'day'
            }
        },
        methods:{
            submitData(){
                this.$Message.error({content:'submit data coming soon', duration:3});
                this.$http
                  .post("/submitdata")
                  .then(function(res){
                    this.successSubmit();
                  },function(err){
                    this.failSubmit();
                  });   
            },
            successSubmit(){
                this.$Message.success({content:'success submit', duration:3});
            },
            failSubmit(){
                this.$Message.error({content:'error submit', duration:3});
            }
        }
    }
</script>
<style scoped>
    .tools-container{
        width:100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F0F0F0;
    }
    .search-input{
        width:500px;
    }
    .tools-button{
        padding: 12px 30px 14px 30px;
        font-size: 18px;
        margin: 0 30px;
    }
</style>
