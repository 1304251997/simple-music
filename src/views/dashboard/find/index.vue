<template>
    <div class="find">
        <!--// 下拉刷新-->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
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
                            <i>{{newDate}}</i>
                        </div>
                        <br>
                        <span class="type-name">{{type.name}}</span>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!--精选歌单-->
            <div class="covertype">
                <div class="item-nav">
                    <span>懂你的精选歌单</span>
                    <van-button type="default">查看更多</van-button>
                </div>
                <swiper class="cover-swipe" ref="mySwiper" :options="coverOptions">
                    <swiper-slide v-for="list in filterRandom" :key="list.id">
                        <div class="cover-image" @click="jumpSheetDetail(list.id)">
                            <img width="100%" :src="list.picUrl" :alt="list.name">
                            <a><van-icon name="service-o" size=".45rem" color="#ffffff" /><span>{{Math.floor(list.playCount / 10000)}}万</span></a>
                        </div>
                        <span class="cover-name">{{list.name}}</span>
                    </swiper-slide>
                </swiper>
            </div>
            <!--精选歌曲-->
            <div class="musictype">
                <div class="item-nav">
                    <span>聆听华语佳曲</span>
                    <van-button type="default"><van-icon name="play" />播放全部</van-button>
                </div>
                <swiper class="music-swipe" ref="mySwiper" :options="swiperOptions">
                    <swiper-slide  v-for="arr in musicEntry" :key="arr.id">
                        <div class="music-image">
                            <img width="54" height="54" :src="arr.picUrl" :alt="arr.name">
                        </div>
                        <div class="music-name">
                            <p @click.prevent="playMusic(arr.id)">{{arr.name}} - <span v-for="song in arr.artists" :key="song.id">{{song.name}}</span></p>
                        </div>
                        <van-icon name="play-circle-o" size="1.2rem" color="#d4c8c8" />
                    </swiper-slide>
                </swiper>
            </div>
            <!--累了就在音乐里放空-->
            <div class="covertype">
                <div class="item-nav">
                    <span>累了就在音乐里放空</span>
                    <van-button type="default">查看更多</van-button>
                </div>
                <swiper class="cover-swipe" ref="mySwiper" :options="coverOptions">
                    <swiper-slide v-for="list in coverEntry" :key="list.id">
                        <div class="cover-image">
                            <img width="100%" :src="list.coverImgUrl" :alt="list.name">
                            <a><van-icon name="service-o" size=".45rem" color="#ffffff" /><span>{{Math.floor(list.playCount / 10000)}}万</span></a>
                        </div>
                        <span class="cover-name">{{list.name}}</span>
                    </swiper-slide>
                </swiper>
            </div>
        </van-pull-refresh>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import {dashSwiper, getSongSheet, getSongRadio, getTypeTag, getChoiceSheet } from '../../../http/api'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
export default {
    data() {
        return {
            bannerSwiper: [],
            code: '0',   // 资源类型,对应以下类型,默认为 0 即PC
            newDate: '',
            typeArray: Object.freeze([
                {logo: require('./../../../assets/image/tuijian-icon.png'), name: '每日推荐', date: ''},
                {logo: require('./../../../assets/image/gedan-icon.png'), name: '歌单'},
                {logo: require('./../../../assets/image/paihangbang-icon.png'), name: '排行榜'},
                {logo: require('./../../../assets/image/diantai-icon.png'), name: '电台'},
                {logo: require('./../../../assets/image/sirenfm-icon.png'), name: '私人FM'},
                {logo: require('./../../../assets/image/zhuanji-icon.png'), name: '数字专辑'},
            ]),
            coverEntry: [],     // 获取的热门推荐歌单            coverEntry: [],     // 获取的热门推荐歌单
            musicEntry: [],     // 获取的热门推荐歌单
            choiceEntry: [],     // 获取的热门推荐歌单
            swiperOptions: {
                slidesPerView: 1,
                slidesPerColumn: 3,
                slidesPerColumnFill: 'column',
                // Some Swiper option/callback...
            },
            coverOptions: {
                slidesPerView : 3.2,
                spaceBetween : 10,
            },
            isLoading: false
        }
    },
    components: {
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
    computed: {
        filterRandom() {
            return this.choiceEntry.slice(0, 6)
        },
        // mapState: ({user: state => state.user})
    },
    methods: {
        async getBanner() {
            await dashSwiper(this.code).then(res => {
                this.bannerSwiper = res.banners;
            })
        },
        async musicSelected() {
            // 获取歌单分类
            await getTypeTag().then(res => {
                this.sheetTage = res.sub[Math.floor((Math.random()*res.sub.length))].name
            })
            // 获取精选歌单，随机选取6条数据显示在首页
            await getChoiceSheet().then(data=>{
                this.choiceEntry = data.result
            })
            // 根据tag类型，随机获取精选歌单
            await getSongSheet(this.sheetTage).then(data=>{
                this.coverEntry = data.playlists
                // console.log(this.coverEntry)
            })
            // 获取精选歌曲
            await getSongRadio().then(res=>{
                // console.log(res)
                this.musicEntry = res.albums
            })
        },
        // 点击播放推荐歌曲
        playMusic(id) {
            // let self = this
            console.log(id)
        },
        // 点击进入到推荐歌单详情
        jumpSheetDetail(songId) {
            // console.log(songId, type)
            this.$router.push({
                name:'sheetdetails',params: {id: songId}
            })
        },
        // 获取当天日期，赋值带每日推荐
        getTimeDay() {
            let that = this
            const date = new Date()
            that.newDate = date.getDate()
        },
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
                this.musicSelected()
                this.getTimeDay()
            }, 1000);
        },
    },
    mounted() {
        this.getBanner();
        this.musicSelected()
        this.getTimeDay()
    }
}
</script>
<style lang="scss" scoped>
    .el-carousel__indicator {
        background-color: #000;
    }
    .find {
        padding: 10px 15px 3rem;
        .header {
            .my-swipe {
                /*height: 143px;*/
            }
            .image-type {
                position: absolute;
                bottom: 4px;right: 0;
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
            padding: 10px 0 20px;
            text-align: center;
            .type-swipe {
                .van-swipe-item {
                    &:first-child .van-image i {
                        display: block;
                    }
                    .van-image {
                        color: #fff;
                        font-size: 2rem;
                        background-color: #cdcdcd;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        margin-bottom: .3rem;
                        position: relative;
                        img {
                            width: 60%;
                            position: absolute;
                            margin: auto;
                            top: 0;bottom: 0;
                            left: 0;right: 0
                        }
                        i {
                            display: none;
                            position: absolute;
                            margin: auto;
                            left: 0;right: 0;
                            font-size: .25rem;
                            line-height: 46px;
                        }
                    }
                    span {
                        color: #fff;
                        font-size: .85rem;
                        font-family: love-better, Arial, sans-serif;
                    }
                }
            }
        }
        .covertype {
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
            >.cover-swipe {
                margin-top: .7rem;
                .swiper-slide {
                    >.cover-image {
                        margin-bottom: .2rem;
                        position: relative;
                        a {
                            width: 100%;height: 1.5rem;
                            line-height: 1.5rem;
                            text-align: right;
                            /*background-color: #000;*/
                            background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,0));
                            font-size: .4rem;
                            color: #fff;
                            border-radius: 5px 5px 0 0;
                            position: absolute;
                            left: 0;
                            i {
                                margin-right: .1rem;
                            }
                            span {
                                margin-right: .5rem;
                            }
                        }
                        img {
                            border-radius: 5px;
                        }
                    }
                    >.cover-name {
                        color: #fff;
                        text-align: left!important;
                        font-size: .45rem;
                        line-height: 1.5;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }
        .musictype {
            margin: 1.5rem 0;
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
                    line-height: 1.2;
                    background-color: rgba(0,0,0,0);
                    color: #fff;
                    font-family: PangMenZhengDao, Arial, sans-serif;
                    padding: 4px 10px;
                    border-radius: 20px;
                    border: 1px solid #808080;
                    .van-button__text {
                        display: flex;
                        .van-icon {
                            line-height: 1;
                            margin-right: .2rem;
                        }
                    }
                }
            }
            >.music-swipe {
                margin-top: .5rem;
                height: 186px;
                .swiper-slide {
                    display: flex;
                    position: relative;
                    height: 54px;
                    margin-bottom: 8px;
                    img {
                        border-radius: 5px;
                    }
                    .music-name {
                        margin-left: 1rem;
                        font-size: .75rem;
                        padding-top: 1rem;
                        width: 73%;
                        p {
                            margin: 0 0 0 0;
                            color: rgba(255,255,255,.9);
                            width: 100%;
                            overflow:hidden; //超出的文本隐藏
                            text-overflow:ellipsis; //溢出用省略号显示
                            white-space:nowrap; //溢出不换行
                            span {
                                color: #fff;
                            }
                        }
                    }
                    .van-icon {
                        position: absolute;
                        margin: auto;
                        top: 0;bottom: 0;
                        right: 1.2rem;
                        line-height: 2.7;
                    }
                }
            }
        }
    }
</style>