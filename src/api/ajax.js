/*
 * ajax 请求函数模块
 * 返回值：promise对象(异步返回的数据是：response.data)
 */
import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
    // console.log(data)
    return new Promise(function(resolve, reject) {
        let promise
        if (type === 'GET') {
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            promise = axios.get(url)
        } else if (type === 'POST') {
            promise = axios.post(url, data)
        } else if (type === 'PUT') {
            promise = axios.put(url, data)
        } else if (type == 'DELETE') {
            promise = axios.delete(url, data)
        }
        promise.then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error)
        })
    })

    // return promise
}

// const response = await ajax()