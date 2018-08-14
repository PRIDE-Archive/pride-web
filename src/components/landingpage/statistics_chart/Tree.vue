<template>
    <chart class="sunburst-chart" :options="options" :auto-resize="true"></chart>
</template>
<script>
const LIMITLENGTH = 4;
const matchColor={
  "brain":'#7093e2',
  "cell culture":"#d48365",
  "epithelial cell": "#61a0a8",
  "disease free":"#0084fd",
  "lymphoma":"#3b94d9",
  "acute leukemia":"#007c82",
  "breast cancer":"#19be6b",
  "FTDALS1":"#ff9900",
  "Wounds and Injuries":"#941717",
  "mixed disorder as reaction to stress":"#ff009563",
  "Parkinson disease":"#dc9292",
  "Cervix carcinoma":"#d84312",
  /*next level*/
  "Oxidation":"#e45555",
  "No PTMs are included in the dataset":"#a91414",
  "Hypusine":"#a96214",
  "iTRAQ8plex-116 reporter+balance reagent acylated residue":"#3cf567",
  "acetylated residue":"#a100ff",
  "deamidated residue":"#3caef5",
  "S-carboxamidoethyl-L-cysteine":"#3c61f5",
  "monohydroxylated residue":"#5b3cf5",
  "iodoacetamide derivatized residue":"#d8ce95",
  "phosphorylated residue":"#d295d8",
  "Carbamidomethyl":"#00bae8",
  "N-ethylmaleimide derivatized cysteine":"#f00",
  "TMT6plex-126 reporter+balance reagent acylated residue":"#ff8600",
  "dimethylated residue":"#ffc000",
  "Acetyl":"#027fb3",
  "methylthiolated residue":"#980000"
}
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
                    if(param.data.name !='Category')
                      return 'Category: '+param.data.name+', Value: ' + param.data.rawValue;
                  //}
              }
          },
          
          series: {
              type: 'tree',
              data: data,
              top: '0%',
              left: '5%',
              bottom: '0%',
              right: '20%',
              //layout: 'radial',
              symbolSize: 7,
              initialTreeDepth:3,
              itemStyle:{
                normal: {
                                color: function(params) {

                                      console.log('params',params);
                                        return "blue";
                                   
                                }
                            }
              },
              label: {
                  normal: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      fontSize:14,
                      formatter:param=>{
                          if(param.data.name.split('(')[0] == 'brain')
                            return '{brain|' + param.data.name + '}'
                          else if(param.data.name.split('(')[0] == 'cell culture')
                            return '{cell|' + param.data.name + '}'  
                          else if(param.data.name.split('(')[0] == 'epithelial cell')
                            return '{epithelial|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'disease free')
                            return '{disease|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'lymphoma')
                            return '{lymphoma|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'acute leukemia')
                            return '{acute|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'breast cancer')
                            return '{breast|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'FTDALS1')
                            return '{FTDALS1|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'Wounds and Injuries')
                            return '{Wounds|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'mixed disorder as reaction to stress')
                            return '{mixed|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'Parkinson disease')
                            return '{Parkinson|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'Cervix carcinoma')
                            return '{Cervix|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'Oxidation')
                            return '{Oxidation|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'No PTMs are included in the dataset')
                            return '{No|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'Hypusine')
                            return '{Hypusine|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'iTRAQ8plex-116 reporter+balance reagent acylated residue')
                            return '{iTRAQ8plex|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'acetylated residue')
                            return '{acetylated|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'deamidated residue')
                            return '{deamidated|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'S-carboxamidoethyl-L-cysteine')
                            return '{S|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'monohydroxylated residue')
                            return '{monohydroxylated|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'iodoacetamide derivatized residue')
                            return '{iodoacetamide|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'phosphorylated residue')
                            return '{phosphorylated|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'Carbamidomethyl')
                            return '{Carbamidomethyl|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'N-ethylmaleimide derivatized cysteine')
                            return '{N|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'TMT6plex-126 reporter+balance reagent acylated residue')
                            return '{TMT6plex|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'dimethylated residue')
                            return '{dimethylated|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'Acetyl')
                            return '{Acetyl|' + param.data.name + '}' 
                          else if(param.data.name.split('(')[0] == 'methylthiolated residue')
                            return '{methylthiolated|' + param.data.name + '}'
                          else 
                            return param.data.name;  
                      },    
                      rich:{
                          brain:{
                              color: matchColor['brain']
                          },
                          cell:{
                              color: matchColor['cell culture']
                          },
                          epithelial:{
                              color: matchColor['epithelial cell']
                          },
                          disease:{
                              color: matchColor['disease free']
                          },
                          lymphoma:{
                              color: matchColor['lymphoma']
                          },
                          acute:{
                              color: matchColor['acute leukemia']
                          },
                          breast:{
                              color: matchColor['breast cancer']
                          },
                          FTDALS1:{
                              color: matchColor['FTDALS1']
                          },
                          Wounds:{
                              color: matchColor['Wounds and Injuries']
                          },
                          mixed:{
                              color: matchColor['mixed disorder as reaction to stress']
                          },
                          Parkinson:{
                              color: matchColor['Parkinson disease']
                          },
                          Cervix:{
                              color: matchColor['Cervix carcinoma']
                          },
                          Oxidation:{
                              color: matchColor['Oxidation']
                          },
                          No:{
                              color: matchColor['No PTMs are included in the dataset']
                          },
                          Hypusine:{
                              color: matchColor['Hypusine']
                          },
                          iTRAQ8plex:{
                              color: matchColor['iTRAQ8plex-116 reporter+balance reagent acylated residue']
                          },
                          acetylated:{
                              color: matchColor['acetylated residue']
                          },
                          deamidated:{
                              color: matchColor['deamidated residue']
                          },
                          S:{
                              color: matchColor['S-carboxamidoethyl-L-cysteine']
                          },
                          monohydroxylated:{
                              color: matchColor['monohydroxylated residue']
                          },
                          iodoacetamide:{
                              color: matchColor['iodoacetamide derivatized residue']
                          },
                          phosphorylated:{
                              color: matchColor['phosphorylated residue']
                          },
                          Carbamidomethyl:{
                              color: matchColor['Carbamidomethyl']
                          },
                          N:{
                              color: matchColor['N-ethylmaleimide derivatized cysteine']
                          },
                          TMT6plex:{
                              color: matchColor['TMT6plex-126 reporter+balance reagent acylated residue']
                          },
                          dimethylated:{
                              color: matchColor['dimethylated residue']
                          },
                          Acetyl:{
                              color: matchColor['Acetyl']
                          },
                          methylthiolated:{
                              color: matchColor['methylthiolated residue']
                          }
                      }
                  }
              },

              leaves: {
                  label: {
                      normal: {
                          position: 'right',
                          verticalAlign: 'middle',
                          align: 'left',
                          fontSize:12,
                      }
                  }
              },

              expandAndCollapse: true,

              animationDuration: 550,
              animationDurationUpdate: 750
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
                name:cutData[i].category.key+'('+cutData[i].category.value+')',
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
        
        return newData
    },
    setOptions(data){
        //let
        //console.log('before',data);
        let sortedData = this.sortData(data);
        let array = [{
            name:"Category",
            children:sortedData
        }]

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
    this.$bus.$on('show-tree', this.setOptions);
  },
  beforeCreate:function(){
    this.$bus.$off('show-tree');
  }
}
</script>

<style>
.echarts.sunburst-chart  {
  height: 900px !important;
  width: auto !important;
}
</style>