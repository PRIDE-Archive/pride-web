<template>
    <div class="tools-container">
        <h1 class="title">{{title}}</h1>
        <!--<div class="sub-title">PRIDE welcomes direct user submissions of protein and peptide identification/quantification data</div>-->
        <div></div>
        <div class="content">
            <div class="item">
                <div class="step-wrapper">
                    <Poptip trigger="hover" placement="bottom" width="200">
                        <div class="api" slot="content">
                            <div class="hover-content">
                                <p>{{stepHoverContent.one}}</p>
                            </div>
                            <Button class="detailed-step-more-button" @click="submitDataDetails(moreID.one)">MORE</Button>
                        </div>
                        <div class="step">1</div>
                    </Poptip>
                    <div class="horizontal"></div>
                </div>
                <div class="description">{{step.one}}</div>
            </div>
            <div class="item">
                <div class="step-wrapper">
                    <Poptip trigger="hover" placement="bottom" width="200">
                        <div class="api" slot="content">
                            <div class="hover-content">
                                {{stepHoverContent.two}}
                            </div>
                            <Button class="detailed-step-more-button" @click="submitDataDetails(moreID.two)">MORE</Button>
                        </div>
                        <div class="step">2</div>
                    </Poptip>
                    <div class="horizontal"></div>
                </div>
                <div class="description">{{step.two}}</div>
            </div>
            <div class="item">
                <div class="step-wrapper">
                    <Poptip trigger="hover" placement="bottom" width="200">
                        <div class="api" slot="content">
                            <div class="hover-content">
                                {{stepHoverContent.three}}
                            </div>
                            <Button class="detailed-step-more-button" @click="submitDataDetails(moreID.three)">MORE</Button>
                        </div>
                        <div class="step">3</div>
                    </Poptip>
                    <div class="horizontal"></div>
                </div>
                <div class="description">{{step.three}}</div>
            </div>
            <div class="item">
                <div class="step-wrapper">
                    <Poptip trigger="hover" placement="bottom" width="200">
                        <div class="api" slot="content">
                            <div class="hover-content">
                                {{stepHoverContent.four}}
                            </div>
                            <Button class="detailed-step-more-button" @click="submitDataDetails(moreID.four)">MORE</Button>
                        </div>
                        <div class="step">4</div>
                    </Poptip>
                    <div class="horizontal"></div>
                </div>
                <div class="description">{{step.four}}</div>
            </div>
            <div class="item">
                <div class="step-wrapper">
                    <Poptip trigger="hover" placement="bottom" width="200">
                        <div class="api" slot="content">
                            <div class="hover-content">
                                {{stepHoverContent.five}}
                            </div>
                            <Button class="detailed-step-more-button" @click="submitDataDetails(moreID.five)">MORE</Button>
                        </div>
                        <div class="step">5</div>
                    </Poptip>
                </div>
                <div class="description">{{step.five}}</div>
            </div>
        </div>
        <div class="tools-button-wrapper">
            <a class="button tools-button" @click="download">{{submitdatabutton}}</a>
        </div>

    </div>
</template>
<script>
    import store from "@/store/store.js"
    export default {
        data () {
            return {
                title:'',
                keyword:'',
                submitdatabutton:'',
                selected: 'archive',
                value12: '',
                value13: '',
                select1: 'http',
                select2: 'com',
                select3: 'day',
                step:{
                    one: '',
                    two: '',
                    three: '',
                    four: '',
                    five: ''
                },
                stepHoverContent:{
                    one: '',
                    two: '',
                    three: '',
                    four: '',
                    five: ''
                },
                moreID:{
                    one: '',
                    two: '',
                    three: '',
                    four: '',
                    five: ''
                },
                landingPageJsonURL: this.$store.state.baseURL + '/static/landingPage/landing_page.json',
                markdownFolder:''
            }
        },
        methods:{
            submitDataDetails(name){
                let subpage = this.markdownFolder;
                let id = name;
                this.$router.push({path:'/markdownpage/'+subpage+'#'+id});
            },
            successSubmit(){
                this.$Message.success({content:'success submit', duration:3});
            },
            failSubmit(){
                this.$Message.error({content:'error submit', duration:3});
            },
            documentQuery(){
                this.$http
                  .get(this.landingPageJsonURL)
                  .then(function(res){
                    this.title = res.body.tools.title;
                    this.step.one = res.body.tools.step.one;
                    this.step.two = res.body.tools.step.two;
                    this.step.three = res.body.tools.step.three;
                    this.step.four = res.body.tools.step.four;
                    this.step.five = res.body.tools.step.five;
                    this.stepHoverContent.one = res.body.tools.stephovercontent.one;
                    this.stepHoverContent.two = res.body.tools.stephovercontent.two;
                    this.stepHoverContent.three = res.body.tools.stephovercontent.three;
                    this.stepHoverContent.four = res.body.tools.stephovercontent.four;
                    this.stepHoverContent.five = res.body.tools.stephovercontent.five;
                    this.submitdatabutton = res.body.tools.submitdatabutton;
                    this.moreID.one = res.body.tools.moreID.one;
                    this.moreID.two = res.body.tools.moreID.two;
                    this.moreID.three = res.body.tools.moreID.three;
                    this.moreID.four = res.body.tools.moreID.four;
                    this.moreID.five = res.body.tools.moreID.five;
                    this.markdownFolder = res.body.tools.markdownFolder;
                  },function(err){

                  });
            },
            download(){
                this.$Modal.confirm({
                    title: 'Submission Tool',
                    content: '<p>Do you want to download the PRIDE Submission Tool?</p>',
                    onOk: () => {
                        window.location.href=" http://ftp.pride.ebi.ac.uk/pride/resources/tools/submission-tool/latest/desktop/px-submission-tool.zip"
                       
                    },
                    onCancel: () => {
                        
                    }
                });
            }
            
        },
        mounted:function(){
            this.documentQuery();
        }
    }
</script>
<style scoped>
    .tools-container{
        width:100%;
        height: 100%;
        padding: 50px 0;
    }
    .search-input{
        width:500px;
    }
    h1{
        color: #656665;
        font-size: 3.14285714em;
        font-weight: bold;
        font-family: Open Sans,Helvetica,Arial,sans-serif;
        margin-bottom: 50px;
        text-align: center;
    }
    .tools-button{
        margin: 0 auto;
        padding: 20px 85px;
        text-decoration: none;
        text-transform: uppercase;
        background-color: #5bc0be;
        font-size: 24px;
        border-radius: 6px;
    }
    .step-wrapper{
        position: relative;
    }
    .step{
        display: inline-block;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border-radius: 50%;
        font-size: 24px;
        background-color: #5bc0be;
        color: white;
    }
    .description{
        display: inline-block;
        font-size: 18px;
        margin-top: 20px;
    }
    .tools-button-wrapper{
        text-align: center;
        margin-top: 90px;
    }
    .content{
        text-align: center;
    }
    .item{
        display: inline-flex;
        flex-direction: column;
        margin:10px;
        width: 15%;
    }
    .item-content.citation{
      font-size: 16px;
      text-align: justify;
      /*padding: 10px 0;*/
    }
    .horizontal{
        border-right: 0;
        border-top: 2px solid;
        height: 1px;
        left: calc(50% - -52px);
        position: absolute;
        top: 40px;
        width: calc(100% - 82px);
        color: #0bb1b1b5;
        /*width: 50px;*/
    }
    {

    }
    .detailed-step-more-button{
        background: none;
        border: 1px solid #d3d3d3 !important;
        padding: 2px 6px;
        color: #656665;
        /* font-weight: 700; */
        font-size: 10px;
        margin-top: 10px;
        border-radius: 3px;
    }
    .detailed-step-more-button:hover{
        opacity: .8;
        /*
        background-color:#5bc0be;
        color:#f8f8f8;
        border: 1px solid #5bc0be !important;
        */
    }
    .hover-content{
        text-align: justify;
    }
    .api{
        text-align: right;
    }
    /*
    .sub-title{
        text-align: center;
        margin-bottom: 60px;
        font-size: 18px;
        font-weight: normal;
        color: #04bfbf;
    }*/
</style>
<style>
.step-wrapper .ivu-poptip-popper{
    top: 150px !important;
}
.step-wrapper .ivu-poptip-inner{
    white-space: normal;
}
</style>
