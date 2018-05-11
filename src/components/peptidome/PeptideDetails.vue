<template>
    <div class="peptide-detail-container">
        <Nav></Nav>
        <div class="content-container">
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="20">
                    <div class="visualization-wrapper title">
                        <div class="title-wrapper">
                            <h2 class="project-title">Consensus Peptide</h2>
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
                </Col>
            </Row>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="10">
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
                                 <PiesSecies :data="data"></PiesSecies>
                             </div>
                             
                        </Card>
                    </div>
                </Col>
                <Col span="10">
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
                                 <Modifications></Modifications>
                             </div>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="10">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Peptides</p>
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Unique peptide sequence and modification combinations within the cluster.
                                    </div>
                                </Tooltip>
                             </p>
                             <div class="card-content-table">
                                 <Table class="peptide-detail-table" border :columns="columns5" :data="data5" size="small"></Table>
                             </div>
                             <div class="button-wrapper">
                                 <a @click="sendData()"><i class="fas fa-angle-double-left left"></i>Previous</a>
                                 <a>Next<i class="fas fa-angle-double-right right"></i></a>
                             </div>
                        </Card>
                    </div>
                </Col>
                <Col span="10">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Original Experiments</p>
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Original experiements where the spectra and the PSMs from.
                                    </div>
                                </Tooltip>
                             </p>
                             <div class="card-content-table">
                                 <Table class="peptide-detail-table" border :columns="columns5" :data="data5" size="small"></Table>
                             </div>
                             <div class="button-wrapper">
                                 <a><i class="fas fa-angle-double-left left"></i>Previous</a>
                                 <a>Next<i class="fas fa-angle-double-right right"></i></a>
                             </div>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="20">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Consensus Spectrum</p>
                             <!--<p slot="extra">Species distribution for all the PSMs within the cluster.</p>-->
                             <iframe ref="lorikeetIframe" class="lorikeet-iframe" src="/static/lorikeet/html/pride.html"></iframe>
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
    import Nav from '@/components/peptidome/Nav'
    export default {
        data () {
            return {
                clusterIDApi:'https://www.ebi.ac.uk:443/pride/ws/cluster/cluster/' + this.$route.params.id,
                clusterSpeciesApi:'https://www.ebi.ac.uk:443/pride/ws/cluster/cluster/'+this.$route.params.id+'/species',
                clusterModificationApi:'https://www.ebi.ac.uk:443/pride/ws/cluster/cluster/'+this.$route.params.id+'/modification',
                columns5: [
                    {
                        title: 'Date',
                        key: 'date',
                        sortable: true
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: true
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                ],
                data5: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                ],
                data:[],
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
                modificationsNum:''
            }
        },
        components: {
            Nav,
            PiesSecies,
            Modifications
        },
        methods: {
           sendData(){
            console.log(123);
                this.$refs.lorikeetIframe.contentWindow.postMessage({width: 100, data: this.data}, location.origin);
           },
           queryPeptideDetail(){
                this.$http
                  .get(this.clusterIDApi)
                  .then(function(res){
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
                    this.speciesNum = res.body.speciesCounts.length;
                    this.$bus.$emit('show-species', res.body.speciesCounts);
                  },function(err){

                  });
           },
           queryPeptideModification(){
                this.$http
                  .get(this.clusterModificationApi)
                  .then(function(res){
                    console.log(res);
                    this.modificationsNum = res.body.modificationCounts.length;
                    
                  },function(err){

                  });
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
        padding: 20px;
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
</style>