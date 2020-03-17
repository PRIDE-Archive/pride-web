<template>
  <div>
        <chart class="test" :options="options" :auto-resize="true"></chart>
  </div>
    
</template>
<script>
export default {
  data: function () {
    //let data = 
    return {
      options: {
        title: {
            /*text: 'Beijing AQI'*/
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            //name:'Years',
            data: ['null','null']
        },
        yAxis: {
            //name:'Num',
            splitLine: {
                show: false
            }
        },
        /*
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },*/
        dataZoom: [{
            startValue: '2014-06-01'
        }, {
            type: 'inside'
        }],
        /*
        visualMap: {
            top: 10,
            right: 10,
            pieces: [{
                gt: 0,
                lte: 50,
                color: '#096'
            }, {
                gt: 50,
                lte: 100,
                color: '#ffde33'
            }, {
                gt: 100,
                lte: 150,
                color: '#ff9933'
            }, {
                gt: 150,
                lte: 200,
                color: '#cc0033'
            }, {
                gt: 200,
                lte: 300,
                color: '#660099'
            }, {
                gt: 300,
                color: '#7e0023'
            }],
            outOfRange: {
                color: '#999'
            }
        },*/
        series: [
              {
                  name:'SUBMISSIONS_PER_YEAR',
                  type:'line',
                  data:[0,0]
              }
        ]
      }
    }
  },
  methods:{
      setOptions(data){
        let xValue = [];
        let yValue = [];
        if(data[0].key){
          for(let i=0; i<data.length; i++){
            xValue.push(data[i].key);
            yValue.push(data[i].value);
          }
          this.options.xAxis.name = 'Years'
        }
        else{
          for(let i=0; i<data.length; i++){
            xValue.push(data[i][0]);
            yValue.push(data[i][1]);
          }
          this.options.xAxis.name = 'Months'
          xValue = xValue.reverse();
          yValue= yValue.reverse();
        }
        this.options.series[0].data = yValue;
        this.options.xAxis.data = xValue;
    }
  },
  created(){
    this.$bus.$on('show-line', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-line');
  }
}
</script>

<style>
.echarts.test  {
  height: 400px !important;
  width: auto !important;
}
</style>