<template>
    <chart class="map-pride" :options="options" :auto-resize="true"></chart>
</template>
<script>
import Map from '../../../../static/map/map.json'
export default {
  data: function () {
    var latlong = Map.latlong;
    var mapData = Map.mapData;
    var max = -Infinity;
    var min = Infinity;
    mapData.forEach(function (itemOpt) {
        if (itemOpt.value > max) {
            max = itemOpt.value;
        }
        if (itemOpt.value < min) {
            min = itemOpt.value;
        }
    });
    return {
      mapData:mapData,
      showMapdata:[],
      options: {
          backgroundColor: 'white', //'#404a59',
          /*
          title : {
              text: 'World Population (2011)',
              subtext: 'From Gapminder',
              left: 'center',
              top: 'top',
              textStyle: {
                  color: '#fff'
              }
          },*/
          tooltip : {
              trigger: 'item',
              formatter : function (params) {
                  //return 'Submission Distribution<br/>'+params.name + ' : ' + params.value[2]/2000000;
                  return params.name + ' : ' + params.value[2]/2000000;
              }
          },
          visualMap: {
              show: false,
              min: 0,
              max: max,
              inRange: {
                  symbolSize: [6, 60]
              }
          },
          geo: {
              name: 'World Population (2010)',
              type: 'map',
              map: 'world',
              zoom:1.3,
              roam: true,
              label: {
                  emphasis: {
                      show: false
                  }
              },
              itemStyle: {//change map style
                  normal: {
                      areaColor: '#323c48',
                      borderColor: '#111'
                  },
                  emphasis: {
                      areaColor: '#2a333d'
                  }
              }
          },
          series : [
              {
                  type: 'scatter',
                  coordinateSystem: 'geo',
                  data:[{
                        name: '',
                        value: [0,0,0],
                        label: {
                          emphasis: {
                              position: 'right',
                              show: false
                          }
                        },
                        itemStyle: {
                          normal: {
                              color: 'black'
                          }
                        }
                  }],
              }
          ]
      }
    }
  },
  methods:{
    setOptions(data){
        //var temp = [];
        for(let i=0; i<data.length; i++){
            for(let j=0; j<Map.mapData.length; j++){
                if(Map.mapData[j].name == data[i].key){
                    let item = {
                        name: Map.mapData[j].name,
                        value: [
                          Map.latlong[Map.mapData[j].code].longitude,
                          Map.latlong[Map.mapData[j].code].latitude,
                          data[i].value * 2000000
                        ],
                        label: {
                          emphasis: {
                              position: 'right',
                              show: false //change the text on the right of the circle when do the circle hover
                          }
                        },
                        itemStyle: {
                          normal: {
                              color: Map.mapData[j].color
                          }
                        }
                    }
                    this.showMapdata.push(item);
                    break;
                }
                
            }
        }
        this.options.series[0].data = this.showMapdata;
    }
  },
  created(){
    this.$bus.$on('show-map', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-map');
  }
}
</script>

<style>
.echarts.map-pride  {
  height: 400px !important;
  width: auto !important;
}
</style>