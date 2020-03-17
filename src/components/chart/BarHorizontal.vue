<template>
  <div>
        <chart class="bar-horizontal" :options="options" :auto-resize="true"></chart>
  </div>
    
</template>
<script>
export default {
  data: function () {
    //let data = 
    return {
      options: {
        color:['#c23531','#2f4554', '#61a0a8'],
        title: {
            /*text: 'Beijing AQI'*/
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c}<br />'
        },
        xAxis: {
            //type: 'category',
            //boundaryGap: false,
            type: 'value',
            name:'Num',
            data: ['null','null']
        },
        yAxis: {
            name:'Evidences',
            // splitLine: {
            //     show: false
            // },
            type: 'category',
            // axisTick: {
            //     alignWithLabel: true
            // }
        },
        // dataZoom: [{
        //     startValue: '2014-06-01'
        // }, {
        //     type: 'inside'
        // }],
        series: [
              {
                  name:'Proteomics Evidences',
                  type:'bar',
                  barWidth: '30%',
                  data:[0,0]
              }
        ]
      }
    }
  },
  methods:{
      setOptions(data){
        console.log('data',data)
        let xValue = [];
        let yValue = [];
        
        for(let i=0; i<data.length; i++){
          console.log(data[i].key)
          if(data[i].key.indexOf('protein evidences')!=-1){
            let itemY = {}
            itemY.value='Protein'
            yValue.push(itemY);

            let itemX = {}
            itemX.name='Number protein evidences'
            itemX.value = data[i].value
            itemX.itemStyle={}
            itemX.itemStyle.color='#61a0a8'
            xValue.push(itemX);
          }
          else if(data[i].key.indexOf('peptide evidences')!=-1){
            let itemY = {}
            itemY.value='Peptide'
            yValue.push(itemY);

            let itemX = {}
            itemX.name='Number peptide evidences'
            itemX.value = data[i].value
            itemX.itemStyle={}
            itemX.itemStyle.color='#d48265'
            xValue.push(itemX);
          }
          else if(data[i].key.indexOf('psm')!=-1){
            let itemY = {}
            itemY.value='PSM'
            yValue.push(itemY);
            
            let itemX = {}
            itemX.name='Number PSM evidences'
            itemX.value = data[i].value
            itemX.itemStyle={}
            itemX.itemStyle.color='#c23531'
            xValue.push(itemX);
          }
        }
        console.log()
        console.log(xValue,yValue)
        this.options.series[0].data = xValue;
        this.options.yAxis.data = yValue;
    }
  },
  created(){
    this.$bus.$on('show-bar-horizontal', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-bar-horizontal');
  }
}
</script>

<style>
.echarts.bar-horizontal  {
  height: 400px !important;
  width: auto !important;
}
</style>
