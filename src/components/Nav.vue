<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
            <Icon type="ios-paper"></Icon>
            Home
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people"></Icon>
            XXXXX
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                XXXX
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">XXXXX</MenuItem>
                <MenuItem name="3-2">XXXXX</MenuItem>
                <MenuItem name="3-3">XXXXX</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">XXXXX</MenuItem>
                <MenuItem name="3-5">XXXXX</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="settings"></Icon>
            XXXXX
        </MenuItem>
    </Menu>
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
