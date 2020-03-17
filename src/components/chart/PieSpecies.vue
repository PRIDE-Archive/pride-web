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
                formatter: "{a} <br/>{b}: {c} ({d}% in selected)"
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
                    name:'Submitted Datasets for',
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
        this.visulizationNum = data.length < this.visulizationNum ? data.length : this.visulizationNum;
        data.sort(function(a,b){
            return a.count < b.count ? 1 : -1;
        });
        var totalCount = 0;
        for(let i=0; i<data.length; i++){
            totalCount += data[i].count;
        }
        var legendName = [];
        for(let i=0; i<data.length; i++){
            legendName[i] = data[i].speciesName + ' [' + (data[i].count/totalCount*100).toFixed(1) +'%]';
            //console.log('legendName',legendName[i]);
            this.option.legend.data.push(legendName[i]);
            this.option.legend.selected[legendName[i]] = i < this.visulizationNum;
            var item = {
                value:data[i].count,
                name:legendName[i]
            }
            this.option.series[0].data.push(item);
        }
    }
  },
  created(){
    this.$bus.$on('show-species', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-species');
  }
}
</script>

<style>
.echarts {
  /*margin: 0 auto;*/
}
.echarts.pie-species  {
  height: 300px !important;
  width: auto !important;
}
</style>
