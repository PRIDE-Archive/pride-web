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
                    radius: ['50%', '70%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
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
                }
            ]
        }
    }
  },
  methods:{
    setOptions(data){
        console.log('PiePeptide',data)
        for(let i=0; i<data.length; i++){
            let item = {}
            item.value = data[i].count
            item.name = data[i].organism
            this.option.series[0].data.push(item);
        }

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
    this.$bus.$on('show-pie-peptide-xiview', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-pie-peptide-xiview');
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
