<template>
  <div class="landingpage-container">
      <div class="panel nav"><NavBar page="landingpage"/></div>
      <div class="panel resource"><Resource/></div>
      <div class="panel statistics"><Statistics/></div>
      <div class="panel tools"><Tools/></div>
      <div class="panel news"><News/></div>
  </div>
</template>

<script>
  import NavBar from '@/components/Nav'
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
      NavBar,
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
    border-bottom: 1px solid #f3f3f3;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    margin-bottom: 1px;
  }
  .panel.resource{
    background-color: #fbfdff;
    border-bottom: 1px solid #f3f3f3;
  }
  .panel.statistics{
    border-bottom: 1px solid #f3f3f3;
  }
  .panel.tools{
    background-color: #fbfdff;
    border-bottom: 1px solid #f3f3f3;
    
  }
  .panel.news{
    border-bottom: 1px solid #f3f3f3;
  }
</style>
