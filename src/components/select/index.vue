<template>

<div>
    <!-- 常规选择 -->
    <Select placeholder="请输入职位名称！"
            filterable :not-found-text="'没有查询到相关人员！'"
            @on-change="saveUserAndOrganization">
        <Option v-for="option in roleList" :value="option.id" :key="option.id">
            {{option.text}}
        </Option>
    </Select>
</div>
</template>
<script>

  export default {
    name: 'selectSampleTable',
    methods:{
      saveUserAndOrganization(){
         console.log('onchange');
      }
    },
    data(){
      return {
        roleList: {
        	id:'',
        	text:''
        }
      }
    },
    mounted(){
    //  console.log(document.getElementById('elixir-banner'));
     // document.getElementById('elixir-banner').attribute('display','none');
    }
  }
</script>