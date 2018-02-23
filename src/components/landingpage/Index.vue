<template>
  <div class="index-container">
      <div class="panel search"><Search/></div>
      <div class="panel resource"><Resource/></div>
      <div class="panel"><Statistics/></div>
      <div class="panel"><Tools/></div>
      <div class="panel"><News/></div>
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
  .panel{
    position: relative;
    height: 300px;
  }
  .panel.search{
    height: 150px;
  }
  .panel.resource{
    height: 550px;
  }
</style>
