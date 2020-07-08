/*
     * @Author: your name
     * @Date: 2020-04-23 18:03:31
     * @LastEditTime: 2020-06-16 10:21:40
     * @LastEditors: Please set LastEditors
     * @Description: axios请求
     * @FilePath: \simple\src\http\axios
*/
import axios from 'axios'
// import { getToken } from '@/utils/token'

// axios baseURL
// axios.defaults.baseURL = 'http://127.0.0.1:3000'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',    // 实例 baseURL
    timeout: 6000
})

instance.interceptors.request.use(config => {
    // const token = localStorage.getItem("music_token")
    // token && (config.headers['X-Access-Token'] = token)
    // if (token) {
    //     config.headers.common["X-Auth-Token"] = localStorage.getItem("music_token");
    // }
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use(res => {
    /* 错误处理 */
    // ......
    return res
}, err => {
    return Promise.reject(err)
})

export default instance

