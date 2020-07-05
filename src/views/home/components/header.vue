<template>
    <div class="header">
        <div class="left"><i @click="drawer = true" class="iconfont icon-accout"></i></div>
        <div class="main">
            <a v-for="(item, index) in showList" :key="item.type" :class="ins == index ? 'active' : ''"  @click="switchType(index)">{{item.type}}</a>
        </div>
        <div class="right"><i class="iconfont icon-search"></i></div>
        <el-drawer
            class="sidebar-container"
            title="我是标题"
            :visible.sync="drawer"
            direction="ltr"
            size="80%"
            :show-close="false"
            :withHeader="false">
            <side-bar />
        </el-drawer>
    </div>
</template>
<script>
import sideBar from './sidebar.vue'
export default {
    components: {
        sideBar
    },
    data() {
        return {
            showList: [
                {type: '我的', id: '1'},
                {type: '发现', id: '2'},
                {type: '云村', id: '3'},
                {type: '视频', id: '4'}
            ],
            ins: 1,
            drawer: false
        }
    },
    methods: {
        switchType(index) {
            this.ins  =  index
        }
    }
}
</script>
<style lang="scss" scoped>
    .header {
        padding: 15px;
        background-color: #2c3e50;
        display: flex;
        justify-content: space-between;
        >div {
            color: #fff
        }
        >.main {
            display: flex;
            line-height: 1.3;
            >a {
                margin-right: 20px;
                font-size: .85rem;
                color: #d0c1c1;
                font-family: PangMenZhengDao;
                &:last-child {
                    margin-right: 0;
                }
                &.active {
                    color: #fff
                }
            }
        }
    }
    .sidebar-container {
        font-size: .95rem;
        >.el-drawer__container {
            background-color: #000 !important;
            position: absolute;
        }
        .el-drawer {
            outline: none;
        }
    }
    .sidebar-container .el-drawer__container {
        background-color: #000 !important;
    }
</style>