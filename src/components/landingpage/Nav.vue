<template>
    <div class="nav-container">
        <div data-sticky-container>
          <header id="masthead" class="masthead ebi-masthead" data-sticky data-sticky-on="large" data-top-anchor="content:top" data-btm-anchor="content:bottom">
            <div class="masthead-inner row">
              <!-- local-title -->
              <div class="columns medium-2" id="local-title">
                <div class="pride-logo">
                  <a href="../../" title="Back to [service-name] homepage"><img src="//www.ebi.ac.uk/pride/resources/logos/pride_logo.jpg" alt="logo" width="128" height="128"></a>
                </div>
              </div>
              <!-- /local-title -->
              <div class="columns medium-10">
                <span id="quickgo-header-subtext"><h1 ng-hide="location.path()!=='/'" class="landingpage-title">PRIDE Cluster and PRIDE Archive</h1></span>
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
              <nav >
                <ul id="local-nav" class="dropdown menu float-left" data-description="navigational">
                  <li><a href="../../">Home</a></li>
                  <li><a href="../../">Contact</a></li>
                  <li><a href="../../">About</a></li>
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

    .ebi-fieldset{
        border: 0 !important;
    }
    .ebi-masthead{
        background-color: rgb(9, 177, 177) !important;
    }
    .landingpage-title{
      font-size: 3rem;
      font-weight:300;
      font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
    }
    .pride-logo{
      margin-bottom: 20px;
    }
</style>
