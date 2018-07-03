<template>
  <div class="line-simple-container">
      <div class="button-wrapper">
          <a @click="changeDate('year')">Year</a> <a @click="changeDate('month')">Month</a>
      </div>
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
            left: 'center',
            text: 'Beijing AQI'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
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
        /*
        dataZoom: [{
            startValue: '2014-06-01'
        }, {
            type: 'inside'
        }],
        */
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
                  name:'邮件营销',
                  type:'line',
                  stack: '总量',
                  data:[120, 132, 101, 134, 90, 230, 210]
              },
              {
                  name:'联盟广告',
                  type:'line',
                  stack: '总量',
                  data:[220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name:'视频广告',
                  type:'line',
                  stack: '总量',
                  data:[150, 232, 201, 154, 190, 330, 410]
              },
              {
                  name:'直接访问',
                  type:'line',
                  stack: '总量',
                  data:[320, 332, 301, 334, 390, 330, 320]
              },
              {
                  name:'搜索引擎',
                  type:'line',
                  stack: '总量',
                  data:[820, 932, 901, 934, 1290, 1330, 1320]
              }
        ]
      }
    }
  },
  methods:{
      changeDate(item){
          if(item == 'year'){
           
              this.options.xAxis.data=['1995','1995','1995','1995','1995','1995','1995']
          }
          if(item == 'month'){
            this.options.xAxis.data=['周一','周二','周三','周四','周五','周六','周日']
              //this.options.xAxis.data=[]
               console.log('month');
          }
      }
  },
}
</script>

<style scoped>
.echarts.test  {
  height: 400px !important;
  width: auto !important;
}
.line-simple-container{
  position: relative;
}
.line-simple-container .button-wrapper{
  position: absolute;
  right: 50px;
  top:30px;
  z-index: 1000;
}
</style>