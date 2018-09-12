<template>
  <div class="resource-container">
    <!--<div class="resouce-title">-->
        <!--<h1>{{title}}</h1>-->
        <!--&lt;!&ndash;<p>Search through thousands of resources from Pride that are looking.</p>&ndash;&gt;-->
    <!--</div>-->
    <div class="search-container">
        <div class="normal-search-wrapper" v-if="!advanceSearchDisplay">
            <Input id="search-bar-pride" v-model="keyword" placeholder="search" size="large" @on-keyup.enter.prevent="submitSearchCondition">
                <Select v-model="selected" slot="prepend" style="width: 100px">
                    <Option value="archive">Archive</Option>
                    <Option value="peptidome">Peptidome</Option>
                </Select>
                <Button slot="append" @click="submitSearchCondition">Search</Button>
            </Input>
        </div>
        <div class="advance-search-wrapper" v-if="advanceSearchDisplay">
            <Table id="advance-search-table" border :columns="searchConditions" :data="searchItems" size="small" no-data-text="No Search Data"></Table>
            <div class="advance-search-button-wrapper">
                <div>
                    <Button class="advance-search-action" @click="advanceSearchConditoinAdd" size="small">Add</Button>
                    <Button class="advance-search-action" size="small">Search</Button>
                </div>
                <div>
                    <Button type='error' class="advance-search-action close" @click="advanceSearchToggle" size="small">Close</Button>
                </div>
            </div>
        </div>
        <div class="search-settings" v-if="!advanceSearchDisplay">
            <div class="example-wrapper">
                <a class="example-item" v-for="item in searchExample" v-bind:key = "item" @click="setSearchKeyword(item)">{{item}}></a>
            </div>
            <!--
            <div class="advance-search">
                <a @click="advanceSearchToggle">Advance</a>
            </div>
            -->
        </div>
    </div>
    <div class="button-container">
        <a class="button resource-button" @click="goToArchive">
            <span>
            <svg class="icon-archive" aria-hidden="true">
                <use xlink:href="#icon-data"></use>
            </svg>
            </span>
            <span class="resource-button-content">{{archivebutton}}</span>
        </a>
        <a class="button resource-button peptidome" @click="goToPeptidome">
            <span>
            <svg class="icon-peptidome" aria-hidden="true">
                <use xlink:href="#icon-checklist"></use>
                <!--<use xlink:href="#icon-checklist1"></use>-->
            </svg>
            </span>
            <span class="resource-button-content">{{peptidomebutton}}</span>
        </a>
    </div>
  </div>
</template>
<script>
    import store from "@/store/store.js"
    export default {
        data () {
            return {
                title:'',
                peptidomebutton:'',
                archivebutton:'',
                condition:'',
                keyword:'',
                selected:'archive',
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
                advanceSearchDisplay:false,
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
                        width: 180,
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
                searchExample:[],
                landingPageJsonURL: this.$store.state.baseURL + '/static/landingPage/landing_page.json'
            }
        },
        methods:{
            init(){
                this.initAdvanceSearch();
            },
            setSearchKeyword(item){
                console.log(item);
                this.keyword = item;
                this.submitSearchCondition();
            },
            submitSearchCondition(){
                if(this.selected == 'archive')
                    this.$router.push({name:'archive',query:{ keyword: this.keyword }});
                else if(this.selected == 'peptidome')
                    this.$router.push({name:'peptidesearch',query:{ keyword: this.keyword }});   
            },
            advanceSearchConditoinRemove (index) {
                this.searchItems.splice(index, 1);
            },
            advanceSearchConditoinAdd(){
                this.searchItems.push(Object.assign({}, this.defaultSearchCondition));
            },
            goToPeptidome(){
                this.$router.push({name:'peptidome'});
            },
            goToArchive(){
                //this.$Message.success({content:'Archive Coming Soon', duration:1});
                this.$router.push({name:'archive'});
            },
            initAdvanceSearch(){
                this.searchItems = [];
                this.advanceSearchConditoinAdd();
            },
            advanceSearchToggle(){
                this.initAdvanceSearch();
                this.advanceSearchDisplay = !this.advanceSearchDisplay;
            },
            documentQuery(){
                this.$http
                  .get(this.landingPageJsonURL)
                  .then(function(res){
                    this.title = res.body.resource.title;
                    this.searchExample = res.body.resource.searchexample;
                    this.peptidomebutton = res.body.resource.peptidomebutton;
                    this.archivebutton = res.body.resource.archivebutton;
                  },function(err){

                  });
            },
        },
        mounted(){
            this.init();
            this.documentQuery();
        }
    }
</script>
<style scoped>
    .resource-container{
        width:80%;
        height: 100%;
        position: relative;
        text-align: center;
        padding: 50px 0;
        margin:0 auto;
        display: flex;
        flex-direction: column;
        /*background-image: url("~/src/assets/image/bioinformatics-slide-slide-1-Slideviewer.jpg");
        background-position: center center;
        background-size: cover;*/
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
    .resouce-title{
        margin-bottom: 50px;
    }
    .resouce-title h1{
        color: #656665;
        font-size: 3.14285714em;
        font-weight: bold;
        font-family: Open Sans,Helvetica,Arial,sans-serif;
        margin-bottom: 20px;
    }
    .resouce-title p{
        font-weight: 400;
        color: gray;
        font-size: 20px;
    }

    .button-container{
        display: flex;
         align-items: center; 
        justify-content: center;
            flex-direction: column;
        
    }
    .search-container{
        margin: 0 auto 10px auto;
        width:100%;
        text-align: center;
        border-radius:6px;
        padding:50px;
        background:#fbfdff;
    }
    .resource-button{
        padding: 30px 105px 30px 105px;
        font-size: 18px;
        width: 80%;
        /*padding: 20px 85px;
        font-size: 24px;*/
        font-weight: 700;
        margin: 0 0 40px 0;
        background-color: #5bc0be;
        border-radius: 6px;
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .resource-button.peptidome{
        background-color: #ef7831;
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
        width: 70px;

    }
    .advance-search-button-wrapper .advance-search-action:hover{
        opacity:.8 !important;
        background-color: #3cc1c1 !important;
        border-color: #3cc1c1 !important;
    }
    .advance-search-button-wrapper .advance-search-action.close:hover{
        opacity:1!important;
        background-color: #f16543 !important;
        border-color: #f16543 !important;
    }
    .advance-search-button-wrapper{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    .advance-search-button-wrapper button{
        width: 50px !important;
        padding: 2px 0 !important;
    }
    .icon-archive {
       width: 4em; height: 4em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
       margin-bottom: 20px;
    }
    .icon-peptidome {
       width: 4em; height: 4em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
       margin-bottom: 20px;
    }
    .resource-button-content{
        font-size: 20px;
    }
    @media (min-width: 768px) {
        .resource-container{
            width: 750px;
        }
        .resource-button{
            width: 380px;
            margin: 40px 30px 0 30px;
        }
    }
    @media (min-width: 992px) {
        .resource-container{
            width: 970px;
        }
        .button-container{
            flex-direction: row
        }
    }
    @media (min-width: 1200px) {
        .resource-container{
            width: 1170px;
        }
        .item-container{
            /*margin: 15px 50px;*/
        }
    }

    @media (min-width: 1600px) {
        .resource-container{
            width: 1300px;
        }
    }
</style>
<style>
    #search-bar-pride .ivu-input-group-prepend{
        background-color: #5bc0be !important;
    }
    #search-bar-pride .ivu-input-group-prepend span{
        font-weight:700;
    }
    #search-bar-pride .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
        color: white !important;
    }
    #search-bar-pride .ivu-select{
        color: white !important;
    }
    #search-bar-pride .ivu-input-group-append{
        background-color: #5bc0be !important;
        color: #f8f8f8 !important;
        width:100px;
    }
    #search-bar-pride .ivu-input-group-append span{
        font-weight:700;
        /*font-size: .85714286em;*/
    }
    #search-bar-pride .ivu-select-arrow{
        color: #f8f8f8 !important;
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
