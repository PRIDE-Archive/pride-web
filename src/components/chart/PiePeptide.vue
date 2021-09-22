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
            legend: {
                type: 'scroll',
                orient: 'vertical',
                left: 5,
                top: 10,
                bottom: 10,
                //itemWidth: 10,
                data:[],
                formatter: function (name) {
                   // console.log( name);
                    return name;

                },
                selected:{},
                zlevel:-1,
            },
            series: [
                {
                    name:'Organism Stats',
                    type:'pie',
                    radius: ['50%', '70%'],
                    center: ['75%', '50%'],
                    avoidLabelOverlap: false,
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
        // console.log('PiePeptide',data)
        // this.visulizationNum = data.length < this.visulizationNum ? data.length : this.visulizationNum;
        // data.sort(function(a,b){
        //     return a.count < b.count ? 1 : -1;
        // });
        // var totalCount = 0;
        // for(let i=0; i<data.length; i++){
        //     totalCount += data[i].count;
        // }
        var legendName = [];
        for(let i=0; i<data.organismStats.length; i++){
            let index = data.organismStats[i].Organism.indexOf('(')
            // console.log('index',index)
            if(index>0){
                legendName[i] = data.organismStats[i].Organism.substr(0,index)
            }
            else{
                legendName[i] = data.organismStats[i].Organism
            }
            // legendName[i] = index ? data.organismStats[i].Organism.substr(0,index):data.organismStats[i].Organism
            this.option.legend.data.push(legendName[i]);
            // this.option.legend.selected[legendName[i]] = i < this.visulizationNum;
            var item = {
                value:data.organismStats[i].count,
                name:legendName[i]
            }
            this.option.series[0].data.push(item);
        }
        // console.log('aaa',this.option.legend.data)
    }
  },
  created(){
    this.$bus.$on('show-pie-peptide', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-pie-peptide');
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
