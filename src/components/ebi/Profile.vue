<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
            <div class="menu-wrapper">
                <Menu mode="vertical" :active-name="activeName" @on-select="menuSlect">
                    <MenuItem v-for="item in tableList" :name="item.value" :key="item.value">
                        {{item.label}}
                    </MenuItem>
                </Menu>
            </div>
            <div class="content-wrapper">
                
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '@/components/ebi/Nav'
    import store from "@/store/store.js"
    export default {
        data () {
            return {
                source: '',
                activeName:'',
                landingPageJsonURL: this.$store.state.baseURL + '/static/landingPage/landing_page.json',
                tableList:[
                  {
                    label:'profile',
                    value:'profile'
                  },
                  {
                    label:'data',
                    value:'data'
                  },
                ],
            
            }
        },
        components: {
            NavBar,
        },
        methods:{
            menuSlect(name){
                console.log(name)

            },
           

        },
        mounted:function(){
           
        },
    }
</script>
<style>

</style>
<style scoped>
    .submit-data-container{
        width:100%;
        height: 100%;
        background: white;
    }
    .menu-wrapper .ivu-menu-vertical{
        min-width: 100px;
    }
    .markdown-wrapper{
        margin-left: 240px;
    }
    .content-container{
        display: flex;
        /*padding: 0 0 200px 0px;*/
        margin: 0 auto;
        height: calc(100vh - 400px);
    }
    .markdown-body{
        display: inline-block;
    }
    .menu-wrapper .ivu-menu-vertical{
        min-width: 100px;
        width: 200px !important;
        height: 100%;
        /*background-color: */
    }
    .ivu-menu{
        z-index: 100;
    }
    .content-wrapper{
      max-height: calc(100vh - 50px);
      flex:1;
    }
    @media (min-width: 768px) {
        .content-container{
            width: 750px;
        }
    }
    @media (min-width: 992px) {
        .content-container{
            width: 970px;
        }
    }
    @media (min-width: 1200px) {
        .content-container{
            width: 1170px;
        }
    }
    @media (min-width: 1600px) {
        .content-container{
            width: 1552px;
        }
    }
</style>
