<template>
  <div class="tree-container">
    <div class="legend">

        <div class="item-wrapper"><i class="fas fa-circle fa-xs" style="color:#6083d2"></i><span>Organism</span></div>
        <div class="item-wrapper"><i class="fas fa-circle fa-xs" style="color:#5cc8db"></i></i><span>Organism_Part</span></div>
        <div class="item-wrapper"><i class="fas fa-circle fa-xs" style="color:#d4a03a"></i><span>Diseases</span></div>
        <div class="item-wrapper"><i class="fas fa-circle fa-xs" style="color:#2ba47cd6"></i><span>Modifications</span></div>
    </div>
    <chart class="sunburst-chart" :options="options" :auto-resize="true" @click="itemClick"></chart>
  </div>
</template>
<script>
const LIMITLENGTH = 4;
var layer = 0;
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
            name: '',
            children: [
            ]
        }, 
    ];
    return {
      options: {
           tooltip: {
              trigger: 'item',
              enterable:true,
              hideDelay:300,
              formatter:function(param){

                    if(param.data.name !='Category'){
                        let facets;
                        let value = param.data.name.split('(')[0];
                        if(param.data.level == 1){
                            facets='organisms_facet=='+value;
                        }
                        else if(param.data.level == 2){
                           facets='organisms_part_facet=='+value;
                        }
                        else if(param.data.level ==3){
                          facets='diseases_facet=='+value;
                        }
                        else if(param.data.level ==4){
                          facets='Modifications=='+value;
                        }
                        return '<p class="tooltip-content">Category: '+param.data.name+'</p>'+'<p class="tooltip-content">Value: '+param.data.rawValue+'</p>'+'<p><a class="search" href="archive?filter='+facets+'&page=0&pageSize=20">More</a></p>'
                    }
                  //}
              }
          },
          legend: {
              top: '2%',
              left: '3%',
              orient: 'vertical',
              data: [{
                  name: 'tree1',
                  icon: 'rectangle'
              } ,
              {
                  name: 'tree2',
                  icon: 'rectangle'
              }],
              borderColor: '#c23531',
              selectedMode:false,
          },
          itemStyle:{
            borderColor:"blue"
          },
          series: {
              type: 'tree',
              data: data,
              top: '0%',
              left: '7%',
              bottom: '0%',
              right: '23%',
              symbol:"circle",
              //layout: 'radial',
              symbolSize: 7,
              initialTreeDepth:3,
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
            },
      }
    }
  },
  methods:{
    sortData(data, level){
        level++;
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
            let color;
            if(level == 1){
                color='#6083d2'
            }
            else if(level == 2){
               color='#5cc8db'
            }
            else if(level ==3){
              color='#d4a03a'
            }
            else if(level ==4){
              color='#2ba47cd6'
            }
            let item ={
                name:cutData[i].category.key+'('+cutData[i].category.value+')',
                value: cutData[i].category.value,
                rawValue: cutData[i].category.value,
                itemStyle:{
                  borderColor:color,
                  color:color
                },
                level:level,
                children: this.sortData(cutData[i].subCategories, level)
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
        let sortedData = this.sortData(data, 0);
        for(let i=0; i<sortedData.length; i++){

        }
        let array = [{
            name:"Category",
            children:sortedData,
            itemStyle:{
              borderColor:"#c23531",
              color:"#c23531"
            },
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
    itemClick(item){
      if(item.data.level==4)
        console.log('准备跳转',item.data.name);

      console.log(item);
    },
    sortNode(node){
        if(node.subCategories.length==0) return;
        dataProcess(node.subCategories);
    },
    search(item){
      console.log('item',item);
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
.tree-container{
  position: relative;
}
.legend{
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 10px;
  top: 10px;
  color: #6f6f6f;
  font-family: sans-serif;
  font-size: 14px;
}
.legend .item-wrapper{
    display: flex;
    text-align: left;
    align-items: center;
    flex-direction: row;
}
.legend .item-wrapper span{
    margin-left: 5px;
    padding-top: 1px;
}
.echarts.sunburst-chart  {
  height: 900px !important;
  width: auto !important;
}
.search{
  color: rgb(255, 255, 255) !important;
  margin-top: 5px;
  font-size: 12px;
  float: right;
}
.tree-container .tooltip-content{
  text-align: left;
}
</style>