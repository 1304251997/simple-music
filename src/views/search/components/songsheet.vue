<template>
    <div>
        <loading v-if="isLoading"></loading>
        <ul>
            <li v-for="item in sheetsList" :key="item.id">
                <div class="sheet-image">
                    <img :src="item.coverImgUrl" alt="">
                </div>
                <h3 class="sheet-desc">
                    <p>{{item.name}}<span v-if="item.alias">{{item.alias[0]}}</span></p>
                    <a>{{item.trackCount}}首 by {{item.creator.nickname}}, 播放<span v-if="item.playCount > 10000">{{Math.floor(item.playCount / 10000)}}万</span><span v-else-if="item.playCount > 100000000">{{Math.floor(item.playCount / 100000000)}}亿</span><span v-else>{{item.playCount}}</span>次</a>
                </h3>
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
            tags: '1000',
            sheetsList: [],   // 获取的综合列表里的歌单列表
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
                this.isLoading = false
                this.sheetsList = res.result.playlists
            })
        }
    },
    mounted() {
        this.getSingleList()
    }
}
</script>