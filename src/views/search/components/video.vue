<template>
    <div>
        <loading v-if="isLoading"></loading>
        <ul>
            <li v-for="item in videosList" :key="item.id">
                <div class="video-image">
                    <img :src="item.coverUrl" alt="">
<!--                    -->
                    <a class="play-time">
                        <i class="iconfont icon-bofang"></i>
                        <span v-if="item.playTime > 10000">{{Math.floor(item.playTime / 10000)}}万</span>
                        <span v-else-if="item.playTime > 100000000">{{Math.floor(item.playTime / 100000000)}}亿</span>
                        <span v-else>{{item.playTime}}</span>
                    </a>
                </div>
                <div class="video-message">
                    <h3>{{item.title}}</h3>
                    <p>by <span v-for="creator in item.creator" :key="creator.userId">{{creator.userName}}</span></p>
                </div>
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
            tags: '1014',
            videosList: [],   // 获取的综合列表里的单曲列表
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
                this.videosList = res.result.videos
            })
        }
    },
    mounted() {
        this.getSingleList()
    }
}
</script>