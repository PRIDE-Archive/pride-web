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
            text: '',
            textStyle:{
              fontSize:14,
              fontWeight:'normal',
            },
            padding:[10,0,0,10]
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c}<br />'
        },
        grid: {
            left: '15%',
            // right: '4%',
            top: '20%',
            bottom: '10%',
            // containLabel: true
        },
        legend: {
          right:'5%',
          top:'10',
          // orient:'vertical', 
            data: ['Peptides PerProteins Stats','Unique Peptides Per Proteins Stats']
        },
        xAxis: {
            //type: 'category',
            //boundaryGap: false,
            name:'Count',

            type: 'value',
            
            nameTextStyle:{
              fontSize:10,
              padding:[0,0,-10,-10]
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                interval: 0,
                //rotate: 90,
                fontSize: 10
            },
            splitNumber:2,

            // boundaryGap: [0, 0.01],
            
            // data: ['null','null']
        },
        yAxis: {
            name:'Peptide',
            nameTextStyle:{
              fontSize:10,
              padding:[0,0,-10,10]
            },
            // splitLine: {
            //     show: false
            // },
            type: 'category',
            axisLabel: {
                interval: 0,
                // rotate: 90,
                rotate: 0,
                fontSize: 10
            },
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
                  name:'Peptides PerProteins Stats',
                  type:'bar',
                  barWidth: '40%',
                  // data: [12, 8, 7, 6, 5, 5, 4, 3, 2, 2, 2, 2, 1]
                  data:[0,0]
              },
              {
                  name:'Unique Peptides Per Proteins Stats',
                  type:'bar',
                  barWidth: '40%',
                  // data: [12, 8, 7, 6, 5, 5, 4, 3, 2, 2, 2, 2, 1]
                  data:[0,0]
              }
        ]
      }
    }
  },
  methods:{
      setOptions(data){
        // console.log('BarPeptide',data)
        let peptideData = data.peptidesPerProteinsStats.peptidesPerProteinsStats
        let uniquePeptideData = data.uniquePeptidesPerProteinsStats.uniquePeptidesPerProteinsStats
        peptideData.sort(function(a,b){
            return a.peptide_count < b.peptide_count ? 1 : -1;
        });
        // uniquePeptideData.sort(function(a,b){
        //     return a.peptide_count < b.peptide_count ? 1 : -1;
        // });

        //format peptideData
        for(let i=0; i<peptideData.length; i++){
            let index = peptideData[i].Organism.indexOf(' ')
            // console.log('index',index)
            if(index>0){
                peptideData[i].Organism = peptideData[i].Organism.substr(0,index)
            }
            else{
                peptideData[i].Organism = peptideData[i].Organism
            }
        }

        //format uniquePeptideData
        for(let i=0; i<uniquePeptideData.length; i++){
            let index = uniquePeptideData[i].Organism.indexOf(' ')
            // console.log('index',index)
            if(index>0){
                uniquePeptideData[i].Organism = uniquePeptideData[i].Organism.substr(0,index)
            }
            else{
                uniquePeptideData[i].Organism = uniquePeptideData[i].Organism
            }
        }

        let yValue = [];
        let xValue1 = [];
        let xValue2 = [];
        for(let i=0; i<peptideData.length; i++){
          yValue.push(peptideData[i].Organism)
          xValue1.push(parseInt(peptideData[i].peptide_count))
        }
        for(let i=0; i<uniquePeptideData.length; i++){
          // yValue.push(uniquePeptideData[i].Organism)
          xValue2.push(parseInt(uniquePeptideData[i].peptide_count))
        }
        this.options.yAxis.data = yValue;
        this.options.series[0].data = xValue1;
        this.options.series[1].data = xValue2;

        // console.log()

        console.log('this.options.series',this.options.series)
        // let xValue = [];
        // let yValue = [];
        
        // for(let i=0; i<data.length; i++){
        //   // console.log(data[i].key)
        //   if(data[i].key.indexOf('protein evidences')!=-1){
        //     let itemY = {}
        //     itemY.value='Protein'
        //     yValue.push(itemY);

        //     let itemX = {}
        //     itemX.name='Number protein evidences'
        //     itemX.value = data[i].value
        //     itemX.itemStyle={}
        //     itemX.itemStyle.color='#61a0a8'
        //     xValue.push(itemX);
        //   }
        //   else if(data[i].key.indexOf('peptide evidences')!=-1){
        //     let itemY = {}
        //     itemY.value='Peptide'
        //     yValue.push(itemY);

        //     let itemX = {}
        //     itemX.name='Number peptide evidences'
        //     itemX.value = data[i].value
        //     itemX.itemStyle={}
        //     itemX.itemStyle.color='#d48265'
        //     xValue.push(itemX);
        //   }
        //   else if(data[i].key.indexOf('psm')!=-1){
        //     let itemY = {}
        //     itemY.value='PSM'
        //     yValue.push(itemY);
            
        //     let itemX = {}
        //     itemX.name='Number PSM evidences'
        //     itemX.value = data[i].value
        //     itemX.itemStyle={}
        //     itemX.itemStyle.color='#c23531'
        //     xValue.push(itemX);
        //   }
        // }
        // // console.log()
        // // console.log(xValue,yValue)
        // this.options.series[0].data = xValue;
        // this.options.yAxis.data = yValue;
    }
  },
  created(){
    this.$bus.$on('show-bar-peptide', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-bar-peptide');
  }
}
</script>

<style>
.echarts.bar-horizontal  {
  height: 400px !important;
  width: auto !important;
}
</style>
