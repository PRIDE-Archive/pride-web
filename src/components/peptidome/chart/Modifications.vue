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
                formatter: "{c} ({d}%) {a} {b} "
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:[]
            },
            series: [
                {
                    name:'PSM include',
                    type:'pie',
                    radius: ['50%', '70%'],
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
        //console.log('modifications',data);
        this.visulizationNum = data.length < this.visulizationNum ? data.length : this.visulizationNum;
        data.sort(function(a,b){
            return a.count < b.count ? 1 : -1;
        });
        var othersCount = 0;
        for(let i=0; i<data.length; i++){
            if(i<this.visulizationNum){
                this.option.legend.data.push(data[i].modificationName);
                var item = {
                    value:data[i].count,
                    name:data[i].modificationName
                }
                this.option.series[0].data.push(item);
            }
            else{
                othersCount += data[i].count;
            }
        }
        var lastItem = {
            value:othersCount,
            name:'Others'
        }
        this.option.legend.data.push('Others');
        this.option.series[0].data.push(lastItem);
        //console.log('othersCount',othersCount);
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