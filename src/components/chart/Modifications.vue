<template>
    <chart class="pie-modifications" :options="option" :auto-resize="true"></chart>
</template>
<script>
export default {
  data: function () {
    return {
        visulizationNum:4,
        option:{
            tooltip: {
                trigger: 'item',
                formatter: "{c} ({d}% in selected) {a} {b} "
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
                    name:'PSM include',
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
        console.log('data',data)
        let arr = []
        for(let i in data){
            let item = {
                name:i,
                len:data[i].length,
                value:data[i]
            }
            arr.push(item)
        }
        arr.sort(function(a,b){
             return a.len < b.len ? 1 : -1;
        });
        console.log('arr',arr)
        // this.visulizationNum = data.length < this.visulizationNum ? data.length : this.visulizationNum;
        // data.sort(function(a,b){
        //     return a.count < b.count ? 1 : -1;
        // });
        // var totalCount = 0;
        // for(let i=0; i<data.length; i++){
        //     totalCount += data[i].count;
        // }
        // var legendName = [];
        // for(let i=0; i<data.length; i++){
        //     legendName[i] = data[i].modificationName + ' [' + (data[i].count/totalCount*100).toFixed(1) +'%]';
        //     //console.log('legendName',legendName[i]);
        //     this.option.legend.data.push(legendName[i]);
        //     this.option.legend.selected[legendName[i]] = i < this.visulizationNum;
        //     var item = {
        //         value:data[i].count,
        //         name:legendName[i]
        //     }
        //     this.option.series[0].data.push(item);
        // }
    }
  },
  created(){
    this.$bus.$on('show-modifications', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-modifications');
  }
}
</script>

<style>
.echarts.pie-modifications {
  height: 300px !important;
  width: auto !important;
}
</style>