<template>
    <div class="peptide-detail-container">
        <NavBar page="landingpage"/>
        <div class="content-container">
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="24">
                    <div class="visualization-wrapper title">
                        <div class="title-wrapper">
                            <h2 class="project-title">Consensus Peptide</h2>
                            <div class="peptide-details-wrapper">
                                <Spin fix v-if="detailsSpinShow"></Spin>
                                <h4>{{sequence}} (Charge: {{averagePrecursorCharge}}+ @ {{averagePrecursorMz}} m/z units)</h4>
                                <div class="peptide-property-wrapper">
                                    <span class="property-item">#Spectra 
                                        <Tooltip>
                                            {{numberOfSpectra}}/{{totalNumberOfSpectra}} ({{(numberOfSpectra/totalNumberOfSpectra).toFixed(3)*100}}%)
                                            <div class="tooltip-content" slot="content">
                                                {{spectraTooltip}}
                                            </div>
                                        </Tooltip>
                                    </span>
                                    <span class="property-item">#Projects
                                        <Tooltip content="Here is the prompt text">
                                            {{numberOfProjects}}/{{totalNumberOfProjects}} ({{(numberOfProjects/totalNumberOfProjects).toFixed(3)*100}}%)
                                            <div class="tooltip-content" slot="content">
                                                {{projectsTooltip}}
                                            </div>
                                        </Tooltip>
                                    </span>
                                    <span class="property-item">#Species 
                                        <Tooltip content="Here is the prompt text">
                                            {{numberOfSpecies}}/{{totalNumberOfSpecies}} ({{(numberOfSpecies/totalNumberOfSpecies).toFixed(3)*100}}%)
                                            <div class="tooltip-content" slot="content">
                                                {{speciesTooltip}}
                                            </div>
                                        </Tooltip>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="12">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Species ({{speciesNum}})</p>
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Species distribution for all the PSMs within the cluster.
                                    </div>
                                </Tooltip>
                                
                             </p>
                             <div class="card-content-pie">
                                 <Spin fix v-if="speciesSpinShow"></Spin>
                                 <PiesSecies></PiesSecies>
                             </div>
                             
                        </Card>
                    </div>
                </Col>
                <Col span="12">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Modifications ({{modificationsNum}})</p>
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Modification distribution for all the PSMs within the cluster.
                                    </div>
                                </Tooltip>
                             </p>
                             <div class="card-content-pie">
                                <Spin fix v-if="modificationSpinShow"></Spin>
                                 <Modifications></Modifications>
                             </div>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="12">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Peptides ({{peptidesNum}})</p>
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Unique peptide sequence and modification combinations within the cluster.
                                    </div>
                                </Tooltip>
                             </p>
                             <div class="card-content-table">
                                 <Spin fix v-if="peptidesSpinShow"></Spin>
                                 <Table height="295" class="peptide-detail-table" border :columns="peptidesCol" :data="peptidesData" size="small"></Table>
                             </div>
                             <!--
                             <div class="button-wrapper">
                                 <a><i class="fas fa-angle-double-left left"></i>Previous</a>
                                 <a>Next<i class="fas fa-angle-double-right right"></i></a>
                             </div>
                             -->
                        </Card>
                    </div>
                </Col>
                <Col span="12">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Original Experiments ({{originalExperimentsNum}})</p>
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Original experiements where the spectra and the PSMs from.
                                    </div>
                                </Tooltip>
                             </p>
                             <div class="card-content-table">
                                 <Spin fix v-if="originalExperimentsSpinShow"></Spin>
                                 <Table height="295" class="peptide-detail-table" border :columns="originalExperimentsCol" :data="originalExperimentsData" size="small"></Table>
                             </div>
                             <!--
                             <div class="button-wrapper">
                                 <a><i class="fas fa-angle-double-left left"></i>Previous</a>
                                 <a>Next<i class="fas fa-angle-double-right right"></i></a>
                             </div>
                             -->
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="24">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Consensus Spectrum</p>
                             <Spin fix v-if="consensusSpectrumSpinShow"></Spin>
                             <!--<p slot="extra">Species distribution for all the PSMs within the cluster.</p>-->
                             <iframe ref="lorikeetIframe" class="lorikeet-iframe" :src="iframeURL"></iframe>
                             <!--<Lorikeet></Lorikeet>-->
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    import PiesSecies from '@/components/peptidome/chart/PieSpecies.vue'
    import Modifications from '@/components/peptidome/chart/Modifications.vue'
    import NavBar from '@/components/ebi/Nav'
    import store from "@/store/store.js"
    export default {
        data () {
            return {
                iframeURL: this.$store.state.baseURL + '/static/lorikeet/html/pride.html',
                clusterIDApi:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/' + this.$route.params.id,
                clusterSpeciesApi:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/'+this.$route.params.id+'/species',
                clusterModificationApi:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/'+this.$route.params.id+'/modification',
                clusterPeptidesApi:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/'+this.$route.params.id+'/peptide',
                clusterOriginalExperimentsApi:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/'+this.$route.params.id+'/project',
                clusterConsensusSpectrum:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/'+this.$route.params.id+'/consensusSpectrum',
                blastUrl:'http://www.uniprot.org/blast/?blastQuery=',
                speciesSpinShow:true,
                modificationSpinShow:true,
                detailsSpinShow:true,
                peptidesSpinShow:true,
                originalExperimentsSpinShow:true,
                consensusSpectrumSpinShow:true,
                totalPeptides:0,
                totalProjects:0,
                peptidesCol: [
                    {
                        title: 'Peptide',
                        key: 'peptide',
                        align:'center',
                        render: (h, params) => {
                            if(params.row.peptide!=this.sequence){
                                return h('div', [
                                    h('span', {
                                        on: {
                                            click: () => {
                                                
                                            }
                                        }
                                    }, params.row.peptide),
                                ]);
                            }
                            else{
                                return h('div', [
                                    h('span', {
                                        on: {
                                            click: () => {
                                                
                                            }
                                        }
                                    }, params.row.peptide),
                                    h('Tooltip',//first item
                                        {
                                            props: {
                                                content: 'Consensus peptide',
                                            },
                                        },//second item
                                        [
                                           h('Icon', {
                                                props: {
                                                    type: 'checkmark-round',
                                                },
                                                style: {
                                                    marginLeft: '5px'
                                                },
                                            }),
                                        
                                        ]//third item
                                    ),
                                    
                                ]);
                            }
                        }
                    },
                    {
                        title: '#PSM',
                        key: 'psm',
                        sortable: true,
                        align:'center',
                        sortType:'desc',
                        render: (h, params) => {
                            return h('div', [
                                h('Tooltip',//first item
                                    {
                                        props: {
                                            content: 'Show PSMs that have this sequence and modification',
                                        },
                                    },//second item
                                    [
                                        h('a', {
                                            on: {
                                                click: () => {
                                                    //console.log(params.row);
                                                    this.$router.push({name:'psm',params:{id:this.$route.params.id},query:{sequence:params.row.peptide}});
                                                }
                                            }
                                        }, params.row.psm),
                                    
                                    ]//third item
                                ),
                                h('span', {
                                    on: {
                                        click: () => {
                                            
                                        }
                                    }
                                }, ' ('+((params.row.psm/this.totalPeptides)*100).toFixed(1) + '%)'),
                            ]);
                        }
                    },
                    {
                        title: '#Species',
                        key: 'species',
                        sortable: true,
                        align:'center',
                      
                    },
                    {
                        title: '#Projects',
                        key: 'projects',
                        sortable: true,
                        align:'center',
                       
                        render: (h, params) => {
                            return h('div', [
                                 h('Tooltip',//first item
                                    {
                                        props: {
                                            content: 'Show projects that contain this peptide',
                                        },
                                    },//second item
                                    [
                                       h('a', {
                                            on: {
                                                click: () => {
                                                    this.$router.push({name:'clusterprojects',params:{id:this.$route.params.id},query:{sequence:params.row.peptide}});
                                                }
                                            }
                                        }, params.row.projects),
                                    
                                    ]//third item
                                ),
                            ]);
                        }
                    },
                    {
                        title: 'BLAST',
                        key: 'blast',
                        align:'center',
                        width:100,
                        render: (h, params) => {
                            return h('div', [
                                /*
                                h('Button', {
                                   
                                    on: {
                                        click: () => {
                                            this.gotoBlast(params);
                                        }
                                    }
                                }, 'Blast'),
                                */
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                }, 'Blast'),
                            ]);
                        }
                    }
                ],
                peptidesData:[],
                originalExperimentsCol:[
                    {
                        title: 'Project',
                        key: 'project',
                        align:'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.$router.push({name:'dataset',params:{ id: params.row.project}});
                                        }
                                    }
                                }, params.row.project),
                            ]);
                        }
                    },
                    {
                        title: '#PSM',
                        key: 'psm',
                        sortable: true,
                        align:'center',
                        sortType:'desc',
                        render: (h, params) => {
                            return h('div', [
                                h('Tooltip',//first item
                                    {
                                        props: {
                                            content: 'Show PSMs belong to this project',
                                        },
                                    },//second item
                                    [
                                        h('a', {
                                            on: {
                                                click: () => {
                                                    this.$router.push({name:'psm',params:{id:this.$route.params.id},query:{project:params.row.project}});
                                                }
                                            }
                                        }, params.row.psm),
                                    
                                    ]//third item
                                ),
                                h('span', {
                                    on: {
                                        click: () => {
                                            
                                        }
                                    }
                                }, ' ('+((params.row.psm/this.totalProjects)*100).toFixed(1) + '%)'),
                            ]);
                        }
                    },
                    {
                        title: 'Species',
                        key: 'species',
                        sortable: true,
                        align:'center',
                    },
                    {
                        title: 'Tissues',
                        key: 'tissues',
                        sortable: true,
                        align:'center',
                    },
                    {
                        title: 'Instruments',
                        key: 'instruments',
                        align:'center'
                    }
                ],
                originalExperimentsData:[],
                sequence:'',
                averagePrecursorCharge:'',
                averagePrecursorMz:'',
                numberOfSpectra:'',
                totalNumberOfSpectra:'',
                numberOfProjects:'',
                totalNumberOfProjects:'',
                numberOfSpecies:'',
                totalNumberOfSpecies:'',
                speciesNum:'',
                modificationsNum:'',
                peptidesNum:'',
                originalExperimentsNum:''
            }
        },
        components: {
            NavBar,
            PiesSecies,
            Modifications
        },
        methods: {
           queryPeptideDetail(){
                this.$http
                  .get(this.clusterIDApi)
                  .then(function(res){
                    this.detailsSpinShow=false;
                    this.sequence=res.body.sequence;
                    this.averagePrecursorCharge=res.body.averagePrecursorCharge;
                    this.averagePrecursorMz=res.body.averagePrecursorMz.toFixed(3);
                    this.numberOfSpectra=res.body.numberOfSpectra;
                    this.totalNumberOfSpectra=res.body.totalNumberOfSpectra;
                    this.numberOfProjects=res.body.numberOfProjects;
                    this.totalNumberOfProjects=res.body.totalNumberOfProjects;
                    this.numberOfSpecies=res.body.numberOfSpecies;
                    this.totalNumberOfSpecies=res.body.totalNumberOfSpecies;
                  },function(err){

                  });
           },
           queryPeptideSpecies(){
                this.$http
                  .get(this.clusterSpeciesApi)
                  .then(function(res){
                    this.speciesSpinShow=false;
                    this.speciesNum = res.body.speciesCounts.length;
                    this.$bus.$emit('show-species', res.body.speciesCounts);
                  },function(err){

                  });
           },
           queryPeptideModification(){
                this.$http
                  .get(this.clusterModificationApi)
                  .then(function(res){
                    this.modificationSpinShow=false;
                    this.modificationsNum = res.body.modificationCounts.length;
                    this.$bus.$emit('show-modifications', res.body.modificationCounts);
                  },function(err){

                  });
           },
           queryClusterPeptides(){
                this.$http
                  .get(this.clusterPeptidesApi)
                  .then(function(res){
                    //console.log(res);
                    this.peptidesSpinShow=false;
                    this.peptidesNum = res.body.clusteredPeptides.length;
                    for(let i=0;i<res.body.clusteredPeptides.length; i++){
                        this.totalPeptides += res.body.clusteredPeptides[i].numberOfPSMs;
                        var item = {
                            peptide: res.body.clusteredPeptides[i].sequence,
                            psm: res.body.clusteredPeptides[i].numberOfPSMs,
                            species: res.body.clusteredPeptides[i].species.length,
                            projects: res.body.clusteredPeptides[i].projectAccessions.length,
                            blast: this.blastUrl+res.body.clusteredPeptides[i].sequence
                        } 
                        this.peptidesData.push(item);
                    }
                  },function(err){

                  });
           },
           queryClusterOriginalExperiments(){
                 this.$http
                  .get(this.clusterOriginalExperimentsApi)
                  .then(function(res){
                    //console.log(res.body.clusteredProjects);
                    this.originalExperimentsSpinShow=false;
                    this.originalExperimentsNum = res.body.clusteredProjects.length
                    for(let i=0;i<res.body.clusteredProjects.length; i++){
                        this.totalProjects += res.body.clusteredProjects[i].numberOfPSMs;
                        var item = {
                            project: res.body.clusteredProjects[i].accession,
                            psm: res.body.clusteredProjects[i].numberOfPSMs,
                            species: res.body.clusteredProjects[i].species.length>0 ? res.body.clusteredProjects[i].species[0] : '',
                            tissues: res.body.clusteredProjects[i].tissues.length>0 ? res.body.clusteredProjects[i].tissues[0] : '',
                            instruments: res.body.clusteredProjects[i].instruments.length>0 ? res.body.clusteredProjects[i].instruments[0] : '',
                        }
                        this.originalExperimentsData.push(item);
                    }
                    
                    
                  },function(err){

                  });
           },
           queryClusterConsensusSpectrum(){
                let peaks;
                let sequence;
                this.$http
                  .get(this.clusterConsensusSpectrum)
                  .then(function(res){
                        //console.log(res);
                        peaks = res.body.peaks;
                        if(this.sequence){
                            this.consensusSpectrumSpinShow=false;
                            sequence = this.sequence;
                            this.$refs.lorikeetIframe.contentWindow.postMessage({sequence: sequence, peaks:peaks}, "*");
                        }
                        else{
                            this.$http
                              .get(this.clusterIDApi)
                              .then(function(res){
                                //request this api again
                                this.detailsSpinShow=false;
                                this.sequence=res.body.sequence;
                                this.averagePrecursorCharge=res.body.averagePrecursorCharge;
                                this.averagePrecursorMz=res.body.averagePrecursorMz.toFixed(3);
                                this.numberOfSpectra=res.body.numberOfSpectra;
                                this.totalNumberOfSpectra=res.body.totalNumberOfSpectra;
                                this.numberOfProjects=res.body.numberOfProjects;
                                this.totalNumberOfProjects=res.body.totalNumberOfProjects;
                                this.numberOfSpecies=res.body.numberOfSpecies;
                                this.totalNumberOfSpecies=res.body.totalNumberOfSpecies;

                                //for iframe
                                this.consensusSpectrumSpinShow=false;
                                sequence = this.sequence;
                                this.$refs.lorikeetIframe.contentWindow.postMessage({sequence: sequence, peaks:peaks}, "*");
                              },function(err){

                              });
                        }
                  },function(err){

                  });
           },
           gotoBlast(data){
                location.href=this.blastUrl+data.row.peptide;
           }
        },
        computed:{
            spectraTooltip(){
                return 'Number of spectra identifying the consensus peptide ('+this.numberOfSpectra+') / Total number of spectra in the cluster ('+this.totalNumberOfSpectra+')';
            },
            projectsTooltip(){
                return 'Number of projects identifying the consensus peptide ('+this.numberOfProjects+') / Total number of projects in the cluster ('+this.totalNumberOfProjects+')';
            },
            speciesTooltip(){
                return 'Number of species assigned to the consensus peptide ('+this.numberOfSpecies+') / Total number of species in the cluster ('+this.totalNumberOfSpecies+')';
            }
       
        },
        mounted: function(){
            this.queryPeptideDetail();
            this.queryPeptideSpecies();
            this.queryPeptideModification();
            this.queryClusterPeptides();
            this.queryClusterOriginalExperiments();
            this.queryClusterConsensusSpectrum();
        },
    }
</script>
<style scoped>
    .content-container{
        padding: 50px 0;
    }
    .visualization-wrapper{
        padding: 50px 20px 0 20px;
    }
    .visualization-wrapper.title{
        padding: 0px 20px 0px 20px;
    }
    .title-wrapper{
        border-bottom: 1px solid #99999945;
    }
    .peptide-property-wrapper{
        margin: 10px 0 5px 0;
    }
    .card-content-table{
        padding: 20px 0px;
    }
    .project-title{
      margin-bottom: 40px;
      color:rgb(100, 102, 100);
    }
    .property-item{
        font-size: 14px;
        margin-right: 20px;
    }
    .button-wrapper{
        padding: 0 20px;
        display: flex;
         text-align: center;
         justify-content:space-between;
    }
    .button-wrapper a{

        padding: 6px 8px;
        font-size: 12px;
        width:80px;
        /*padding: 20px 85px;
        font-size: 24px;*/
        font-weight: 700;
        background-color: #5bc0be;
        border-radius: 3px;
        color:white;
        border-bottom-style:none;
    }
    .button-wrapper .left{
        margin-right: 2px;
    }
    .button-wrapper .right{
        margin-left: 2px;
    }
    .lorikeet-iframe{
        width: 100%;
        height: 720px;
        border-width:0;
    }
    .tooltip-content{
        white-space: normal
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
      .button-wrapper a{

            padding: 6px 6px;
            font-size: 12px;
            width:110px;

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
<style>
    .peptide-detail-table table{
        margin-bottom: 0 !important;
    }
    .peptide-detail-table table thead th{
        padding: 0 !important;
    }
    .peptide-detail-table table tbody td{
        padding: 0 !important;
    }
    .peptide-detail-table .ivu-table-body{
        height: 263px !important;
    }
    .peptide-detail-table a{
        color:#495060;
    }
    .peptide-detail-table a:hover{
        color:#5bc0be;
        border-bottom-style:dotted;
    }
    .peptide-detail-table .ivu-tooltip-inner{
        white-space:normal;
    }
</style>