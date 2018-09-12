<template>
  <div>
        <chart class="line-simple" :options="options" :auto-resize="true"></chart>
  </div>

</template>
<script>
export default {
  data: function () {
    //let data =
    return {
      lineYearApi:'http://ves-pg-41:9020/stats/SUBMISSIONS_PER_YEAR',
      lineMonthApi:'http://ves-pg-41:9020/stats/SUBMISSIONS_PER_MONTH',
      options: {
        title: {
          text: 'Public submission',
          textStyle:{
            fontSize:14,
            fontWeight:'normal',
          },
          padding:[10,0,0,10]
        },
        tooltip: {
            trigger: 'axis'
        },
        grid:{
          left:'12%',
          top: 70,
          right:'12%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            name:'Years',
            nameLocation:'end',
            /*offset:10,*/
            nameGap:8,
            nameTextStyle:{
              align:'right',
              /*color:'red',*/
              verticalAlign:'top'
            },
            axisLabel:{
              margin:20,
            }
        },
        yAxis: {
            name:'Num',
            nameLocation:'end',
            /*offset:-10,*/
            nameGap:8,
            nameTextStyle:{
              align:'middle',
              /*color:'red',*/
              verticalAlign:'top'
            },
            splitLine: {
                show: false
            },
            axisLabel:{
              margin:15,
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
        /*
        dataZoom: [{
            startValue: '2014-06-01'
        }, {
            type: 'inside'
        }],*/
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
        for(let i=0; i<data.length; i++){
          xValue.push(data[i].key);
          yValue.push(data[i].value);
        }
        this.options.xAxis.data = xValue;
        this.options.series[0].data = yValue;
    }
  },
  created(){
    this.$bus.$on('show-simple-line', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-simple-line');
  }
}
</script>

<style>
.echarts.line-simple  {
  height: 400px !important;
  width: auto !important;
}
</style>
