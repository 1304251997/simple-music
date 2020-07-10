<template>
    <div class="mine">
        <!--// 个人账户信息-->
        <section class="account-header">
            <a class="account-avatar">
                <img :src="account.avatarUrl" alt="">
            </a>
            <div class="account-name">
                <p>{{account.nickname}}</p>
                <i>Lv.{{userLevel}}</i>
            </div>
            <div class="openVip" v-if="account.vipType == '0'"><span>开通黑胶VIP</span><van-icon name="arrow" /></div>
        </section>
        <!-- // submenu 列表 -->
        <section class="submenu">
            <ul>
                <li v-for="item in listLabel" :key="item.title">
                    <van-icon :name="item.name" size="1.2rem" color="#ffffff" />
                    <br>
                    <span>{{item.title}}</span>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
import { getUserDetail, getUserStore } from '../../../http/api'
export default {
    name: 'mine',
    data() {
        return {
            account: {},
            userLevel: '',
            listLabel: [
                {name: 'music-o', title: '本地音乐'},
                {name: 'down', title: '下载管理'},
                {name: 'tv-o', title: '我的电台'},
                {name: 'star-o', title: '我的收藏'},
                {name: 'fire-o', title: '关注新歌'}
            ]
        }
    },
    methods: {
        // 获取用户详情
        async getUserMessage() {
            this.account = JSON.parse(localStorage.music_profile)
            await getUserDetail(this.account.userId).then(res => {
                this.userLevel = res.level
            })
            // 获取用户信息，收藏的内容
            await getUserStore(this.account.userId).then(data => {
                console.log(data)
            })
        }
    },
    mounted() {
        this.getUserMessage()
    }
}
</script>
<style lang="scss" scoped>
    .mine {
        padding: 10px 15px 0;
        >.account-header {
            display: flex;
            position: relative;
            .account-avatar {
                width: 13%;
                img {
                    width: 100%;
                    border-radius: 50%;
                }
            }
            .account-name {
                width: 30%;
                margin-left: .8rem;
                padding-top: .6rem;
                p {
                    margin: 0;
                    color: #fff;
                    font-size: .45rem;
                    font-family: Jianti;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                i {
                    color: #fff;
                    font-size: .45rem;
                    font-family: Jianti;
                    padding: 2px 10px;
                    background-color: rgba(255,255,255,.3);
                    border-radius: 10px;
                    margin-right: .5rem;
                }
            }
            .openVip {
                position: absolute;
                margin: auto;
                right: 0;
                top: 18px;
                color: rgba(255,255,255,.8);
                font-family: Jianti;
                font-size: .45rem;
                display: flex;
                span {
                    line-height: 1;
                    margin-right: .3rem;
                }
            }
        }
        >.submenu {
            padding: 20px 0 10px;
            ul {
                display: flex;
                justify-content: space-between;
                padding: 0 15px;
                li {
                    text-align: center;
                    span {
                        font-size: .45rem;
                        font-family: Jianti;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>