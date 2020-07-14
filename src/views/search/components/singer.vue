<template>
    <div>
        <loading v-if="isLoading"></loading>
        <ul>
            <li v-for="item in singersList" :key="item.id">
                <a class="singer-avatar-image"><img :src="item.img1v1Url" alt=""></a>
                <h3 class="singer-name">{{item.name}}<span v-if="item.alia"> ({{item.alia[0]}})</span></h3>
                <a class="singer-auth" v-if="item.accountId">
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
            tags: '100',
            singersList: [],   // 获取的综合列表里的单曲列表
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
                this.singersList = res.result.artists
            })
        }
    },
    mounted() {
        this.getSingleList()
    }
}
</script>