<template>
    <div class="header">
        <div class="left"><i @click="showpopup" class="iconfont icon-accout"></i></div>
<!--        <div class="main">-->
<!--            <a v-for="(item, index) in showList" :key="item.type" :class="ins == index ? 'active' : ''"  @click="switchType(index)" :href="item.url">{{item.type}}</a>-->
<!--        </div>-->
        <div class="header-menu">
            <el-menu :default-active="path" class="el-menu-demo" router mode="horizontal">
                <el-menu-item v-for="item in showList" :key="item.type" :index="item.url">{{item.type}}</el-menu-item>
            </el-menu>
        </div>
        <div class="right" @click="pushSearch"><i class="iconfont icon-search"></i></div>
        <van-popup v-model="drawer" position="left" :style="{width: '30%', height: '100%'}">内容</van-popup>
    </div>
</template>
<script>
export default {
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
        },
        showpopup() {
            this.drawer = true
        },
        pushSearch() {
            this.$router.push('/search')
        }
    }
}
</script>
<style lang="scss" scoped>
    .header {
        padding: 10px 0;
        background-color: rgb(44,62,80);
        display: flex;
        justify-content: space-between;
        position: fixed;
        width: 100%;
        top: 0;left: 0;
        z-index: 150;
        >div {
            color: #fff;
        }
        >.left {
            font-size: 1.5rem;
            margin-left: 15px;
        }
        >.right {
            font-size: 1.5rem;
            margin-right: 15px;
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