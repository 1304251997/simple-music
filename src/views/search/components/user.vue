<template>
    <div>
        <loading v-if="isLoading"></loading>
        <ul>
            <li v-for="item in usersList" :key="item.id">
                <a class="user-avatar-image"><img :src="item.avatarUrl" alt=""></a>
                <h3 class="user-name">{{item.nickname}}<i class="iconfont" :class="item.gender == 1 ? 'icon-nan' : item.gender == 2 ? 'icon-nv' : ''"></i></h3>
                <a class="user-auth" v-if="item.accountId">
                    <van-icon name="user-o" />
                    <span>已入驻</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
import { searchContent } from '../../../http/api'
import Loading from '../../../loading/index.vue'
export default {
    props: ['title'],
    data() {
        return {
            tags: '1002',
            usersList: [],   // 获取的综合列表里的单曲列表
            type: this.title,
            isLoading: true
        }
    },
    components: {
        Loading
    },
    methods: {
        async getSingleList() {
            await searchContent(this.type, this.tags).then(res => {
                // this.songsList = data.result.songs
                this.isLoading = false
                this.usersList = res.result.userprofiles
            })
        }
    },
    mounted() {
        this.getSingleList()
    }
}
</script>