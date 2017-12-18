<template>
    <div class="tools-container">
        <div class="title"></div>
        <Button class="tools-button">Submit Data</Button>
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
