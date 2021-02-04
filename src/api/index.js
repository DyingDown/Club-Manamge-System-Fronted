/*
 * 包含多个接口请求函数的模块
 * 函数的返回值：promise对象
 */
import ajax from './ajax'

// export const reqAddress = (geohash) => ajax(`/position/${geohash}`)

export const reqLogin = (username, passowrd) => ajax(`/position/`, { username, password })