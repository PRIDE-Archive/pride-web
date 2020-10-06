<template>
    <chart class="test" :options="options" :auto-resize="true" @click="itemClick"></chart>
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
                  value: 5,
                  url:'http://www.google.com'
              }, {
                  source: 'a',
                  target: 'a2',
                  value: 3,
                  url:'http://www.google.com'
              }, {
                  source: 'b',
                  target: 'b1',
                  value: 8,
                  url:'http://www.google.com'
              }, {
                  source: 'a',
                  target: 'b1',
                  value: 3,
                  url:'http://www.google.com'
              }, {
                  source: 'b1',
                  target: 'a1',
                  value: 1,
                  url:'http://www.google.com'
              }, {
                  source: 'b1',
                  target: 'c',
                  value: 2,
                  url:'http://www.google.com'
              }]
          }
      }
    }
  },
  methods:{
      setOptions(data){
        console.log('sankey',data);
      },
      itemClick(e){
        window.open(e.data.url);
      }
  },
  created(){
    this.$bus.$on('show-sankey', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-sankey');
  }
}
</script>

<style>
.echarts.test  {
  height: 400px !important;
  width: auto !important;
}
</style>