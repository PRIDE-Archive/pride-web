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
</style>

