<template>
    <div class="sheet-detail">
        <div class="officialSheet" v-if="sheet.creator.nickname == '网易云音乐'" :style="{backgroundImage: 'url('+sheet.backgroundCoverUrl+')'}">
            <header class="van-nav-bar">
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
                        <van-icon name="chat-o" color="#fff" size="1.1rem" />
                        <br>
                        <span>{{sheet.commentCount}}</span>
                    </li>
                    <li>
                        <van-icon name="cluster-o" color="#fff" size="1.1rem" />
                        <br>
                        <span>{{sheet.shareCount}}</span>
                    </li>
                    <li>
                        <van-icon name="down" color="#fff" size="1.1rem" />
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
                        <span>播放全部<a>(共{{sheet.tracks.length}}首)</a></span>
                        <button class="van-button"><van-icon name="plus" />收藏({{(sheet.subscribedCount/10000).toFixed(1)}}万)</button>
                    </div>
                    <div class="song-list-props">
                        <ul>
                            <li class="item-song" v-for="(item, index) in allSongList" :key="item.id">
                                <a class="item-song-number">{{index}}</a>
                                <div class="item-song-message">
                                    <p><a>{{item.name}}</a> <span>({{item.alia[0]}})</span></p>
                                    <p><span v-for="arr in item.ar" :key="arr.name">{{arr.name}}/</span><span> - {{item.al.name}}</span></p>
                                </div>
                                <i class="item-song-option iconfont icon-gengduo"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <template v-else>{{sheet.creator.nickname}}</template>
    </div>
</template>
<script>
import { getSheetDetail } from '../../http/api'
export default {
    data() {
        return {
            sheetType: '',      // 歌单类型
            sheetId: '',      // 歌单ID
            sheet: {},
            allSongList: [],       // 获取的全部歌曲列表
        }
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
                this.allSongList = this.sheet.tracks
            })
        },
        clickReturn() {
            this.$router.go(-1)
        }
    },
    mounted() {
        this.getMessage()
        this.sheetLive()
    }
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
                background-color: rgba(0,0,0,0);
                display: flex;
                text-align: right;
                position: fixed;
                width: 100%;
                .arrow-left {
                    font-size: 1.3rem;
                    color: #fff;
                    margin-left: 15px;
                }
                h3 {
                    color: #ffffff;
                    font-size: 1rem;
                    .iconfont {
                        margin-right: .3rem;
                    }
                    margin-left: 1rem;
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
                    li {
                        text-align: center;
                        span {
                            color: #ffffff;
                            font-family: Jianti;
                            font-size: .85rem;
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
                        clear: both;
                        padding: 10px 0;
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
    }
</style>