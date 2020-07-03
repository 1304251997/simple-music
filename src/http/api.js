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
export const register = (phone, password, captcha, nickname) => postRequest(`register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`)

/* 获取登录状态 */
export const getStatus = data => getRequest('/login/status', data)

/* 检测手机号是否被注册过 */
export const checkPhone = (phone) => getRequest(`cellphone/existence/check?phone=${phone}`)


/* 获取验证码 */
export const getCaptcha = (phone) => postRequest(`/captcha/sent?phone=${phone}`)

/** 检验验证码 **/
export const checkCaptcha = (phone, code) => postRequest(`/captcha/verify?phone=${phone}&captcha=${code}`)
