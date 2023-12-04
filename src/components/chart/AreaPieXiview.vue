<template>
    <chart class="pie-species" :options="option" :auto-resize="true"></chart>
</template>
<script>
export default {
  data: function () {
    return {
        visulizationNum:4,
        option:{
            tooltip: {
                trigger: 'item',
                formatter: "{b}:{c}"
            },
            // legend: {
            //     type: 'scroll',
            //     orient: 'vertical',
            //     left: 5,
            //     top: 10,
            //     bottom: 10,
            //     //itemWidth: 10,
            //     data:[],
            //     formatter: function (name) {
            //        // console.log( name);
            //         return name;

            //     },
            //     selected:{},
            //     zlevel:-1,
            // },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name:'Organism Stats',
                    type:'pie',
                    radius: ['20%', '70%'],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 5,
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                     data:[]
                    // data: [
                    //     { value: 30, name: 'rose 1' },
                    //     { value: 28, name: 'rose 2' },
                    //     { value: 26, name: 'rose 3' },
                    //     { value: 24, name: 'rose 4' },
                    //     { value: 22, name: 'rose 5' },
                    //     { value: 20, name: 'rose 6' },
                    //     { value: 18, name: 'rose 7' },
                    //     { value: 16, name: 'rose 8' }
                    //   ]
                }
            ]
        }
    }
  },
  methods:{
    setOptions(data){
        console.log('AreaPiePeptide',data)
        let pieData = []
        for(let i in data){
            let item = {}
            item.value = data[i]
            item.name = i.substring(10,i.Length)
            // item.value = data[i].count
            // item.name = data[i].organism
            pieData.push(item);
        }
        console.log('pieData',pieData)
        this.option.series[0].data = pieData
        // console.log(this.option.series[0].data)
        // var legendName = [];
        // for(let i=0; i<data.organismStats.length; i++){
        //     let index = data.organismStats[i].Organism.indexOf('(')
        //     // console.log('index',index)
        //     if(index>0){
        //         legendName[i] = data.organismStats[i].Organism.substr(0,index)
        //     }
        //     else{
        //         legendName[i] = data.organismStats[i].Organism
        //     }
        //     // legendName[i] = index ? data.organismStats[i].Organism.substr(0,index):data.organismStats[i].Organism
        //     this.option.legend.data.push(legendName[i]);
        //     // this.option.legend.selected[legendName[i]] = i < this.visulizationNum;
        //     var item = {
        //         value:data.organismStats[i].count,
        //         name:legendName[i]
        //     }
        //     this.option.series[0].data.push(item);
        // }
    }
  },
  created(){
    this.$bus.$on('show-area-pie-peptide-xiview', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-area-pie-peptide-xiview');
  }
}
</script>

<style>
.echarts {
  /*margin: 0 auto;*/
}
.echarts.pie-species  {
  height: 400px !important;
  width: auto !important;
}
</style>
