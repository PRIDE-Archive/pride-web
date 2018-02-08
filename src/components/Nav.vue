<template>
    <div class="nav-container">
        <div class="logo">
            EBI LOGO
           <!-- <a href="/" class="wrapper-header-nav-logo router-link-active"><img src="https://file.iviewui.com/dist/8dbd82e32852c160ec255dc7769a6619.png"></a>-->
        </div>
        <div class="nav-wrapper">
            <Menu class="nav-content" mode="horizontal" :theme="theme1" active-name="1">
                <MenuItem name="1">
                    <Icon type="ios-paper"></Icon>
                    Services
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-people"></Icon>
                    Research
                </MenuItem>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        Training
                    </template>
                    <MenuGroup title="subtitle1">
                        <MenuItem name="3-1">XXXXX</MenuItem>
                        <MenuItem name="3-2">XXXXX</MenuItem>
                        <MenuItem name="3-3">XXXXX</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="subtitle2">
                        <MenuItem name="3-4">XXXXX</MenuItem>
                        <MenuItem name="3-5">XXXXX</MenuItem>
                    </MenuGroup>
                </Submenu>
                <MenuItem name="4">
                    <Icon type="settings"></Icon>
                    Industry
                </MenuItem>
                <MenuItem name="4">
                    <Icon type="settings"></Icon>
                    About US
                </MenuItem>
            </Menu>
        </div>
        
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light'
            }
        }
    }
</script>
<style scoped>
    .nav-container{
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin: 0 auto;
    }
    .logo{
        height: 50px;
        margin-left:10px;
        line-height: 50px;
        float: left;
    }
    .nav-wrapper{
        float: right;
        height: inherit;
    }
    .nav-content{
        height: inherit;
        line-height:inherit;
    }
</style>
