<template>
  <div class="notFound-container">
    <h2><router-link :to="{name:'landingpage'}">Opps, Page Not Found！</router-link></h2>
    
  </div>
</template>
<script>
  export default {
    name: 'notfound',
    data(){
      return {
        msg: ''
      }
    },
    beforeRouteEnter: function(to, from, next){
      next();
    },
    mounted(){
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .notFound-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
   height: calc(100vh - 320px);
 }
</style>
