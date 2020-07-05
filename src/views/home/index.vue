<template>
    <div class="dashboard">
        <area-header />
        <!-- 路由匹配到的组件将显示在这里 -->
        <router-view></router-view>
    </div>
</template>
<script>
    import areaHeader from './components/header.vue'
    import { dashSwiper } from '../../http/api'
    export default {
        data() {
            return {
                code: '0',   // 资源类型,对应以下类型,默认为 0 即PC
            }
        },
        components: {
            areaHeader
        },
        methods: {
            async getBanner() {
                await dashSwiper(this.code).then(res => {
                    console.log(res)
                })
            }
        },
        mounted() {
            this.getBanner()
        }
    }
</script>