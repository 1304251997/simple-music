import Vue from 'vue'

export const SIGNIN  = 'USER_SIGNIN'   // 登录成功
export const SIGNOUT  = 'USER_SIGNOUT'   // 退出成功

export default {
    state: JSON.parse(localStorage.getItem('music_profile')) || {},
    mutations: {
        [SIGNIN](state, user) {
            localStorage.getItem('music_profile', JSON.stringify(music_profile))
            Object.assign(state, user)
        },
        [SIGNOUT](state) {
            localStorage.removeItem('music_profile')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        [SIGNIN]({commit}, user) {
            commit(SIGNIN, user)
        },
        [SIGNOUT]({commit}) {
            commit(SIGNOUT)
        }
    }
}