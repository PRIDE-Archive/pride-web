<template>
    <div class="nav-container">
        <div data-sticky-container>
          <header class="masthead ebi-masthead" data-sticky data-sticky-on="large" data-top-anchor="content:top" data-btm-anchor="content:bottom">
            <div class="masthead-inner row">
              <!-- local-title -->
              <div class="columns medium-5" id="local-title">
                <div class="pride-logo">
                  <a href="../../" title="Back to [service-name] homepage"><img src="/static/logo/PRIDE_Concept_2.png" alt="logo" width="300" height="300"></a>
                </div>
              </div>
              <!-- /local-title -->
              <div class="columns medium-10">
                <span id="quickgo-header-subtext"><h1 ng-hide="location.path()!=='/'" class="landingpage-title">{{title}}</h1></span>
              </div>
              <!-- local-search -->
              <!--
              <div class="columns medium-10">
                <form id="local-search" name="local-search" action="[search-action]" method="post">
                  <h4>Search this project</h4>
                  <fieldset class="ebi-fieldset">
                    <div class="input-group margin-bottom-none">
                      <input type="text" name="first" id="local-searchbox" placeholder="Search this service" class="input-group-field">
                      <div class="input-group-button">
                        <input type="submit" name="submit" value="1" class="button icon icon-functional">
                      </div>
                    </div>
                    <small class="">-->
                      <!-- If your search is more complex than just a keyword search, you can link to an Advanced Search -->
                      <!-- <span class="adv"><a href="../search" id="adv-search" title="Advanced">Advanced</a></span> | -->
                      <!-- Include some example searchterms - keep them short and few. -->
                      <!--
                      <a href="[search-url-1]">[search-1]</a>
                      <a href="[search-url-1]">[search-2]</a>
                      <a href="[search-url-1]">[search-3]</a>
                    </small>
                  </fieldset>
                </form>
              </div>
              -->
              <!-- /local-search -->
              <!-- local-nav -->
              <nav class="sub-nav-ebi">
                <ul id="local-nav" class="dropdown menu float-left" data-description="navigational">
                  <li class="sub-nav-list">
                      <Dropdown>
                          <a href="javascript:void(0)" @click="gotoPeptideHome">
                            <i class="fas fa-home"></i>
                            <span class='sub-nav-title'>Home</span> 
                          </a>
                      </Dropdown>
                  </li>
                  <li class="sub-nav-list">
                      <Dropdown>
                          <a href="javascript:void(0)" @click="gotoPeptideSearch">
                            <i class="fas fa-home"></i>
                            <span class='sub-nav-title'>Peptide Search</span> 
                          </a>
                      </Dropdown>
                      <!--
                        <Dropdown>
                            <a href="javascript:void(0)">
                              <i class="fas fa-search"></i>
                              <span class='sub-nav-title'>Resources</span> 
                              <Icon type="chevron-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>PRIDE Archive</DropdownItem>
                                <DropdownItem>PRIDE Peptidome</DropdownItem>
                                <DropdownItem>PRIDE Spectral Libraries</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                      -->
                  </li>
                  <li class="sub-nav-list">
                      <Dropdown>
                          <a href="javascript:void(0)" @click="gotoSpectrumLibrary">
                            <i class="fas fa-home"></i>
                            <span class='sub-nav-title'>Spectrum Library</span> 
                          </a>
                      </Dropdown>
                    <!--
                      <Dropdown>
                          <a href="javascript:void(0)">
                            <i class="fas fa-cogs"></i>
                            <span class='sub-nav-title'>Tools</span> 
                            <Icon type="chevron-down"></Icon>
                          </a>
                          <DropdownMenu slot="list">
                              <DropdownItem>Spectra Clustering Toolsuite</DropdownItem>
                              <DropdownItem>PRIDE Inspector Toolsuite</DropdownItem>
                              <DropdownItem>PRIDE Restful Web-services</DropdownItem>
                              <DropdownItem>PRIDE Utilities Libraries</DropdownItem>
                          </DropdownMenu>
                      </Dropdown>
                    -->
                  </li>
                  <li class="sub-nav-list">
                      <Dropdown>
                          <a href="javascript:void(0)" @click="gotoPeptideDownload">
                            <i class="fas fa-home"></i>
                            <span class='sub-nav-title'>Download</span> 
                          </a>
                      </Dropdown>
                    <!--
                      <Dropdown>
                          <a href="javascript:void(0)">
                            <i class="fas fa-graduation-cap"></i>
                            <span class='sub-nav-title'>Docs</span> 
                            <Icon type="chevron-down"></Icon>
                          </a>
                          <DropdownMenu slot="list">
                              <Dropdown placement="right-start">
                                  <DropdownItem>
                                      User Guide
                                      <Icon type="ios-arrow-right"></Icon>
                                  </DropdownItem>
                                  <DropdownMenu slot="list">
                                      <DropdownItem>PRIDE Archive</DropdownItem>
                                      <DropdownItem>PRIDE Peptidome</DropdownItem>
                                  </DropdownMenu>
                              </Dropdown>
                              <DropdownItem>PRIDE Inspector Toolsuite</DropdownItem>
                          </DropdownMenu>
                      </Dropdown>
                    -->
                  </li>
                  <li class="sub-nav-list">
                      <Dropdown>
                          <a href="javascript:void(0)" @click="gotoPeptideAPI">
                            <i class="fas fa-info-circle"></i>
                            <span class='sub-nav-title'>API</span> 
                          </a>
                      </Dropdown>
                  </li>
                </ul>
              </nav>
              <!-- /local-nav -->
            </div>
          </header>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                keyword:'',
                selected: 'archive',
                title:'',
                subnav:[],
                landingPageJsonURL:'/static/landingPage/landing_page.json'
            }
        },
        methods:{
            submit(){
                this.$Message.error({content:this.selected+' search coming soon', duration:3});
                this.$http
                  .post("/source/type")
                  .then(function(res){
                    this.successSearch();
                  },function(err){
                    this.failSearch();
                  });   
            },
            successSearch(){
                this.$Message.success({content:'success search', duration:3});
            },
            failSearch(){
                this.$Message.error({content:'error search', duration:3});
            },
            gotoPeptideHome(){
                this.$router.push({name:'peptidome'});
            },
            gotoPeptideSearch(){
                this.$router.push({name:'peptidesearch'});
            },
            gotoSpectrumLibrary(){
                this.$router.push({name:'spectrumlibrary'});
            },
            gotoPeptideDownload(){
                this.$router.push({name:'peptidedownload'});
            },
            gotoPeptideAPI(){
              this.$router.push({name:'peptidedownload'});
            }
        },
        
    }
</script>
<style scoped>
    .nav-container{
        /*
        width:100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F0F0F0;*/
    }
    .masthead-inner{
      color:#656665;
    }
    .ebi-fieldset{
        border: 0 !important;
    }
    .ebi-masthead{
        /*background-image: url('../../assets/image/menu-bg.png');*/
        background-color: #5bc0be;
        border-bottom: 1px solid #ddd;
    }
    .ebi-masthead nav ul.menu li{
        border-right: 1px solid rgb(248,248,248,0.7);
    }
    .sub-nav-list{
      padding: 0 5px;
    }
    .sub-nav-list li{
        border-right:0px !important;
        border-bottom: 1px solid #e7e7e7 !important;
    }
    .sub-nav-list li:last-child{
        border-bottom: none !important;
    }
    .ebi-masthead nav ul.menu li:last-child{
      border: 0;
    }
    .sub-nav-ebi a:hover{
        background: transparent;
         color: #f8f8f8; 
    }
    .ebi-masthead h1, .ebi-masthead a{
      color:#f8f8f8;
    }
    .landingpage-title{
      font-size: 3rem;
      font-weight:300;
      font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
    }
    .pride-logo{
      margin-bottom: 20px;
    }
    .sub-nav-ebi .ivu-dropdown-menu{
      margin-left:0 !important;
    }
    .sub-nav-title{
      margin: 0 3px;
    }
    .row{
      margin:0 auto;
     
      max-width: 150rem !important;
   }
   #local-nav{
    margin-left: 10px;
   }
</style>
<style>
   .sub-nav-ebi .sub-nav-list .ivu-select-dropdown{
      padding: 0 !important;
      border-radius: 0px !important;
    }
    .sub-nav-ebi .ivu-dropdown-item{
      float: none !important;
      font-size: 14px !important;
      padding: 12px 16px !important;
    }
    .sub-nav-ebi .ivu-dropdown-menu .ivu-dropdown{
      border-bottom: 1px solid #e7e7e7 !important;
    }
</style>
