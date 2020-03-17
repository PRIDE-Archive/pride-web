<template>
    <chart class="pie-pride" :options="option" :auto-resize="true"></chart>
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
                    radius: ['40%', '60%'],
                    center: ['70%', '50%'],
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
        this.option.legend.data = [];
        this.option.series[0].data = [];
        this.option.legend.selected = {};
        if(data){
            this.visulizationNum = data.length < this.visulizationNum ? data.length : this.visulizationNum;
            data.sort(function(a,b){
                return a.value < b.value ? 1 : -1;
            });

            var legendName = [];
            for(let i=0; i<data.length; i++){
                legendName[i] = data[i].key;
                //console.log('legendName',legendName[i]);
                this.option.legend.data.push(legendName[i]);
                this.option.legend.selected[legendName[i]] = i < this.visulizationNum;
                var item = {
                    value:data[i].value,
                    name:data[i].key
                }
                this.option.series[0].data.push(item);
            }
        }
        else
          this.$Message.error({content:'No data',duration:3});
    }
  },
  created(){
    this.$bus.$on('show-pie', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-pie');
  }
}
</script>

<style>
.echarts {
  /*margin: 0 auto;*/
}
.echarts.pie-pride  {
  height: 400px !important;
  width: auto !important;
}
</style>
