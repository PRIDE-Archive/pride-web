<template>
  <div class="landingpage-container">
      <div class="panel nav"><Nav/></div>
      <div class="panel resource"><Resource/></div>
      <div class="panel statistics"><Statistics/></div>
      <div class="panel tools"><Tools/></div>
      <div class="panel news"><News/></div>
  </div>
</template>

<script>
  import Nav from '@/components/landingpage/Nav'
  import Resource from '@/components/landingpage/Resource'
  import Statistics from '@/components/landingpage/Statistics'
  import Tools from '@/components/landingpage/Tools'
  import News from '@/components/landingpage/News'
  export default {
    name: 'landingpage',
    data(){
      return {
   
      }
    },
    methods:{
    
    },
    components: {
      Nav,
      Resource,
      Statistics,
      Tools,
      News
    },
    mounted: function(){
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .panel.nav{
    /*position: absolute;
    top: 37px;
    left: 0;
    right: 0;
    z-index: 1000;
    */

    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
  .panel.resource{
    border-bottom: 1px solid #f3f3f3;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
  .panel.statistics{
    /*background: #f7f8fa;*/
    background-color: #fbfdff;
    border-bottom: 1px solid #f3f3f3;
  }
  .panel.tools{
    border-bottom: 1px solid #f3f3f3;
    
  }
  .panel.news{
    background-color: #fbfdff;
    border-bottom: 1px solid #f3f3f3;
    /*background: #f7f8fa;*/
  }
</style>
