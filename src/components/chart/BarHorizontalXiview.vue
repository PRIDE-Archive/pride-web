<template>
  <div>
        <chart class="bar-horizontal" :options="options" :auto-resize="true"></chart>
  </div>
    
</template>
<script>
export default {
  data: function () {
    return {
      options: {
        // color:['#c23531','#2f4554', '#61a0a8'],
        // title: {
        //     text: 'Beijing AQI'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
            type: 'value',
        },
        xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: []
        },
        // dataZoom: [{
        //     startValue: '2014-06-01'
        // }, {
        //     type: 'inside'
        // }],
        series: [
              {
                  name:'Peptide-per-Protein',
                  type:'bar',
                  barWidth: '30%',
                  data:[]
              }
        ]
      }
    }
  },
  methods:{
      setOptions(data){
        let xValue = []
        let yValue = []
        for(let i=0; i< data.length; i++){
          xValue.push(data[i].protein_frequency)
          yValue.push(data[i].peptide_count)

        }
        this.options.series[0].data = JSON.parse(JSON.stringify(yValue))
        this.options.xAxis.data = JSON.parse(JSON.stringify(xValue))
    }
  },
  created(){
    this.$bus.$on('show-bar-horizontal-xiview', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-bar-horizontal-xiview');
  }
}
</script>

<style>
.echarts.bar-horizontal  {
  height: 400px !important;
  width: auto !important;
}
</style>
