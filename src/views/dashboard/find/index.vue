<template>
    <div class="find">
        <!--banner-->
        <div class="header">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="item in bannerSwiper" :key="item.adid">
                    <img class="el-image" :src="item.imageUrl" />
                    <span class="image-type" :style="{'background-color': item.titleColor}">{{item.typeTitle}}</span>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--分类列表-->
        <div class="rotation">
            <van-swipe class="type-swipe" :loop="false" :width="70" :show-indicators="false">
                <van-swipe-item v-for="type in typeArray" :key="type.name">
                    <div class="van-image">
                        <img :src="type.logo" :alt="type.name">
                    </div>
                    <br>
                    <span class="type-name">{{type.name}}</span>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--精选歌单-->
        <div class="musictype">
            <div class="item-nav">
                <span>懂你的精选歌单</span>
                <van-button type="default">查看更多</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { dashSwiper, getSongSheet } from '../../../http/api'
export default {
    data() {
        return {
            bannerSwiper: [],
            code: '0',   // 资源类型,对应以下类型,默认为 0 即PC
            typeArray: [
                {logo: require('./../../../assets/image/tuijian-icon.png'), name: '每日推荐'},
                {logo: require('./../../../assets/image/gedan-icon.png'), name: '歌单'},
                {logo: require('./../../../assets/image/paihangbang-icon.png'), name: '排行榜'},
                {logo: require('./../../../assets/image/diantai-icon.png'), name: '电台'},
                {logo: require('./../../../assets/image/sirenfm-icon.png'), name: '私人FM'},
                {logo: require('./../../../assets/image/zhuanji-icon.png'), name: '数字专辑'},
            ]
        }
    },
    components: {
    },
    methods: {
        async getBanner() {
            await dashSwiper(this.code).then(res => {
                console.log(res)
                this.bannerSwiper = res.banners;
            })
        },
        async musicSelected() {
            await getSongSheet(30).then(data=>{
                console.log(data)
            })
        }
    },
    mounted() {
        this.getBanner();
        this.musicSelected()
    }
}
</script>
<style lang="scss" scoped>
    .el-carousel__indicator {
        background-color: #000;
    }
    .find {
        padding: 0 15px;
        .header {
            .my-swipe {
                /*height: 143px;*/
            }
            .image-type {
                position: absolute;
                bottom: 1px;right: 0;
                font-size: .75rem;
                color: #fff;
                padding: 3px 10px;
                border-radius: 5px 0;
            }
            .el-image {
                border-radius: 5px;
                width: 100%;
            }
        }
        .rotation {
            padding: 10px 0 15px;
            .type-swipe {
                .van-image {
                    color: #fff;
                    font-size: 2rem;
                    background-color: #cdcdcd;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    margin-bottom: .3rem;
                    img {
                        width: 55%;
                    }
                }
                span {
                    color: #fff;
                    font-size: .85rem;
                    font-family: PangMenZhengDao, Arial, sans-serif;
                }
            }
        }
        .musictype {
            >.item-nav {
                display: flex;
                justify-content: space-between;
                >span {
                    color: #fff;
                    font-size: .85rem;
                    font-family: PangMenZhengDao, Arial, sans-serif;
                    letter-spacing: 1.5px;
                    line-height: 1.8;
                }
                >.van-button {
                    height: auto;
                    line-height: 1;
                    background-color: rgba(0,0,0,0);
                    color: #fff;
                    font-family: PangMenZhengDao, Arial, sans-serif;
                    padding: 4px 10px;
                    border-radius: 20px;
                    border: 1px solid #808080;
                }
            }
        }
    }
</style>