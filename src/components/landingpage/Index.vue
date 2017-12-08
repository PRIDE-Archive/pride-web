<template>
  <div class="index-container">
      <div class="panel search"><SearchPanel/></div>
      <div class="panel"><Resource/></div>
  </div>
</template>

<script>
  import SearchPanel from '@/components/landingpage/SearchPanel'
  import Resource from '@/components/landingpage/Resource'
  export default {
    name: 'index',
    data(){
      return {
   
      }
    },
    methods:{
    
    },
    components: {
      SearchPanel,
      Resource
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
</style>
