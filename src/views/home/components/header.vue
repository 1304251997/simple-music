<template>
    <div class="header">
        <div class="left"><i @click="drawer = true" class="iconfont icon-accout"></i></div>
<!--        <div class="main">-->
<!--            <a v-for="(item, index) in showList" :key="item.type" :class="ins == index ? 'active' : ''"  @click="switchType(index)" :href="item.url">{{item.type}}</a>-->
<!--        </div>-->
        <div class="header-menu">
            <el-menu :default-active="path" class="el-menu-demo" router mode="horizontal">
                <el-menu-item v-for="item in showList" :key="item.type" :index="item.url">{{item.type}}</el-menu-item>
            </el-menu>
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
        sideBar,
    },
    created() {
        this.onRouteChanged()
    },
    data() {
        return {
            showList: [
                {type: '我的', id: '1', 'url': '/mine'},
                {type: '发现', id: '2', 'url': '/find'},
                {type: '云村', id: '3', 'url': '/village'},
                {type: '视频', id: '4', 'url': '/video'}
            ],
            drawer: false,
        }
    },
    methods: {
        onRouteChanged () {
            let that = this
            that.path  = that.$route.path
        }
    }
}
</script>
<style lang="scss" scoped>
    .header {
        padding: 15px;
        background-color: rgba(44,62,80,.2);
        display: flex;
        justify-content: space-between;
        >div {
            color: #fff;
        }
        >.left, >.right {
            font-size: 1.5rem;
        }
        >.header-menu {
            .el-menu-demo {
                background-color: rgba(0,0,0,0);
                border: none;
                display: flex;
                justify-content: center;
                li {
                    font-size: 1rem;
                    color: #d0c1c1;
                    font-family: PangMenZhengDao;
                    text-decoration: none;
                    height: auto;
                    line-height: 2;
                    padding: 0 15px;
                    border: none;
                    &.is-active {
                        color: #fff;
                        background-color: rgba(0,0,0,0);
                        border: none;
                    }
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