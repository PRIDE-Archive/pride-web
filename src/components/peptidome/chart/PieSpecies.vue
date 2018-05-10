<template>
    <chart class="pie-species" :options="option" :auto-resize="true"></chart>
</template>
<script>
export default {
  data: function () {
    return {
        option:{
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                align:'auto',
                data:[
                  'Aeromonas salmonicida salmonicida',
                  'Homo sapiens (Human)',
                  'Borrelia burgdoferi 297',
                  'Mus musculus (Mouse)',
                  'Others']
            },
            series: [
                {
                    name:'PSM for',
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
                    data:[
                        {value:4449, name:'Aeromonas salmonicida salmonicida'},
                        {value:4192, name:'Homo sapiens (Human)'},
                        {value:2070, name:'Borrelia burgdoferi 297'},
                        {value:1898, name:'Mus musculus (Mouse)'},
                        {value:6140, name:'Others'}
                    ]
                }
            ]
        }
    }
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