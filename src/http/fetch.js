/*
 * fetchData
 * @param {String} url 请求地址
 * @param {String} method 请求方式
 * @param {Object} data 请求参数
 * @returns res.data
 */

import http from './axios'
import Qs from 'qs'

export const fetchData = async (url, method, data = null) => {
    let httpOpts = { url, method }
    httpOpts = method === 'get' ? {
        ...httpOpts,
        params: data,
        // withCredentials: true,
        paramsSerializer: params => Qs.stringify(params, { indices: false })  // 序列化 处理数组
    } : { ...httpOpts, data }

    try {
        const res = await http(httpOpts)
        return res.data
    } catch (error) {
        return null
    }

    // 使用 .then .catch 情况
    // return http(httpOpts).then(res => {
    // return res.data
    // }).catch(err => {
    // return null
    // })
}
