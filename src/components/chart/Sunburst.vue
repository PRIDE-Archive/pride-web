<template>
    <chart class="sunburst-chart" :options="options" :auto-resize="true"></chart>
</template>
<script>
const LIMITLENGTH = 4;
export default {
  data: function () {
    let data =  [
        {
            name: 'AA',
            children: [
                {
                    name: 'aa',
                    //value: 15,
                    children: [
                        {
                            name: '11',
                            //value: 2,
                            children: [
                                {
                                    name: 'ββ',
                                    value: 1
                                },
                                {
                                    name: 'β1β',
                                    value: 3
                                }
                            ]
                        }, 
                        {
                            name: '22',
                            //value: 6,
                            children: [
                                {
                                    name: 'ββ',
                                    value: 3
                                },
                                {
                                    name: 'β1β',
                                    value: 1
                                }
                            ]
                        }, 
                        {
                            name: '33',
                            //value: 4,
                            children: [
                                {
                                    name: 'ββ',
                                    value: 2
                                },
                                {
                                    name: 'β1β',
                                    value: 2
                                }
                            ]
                        }
                    ]
                }, 
                {
                    name: 'bb',
                    //value: 10,
                    children: [
                        {
                            name: '11',
                            //value: 5,
                            children: [
                                {
                                    name: 'ββ',
                                    value: 3
                                },
                                {
                                    name: 'β1β',
                                    value: 2
                                }
                            ]
                        }, 
                        {
                            name: '22',
                            //value: 1,
                            children: [
                                {
                                    name: 'ββ',
                                    value: 2
                                },
                                {
                                    name: 'β1β',
                                    value: 6
                                }
                            ]
                        }
                    ]
                }
            ]
        }, 
        {
            name: 'BB',
            children: [
                {
                    name: 'aa',
                    children: [
                        {
                            name: '11',
                            //value: 1,
                            children: [
                                {
                                    name: 'ββ',
                                    value: 2
                                },
                                {
                                    name: 'β1β',
                                    value: 5
                                }
                            ]
                        }, 
                        {
                            name: '22',
                            //value: 2,
                            children: [
                                {
                                    name: 'ββ',
                                    value: 1
                                },
                                {
                                    name: 'β1β',
                                    value: 4
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
    return {
      options: {
           tooltip: {
              trigger: 'item',
              formatter:function(param){
                  //if(param.data.name && param.data.value){
                    //console.log('param',param);//
                    //return 'Category: '+param.data.name+', Value: ' + param.data.value;
                  //}
                  //if(param.data.name && param.data.rawValue){
                    //console.log('param',param);//
                    return 'Category: '+param.data.name+', Value: ' + param.data.rawValue;
                  //}
              }
          },
          series: {
              type: 'sunburst',
              highlightPolicy: 'descendant',
              data: data,
              radius: [0, '95%'],
              label: {
                  show:false,
                  //rotate: 'radial',
                  //show:true,
                  //fontSize:1,
                  
                  /*
                  color: '#fff',
                  textBorderColor: '#666',
                  textBorderWidth: 2,
                  borderColor: '#999',
                  borderWidth: 1,
                  formatter: function (param) {
                      var depth = param.treePathInfo.length;
                      if (depth === 2) {
                          return 'radial';
                      }
                      else if (depth === 3) {
                          return 'tangential';
                      }
                      else if (depth === 4) {
                          return '0';
                      }
                  }*/
              },
              itemStyle: {
                  color: '#ddd',
                  borderWidth: 2
              },
              
              //nodeClick:{
                  /*'link':'http://www.baidu.com'*/
              //},
              emphasis:{
                /*
                label:{
                    color: 'black',
                    textBorderColor: '#666',
                    textBorderWidth: 2,
                    fontSize:12,
                    borderColor: '#999',
                    borderWidth: 1,
                    formatter: function (param) {
                        var depth = param.treePathInfo.length;
                        if (depth === 2) {
                            return 'radial';
                        }
                        else if (depth === 3) {
                            return 'tangential';
                        }
                        else if (depth === 4) {
                            return '0';
                        }
                    }
                },*/
                itemStyle:{
                  //opacity:0.5
                  color:'blue'
                }
              },
              /*
              highlight:{
                itemStyle:{
                  color:'black'
                }
              }*/
              
              levels: [
                  {}, 
                  {
                      r0: '20%',
                      r: '35%',
                      itemStyle: {
                          borderWidth: 2
                      },
                      label: {
                          rotate: 'tangential'
                      }
                  }, 
                  {
                      r0: '35%',
                      r: '55%',
                      label: {
                          align: 'right'
                      }
                  }, 
                  {
                      r0: '55%',
                      r: '85%',
                      label: {
                          position: 'outside',
                          padding: 3,
                          silent: false
                      },
                      itemStyle: {
                          borderWidth: 3
                      }
                  },
                  {
                      r0: '85%',
                      r: '90%',
                      label: {
                          position: 'outside',
                          padding: 3,
                          silent: false
                      },
                      itemStyle: {
                          borderWidth: 3
                      }
                  }
              ]
          }
      }
    }
  },
  methods:{
    sortData(data){
        if(data.length==0)
          return data;

        data.sort((a,b)=>{
            return b.category.value-a.category.value;
        })

        let cutLength = LIMITLENGTH > data.length? data.length : LIMITLENGTH
        let cutData = data.slice(0,cutLength);
        //let cutData = data;
        let newData = [];
        for(let i=0; i<cutData.length ; i++){
            let item ={
                name:cutData[i].category.key,
                value: cutData[i].category.value,
                rawValue: cutData[i].category.value,
                children: this.sortData(cutData[i].subCategories)
            }
            
            if(i == 0){
              item.value = Math.floor(Math.log(cutData[i].category.value));
              //item.value = Math.floor(Math.log(cutData[i].category.value));
            }
            newData.push(item);
        }
        return newData;
    },
    setOptions(data){
        //let
        console.log('before',data);
        let sortedData = this.sortData(data);
        
        let array = sortedData;

        console.log('array',array);
        this.options.series.data = array;




        /*
        let data1 = this.dataProcess(data);
        console.log('sortedData',sortedData);
        for(let i=0; i<data1.length; i++){
            if(data1[i].subCategories.length!=0){
                let data2 = this.dataProcess(data1[i]);
                //for(let j=0; j<data1.length; j++)
                
              //console.log('newData',newData);
            }
            //nonRecursiveWidthFirstTraversal(sortedData[i])
        }*/

    },
   
    sortNode(node){
        if(node.subCategories.length==0) return;
        dataProcess(node.subCategories);
    }
  },
  created(){
    this.$bus.$on('show-sunburst', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-sunburst');
  }
}
</script>

<style>
.echarts.sunburst-chart  {
  height: 600px !important;
  width: auto !important;
}
</style>