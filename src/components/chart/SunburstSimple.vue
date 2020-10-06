<template>
    <chart class="test" :options="options" :auto-resize="true"></chart>
</template>
<script>
export default {
  data: function () {
    let data =  [
        {
            name: 'Grandpa',
            children: [
                {
                    name: 'Uncle Leo',
                    value: 15,
                    children: [
                        {
                            name: 'Cousin Jack',
                            value: 2
                        }, 
                        {
                            name: 'Cousin Mary',
                            value: 5,
                            children: [
                                {
                                    name: 'Jackson',
                                    value: 2
                                }
                            ]
                        }, 
                        {
                            name: 'Cousin Ben',
                            value: 4
                        }
                    ]
                }, 
                {
                    name: 'Father',
                    value: 10,
                    children: [
                        {
                            name: 'Me',
                            value: 5
                        }, 
                        {
                            name: 'Brother Peter',
                            value: 1
                        }
                    ]
                }
            ]
        }, 
        {
            name: 'Nancy',
            children: [
                {
                    name: 'Uncle Nike',
                    children: [
                        {
                            name: 'Cousin Betty',
                            value: 1
                        }, 
                        {
                            name: 'Cousin Jenny',
                            value: 2
                        }
                    ]
                }
            ]
        }
    ];
    return {
      options: {
          series: {
              type: 'sunburst',
              // highlightPolicy: 'ancestor',
              data: data,
              radius: [0, '90%'],
              label: {
                  rotate: 'radial'
              }
          }
      }
    }
  },
  methods:{
      setOptions(data){
        console.log('sunburst',data);
    }
  },
  created(){
    this.$bus.$on('show-simple-sunburst', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-simple-sunburst');
  }
}
</script>

<style>
.echarts.test  {
  height: 400px !important;
  width: auto !important;
}
</style>