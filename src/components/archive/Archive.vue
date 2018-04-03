<template>
  <div class="landingpage-container">
      <!--<div class="panel nav"><Nav/></div>-->
      <Row>
        <Col span="6">
          <Card>
              <p slot="title">Filters</p>
              <div class="field-filter">
                <p>Field</p>
                <Select v-model="fieldValue" size="small" style="width:100%">
                    <Option v-for="item in fieldSelectors" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
              <div class="field-contains">
                <p>Contains</p>
                <Select v-model="containValue" size="small" style="width:100%">
                    <Option v-for="item in containSelectors" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
          </Card>
        </Col>
        <Col span="15" offset="1">
            <Card>
                <p slot="title">The standard card</p>
                <p>Content of card</p>
                <p>Content of card</p>
                <p>Content of card</p>
                <Page :total="40" size="small" show-elevator show-sizer></Page>
            </Card>
          
        </Col>
      </Row>
      
  </div>
</template>

<script>
 
  export default {
    name: 'archive',
    data(){
      return {
          fieldValue:'Species',
          containValue:'Any',
          fieldSelectors:[
              {
                  value: 'Species',
                  label: 'Species'
              },
              {
                  value: 'Tissue',
                  label: 'Tissue'
              },
              {
                  value: 'Disease',
                  label: 'Disease'
              },  
              {
                  value: 'Modification',
                  label: 'Modification'
              },
              {
                  value: 'Instrument',
                  label: 'Instrument'
              },
              {
                  value: 'Experiment type',
                  label: 'Experiment type'
              },
              {
                  value: 'Project lags',
                  label: 'Project lags'
              },
              {
                  value: 'Submission type',
                  label: 'Submission type'
              }
          ],
          containSelectors:[
              {
                  value: 'Any',
                  label: 'Any'
              },
              {
                  value: 'London',
                  label: 'London'
              },
              {
                  value: 'Sydney',
                  label: 'Sydney'
              },  
              {
                  value: 'Ottawa',
                  label: 'Ottawa'
              },
              {
                  value: 'Paris',
                  label: 'Paris'
              },
              {
                  value: 'Canberra',
                  label: 'Canberra'
              }
          ],
      }
    },
    methods:{
    
    },
   
    mounted: function(){
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .landingpage-container{
    width: 80%;
    margin:0 auto;
    /*position: absolute;
    top: 37px;
    left: 0;
    right: 0;
    z-index: 1000;
    */
  }
  .panel.resource{
    border-bottom: 1px solid #ececec;
    background-color: #fafafa;
  }
  .panel.statistics{
    /*background: #f7f8fa;*/
    border-bottom: 1px solid #ececec;
  }
  .panel.tools{
    border-bottom: 1px solid #ececec;
    background-color: #fafafa;
  }
  .panel.news{
    /*background: #f7f8fa;*/
  }
</style>
