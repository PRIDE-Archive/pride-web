<template>
    <div class="peptide-detail-container">
        <NavBar page="landingpage"/>
        <div class="content-container">
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="24">
                    <div class="visualization-wrapper title">
                        <div class="title-wrapper">
                            <!--<h2 class="project-title">Peptide</h2>-->
                            <!-- <div class="peptide-details-wrapper">
                                <Spin fix v-if="detailsSpinShow"></Spin>
                                <h4>{{sequence}}</h4>
                                <h4>(Protein: {{proteinAccession}}, Best PEP: {{averagePrecursorCharge}})</h4>
                                <div class="peptide-property-wrapper">
                                    <span class="property-item">#PSMs
                                        <Tooltip>
                                            {{numberOfSpectra}}
                                            <div class="tooltip-content" slot="content">
                                                {{spectraTooltip}}
                                            </div>
                                        </Tooltip>
                                    </span>
                                    <span class="property-item">#Projects
                                        <Tooltip content="Here is the prompt text">
                                            {{numberOfProjects}}
                                            <div class="tooltip-content" slot="content">
                                                {{projectsTooltip}}
                                            </div>
                                        </Tooltip>
                                    </span>
                                    <span class="property-item">#Diseases
                                        <Tooltip content="Here is the prompt text">
                                            {{tissuesNum}}
                                            <div class="tooltip-content" slot="content">
                                                {{tissuesNum}}
                                            </div>
                                        </Tooltip>
                                    </span>
                                </div>
                            </div> -->
                            <div class="peptide-details-wrapper">
                                <div class="peptide-details-item">
                                    <span class="name"">Peptide</span>
                                    <span class="content" style="border-left-color: #a1cda1;">{{sequence}}</span>
                                </div>
                                <div class="peptide-details-item">
                                    <span class="name">Uniprot Accession</span>
                                    <span class="content" style="border-left-color: #8585ff;">{{proteinAccession}}</span>
                                </div>
                                <div class="peptide-details-item">
                                    <span class="name">Gene</span>
                                    <span class="content" style="border-left-color: #cbe4d8;">{{gene}}</span>
                                </div>
                                <div class="peptide-details-item">
                                    <span class="name">Protein Name</span>
                                    <span class="content" style="border-left-color: #7ecd9f;">{{proteinName}}</span>
                                </div>
                                <div class="peptide-details-item">
                                    <span class="name">Organism</span>
                                    <span class="content" style="border-left-color: #ff8585;">{{organism}}</span>
                                </div>
                                <div class="peptide-details-item">
                                    <span class="name">Evidences</span>
                                    <span class="content" style="border-left-color: #dcd8b2;">{{numberOfSpectra}} PSM, {{numberOfProjects}} Projects</span>
                                </div>
                                <div class="peptide-details-item">
                                    <span class="name">Status</span>
                                    <span class="content" style="border-left-color: #eca39c;">{{averagePrecursorCharge}}</span>
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
                             <p slot="title">Diseases ({{speciesNum}})</p>
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Diseases distribution for all the projects.
                                    </div>
                                </Tooltip>
                                
                             </p>
                             <div class="card-content-pie">
                                 <Spin fix v-if="diseasesSpinShow"></Spin>
                                 <PieDiseases></PieDiseases>
                             </div>
                             
                        </Card>
                    </div>
                </Col>
                <Col span="12">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Tissues ({{tissuesNum}})</p>
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Tissues distribution for all the projects.
                                    </div>
                                </Tooltip>
                             </p>
                             <div class="card-content-pie">
                                <Spin fix v-if="tissuesSpinShow"></Spin>
                                 <PieTissues></PieTissues>
                             </div>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="24">
                    <div class="visualization-wrapper">
                        <Card>
                             <p slot="title">Modification</p>
                             <p slot="extra">
                                <Tooltip>
                                    <i class="fas fa-info-circle"></i>
                                    <div class="tooltip-content" slot="content">
                                        Modifications to show PTMs
                                    </div>
                                </Tooltip>
                             </p>
                             <div class="card-content-table">
                                 <Spin fix v-if="detailsSpinShow"></Spin>
                                 <ScatterPTMs></ScatterPTMs>
                             </div>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center" class="code-row-bg">
                <!-- <Col span="12">
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
                        </Card>
                    </div>
                </Col> -->
                <Col span="24">
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
                                 <Spin fix v-if="detailsSpinShow"></Spin>
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
                             <div class="spectrum-container">
                               <div style="color:#bdbdbd; text-align: center;">
                                  <!-- {{spectrumTableHint}} -->
                               </div>
                             </div>
                             <!-- <iframe ref="lorikeetIframe" class="lorikeet-iframe" :src="iframeURL"></iframe> -->
                             <!--<Lorikeet></Lorikeet>-->
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    import PieDiseases from '@/components/chart/PieSpecies.vue'
    import Modifications from '@/components/chart/Modifications.vue'
    import NavBar from '@/components/Nav'
    import store from "@/store.js"
    import PieTissues from "@/components/chart/PieTissues.vue"
    import ScatterPTMs from "@/components/chart/ScatterPTMs.vue" 
    export default {
        data () {
            return {
                iframeURL: this.$store.state.baseURL + '/lorikeet/html/pride.html',
                clusterIDApi: this.$store.state.baseApiURL + '/peptidedetails',
                // clusterSpeciesApi:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/'+this.$route.params.id+'/species',
                // clusterModificationApi:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/'+this.$route.params.id+'/modification',
                clusterPeptidesApi:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/'+this.$route.params.id+'/peptide',
                // clusterOriginalExperimentsApi:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/'+this.$route.params.id+'/project',
                clusterConsensusSpectrum:'https://www.ebi.ac.uk/pride/ws/cluster/cluster/'+this.$route.params.id+'/consensusSpectrum',
                europmcUrl:'https://europepmc.org/article/MED/',
                diseasesSpinShow:false,
                tissuesSpinShow:false,
                detailsSpinShow:true,
                peptidesSpinShow:false,
                originalExperimentsSpinShow:false,
                consensusSpectrumSpinShow:false,
                totalPeptides:0,
                // totalProjects:0,
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
                                            this.gotoEuroPMC(params);
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
                    // {
                    //     title: '#PSM',
                    //     key: 'psm',
                    //     sortable: true,
                    //     align:'center',
                    //     sortType:'desc',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h('Tooltip',//first item
                    //                 {
                    //                     props: {
                    //                         content: 'Show PSMs belong to this project',
                    //                     },
                    //                 },//second item
                    //                 [
                    //                     h('a', {
                    //                         on: {
                    //                             click: () => {
                    //                                 this.$router.push({name:'psm',params:{id:this.$route.params.id},query:{project:params.row.project}});
                    //                             }
                    //                         }
                    //                     }, params.row.psm),
                                    
                    //                 ]//third item
                    //             ),
                    //             h('span', {
                    //                 on: {
                    //                     click: () => {
                                            
                    //                     }
                    //                 }
                    //             }, ' ('+((params.row.psm/this.totalProjects)*100).toFixed(1) + '%)'),
                    //         ]);
                    //     }
                    // },
                    {
                        title: 'Title',
                        key: 'title',
                        sortable: true,
                        align:'center',
                    },
                    {
                        title: 'Instruments',
                        key: 'instruments',
                        align:'center'
                    },
                    {
                        title: 'Diseases',
                        key: 'diseases',
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
                        title: 'Pubmed ID',
                        key: 'pubmedid',
                        sortable: true,
                        align:'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {this.gotoEuroPMC(params.row.pubmedid);}
                                    }
                                }, params.row.pubmedid),
                            ]);
                        }
                    },
                    
                ],
                originalExperimentsData:[],
                sequence:'',
                proteinAccession: '',
                averagePrecursorCharge:'',
                averagePrecursorMz:'',
                numberOfSpectra:'',
                totalNumberOfSpectra:'',
                numberOfProjects:'',
                totalNumberOfProjects:'',
                numberOfSpecies:'',
                totalNumberOfSpecies:'',
                speciesNum:'',
                tissuesNum:'',
                modificationsNum:'',
                peptidesNum:'',
                originalExperimentsNum:'',
                organism:'',
                proteinName:'',
                gene:''
            }
        },
        components: {
            PieTissues,
            NavBar,
            PieDiseases,
            Modifications,
            ScatterPTMs
        },
        methods: {
           queryPeptideDetail(){
                let query = {
                    peptideSequence: this.$route.query.keyword,
                    proteinAccession: this.$route.query.proteinAccession
                }
                this.$http
                  .get(this.clusterIDApi,{params:query })
                  .then(function(res){
                        this.detailsSpinShow=false;
                        console.log('aaaa',res.body)
                        let body = res.body
                        this.sequence=body.peptideSequence;
                        this.proteinAccession = body.proteinAccession;
                        this.numberOfSpectra = body.psmsCount;
                        this.numberOfProjects = body.projects.length;
                        this.averagePrecursorCharge = body.bestSearchEngineScore;
                        this.organism = body.organism;
                        this.proteinName = body.proteinName;
                        this.gene = body.gene || 'NULL';
                        // this.averagePrecursorMz=res.body.averagePrecursorMz.toFixed(3);
                        // this.numberOfSpectra=res.body.numberOfSpectra;
                        // this.totalNumberOfSpectra=res.body.totalNumberOfSpectra;
                        // this.numberOfProjects=res.body.numberOfProjects;
                        // this.totalNumberOfProjects=res.body.totalNumberOfProjects;
                        // this.numberOfSpecies=res.body.numberOfSpecies;
                        // this.totalNumberOfSpecies=res.body.totalNumberOfSpecies;


                        // for Original Experiments Table
                        this.originalExperimentsNum = body.projects.length
                        for(let i=0; i<body.projects.length; i++){
                            var item = {
                                project: body.projects[i].accession,
                                title: body.projects[i].title,
                                instruments: body.projects[i].instruments.length>0 ? body.projects[i].instruments[0] : '',
                                diseases: body.projects[i].diseases.length>0 ? body.projects[i].diseases[0] : '',
                                tissues: body.projects[i].tissues.length>0 ? body.projects[i].tissues[0] : '',
                                pubmedid: body.projects[i].pubmedIds.length>0 ? body.projects[i].pubmedIds[0] : '',
                                // psm: res.body.clusteredProjects[i].numberOfPSMs,
                                // species: res.body.clusteredProjects[i].species.length>0 ? res.body.clusteredProjects[i].species[0] : '',
                            }
                            this.originalExperimentsData.push(item);
                        }
                        // PTMS
                        let ptmsData = {
                            sequence:body.peptideSequence,
                            ptms:body.ptmsMap
                        }
                        this.$bus.$emit('show-scatter', ptmsData)



                    let diseases = {}
                    let tissues  = {}
                    for(let i=0; i< body.projects.length; i++){
                      let project = body.projects[i]
                      for( let j = 0; j < project.diseases.length; j++){
                        if(project.diseases[j] in diseases){
                          diseases[project.diseases[j]] = diseases[project.diseases[j]] + 1
                        }else{
                          diseases[project.diseases[j]] = 1
                        }
                      }
                      for( let j = 0; j < project.tissues.length; j++){
                        if(project.tissues[j] in tissues){
                          tissues[project.tissues[j]] = tissues[project.tissues[j]] + 1
                        }else{
                          tissues[project.tissues[j]] = 1
                        }
                      }
                    }

                    let diseasesList = []
                    for(var key in diseases){
                      var item = {
                        speciesName: key,
                        count: diseases[key]
                      }
                      diseasesList.push(item)
                    }

                    let tissuesList = []
                    for(var key in tissues){
                      var item = {
                        speciesName: key,
                        count: tissues[key]
                      }
                      tissuesList.push(item)
                    }

                    this.speciesNum = diseasesList.length;
                    this.tissuesNum = tissuesList.length;

                    this.$bus.$emit('show-diseases', diseasesList)
                    this.$bus.$emit('show-tissues', tissuesList);

                    this.$http
                          .get('https://www.ebi.ac.uk/pride/ws/archive/v2/spectrum?usi='+body.bestUsis[0])
                          .then(function(res){
                                this.consensusSpectrumSpinShow=false;
                                // console.log(res.body)
                                let psm = res.body;
                                let peptideSequence = psm.peptideSequence;
                                let charge = psm.charge;
                                let precursorMZ = psm.precursorMZ;
                                let peaks;
                                let variableMods;

                                //add peaks for item
                                if(psm.intensities){
                                  let peaksArray = [];
                                  for(let j=0; j<psm.intensities.length; j++){
                                      let item = {
                                        mz:psm.mzs[j],
                                        intensity:psm.intensities[j]
                                      }
                                      peaksArray.push(item)
                                  }
                                  peaks = peaksArray;
                                }
                                //add variableMods for item
                                if(psm.ptms){
                                  let variableModsArray = [];
                                  for(let j=0; j<psm.ptms.length; j++){
                                      for(let k=0; k<psm.ptms[j].positionMap.length; k++){
                                          let item = {
                                            index:psm.ptms[j].positionMap[k].key,
                                            modMass:parseFloat(psm.ptms[j].modification.value),
                                            aminoAcid: psm.peptideSequence.split('')[psm.ptms[j].positionMap[k].key-1]
                                          };
                                          variableModsArray.push(item)
                                      }
                                  }
                                  variableMods = variableModsArray;
                                }
                                // sequence = this.sequence;
                                this.showSpectrum(true, peptideSequence, peaks, charge, precursorMZ, variableMods)
                                // this.$refs.lorikeetIframe.contentWindow.postMessage({sequence: sequence, peaks:peaks}, "*");
                          },function(err){
                                this.consensusSpectrumSpinShow=false;
                          });                               
                  },function(err){
                  });
           },
           // queryPeptideSpecies(){
           //      this.$http
           //        .get(this.clusterSpeciesApi)
           //        .then(function(res){
           //          this.diseasesSpinShow=false;
           //          this.speciesNum = res.body.speciesCounts.length;
           //          this.$bus.$emit('show-diseases', res.body.speciesCounts);
           //        },function(err){
           //
           //        });
           // },
           // queryPeptideModification(){
           //      this.$http
           //        .get(this.clusterModificationApi)
           //        .then(function(res){
           //          this.modificationSpinShow=false;
           //          this.modificationsNum = res.body.modificationCounts.length;
           //          this.$bus.$emit('show-modifications', res.body.modificationCounts);
           //        },function(err){
           //
           //        });
           // },
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
           // queryClusterOriginalExperiments(){
           //       this.$http
           //        .get(this.clusterIDApi,)
           //        .then(function(res){
           //          //console.log(res.body.clusteredProjects);
           //          this.originalExperimentsSpinShow=false;
           //          this.originalExperimentsNum = res.body.clusteredProjects.length
           //          for(let i=0;i<res.body.clusteredProjects.length; i++){
           //              this.totalProjects += res.body.clusteredProjects[i].numberOfPSMs;
           //              var item = {
           //                  project: res.body.clusteredProjects[i].accession,
           //                  psm: res.body.clusteredProjects[i].numberOfPSMs,
           //                  species: res.body.clusteredProjects[i].species.length>0 ? res.body.clusteredProjects[i].species[0] : '',
           //                  tissues: res.body.clusteredProjects[i].tissues.length>0 ? res.body.clusteredProjects[i].tissues[0] : '',
           //                  instruments: res.body.clusteredProjects[i].instruments.length>0 ? res.body.clusteredProjects[i].instruments[0] : '',
           //              }
           //              this.originalExperimentsData.push(item);
           //          }
                    
                    
           //        },function(err){

           //        });
           // },
           // queryClusterConsensusSpectrum(){
           //      let peaks;
           //      let sequence;
           //      this.$http
           //        .get(this.clusterConsensusSpectrum)
           //        .then(function(res){
           //                  this.$http
           //                    .get(this.clusterIDApi)
           //                    .then(function(res){
           //                      //request this api again
           //                      this.detailsSpinShow=false;
           //                      this.sequence=res.body.sequence;
           //                      this.averagePrecursorCharge=res.body.averagePrecursorCharge;
           //                      this.averagePrecursorMz=res.body.averagePrecursorMz.toFixed(3);
           //                      this.numberOfSpectra=res.body.numberOfSpectra;
           //                      this.totalNumberOfSpectra=res.body.totalNumberOfSpectra;
           //                      this.numberOfProjects=res.body.numberOfProjects;
           //                      this.totalNumberOfProjects=res.body.totalNumberOfProjects;
           //                      this.numberOfSpecies=res.body.numberOfSpecies;
           //                      this.totalNumberOfSpecies=res.body.totalNumberOfSpecies;
           //                      //for iframe
           //                      this.$http
           //                            .get('https://www.ebi.ac.uk/pride/archive/spectra?usi='+res.body.bestUsis[0])
           //                            .then(function(res){
           //                                  this.consensusSpectrumSpinShow=false;
           //                                  console.log(res.body)
           //                                  // sequence = this.sequence;
           //                                  // this.$refs.lorikeetIframe.contentWindow.postMessage({sequence: sequence, peaks:peaks}, "*");
           //                            },function(err){
           //                                  this.consensusSpectrumSpinShow=false;
           //                            });                               
           //                    },function(err){

           //                    });
                       
           //        },function(err){

           //        });
           // },
           gotoEuroPMC(pubmed_id){
                location.href=this.europmcUrl+pubmed_id;
           },
           showSpectrum(val, peptideSequence, peaks, charge, precursorMZ,variableMods){
              if(val){
                  let iframeDom = document.querySelector("#lorikeetIframe");
                  if(peptideSequence){ 
                      if(iframeDom)
                        iframeDom.remove();
                      
                      this.spectrumSpinShow = true;
                      this.spectrumTableShow=false;
                      let iframe = document.createElement('iframe');
                      iframe.src = this.iframeURL;
                      iframe.id = 'lorikeetIframe'
                      iframe.className = 'lorikeet-iframe'
                      iframe.style.width = '100%'
                      iframe.style.height = '940px'
                      iframe.style.borderWidth = '0';
                      document.querySelector(".spectrum-container").appendChild(iframe)
                      document.querySelector("#lorikeetIframe").onload = ()=>{
                        this.spectrumTableShow=true;
                        this.spectrumSpinShow = false;
                        //console.log(peptideSequence,peaks)
                        document.querySelector("#lorikeetIframe").contentWindow.postMessage({sequence: peptideSequence, peaks:peaks, charge: charge, precursorMz: precursorMZ, variableMods:variableMods, /*width:window.innerWidth-1000can not calculate dynamically*/}, "*");
                      }
                      document.querySelector("#lorikeetIframe").onerror = ()=> {
                          this.spectrumTableShow= false;
                          this.spectrumSpinShow = false;
                          this.$Message.error({content:'Spectrum Error', duration:3});
                      };
                  }
                  else{
                      this.spectrumTableShow = false;
                      this.spectrumSpinShow = false;
                  }
              }
              else{
                  this.spectrumSpinShow = false;
                  this.spectrumTableShow=false;
                  document.querySelector("#lorikeetIframe").remove();
              }
            },
        },
        computed:{
            spectraTooltip(){
                return 'Number of identified PSMs for this peptide';
            },
            projectsTooltip(){
                return 'Number of projects identifying this peptide';
            }
        },
        mounted: function(){
            // console.log(this.$route)
            this.queryPeptideDetail();
            // this.queryPeptideSpecies();
            // this.queryPeptideModification();
            this.queryClusterPeptides();
            // this.queryClusterOriginalExperiments();
            // this.queryClusterConsensusSpectrum();
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
    .peptide-details-item{    
        display: flex;
        align-items: center;
        height: 30px;
        margin-bottom: 4px;
    }
    .peptide-details-item .name{
        font-size: 16px;
        height: 100%;
        color: #5bc0be;
        display: flex;
        align-items: center;
        width: 132px;
        /*justify-content: flex-end;*/
    }
    .peptide-details-item .content{
        border-left-width: 4px;
        padding-left: 4px;
        border-left-style: solid;
        box-sizing: border-box;
        margin-left: 4px;
        height: 100%;
        display: flex;
        align-items: center;
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