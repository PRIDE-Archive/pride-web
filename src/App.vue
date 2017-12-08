<template>
  <div id="app"> 
    <navComponent/>
    <router-view/>
  </div>
</template>

<script>
import navComponent from '@/components/Nav'
export default {
  name: 'app',
  components:{
    navComponent,
  }
}
</script>

<style>
html,
body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px !important;
    line-height: 1.42857143 !important;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
a,
a:-webkit-any-link {
    cursor: pointer;
    text-decoration: none;
} 
</style>
