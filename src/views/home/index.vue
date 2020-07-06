<template>
    <div class="dashboard">
        <div class="main-container">
            <area-header />
            <!-- 路由匹配到的组件将显示在这里 -->
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import areaHeader from './components/header.vue'
    export default {
        data() {
            return {

            }
        },
        components: {
            areaHeader
        },
        methods: {

        },
        mounted() {
        }
    }
</script>
<style lang="scss" scoped>
    .dashboard {
        height: 100%;
        background: url("./../../assets/image/home-back.jpg") 0 0 no-repeat;
        background-size: 100%;
        >.main-container {
            height: 100%;
            background-color: rgba(0,0,0,.8);
        }
    }
</style>