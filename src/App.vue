<template>
  <div id="app">
    <defaultNav/>
     <router-view/>
    <defaultFooter/> 
  </div>
</template>

<script>
import defaultNav from '@/components/DefaultNav'
import defaultFooter from '@/components/DefaultFooter'
import '@/assets/js/iconfont.js'
export default {
  name: 'app',
  components: {
    defaultNav,
    defaultFooter
  },
  beforeRouteUpdate:function (to, from, next) {
    if(this.$route.path.indexOf('/archive/projects') == -1){
          console.log(222)
        }
    next();
  },
  mounted:function(){
    try{
        // console.log(33333333333)
        // console.log('window',window)
        // console.log('window.top',window.top)
        if(window != window.top){
          // console.log(111)
          
          // this.$Message.error({ content: 'Security Issue! Force Redirect!'});
          // window.top.location.replace(window.location)
          // alert('Security Issue! Force Redirect!')
          this.$router.push({name:'404'});
        }
        
    }
    catch(e){
      // window.top.location.replace(window.location)
      this.$router.push({name:'404'});
    }
        
  },
  watch:{
    $route(to,from){
      if(to.path.indexOf('/archive/projects') == -1){
          let ssr_Script = document.getElementById("ssr-script")
          if(ssr_Script)
            ssr_Script.remove()
        }
    }
  },
}
</script>
<style type="text/css">
  html,body {
      min-width: 720px !important;
  }
  ul {
   list-style-type: disc;
   list-style-position: outside;
  }

  ol {
     list-style-type: decimal;
     list-style-position: outside;
  }

  ul ul, ol ul {
     list-style-type: circle;
     list-style-position: outside;

  }
  ol ol, ul ol {
     list-style-type: lower-latin;
     list-style-position: outside;

  }
  .page-container .ivu-select-dropdown-list{
    margin-left: 0 !important;
  }
  .ivu-card-head p{
    font-size: 14px !important;
  }
  a{
        color:#495060;
    }
  a:hover{
      color:#5bc0be;
      border-bottom-style:dotted;
  }
  .masthead{
    background-color:white !important;
  }
  .ivu-message-notice-close{
    border-bottom-style: none !important;
  }
  .ivu-message{
    top:270px !important;
  }
  [type='text'], [type='password'], [type='date'], [type='datetime'], [type='datetime-local'], [type='month'], [type='week'], [type='email'], [type='number'], [type='search'], [type='tel'], [type='time'], [type='url'], [type='color'], textarea{
    margin: 0 !important;
  }
</style>
</style>

