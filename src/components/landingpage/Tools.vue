<template>
    <div class="tools-container">
        <h1 class="title">How to submit data</h1>
        <!--<div class="sub-title">PRIDE welcomes direct user submissions of protein and peptide identification/quantification data</div>-->
        <div></div>
        <div class="content">
            <div class="item">
                <div class="step-wrapper">
                    <Poptip trigger="hover" placement="bottom-start">
                        <div class="api" slot="content">
                            XXXXXXXXX
                            XXXXXXXXX
                        </div>
                        <div class="step">1</div>
                    </Poptip>
                    <div class="horizontal"></div>
                </div>
                <div class="description">Register</div>
            </div>
            <div class="item">
                <div class="step-wrapper">
                    <div class="step">2</div>
                    <div class="horizontal"></div>
                </div>
                <div class="description">Choose submission type</div>
            </div>
            <div class="item">
                <div class="step-wrapper">
                    <div class="step">3</div>
                    <div class="horizontal"></div>
                </div>
                <div class="description">Submit the dataset</div>
            </div>
            <div class="item">
                <div class="step-wrapper">
                    <div class="step">4</div>
                    <div class="horizontal"></div>
                </div>
                <div class="description">Accessing private data</div>
            </div>
            <div class="item">
                <div class="step-wrapper">
                    <div class="step">5</div>
                    <!--<div class="horizontal"></div>-->
                </div>
                <div class="description">Post-submission steps</div>
            </div>
        </div>
        <div class="tools-button-wrapper">
            <a class="button tools-button" @click="submitData">Submit Data</a>
        </div>
        
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
                window.location.href = 'https://www.ebi.ac.uk/pride/help/archive/submission';
                //this.$router.push({name:'submitdata'});
                /*
                this.$Message.error({content:'submit data coming soon', duration:3});
                this.$http
                  .post("/submitdata")
                  .then(function(res){
                    this.successSubmit();
                  },function(err){
                    this.failSubmit();
                  });
                */
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
        padding:90px 0;
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
        width: 80px;
        height: 80px;
        line-height: 80px;
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
    /*
    .sub-title{
        text-align: center;
        margin-bottom: 60px;
        font-size: 18px;
        font-weight: normal;
        color: #04bfbf;
    }*/
</style>
