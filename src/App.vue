<template>
  <div id="app">
    <defaultNav/>
    <router-view/>
    <defaultFooter/>
  </div>
</template>

<script>
import defaultNav from '@/components/EBI/DefaultNav'
import defaultFooter from '@/components/EBI/DefaultFooter'
export default {
  name: 'app',
  components:{
    defaultNav,
    defaultFooter
  }
}
</script>
<style type="text/css">
  html,body {
      min-width: 657px !important;
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
</style>

