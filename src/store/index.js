import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

// 挂在vuex
Vue.use(Vuex)

// 创建vuex对象
const store = new Vuex.Store({
    // 定义状态
    state() {},
    mutations() {},
    actions() {},
    getters() {},
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    modules: {
        user
    }
})

export default store