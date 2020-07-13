<template>
    <div class="search">
        <div class="main-container">
            <header class="van-nav-bar">
                <i class="arrow-left iconfont icon-houtui" @click="clickReturn"></i>
                <input class="search-message" v-model="searchContent" type="text" :placeholder="value">
                <i class="personal iconfont icon-geren"></i>
            </header>
            <section class="hot-borad">
                <h3>热搜榜</h3>
                <ul>
                    <li v-for="(item, index) in hotList" :key="item.searchWord">
                        <a class="">{{index}}</a>
                        <div>
                            <h3>{{item.searchWord}}<img height="13" :src="item.iconUrl ? item.iconUrl : '-'" alt=""></h3>
                            <p>{{item.content}}</p>
                        </div>
                        <span>{{item.score}}</span>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>
<script>
import { getSearchTag, getSearchBoard } from '../../http/api'
export default {
    name: 'search',
    data() {
        return {
            value: '',      // 获取默认关键词
            searchContent: '',
            hotList: []     // 获取的热搜榜
        }
    },
    methods: {
        clickReturn() {
            this.$router.go(-1)
        },
        async getDefaultTag() {
            await getSearchTag().then(res => {
                this.value = res.data.realkeyword
            })
            await getSearchBoard().then(data => {
                console.log(data)
                this.hotList = data.data
            })
        },
        // 携带着搜索内容跳转
        getHotCommnd(val) {
            this.$router.push({
                path: `/searchDetail/${val}`
            })
            // this.$router.push('/search')
        }
    },
    mounted() {
        this.getDefaultTag()
    },
    created() {
        document.onkeydown = () => {
            let e = event || window.e
            let keyCode = e.keyCode || e.which
            switch (keyCode) {
                case 13:
                    if(!this.searchContent) {
                        this.searchContent = this.value
                    }
                    this.getHotCommnd(this.searchContent)
                    break
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .search {
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
                    color: #cdcdcd;
                    border: none;
                    background-color: rgba(0,0,0,0);
                    border-bottom: 1px solid #cdcdcd;
                    width: 75%;
                    &::-webkit-input-placeholder {
                        color: #fff
                    }
                }
                .personal {
                    font-size: 1.3rem;
                    color: #fff;
                    margin-left: 15px;
                }
            }
            .hot-borad {
                padding: 60px 15px 0;
                font-family: love-better;
                font-size: .85rem;
                color: #fff;
                >h3 {
                    margin: 0;
                }
                ul {
                    padding-bottom: 1rem;
                    li {
                        overflow: hidden;
                        margin-top: 1rem;
                        >a {
                            color: #cdcdcd;
                            float: left;
                            line-height: 35px
                        }
                        div {
                            margin-left: 1.3rem;
                            float: left;
                            h3 {
                                margin: 0;
                                font-size: .85rem;
                                display: flex;
                                img {
                                    margin: .2rem 0 0 .5rem;
                                }
                            }
                            p {
                                margin: .3rem 0 0 0;
                                font-size: .45rem;
                                color: #cdcdcd
                            }
                        }
                        span {
                            float: right;
                            font-size: .45rem;
                            color: #cdcdcd;
                            line-height: 35px
                        }
                    }
                }
            }
        }

    }
</style>