<template>
  <div class="index-container">
      <div class="panel search"><Search/></div>
      <div class="panel resource"><Resource/></div>
      <div class="panel statistics"><Statistics/></div>
      <div class="panel tools"><Tools/></div>
      <div class="panel news"><News/></div>
  </div>
</template>

<script>
  import Search from '@/components/landingpage/Search'
  import Resource from '@/components/landingpage/Resource'
  import Statistics from '@/components/landingpage/Statistics'
  import Tools from '@/components/landingpage/Tools'
  import News from '@/components/landingpage/News'
  export default {
    name: 'index',
    data(){
      return {
   
      }
    },
    methods:{
    
    },
    components: {
      Search,
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
  .panel.statistics{
    background: #F0F0F0;
  }
  .panel.tools{

  }
  .panel.news{
    background: #F0F0F0;
  }
</style>
