<template>
    <div class="sheet-detail">
        <div class="officialSheet" v-if="sheetType == '网易云音乐' || sheetType == '云音乐私藏推荐'" :style="{backgroundImage: 'url('+sheet.backgroundCoverUrl+')'}">
            <header class="van-nav-bar" :style="{backgroundImage: 'url('+sheet.backgroundCoverUrl+')'}">
                <i class="arrow-left iconfont icon-houtui" @click="clickReturn"></i>
                <h3 @click="clickReturn"><i class="iconfont icon-logo-dark"></i>官方推荐歌单</h3>
                <van-icon class="search" name="search" size="18" color="#fff" />
            </header>
            <div class="header">
                <div class="nav-title">
                    <p><span>{{sheet.englishTitle}}</span><a>{{sheet.updateFrequency}}</a></p>
                    <h3>{{sheet.name}}</h3>
                </div>
                <ul class="interaction">
                    <li>
                        <i class="iconfont icon-pinglun"></i>
                        <br>
                        <span>{{sheet.commentCount}}</span>
                    </li>
                    <li>
                        <i class="iconfont icon-fenxiang1"></i>
                        <br>
                        <span>{{sheet.shareCount}}</span>
                    </li>
                    <li>
                        <i class="iconfont icon-xiazai"></i>
                        <br>
                        <span>下载</span>
                    </li>
                    <li>
                        <van-icon name="certificate" color="#fff" size="1.1rem" />
                        <br>
                        <span>多选</span>
                    </li>
                </ul>
            </div>
            <div class="song-music">
                <div class="song-list" ref="map">
                    <div class="song-head">
                        <van-icon class="paly-all" name="play-circle-o" color="#fff" />
                        <span>播放全部<a>(共{{allSongList.length}}首)</a></span>
                        <button class="van-button"><van-icon name="plus" />收藏({{(sheet.subscribedCount/10000).toFixed(1)}}万)</button>
                    </div>
                    <div class="song-list-props">
                        <ul>
                            <li class="item-song" v-for="(item, index) in allSongList" :key="item.id">
                                <a class="item-song-number">{{index}}</a>
                                <div class="item-song-message">
                                    <p><a>{{item.name}}</a> <span v-if="item.alia[0]">({{item.alia[0]}})</span></p>
                                    <p><span v-for="arr in item.ar" :key="arr.name">{{arr.name}}/</span><span> - {{item.al.name}}</span></p>
                                </div>
                                <i class="item-song-option iconfont icon-gengduo"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="officialSheet personal-user" v-else>
            <div class="else-head">
                <header class="van-nav-bar">
                    <i class="arrow-left iconfont icon-houtui" @click="clickReturn"></i>
                    <h3 @click="clickReturn">
<!--                        sheetNickname-->
                        <van-notice-bar :text="sheet.name" :scrollable="true" background="rgba(0,0,0,0)" color="#fff" />
                    </h3>
                    <van-icon class="search" name="search" size="18" color="#fff" />
                </header>
                <div class="header">
                    <div class="nav-title">
                        <a class="sheet-image" @click="show = true"><img :src="sheet.coverImgUrl" alt="sheet.name"></a>
                        <div class="sheet-message">
                            <h3>{{sheet.name}}</h3>
                            <a class="sheet-message-creator">
                                <img width="21" height="21" :src="creatorUrl" alt="">
                                <span>{{sheetType}}</span>
                                <van-icon name="arrow" color="#cdcdcd" />
                            </a>
                            <p class="sheet-message-desc" @click="show = true">{{sheet.description}}<van-icon name="arrow" color="#cdcdcd" /></p>
                            <van-overlay :show="show" @click="show = false">
                                <van-icon name="cross" color="#fff" />
                                <img class="desc-image" width="50%" :src="sheet.coverImgUrl" alt="">
                                <h3>{{sheet.name}}</h3>
                                <div class="image-inline"></div>
                                <p class="sheet-tag">标签: <a v-for="tag in sheet.tags" :key="tag">{{tag}}</a></p>
                                <textarea name="" id="" cols="30" rows="10">{{sheet.description}}</textarea>
                            </van-overlay>
                        </div>
                    </div>
                    <ul class="interaction">
                        <li>
                            <i class="iconfont icon-pinglun"></i>
                            <br>
                            <span>{{sheet.commentCount}}</span>
                        </li>
                        <li>
<!--                            <van-icon name="cluster-o" color="#fff" size="1.1rem" />-->
                            <i class="iconfont icon-fenxiang1"></i>
                            <br>
                            <span>{{sheet.shareCount}}</span>
                        </li>
                        <li>
                            <i class="iconfont icon-xiazai"></i>
                            <br>
                            <span>下载</span>
                        </li>
                        <li>
                            <van-icon name="certificate" color="#fff" size="1.1rem" />
                            <br>
                            <span>多选</span>
                        </li>
                    </ul>
                </div>
            </div>
<!--            <van-sticky :offset-top="50">-->
                <div class="song-music">
                    <div class="song-list" ref="map">
                        <div class="song-head">
                            <van-icon class="paly-all" name="play-circle-o" color="#fff" />
                            <span>播放全部<a>(共{{allSongList.length}}首)</a></span>
                            <button class="van-button"><van-icon name="plus" />收藏({{(sheet.subscribedCount/10000).toFixed(1)}}万)</button>
                        </div>
                        <div class="song-list-props">
                            <loading v-if="isLoading"></loading>
                            <ul>
                                <li class="item-song" v-for="(item, index) in allSongList" :key="item.id">
                                    <a class="item-song-number">{{index}}</a>
                                    <div class="item-song-message">
                                        <p><a>{{item.name}}</a> <span v-if="item.alia[0]">({{item.alia[0]}})</span></p>
                                        <p><span v-for="arr in item.ar" :key="arr.name">{{arr.name}}/</span><span> - {{item.al.name}}</span></p>
                                    </div>
                                    <i class="item-song-option iconfont icon-gengduo"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
<!--            </van-sticky>-->
        </div>
    </div>
</template>
<script>
import { getSheetDetail, getAllSongs } from '../../http/api'
import Loading from '../../loading/index.vue'
export default {
    data() {
        return {
            sheetType: '',      // 歌单类型
            sheetId: '',      // 歌单ID
            sheet: {},
            allSongList: [],       // 获取的全部歌曲列表
            sheetNickname: '歌单',      // 歌单名字
            show: false,   // 歌单详细介绍,默认隐藏，可选项true|false
            creatorUrl: '',   // 获取歌单创作者头像
            isLoading: true
        }
    },
    components: {
        Loading
    },
    methods: {
        // 获取歌单列表传递过来的类型跟id
        getMessage() {
            this.sheetId = this.$route.params.id
        },
        // 根据歌单id获取歌单信息
        async sheetLive() {
            await getSheetDetail(this.sheetId).then(result => {
                this.sheet = result.playlist
                this.sheetType = this.sheet.creator.nickname
                this.creatorUrl = this.sheet.creator.avatarUrl

                // 从歌单信息里获取歌曲id，拼接成数组
                const songArr = new Array();
                for(let i in this.sheet.trackIds) {
                    songArr.push(this.sheet.trackIds[i].id)
                }
                getAllSongs(songArr).then(data => {
                    this.isLoading = false
                    this.allSongList = data.songs
                })
                // this.sheetNickname = this.sheet.name
            })
        },
        clickReturn() {
            this.$router.go(-1)
        },
    },
    mounted() {
        this.getMessage()
        this.sheetLive()
        console.log(this.sheetId)
    },
}
</script>
<style lang="scss" scoped>
    .sheet-detail {
        height: 100%;
        overflow: hidden;
        padding: 0;
        .officialSheet {
            height: 100%;
            overflow-y: auto;
            background-size: 100%;
            background-repeat: no-repeat;
            .van-nav-bar {
                display: flex;
                text-align: right;
                position: fixed;
                width: 100%;
                /*background-color: rgba(0,0,0,0);*/
                background-size: 100%;
                .arrow-left {
                    font-size: 1.3rem;
                    color: #fff;
                    margin-left: 15px;
                }
                h3 {
                    color: #ffffff;
                    font-size: 1rem;
                    margin-left: 1rem;
                    font-family: love-better;
                    .iconfont {
                        margin-right: .3rem;
                    }
                }
                .search {
                    position: absolute;
                    right: 15px;
                    margin: auto;
                }
            }
            .header {
                padding: 106px 30px 0;
                .nav-title {
                    p {
                        margin: 0;
                        color: #fff;
                        font-family: Jianti;
                        font-size: 1.2rem;
                        a {
                            padding: 2px 5px;
                            background-color: rgba(204,204,204,.35);
                            border-radius: 5px;
                            margin-left: .5rem;
                            font-size: .85rem;
                        }
                    }
                    h3 {
                        font-size: 1rem;
                        color: #fff;
                        line-height: 1.8;
                    }
                }
                .interaction {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2.5rem;
                    padding: 0 2rem;
                    li {
                        text-align: center;
                        span {
                            color: #ffffff;
                            font-family: Jianti;
                            font-size: .85rem;
                        }
                        i {
                            font-size: 1.1rem;
                            color: #fff
                        }
                    }
                }
            }
            .song-music {
                height: 100%;
                border-radius: 20px 20px 0 0;
                background: url("./../../assets/image/home-back.jpg") 0 0 no-repeat;
                background-size: 100%;
                margin-top: 1rem;
                .song-list {
                    height: 100%;
                    background-color: rgba(0,0,0,.6);
                    border-radius: 20px 20px 0 0;
                    padding: 0 15px;
                    overflow: hidden;
                    overflow-y: auto;
                    .song-head {
                        overflow: hidden;
                        padding: 10px 0 15px;
                        .paly-all {
                            line-height: 1.5;
                            float: left;
                            margin-right: 1rem;
                        }
                        span {
                            float: left;
                            line-height: 1.5;
                            font-size: 1rem;
                            font-family: Jianti;
                            color: #fff;
                            a {
                                font-size: .45rem;
                                color: #cdcdcd
                            }
                        }
                        .van-button {
                            float: right;
                            width: auto;
                            height: auto;
                            font-size: .45rem;
                            font-family: Jianti;
                            border: none;
                            border-radius: 20px;
                            padding: 8px 8px;
                            background-color: #cdcdcd;
                            color: #fff;
                            display: flex;
                        }
                    }
                    .song-list-props {
                        height: 100%;
                        ul {
                            height: 100%;
                            width: 100%;
                            /*overflow: auto;*/
                            li {
                                display: flex;
                                /*padding: 0 15px;*/
                                width: 100%;
                                margin-bottom: .8rem;
                                font-family: Jianti;
                                color: #fff;
                                .item-song-number {
                                    display: inline-block;
                                    width: 10%;
                                    color: #cdcdcd;
                                    font-size: 1rem;
                                    line-height: 2;
                                }
                                .item-song-message {
                                    width: 80%;
                                    font-size: .85rem;
                                    p {
                                        margin: 0;
                                        width: 100%;
                                        overflow:hidden; //超出的文本隐藏
                                        text-overflow:ellipsis; //溢出用省略号显示
                                        white-space:nowrap; //溢出不换行
                                        a {
                                            font-size: .95rem;
                                        }
                                    }
                                    span {
                                        color: #cdcdcd
                                    }
                                }
                                .item-song-option {
                                    display: inline-block;
                                    width: 10%;
                                    text-align: right;
                                    font-size: 1.2rem;
                                    line-height: 2;
                                }
                            }
                        }
                    }
                }
            }
        }
        .personal-user {
            background-color: #676767;
            .else-head {
                .van-nav-bar{
                    background-color: #676767;
                    h3 {
                        width: 80%;
                        margin: 0;
                    }
                }
                .header {
                    padding: 60px 15px 0;
                    .nav-title {
                        display: flex;
                        .sheet-image {
                            width: 30%;
                            img {
                                width: 100%;
                                border-radius: 5px;
                            }
                        }
                        .sheet-message {
                            width: 69%;
                            padding-left: 1rem;
                            position: relative;
                            h3 {
                                margin: 0;
                                font-size: 1.05rem;
                                font-weight: 500;
                                font-family: love-better;
                                line-height: 1.5;
                                word-break: break-all;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                            .sheet-message-creator {
                                display: flex;
                                margin: .3rem 0 .5rem;
                                img {
                                    border-radius: 50%;
                                    margin-right: .5rem;
                                }
                                span {
                                    color: #fff;
                                    font-size: .65rem;
                                    color: #cdcdcd;
                                    line-height: 1.8;
                                    margin-right: .5rem;
                                }
                                .van-icon {
                                    line-height: 1.7;
                                    font-size: .85rem;
                                }
                            }
                            .sheet-message-desc {
                                font-size: .45rem;
                                word-break: break-all;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                position: absolute;
                                width: 85%;
                                bottom: .3rem;
                                padding-right: .5rem;
                                .van-icon {
                                    font-size: .65rem;
                                    position: absolute;
                                    margin: auto;
                                    right: -.2rem;top: 0;bottom: 0;
                                    line-height: 1.8;
                                }
                            }
                            .van-overlay {
                                text-align: center;
                                background-color: rgb(129, 129, 129);
                                padding-top: 4rem;
                                .van-icon {
                                    position: absolute;
                                    right: 1rem;top: 1rem
                                }
                                .desc-image {
                                    border-radius: 5px;
                                }
                                h3 {
                                    overflow:hidden; //超出的文本隐藏
                                    text-overflow:ellipsis; //溢出用省略号显示
                                    white-space:nowrap; //溢出不换行
                                    margin: .8rem 0;
                                }
                                .image-inline {
                                    width: 50%;
                                    height: 1px;
                                    background-color: #919191;
                                    margin: 0 auto .8rem;
                                }
                                .sheet-tag {
                                    font-size: .85rem;
                                    text-align: left;
                                    width: 85%;
                                    margin: 0 auto 1rem;
                                    a {
                                        background-color: rgba(204, 204, 204, 0.25);
                                        border-radius: 10px;
                                        padding: 4px 10px;
                                    }
                                }
                                textarea {
                                    background-color: rgba(0,0,0,0);
                                    width: 85%;
                                    border: none;
                                    color: #cdcdcd;
                                    font-family: love-better;
                                    line-height: 1.5;
                                    font-size: .85rem;
                                }
                            }
                        }
                    }
                    .interaction {
                        margin-top: 1rem;
                        padding: 0 2rem
                    }
                }
            }
            .song-music {
            }
        }
    }
</style>