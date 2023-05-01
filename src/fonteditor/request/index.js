//在index.js中引入axios
import axios from 'axios';
import { message } from 'antd'

export const baseURL = 'http://localhost:8080/'


//设置axios基础路径
const service = axios.create({
    baseURL
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    
    const token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
    //设置请求头
    config.headers = token ? {
        'Content-Type': 'application/json; charset=utf-8',
        'token': token
    } : {
        'Content-Type': 'application/json; charset=utf-8',
    }

    return config
}, error => {
    return error;
})

// 响应拦截器
service.interceptors.response.use(response => {
    //根据返回不同的状态码做不同的事情
    // 这里一定要和后台开发人员协商好统一的错误状态码
    if (response.status === 200) {
        const data =  response.data
        if(data.code === 200) {
            message.success(data.msg);
            return data;
        } else {
            message.error(data.msg);
            throw new Error(data.msg);
        }
    } else {
        throw new Error("请求错误")
    }
})

//最后把封装好的axios导出
export default service