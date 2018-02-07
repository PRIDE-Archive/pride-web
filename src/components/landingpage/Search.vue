<template>
    <div class="search-container">
        <Input v-model="keyword" placeholder="search" class="search-input" @on-keyup.enter.prevent="submit">
            <Select v-model="selected" slot="prepend" style="width: 80px">
                <Option value="archive">Archive</Option>
                <Option value="cluster">Cluster</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="submit"></Button>
        </Input>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                keyword:'',
                selected: 'archive',
            }
        },
        methods:{
            submit(){
                this.$Message.error({content:this.selected+' search coming soon', duration:3});
                this.$http
                  .post("/source/type")
                  .then(function(res){
                    this.successSearch();
                  },function(err){
                    this.failSearch();
                  });   
            },
            successSearch(){
                this.$Message.success({content:'success search', duration:3});
            },
            failSearch(){
                this.$Message.error({content:'error search', duration:3});
            }
        },
    }
</script>
<style scoped>
    .search-container{
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
</style>
