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
                <van-tab title="综合" class="comprehensive">
                    <h3>单曲<a class="play-all"><van-icon name="play-circle-o" />播放全部</a></h3>
                    <ul>
                        <li v-for="item in songsList" :key="item.id">
                            <div>
                                <h3>{{item.name}}</h3>
                                <p><span v-for="song in item.artists" :key="song.id">{{song.name}}</span> - {{item.album.name}}</p>
                                <p v-if="item.alias">{{item.alias[0] ? item.alias[0] : ''}}</p>
                            </div>
                        </li>
                    </ul>
                </van-tab>
                <van-tab title="单曲">单曲</van-tab>
                <van-tab title="视频">视频</van-tab>
                <van-tab title="歌手">歌手</van-tab>
                <van-tab title="专辑">专辑</van-tab>
                <van-tab title="歌单">歌单</van-tab>
                <van-tab title="用户">用户</van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import { searchContent } from '../../http/api'
export default {
    name: 'searchDetail',
    data() {
        return {
            searchTag: '',      // 父组件传过来的搜索的值
            messageList: Object.freeze([      // 搜索的结果分类
                {title: '综合', tag: '1018'},
                {title: '单曲', tag: '1'},
                {title: '视频', tag: '1014'},
                {title: '歌手', tag: '100'},
                {title: '专辑', tag: '10'},
                {title: '歌单', tag: '1000'},
                {title: '用户', tag: '1002'}
            ]),
            active: 0,
            songsList: []   // 获取的综合列表里的单曲
        }
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
            await searchContent(key).then(data => {
                this.songsList = data.result.songs
            })
        }
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
                        padding: 0 15px;
                        .comprehensive {
                            padding: 15px 0 0 0;
                            h3 {
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
                            ul {
                                li {
                                    display: flex;
                                    margin-top: 1rem;
                                    >div {
                                        h3 {
                                            margin: 0;
                                            font-size: .85rem;
                                            color: #fff
                                        }
                                        p {
                                            margin: .3rem 0 0 0;
                                            font-size: .45rem;
                                            color: #cdcdcd;
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