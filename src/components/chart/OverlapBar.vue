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
            type: 'none'
          },
          formatter: function (params) {
            return params[0].name + ': ' + params[0].value;
          }
        },
        xAxis: {
            axisTick: { show: false },
            axisLine: { show: false },
            data: []
            // data: ['驯鹿', '火箭', '飞机', '高铁', '轮船', '汽车', '跑步', '步行'],
        },
        yAxis: {
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: { show: false }
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        

        // dataZoom: [{
        //     startValue: '2014-06-01'
        // }, {
        //     type: 'inside'
        // }],
        series: [
              {
                  name:'',
                  type:'pictorialBar',
                  barCategoryGap: '-130%',
                  symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                  itemStyle: {
                    opacity: 0.5
                  },
                  emphasis: {
                    itemStyle: {
                      opacity: 1
                    }
                  },
                  z: 10,
                  data:[]
                  // data: [123, 60, 25, 18, 12, 9, 2, 1],
              }
        ]
      }
    }
  },
  methods:{
      setOptions(data){
        // console.log('OverlapBar',data)
        // let pieData = []
        // for(let i in data){
        //     let item = {}
        //     item.value = data[i]
        //     item.name = i.substring(10,i.Length)
        //     // item.value = data[i].count
        //     // item.name = data[i].organism
        //     pieData.push(item);
        // }
        // console.log('pieData',pieData)
        // this.option.series[0].data = pieData

        let xValue = []
        let yValue = []
        for(let i in data){
          xValue.push(i.substring(10,i.Length))
          yValue.push(data[i])
        }
        this.options.series[0].data = JSON.parse(JSON.stringify(yValue))
        this.options.xAxis.data = JSON.parse(JSON.stringify(xValue))
    }
  },
  created(){
    this.$bus.$on('show-overlap-bar-xiview', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-overlap-bar-xiview');
  }
}
</script>

<style>
.echarts.bar-horizontal  {
  height: 400px !important;
  width: auto !important;
}
</style>
