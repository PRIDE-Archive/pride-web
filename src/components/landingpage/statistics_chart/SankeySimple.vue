<template>
    <chart class="test" :options="options" :auto-resize="true"></chart>
</template>
<script>
export default {
  data: function () {
    //let data = 
    return {
      options: {
          series: {
              type: 'sankey',
              layout:'none',
              data: [{
                  name: 'a'
              }, {
                  name: 'b'
              }, {
                  name: 'a1'
              }, {
                  name: 'a2'
              }, {
                  name: 'b1'
              }, {
                  name: 'c'
              }],
              links: [{
                  source: 'a',
                  target: 'a1',
                  value: 5
              }, {
                  source: 'a',
                  target: 'a2',
                  value: 3
              }, {
                  source: 'b',
                  target: 'b1',
                  value: 8
              }, {
                  source: 'a',
                  target: 'b1',
                  value: 3
              }, {
                  source: 'b1',
                  target: 'a1',
                  value: 1
              }, {
                  source: 'b1',
                  target: 'c',
                  value: 2
              }]
          }
      }
    }
  },
  methods:{
      setOptions(data){
        console.log('sankey',data);
    }
  },
  created(){
    this.$bus.$on('show-simple-sankey', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-simple-sankey');
  }
}
</script>

<style>
.echarts.test  {
  height: 400px !important;
  width: auto !important;
}
</style>