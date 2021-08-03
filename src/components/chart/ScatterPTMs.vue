<template>
    <chart class="scatter-pride" :options="option" :auto-resize="true"></chart>
</template>
<script>
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
        }
    }
    return array;
}
export default {
  data: function () {
    return {
        option:{
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel:{interval: 0},
                data:[]
            },

            yAxis: {},
            legend: {
                data: []
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            series: []
        }
    }
  },
  methods:{
    setOptions(data){
        // console.log(333,data)
        this.option.legend.data = [];
        // this.option.series[0].data = [];
        // this.option.legend.selected = {};
        // console.log('scatter',data)
        let sequenceArray = []
        if(data){
            let arr = []
            // sequenceArray = unique(data.sequence.split(''));
            sequenceArray = data.sequence.split('');
            sequenceArray.unshift('NTerm')
            sequenceArray.push('CTerm')
            console.log('sequenceArray',sequenceArray)
            for(let i in data.ptms){
                let name = i.split(',')[1]
                let pos = parseInt(i.split(',')[2].trim())
                let value = data.ptms[i].length
                let item = {
                    name:name,
                    pos:sequenceArray[pos],
                    value:value
                }
                arr.push(item)
            }
            // console.log('arr',arr)


            // for(let i=0; i<arr.length;i++){
            //     let index = arr[i].pos
            //     console.log('sequenceArray',sequenceArray[index])
            // }

            let map={}
            let dest=[]
            for(let i=0; i<arr.length; i++){
                let item = arr[i]
                if(!map[item.name]){
                    dest.push({
                        name:item.name,
                        value:item.value
                    })
                    map[item.name] = item
                }else{
                    for(let j=0; j<dest.length; j++){
                        let item1 = dest[j]
                        if(item1.name == item.name){
                            item1.value = item.value+item1.value
                            break;
                        }
                    }
                }
            }
            let legendData = []
            let seriesData = []
            for(let i=0; i<dest.length; i++){
                legendData.push(dest[i].name)
                let tempArr = []
                for(let j=0; j<arr.length; j++){
                    if(arr[j].name == dest[i].name){
                        let item = [arr[j].pos, arr[j].value, arr[j].name]
                        tempArr.push(item)
                    }
                }
                seriesData.push(tempArr)

            }
            // console.log('seriesData',seriesData)
            
            // let tempSeriesData = []
            // for(let i=0; i<arr.length; i++){
            //     let item = [arr[i].pos, arr[i].value, arr[i].name]
            //     tempSeriesData.push(item)
            // }

            // let seriesData = []
            for(let i=0; i<legendData.length; i++){
                this.option.legend.data.push(legendData[i])
            }
            

            
            let seriesArr = []
            for(let i=0; i<legendData.length; i++){
                let item = {}
                item.name = legendData[i]
                item.data = new Array(sequenceArray.length)


                // console.log('item.name',item.name)
                for(let j=0; j<seriesData.length; j++){
                    if(item.name == seriesData[j][0][2]){
                        // console.log('seriesData[j]',seriesData[j])
                        for(let k=0;k<seriesData[j].length;k++){
                            let index = sequenceArray.indexOf(seriesData[j][k][0])
                            item.data[index] = seriesData[j][k][1]
                        }
                        break;
                    }
                }
                item.type='scatter'
                seriesArr.push(item)
                
            }

            this.option.xAxis.data = sequenceArray
            this.option.series = seriesArr
            console.log('this.option.xAxis.data',this.option.xAxis.data)
            // console.log('this.option.legend.data',this.option.legend)
            console.log('this.option.series',this.option.series)
            // console.log('legendData',legendData)
            // console.log('seriesData',seriesData)
            // console.log('seriesArr',seriesArr)
            
        }
        else
          this.$Message.error({content:'No data',duration:3});
    }
  },
  created(){
    this.$bus.$on('show-scatter', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-scatter');
  }
}
</script>

<style>
.echarts {
  /*margin: 0 auto;*/
}
.echarts.scatter-pride  {
  height: 400px !important;
  width: auto !important;
}
</style>
