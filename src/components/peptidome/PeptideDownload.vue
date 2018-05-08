<template>
    <div class="peptide-download-container">
        <div class="panel nav"><Nav/></div>
        <div class="jumbotron">
            <div class="container">
                <p class="head">Cluster Results Files</p>
                <p class="text">These cluster results files are derived from the <a>PRIDE Cluster results</a>. They classified the PRIDE Cluster results in different files that can be use by the community for different analyses and aims. For example the Unidentified clusters with at least 100 spectra can be use to look for new peptide identifications, variants, modifications that are difficult to identified with common search engine strategies; the Phospho clusters contains all reliable phosphorilated clusters. Other files can be found in the PRIDE Cluster <a>FTP</a>.</p>
            </div>
        </div>
        <div class="album">
            <div class= "container">
                <div class="head">Latest Release (Release: 2015-04-30, Version: 2015-04)</div>
                <transition-group tag="ul" name="slideIn" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter">
                   <Card v-for="item in downloadList" class="item" v-bind:key = "item.id">
                        <p slot="title">{{item.title}}</p>
                        <div class="card-content">
                            <p v-for="content in item.content">{{content}}</p>
                           
                        </div>
                       <div class="button-wrapper">
                            <a>MGF Download</a>
                            <a>mzML Download</a>
                        </div>
                        
                   </Card>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script>
    import Nav from '@/components/peptidome/Nav'
    export default {
        data () {
            return {
                value1: '',
                downloadList: [
                    {
                        id:'1',
                        title:'Unidentified Human Clusters',
                        content: ['Unidentified human clusters with at least 100 spectra']
                    },
                    {
                        id:'2',
                        title:'Unidentified Clusters',
                        content: ['Unidentified Clusters with at least 100 spectra']
                    },
                    {
                        id:'3',
                        title:'Human Phospho clusters',
                        content: ['Human Phospho clusters with at least 3 identified spectra and a minimum ratio of 70%']
                    },
                    {
                        id:'4',
                        title:'Phospho clusters',
                        content: ['Phospho clusters with at least 3 identified spectra and a minimum ratio of 70%']
                    }
                    ,
                    {
                        id:'5',
                        title:'Incorrect Clusters',
                        content: ['Clusters with at at least 10 spectra and a ratio < 50%']
                    },
                    {
                        id:'5',
                        title:'Unidentified Mouse Clusters',
                        content: ['Unidentified mouse clusters with at least 10 spectra']
                    },
                    {
                        id:'5',
                        title:'Unidentified Rat Clusters',
                        content: ['Unidentified rat clusters with at least 10 spectra']
                    },
                    {
                        id:'5',
                        title:'Unidentified Saccharomyces Cerevisiae Clusters',
                        content: ['Unidentified saccharomyces cerevisiae clusters with at least 10 spectra']
                    },
                    {
                        id:'5',
                        title:'Unidentified Drosophila Melanogaster Clusters',
                        content: ['Unidentified drosophila melanogaster clusters with at least 10 spectra']
                    },
                    {
                        id:'5',
                        title:'Unidentified Caenorhabditis Elegans Clusters',
                        content: ['Unidentified caenorhabditis elegans clusters with at least 10 spectra']
                    }
                ]
            }
        },
        components: {
          Nav
        },
        methods: {
            beforeEnter:function(el){
              el.style['transition-delay'] = el.style['-webkit-transition-delay'] = (this._transIndex++/20)+'s';
            },
            afterEnter:function(el){
              el.removeAttribute('style');
            }
        }
    }
</script>
<style scoped>
    .jumbotron{
        text-align: center;
    }
    .jumbotron .container{
        margin: 0 auto;
        padding: 100px 50px;
        max-width: 1000px;

    }
    .jumbotron .head{
        font-size: 35px;
        font-weight: 200px;
        margin-bottom: 50px;
    }
    .jumbotron .text{
        font-size: 14px;
    }
    .item{
        display: inline-block;
        margin: 0 15px;
        margin-bottom: 30px;
        overflow: hidden;
        transition: all 0.15s ease-out;
        -webkit-transition: all 0.15s ease-out;
    }
    .album{
        padding-top: 60px;
        padding-bottom: 30px;
        background-color:#f8f9fa!important;
        
    }
    .album .container{
        width: 90%;
        margin:0 auto;
    }
    .album .container .head{
        font-size: 20px;
        margin: 0 15px;
        margin-bottom: 30px;
    }
     
    .card-content{
        height: 80px;
        display: flex;
        flex-direction:column;
    }
    .button-wrapper{
        display: flex;
         margin: 5px auto 0 auto; 
         text-align: center;
         justify-content:space-around;
    }
    .button-wrapper a{

        padding: 6px 8px;
        font-size: 12px;
        width:120px;
        /*padding: 20px 85px;
        font-size: 24px;*/
        font-weight: 700;
        background-color: #5bc0be;
        border-radius: 3px;
        color:white;
        border-bottom-style:none;
    }
    @media (max-width: 700px) { 
      .item{ 
        width: calc((100% - 0px) / 1 - 1px);
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }
    @media (max-width: 1015px) and (min-width: 701px){ 
      .item{ 
        width: calc((100% - 60px) / 2 - 1px);
      }
    }
    @media (max-width: 1510px) and (min-width: 1016px){ 
      .item{ 
        width: calc((100% - 90px) / 3 - 1px);
      }
    }
    @media (max-width: 1910px) and (min-width: 1511px){ 
      .item{ 
        width: calc((100% - 120px) / 4 - 1px);
      }
    }
    @media (min-width: 1911px){ 
      .item{ 
        width: calc((100% - 150px) / 5 - 1px);
      }
    }
</style>