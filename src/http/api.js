/*
     * @Author: your name
     * @Date: 2020-04-23 18:03:31
     * @LastEditTime: 2020-06-16 10:21:40
     * @LastEditors: Please set LastEditors
     * @Description: api管理
     * @FilePath: \simple\src\http\api
*/
import { getRequest, postRequest } from './request'

/* 登录注册 */
export const login = (phone, password) => postRequest(`/login/cellphone?phone=${phone}&password=${password}`)
export const register = data => postRequest('/register/cellphone', data)

/* 获取登录状态 */
export const getStatus = data => getRequest('/login/status', data)