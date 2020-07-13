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


// 获取搜索关键词
/** 获取搜索关键词 **/
export const getSearchTag = () => getRequest('/search/default')
/** 获取热搜榜 **/
export const getSearchBoard = () => getRequest('/search/hot/detail')
/** 根据keywords去进行搜索 **/
export const searchContent = (keyword) => getRequest(`/search?keywords=${keyword}`)


/* 获取登录状态 */
export const getStatus = data => getRequest('/login/status', data)
/* 检测手机号是否被注册过 */
export const checkPhone = (phone) => getRequest(`cellphone/existence/check?phone=${phone}`)
/* 获取验证码 */
export const getCaptcha = (phone) => postRequest(`/captcha/sent?phone=${phone}`)
/** 检验验证码 **/
export const checkCaptcha = (phone, code) => postRequest(`/captcha/verify?phone=${phone}&captcha=${code}`)
/** 获取首页banner轮播图 **/
export const dashSwiper = (code) => getRequest(`/banner?type=${code}`)
/** 获取首页精选歌单 **/
export const getSongSheet = (tag) => getRequest(`/top/playlist?limit=6&order=hot&cat=${tag}`)
export const getChoiceSheet = () => getRequest(`/personalized?limit=6`)
/** 获取首页精选歌曲 **/
export const getSongRadio = () => getRequest(`/top/album?offset=0&limit=12`)


// 用户信息
/** 获取用户详细信息 **/
export const getUserDetail = (id) => getRequest(`/user/detail?uid=${id}`)
/** 获取用户信息，歌单、收藏、mv **/
export const getUserStore = (uid) => getRequest(`/user/playlist?uid=${uid}`)


// 歌单
/** 获取歌单详情 **/
export const getSheetDetail = (songid) => getRequest(`/playlist/detail?id=${songid}`)
/** 根据歌单详情获取的歌曲id，去获取全部歌曲 **/
export const getAllSongs = (ids) => getRequest(`/song/detail?ids=${ids}`)
/** 获取tag **/
export const getTypeTag = () => getRequest(`/playlist/catlist`)
