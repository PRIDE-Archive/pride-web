<template>
    <chart class="pie-modifications" :options="option" :auto-resize="true"></chart>
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
                orient: 'vertical',
                x: 'left',
                data:[
                  'No Modifications',
                  'Carbamidomethyl',
                  'Oxidation',
                  'Propionamide',
                  'Others' ]
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
                        {value:4449, name:'No Modifications'},
                        {value:4192, name:'Carbamidomethyl'},
                        {value:2070, name:'Oxidation'},
                        {value:1898, name:'Propionamide'},
                        {value:6140, name:'Phospho'},
                        {value:540, name:'iTRAQ4plex114'},
                        {value:640, name:'iTRAQ4plex-114 reporter+balance reagent acylated N-terminal'},
                        {value:1140, name:'Others'},
                    ]
                }
            ]
        }
    }
  }
}
</script>

<style>
.echarts.pie-modifications {
  height: 300px !important;
  width: auto !important;
}
</style>