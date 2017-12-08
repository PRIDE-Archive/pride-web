<template>
    <div class="search-panel-container">
        <Input v-model="keyword" class="search-input">
            <Select v-model="selected" slot="prepend" style="width: 80px">
                <Option value="archive">Archive</Option>
                <Option value="cluster">Cluster</Option>
            </Select>
            <Button slot="append" icon="ios-search"></Button>
        </Input>
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
    .search-panel-container{
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
