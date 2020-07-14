<template>
    <div class="search-detail">
        <div class="main-container">
            <header class="van-nav-bar">
                <i class="arrow-left iconfont icon-houtui" @click="clickReturn"></i>
                <input class="search-message" v-model="searchTag" type="text">
                <i class="personal iconfont icon-guanbi" v-if="searchTag"></i>
            </header>
            <van-tabs v-model="active"
                  background="rgba(129, 129, 129)"
                  :border="false"
                  title-active-color="#fff"
                  title-inactive-color="#cdcdcd"
                  line-height="2px"
                  line-width="30px"
                  color="#fff"
                  animated
                  swipeable>
                <van-tab title="单曲" tag="1" class="single">
                    <v-single v-bind:title="searchTag"></v-single>
                </van-tab>
                <van-tab title="视频" tag="1014" class="video">
                    <v-video v-bind:title="searchTag"></v-video>
                </van-tab>
                <van-tab title="歌手" tag="100" class="singer">
                    <v-singer v-bind:title="searchTag"></v-singer>
                </van-tab>
                <van-tab title="专辑" tag="10" class="album">
                    <v-album v-bind:title="searchTag"></v-album>
                </van-tab>
                <van-tab title="歌单" tag="1000" class="songsheet">
                    <song-sheet v-bind:title="searchTag"></song-sheet>
                </van-tab>
                <van-tab title="用户" tag="1002" class="users">
                    <v-user v-bind:title="searchTag"></v-user>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
// import { searchContent } from '../../http/api'
import vSingle from './components/single.vue'
import vVideo from './components/video.vue'
import VSinger from './components/singer.vue'
import VAlbum from './components/album.vue'
import songSheet from './components/songsheet.vue'
import vUser from './components/user.vue'
export default {
    name: 'searchDetail',
    data() {
        return {
            searchTag: '',      // 父组件传过来的搜索的值
            active: 0,
        }
    },
    components: {
        vSingle,
        vVideo,
        VSinger,
        VAlbum,
        songSheet,
        vUser
    },
    methods: {
        // 返回上一页
        clickReturn() {
            this.$router.go(-1)
        },
        // 根据父组件传过来的keywords进行搜索，并获取结果
        async putSearch() {
            let key = this.$route.params.key
            this.searchTag = key
        },
    },
    mounted() {
        this.putSearch()
    }
}
</script>
<style lang="scss" scoped>
    .search-detail {
        height: 100%;
        background: url("./../../assets/image/home-back.jpg") 0 0 no-repeat;
        background-size: 100%;
        .main-container {
            height: 100%;
            background-color: rgba(0,0,0,.8);
            overflow-y: auto;
            .van-nav-bar {
                display: flex;
                text-align: right;
                position: fixed;
                width: 100%;
                background-color: rgb(129, 129, 129);
                .arrow-left {
                    font-size: 1.3rem;
                    color: #fff;
                    margin-left: 15px;
                }
                .search-message {
                    font-size: .65rem;
                    margin-left: 1rem;
                    font-family: love-better;
                    color: #f1ebeb;
                    border: none;
                    background-color: rgba(0,0,0,0);
                    border-bottom: 1px solid #cdcdcd;
                    width: 85%;
                    line-height: 1.8;
                    &::-webkit-input-placeholder {
                        color: #fff
                    }
                }
                .personal {
                    font-size: .9rem;
                    color: #fff;
                    position: absolute;
                    right: 10px;
                }
            }
            .van-tabs--line {
                position: fixed;
                width: 100%;
                height: 100%;
                top: 46px;
                ::v-deep {
                    .van-tabs__wrap {
                        height: 34px;
                    }
                    .van-tabs__nav {
                        height: 34px;
                        padding-bottom: 15px;
                        overflow: hidden;
                        .van-tab {
                            flex: 0 0 18%;
                            flex-basis: 18% !important;
                        }
                    }
                    .van-tabs__content {
                        height: 100%;
                        color: #fff;
                        font-family: love-better;
                        h3.list-title {
                            margin: 0;
                            display: flex;
                            justify-content: space-between;
                            font-size: 1rem;
                            .play-all {
                                font-size: .65rem;
                                font-weight: 200;
                                display: flex;
                                border: 1px solid #656565;
                                border-radius: 10px;
                                padding: 3px 10px;
                                .van-icon {
                                    margin: .05rem .2rem 0 0;
                                }
                            }
                        }
                        .single {
                            padding: 15px 15px 6rem;
                            overflow-y: auto;
                            ul {
                                li {
                                    margin-top: 1rem;
                                    overflow: hidden;
                                    >div {
                                        float: left;
                                        width: 90%;
                                        h3 {
                                            margin: 0;
                                            font-size: .85rem;
                                            color: #fff
                                        }
                                        p {
                                            margin: .3rem 0 0 0;
                                            font-size: .45rem;
                                            color: #cdcdcd;
                                            overflow:hidden; // 超出的文本隐藏
                                            text-overflow:ellipsis; // 溢出用省略号显示
                                            white-space:nowrap; // 溢出不换行
                                            span .active {
                                                color: #aad4ff;
                                            }
                                        }
                                    }
                                    .song-video {
                                        float: right;
                                    }
                                    .song-setting {
                                        float: right;
                                    }
                                }
                            }
                        }
                        .video {
                            padding: 10px 15px 6rem;
                            overflow-y: auto;
                            ul {
                                li {
                                    display: flex;
                                    margin-bottom: .5rem;
                                    .video-image {
                                        width: 33%;
                                        position: relative;
                                        img {
                                            width: 100%;
                                            border-radius: 5px;
                                        }
                                        .play-time {
                                            position: absolute;
                                            right: .3rem;top: .2rem;
                                            font-size: .65rem;
                                            i {
                                                font-size: .45rem;
                                                margin-right: .1rem;
                                            }
                                        }
                                    }
                                    .video-message {
                                        padding: .3rem 0 0 .8rem;
                                        width: 77%;
                                        h3 {
                                            font-size: .85rem;
                                            margin: 0;
                                            font-weight: 500;
                                            line-height: 1.3;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            display:-webkit-box; //作为弹性伸缩盒子模型显示。
                                            -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
                                            -webkit-line-clamp:2; //显示的行
                                        }
                                        p {
                                            margin: .3rem 0 0 0;
                                            color: #cdcdcd;
                                            font-size: .45rem;
                                        }
                                    }
                                }
                            }
                        }
                        .singer {
                            padding: 10px 15px 6rem;
                            overflow-y: auto;
                            ul {
                                li {
                                    display: flex;
                                    position: relative;
                                    margin-bottom: .8rem;
                                    .singer-avatar-image {
                                        width: 12%;
                                        img {
                                            width: 100%;
                                            border-radius: 50%;
                                        }
                                    }
                                    .singer-name {
                                        margin: 0 0 0 1rem;
                                        font-size: .85rem;
                                        color: #aad4ff;
                                        line-height: 3.5;
                                        span {
                                            color: #cdcdcd
                                        }
                                    }
                                    .singer-auth {
                                        position: absolute;
                                        margin: auto;
                                        right: 0;
                                        line-height: 3;
                                        .van-icon {
                                            font-size: .6rem;
                                            margin-right: .5rem;
                                        }
                                        span {
                                            font-size: .45rem;
                                            color: #cdcdcd
                                        }
                                    }
                                }
                            }
                        }
                        .album {
                            padding: 10px 15px 6rem;
                            overflow-y: auto;
                            ul {
                                li {
                                    display: flex;
                                    margin-bottom: .5rem;
                                    .album-image {
                                        width: 12%;
                                        position: relative;
                                        img {
                                            width: 100%;
                                            z-index: 100;
                                            border-radius: 5px;
                                        }
                                        .album-image-round {
                                            position: absolute;
                                            z-index: -1;
                                            background-color: #000;
                                            width: 100%;
                                            height: 90%;
                                            left: 20%;
                                            border-radius: 50%;
                                        }
                                    }
                                    .album-desc {
                                        margin: 0;
                                        padding: .2rem 0 0 1rem;
                                        p {
                                            margin: 0;
                                            font-size: .85rem;
                                            font-weight: 500;
                                            span {
                                                color: #cdcdcd
                                            }
                                        }
                                        a {
                                            font-size: .45rem;
                                            color: #cdcdcd
                                        }
                                        a .active {
                                            color: #aad4ff;
                                        }
                                    }
                                }
                            }
                        }
                        .songsheet {
                            padding: 10px 15px 6rem;
                            overflow-y: auto;
                            ul {
                                li {
                                    display: flex;
                                    margin-bottom: .5rem;
                                    .sheet-image {
                                        width: 12%;
                                        img {
                                            width: 100%;
                                            border-radius: 5px;
                                        }
                                    }
                                    .sheet-desc {
                                        margin: 0;
                                        padding: .2rem 0 0 1rem;
                                        font-size: .85rem;
                                        p {
                                            margin: 0 0 .3rem 0;
                                        }
                                        a {
                                            font-size: .65rem;
                                            color: #cdcdcd;
                                        }
                                    }
                                }
                            }
                        }
                        .users {
                            padding: 10px 15px 6rem;
                            overflow-y: auto;
                            ul {
                                li {
                                    display: flex;
                                    margin-bottom: 1rem;
                                    .user-avatar-image {
                                        width: 11%;
                                        img {
                                            width: 100%;
                                            border-radius: 50%;
                                        }
                                    }
                                    .user-name {
                                        margin: 0 0 0 1rem;
                                        font-size: 0.85rem;
                                        color: #aad4ff;
                                        line-height: 3;
                                        .iconfont {
                                            font-size: .65rem;
                                            font-weight: 500;
                                            margin-left: .5rem;
                                        }
                                        .icon-nv {
                                            color: #f99898
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>