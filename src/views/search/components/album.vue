<template>
    <div>
        <loading v-if="isLoading"></loading>
        <ul>
            <li v-for="item in albumsList" :key="item.id">
                <div class="album-image">
                    <img :src="item.picUrl" alt="">
                    <a class="album-image-round"></a>
                </div>
                <h3 class="album-desc">
                    <p>{{item.name}}<span v-if="item.alias">{{item.alias[0]}}</span></p>
                    <a><span v-for="album in item.artists" :key="album.id" :class="album.name == type ? 'active' : ''">{{album.name}}</span> {{item.publishTime | formatDate}}</a>
                </h3>
            </li>
        </ul>
    </div>
</template>
<script>
import { searchContent } from '../../../http/api'
import Loading from '../../../loading/index.vue'
import { formatDate } from './../../../utils/formDate'   // 引入转换日期格式
export default {
    filters: {
        formatDate(time) {
            time = time
            let date = new Date(time)
            console.log(new Date(time))
            return formatDate(date, 'yyyy.MM.dd')
        }
    },
    props: ['title'],
    data() {
        return {
            tags: '10',
            albumsList: [],   // 获取的综合列表里的单曲列表
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
                this.albumsList = res.result.albums
            })
        }
    },
    mounted() {
        this.getSingleList()
    }
}
</script>