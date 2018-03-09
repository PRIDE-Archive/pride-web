<template>
  <div class="resource-container">
    <div class="search-container">
        <Input id="search-bar-pride" v-model="keyword" placeholder="search" size="large" @on-keyup.enter.prevent="submitSearchCondition">
            <Select v-model="selected" slot="prepend" style="width: 100px">
                <Option value="peptidome">Peptidome</Option>
                <Option value="archive">Archive</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="submitSearchCondition"></Button>
        </Input>
        <div class="search-settings">
            <div class="example-wrapper">
                <a class="example-item">xxx</a>
                <a class="example-item">xxx</a>
            </div>
            <div class="advance=search">
                <Poptip id="search-poptip" placement="top-end" :transfer="true" width="800" @on-popper-hide="hideAdvanceSearch">
                    <a>Advance</a>
                    <div class="api" slot="content">
                        <Table id="advance-search-table" border :columns="searchConditions" :data="searchItems" size="small" no-data-text="No Search Data"></Table>
                        <div class="advance-search-button-wrapper">
                            <Button class="advance-search-action" @click="advanceSearchConditoinAdd">Add</Button>
                            <Button class="advance-search-action">Search</Button>
                        </div>
                    </div>
                    
                </Poptip>
            </div>
            
        </div>
    </div>
    <div class="button-container">
        <a class="button resource-button" @click="showCluster">PRIDE Cluster</a>
        <a class="button resource-button" @click="showArchive">PRIDE Archive</a>
    </div>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                condition:'',
                keyword:'',
                selected:'peptidome',
                value:'',
                test:'AND',
                conditionList: ['AND','NOT','OR'],
                typeList:['All','UniProtKB AC', 'Gene name [GN]'],
                defaultSearchCondition : {
                    condition: 'AND',
                    type: 'All',
                    term: ''
                },
                searchItems: [],
                searchConditions: [
                    {
                        title: 'Condition',
                        key: 'condition',
                        width:120,
                        align: 'center',
                        render: (h, params) => {
                            return h('Select', {
                                    props: {
                                        value:this.searchItems[params.index].condition,
                                        size:"small", 
                                        style:"width:100px"
                                    },
                                    on: {
                                        'on-change': (val) => {
                                           this.searchItems[params.index].condition = val;
                                        }
                                    }
                                },
                                this.conditionList.map(function(item){
                                    return h('Option', {
                                        props: {
                                            value: item
                                        }
                                    })
                                })
                            );
                        }
                    },
                    {
                        title: 'Type',
                        key: 'type',
                        width: 300,
                        align: 'center',
                        render: (h, params) => {
                            return h('Select', {
                                    props: {
                                        value:this.searchItems[params.index].type,
                                        size:"small", 
                                    },
                                    on: {
                                        'on-change': (val) => {
                                           this.searchItems[params.index].type = val;
                                        }
                                    }
                                },
                                this.typeList.map(function(item){
                                    return h('Option', {
                                        props: {
                                            value: item
                                        }
                                    })
                                })
                            );
                        }
                    },
                    {
                        title: 'Term',
                        key: 'term',
                        align: 'center',
                        render: (h, params) => {
                            return h('Input', {
                                    props: {
                                        value:this.searchItems[params.index].term,
                                        size:"small", 
                                    },
                                    on: {
                                        'on-blur': (e) => {
                                           this.searchItems[params.index].term = e.target.value;
                                        }
                                    }
                            });
                        }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.advanceSearchConditoinRemove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
            }
        },
        methods:{
            init(){
                this.initAdvanceSearch();
            },
            submitSearchCondition(){

            },
            advanceSearchConditoinRemove (index) {
                this.searchItems.splice(index, 1);
            },
            advanceSearchConditoinAdd(){
                this.searchItems.push(Object.assign({}, this.defaultSearchCondition));
            },
            showCluster(){
                this.$Message.success({content:'Cluster Coming Soon', duration:1});
            },
            showArchive(){
                this.$Message.success({content:'Archive Coming Soon', duration:1});
            },
            initAdvanceSearch(){
                this.searchItems = [];
                this.advanceSearchConditoinAdd();
            },
            hideAdvanceSearch(){
                this.initAdvanceSearch();
            }
        },
        mounted(){
            this.init();
        }
    }
</script>
<style scoped>
    .resource-container{
        width:100%;
        height: 100%;
        position: relative;
        text-align: center;
        padding-top: 250px;
        padding-bottom: 80px;
        background-image: url("~/src/assets/image/bioinformatics-slide-slide-1-Slideviewer.jpg");
        background-position: center center; 
        background-size: cover;
    }
    .bg{
        height: 550px;
    }
    .bgone{
        background-image: url("~/src/assets/landing_page_bg/test1.jpg");
        background-position: center center; 
        background-size: cover;
    }
    .bgtwo{
        background-image: url("~/src/assets/landing_page_bg/test2.jpg");
        background-position: center center; 
        background-size: cover;
    }
    .bgthree{
        background-image: url("~/src/assets/landing_page_bg/test3.jpg");
        background-position: center center; 
        background-size: cover;
    }
    .bgfour{
        background-image: url("~/src/assets/landing_page_bg/test4.jpg");
        background-position: center center; 
        background-size: cover;
    }
    .button-container{
        text-align: center;
    }
    .search-container{
        margin: 50px  auto;
        width:800px;
        text-align: 
    }
    .resource-button{
        padding: 12px 30px 14px 30px;
        font-size: 18px;
        /*padding: 20px 85px;
        font-size: 24px;*/
        margin: 30px;
        background-color: rgb(9, 177, 177);
    }
    #search-bar-pride .ivu-select-single{
        /*width: 100px !important;*/
    }
    .search-settings{
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        font-size: 14px;
    }
    .example-item{
        margin-right: 5px;
    }
    .advance-search-button-wrapper .advance-search-action{
        color: white !important;
        margin: 10px 5px 0 0;
        width: 70px;
    }
    .advance-search-button-wrapper .advance-search-action:hover{
        opacity:.8 !important;
        background-color: #3cc1c1 !important;
        border-color: #3cc1c1 !important;
    }
 
</style>
<style>
    #search-bar-pride .ivu-input-group-prepend{
        background-color: #0bb1b1 !important;
    }
    #search-bar-pride .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
        color: white !important;
    }
    #search-bar-pride .ivu-select{
        color: white !important;
    }
    #search-bar-pride .ivu-input-group-append{
        background-color: #0bb1b1 !important;
        color: white !important;
    }
    #search-bar-pride .ivu-select-arrow{
        color: white !important;
    }
    #advance-search-table table{
        margin-bottom: 0;
    }
    #advance-search-table input{
        margin-bottom : 0px !important;
    }
    #advance-search-table .ivu-table-cell{
        padding: 0px !important;
    }
    .ivu-poptip-body-content{
        overflow: visible !important;
    }
    .ivu-poptip-body{
        padding: 15px 16px;
    }
</style>
