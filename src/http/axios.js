/*
     * @Author: your name
     * @Date: 2020-04-23 18:03:31
     * @LastEditTime: 2020-06-16 10:21:40
     * @LastEditors: Please set LastEditors
     * @Description: axios请求
     * @FilePath: \simple\src\http\axios
*/
import axios from 'axios'
import router from "../router";
import qs from 'qs'
// import { getToken } from '@/utils/token'

// axios baseURL
const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',    // 实例 baseURL
    timeout: 6000
})
axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错

instance.defaults.headers.post["Content-Type"] = "application/json;chartet=UTF-8"

instance.interceptors.request.use(config => {
    // const token = localStorage.getItem("music_token")
    // if (token) {
    //     config.headers.common["X-Auth-Token"] = token;
    // }
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use(res => {
    /* 错误处理 */
    // ......
    // if(res.data.status == 404) {
    //     router.replace('/');
    //     console.log('token过期')
    // }
    return res
}, err => {
    return Promise.reject(err)
})

export default instance

