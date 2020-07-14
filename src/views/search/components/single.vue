<template>
    <div>
        <h3 class="list-title">单曲<a class="play-all"><van-icon name="play-circle-o" />播放全部</a></h3>
        <loading v-if="isLoading"></loading>
        <ul>
            <li v-for="item in songsList" :key="item.id">
                <div>
                    <h3>{{item.name}}</h3>
                    <p><span v-for="song in item.artists" :key="song.name"><a :class="song.name == type ? 'active' : ''">{{song.name}}</a></span> - {{item.album.name}}</p>
                    <p v-if="item.alias">{{item.alias[0] ? item.alias[0] : ''}}</p>
                </div>
                <a class="song-setting"><i class="iconfont icon-gengduo"></i></a>
                <a class="song-video" v-if="item.mvid"><i class="iconfont icon-shipin"></i></a>
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
            tags: '1',
            songsList: [],   // 获取的综合列表里的单曲列表
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
                this.songsList = res.result.songs
            })
        }
    },
    mounted() {
        this.getSingleList()
    }
}
</script>
