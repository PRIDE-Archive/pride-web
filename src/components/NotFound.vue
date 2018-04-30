<template>
  <div class="notFound-container">
    <div class="panel nav"><Nav/></div>
    <div class = "content">
      <h2><router-link :to="{name:'landingpage'}">Opps, Page Not Found！</router-link></h2>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/landingpage/Nav'
  export default {
    name: 'notfound',
    components: {
      Nav,
    },
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

 }
 .content{
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    height: calc(100vh - 505px);
 }
</style>
