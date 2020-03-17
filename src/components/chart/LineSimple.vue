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
      options: {
        title: {
          text: '',
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
            name:'',
            nameLocation:'end',
            /*offset:10,*/
            nameGap:8,
            nameTextStyle:{
              align:'right',
              fontSize:10,
              padding:[0,0,10,-10],
              /*color:'red',*/
              verticalAlign:'top'
            },
            axisLabel:{
              margin:20,
              fontSize:10
            }
        },
        yAxis: {
            name:'Num',
            nameLocation:'end',
            /*offset:-10,*/
            nameGap:8,
            nameTextStyle:{
              align:'middle',
              fontSize:10,
              /*color:'red',*/
              verticalAlign:'top'
            },
            splitLine: {
                show: false
            },
            axisLabel:{
              margin:15,
              rotate:90,
              fontSize:10
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
                  name:'SUBMISSIONS',
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
          this.options.title.text = 'Public Submitted datasets'
        }
        else{
          for(let i=0; i<data.length; i++){
            xValue.push(data[i][0]);
            yValue.push(data[i][1]);
          }
          this.options.xAxis.name = 'Months'
          this.options.title.text = 'Number of Submissions'
          xValue = xValue.reverse();
          yValue= yValue.reverse();
        }
        //remove the latest month value because of the sudden drop 
        xValue.pop()
        yValue.pop()
        this.options.series[0].data = yValue;
        this.options.xAxis.data = xValue;
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
