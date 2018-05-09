<template>
    <div class="peptide-download-container">
        <div class="panel nav"><Nav/></div>
        <div class="jumbotron">
            <div class="container">
                <p class="head">Spectrum Libraries</p>
                <p class="text">These spectrum libraries are derived from the PRIDE Cluster results. They contain the consensus spectra of all reliable clusters generated from the public experiments in PRIDE Archive. Therefore, they also contain consensus spectra from labelled experiments as well as a wider array of species.</p>
                <p class="text">The PRIDE Cluster spectral libraries are available in NIST's MSP format, which is highly similar to SpectraST's sptxt format. Thereby, these spectral libaries can be read and processed by most spectral libary search tools.</p>
            </div>
        </div>
        <div class="album">
            <div class= "container">
                <div class="head">Latest Release (Release: 2015-04-01, Version: 2015-04)</div>
                <transition-group tag="ul" name="slideIn" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter">
                   <Card v-for="item in downloadList" class="item" v-bind:key = "item.id">
                        <p slot="title">{{item.title}}</p>
                        <div class="card-content">
                            <p v-for="content in item.content">{{content}}</p>
                           
                        </div>
                       <div class="button-wrapper">
                            <a>FTP Download</a>
                            <a>ASPERA Download</a>
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
                        title:'Homo sapiens',
                        content: [
                            'Common name: Human',
                            'Taxonomy: 9606',
                            'Number of spectra: 789745',
                            'Number of peptides: 189400',
                            'File Size: 299 MB'
                        ]
                    },
                    {
                        id:'2',
                        title:'Mus musculus',
                        content: [
                            'Common name: Human',
                            'Taxonomy: 9606',
                            'Number of spectra: 789745',
                            'Number of peptides: 189400',
                            'File Size: 299 MB'
                        ]
                    },
                    {
                        id:'3',
                        title:'Arabidopsis thaliana',
                        content: [
                            'Common name: Human',
                            'Taxonomy: 9606',
                            'Number of spectra: 789745',
                            'Number of peptides: 189400',
                            'File Size: 299 MB'
                        ]
                    },
                    {
                        id:'4',
                        title:'Escherichia coli',
                        content: [
                            'Common name: Human',
                            'Taxonomy: 9606',
                            'Number of spectra: 789745',
                            'Number of peptides: 189400',
                            'File Size: 299 MB'
                        ]
                    }
                    ,
                    {
                        id:'5',
                        title:'Rattus norvegicus',
                        content: [
                            'Common name: Human',
                            'Taxonomy: 9606',
                            'Number of spectra: 789745',
                            'Number of peptides: 189400',
                            'File Size: 299 MB'
                        ]
                    },
                    {
                        id:'5',
                        title:'Saccharomyces cerevisiae',
                        content: [
                            'Common name: Human',
                            'Taxonomy: 9606',
                            'Number of spectra: 789745',
                            'Number of peptides: 189400',
                            'File Size: 299 MB'
                        ]
                    },
                    {
                        id:'5',
                        title:'Bacillus subtilis',
                        content: [
                            'Common name: Human',
                            'Taxonomy: 9606',
                            'Number of spectra: 789745',
                            'Number of peptides: 189400',
                            'File Size: 299 MB'
                        ]
                    },
                    {
                        id:'5',
                        title:'Contaminants',
                        content: [
                            'Common name: Human',
                            'Taxonomy: 9606',
                            'Number of spectra: 789745',
                            'Number of peptides: 189400',
                            'File Size: 299 MB'
                        ]
                    },
                    {
                        id:'5',
                        title:'Drosophila melanogaster',
                        content: [
                            'Common name: Human',
                            'Taxonomy: 9606',
                            'Number of spectra: 789745',
                            'Number of peptides: 189400',
                            'File Size: 299 MB'
                        ]
                    },
                    {
                        id:'5',
                        title:'Salmonella typhimurium',
                        content: [
                            'Common name: Human',
                            'Taxonomy: 9606',
                            'Number of spectra: 789745',
                            'Number of peptides: 189400',
                            'File Size: 299 MB'
                        ]
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
        height: 130px;
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
        width:130px;
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