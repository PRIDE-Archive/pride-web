<template>
    <div class="nav-container">
        <div data-sticky-container>
          <header class="masthead ebi-masthead" data-sticky data-sticky-on="large" data-top-anchor="content:top" data-btm-anchor="content:bottom">
            <div class="masthead-inner row">
              <!-- local-title -->
              <div class="columns medium-2" id="local-title">
                <div class="pride-logo">
                  <a href="../../" title="Back to [service-name] homepage"><img src="//www.ebi.ac.uk/pride/resources/logos/pride_logo.jpg" alt="logo" width="128" height="128"></a>
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
              <nav >
                <ul id="local-nav" class="dropdown menu float-left" data-description="navigational">
                  <li v-for="item in subnav"><a href="../../">{{item}}</a></li>
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
            }
        },
        methods:{
            documentQuery(){
              this.$http
                  .get("/api/editpage/get")
                  .then(function(res){
                    this.title = res.body.data.nav.title;
                    this.subnav = res.body.data.nav.subnav;
                  },function(err){
                   
                  }); 
            },
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
        mounted:function(){
            this.documentQuery();
        }
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
        background-image: url('../../assets/image/menu-bg.png');
        background-color: rgba(255,255,255,0);
        border-bottom: 1px solid #ddd;
    }
    .ebi-masthead nav ul.menu li{
            border-right: 1px solid #7777776b;
    }
    .ebi-masthead nav ul.menu li:last-child{
      border: 0;
    }
    .ebi-masthead h1, .ebi-masthead a{
      color:#656665;
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
