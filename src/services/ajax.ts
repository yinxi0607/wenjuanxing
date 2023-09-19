import axios from 'axios';
import {message} from "antd";
import {getToken} from "../utils/user-token.ts";

const instance = axios.create({
    timeout: 10*1000,
})


// request 拦截器
instance.interceptors.request.use(
config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
},error => {
    return Promise.reject(error)
}
)

// response 拦截器，统一处理errno 和 msg
instance.interceptors.response.use(
    response => {
        const resData = (response.data || {}) as ResType
        const { errno,data, msg } = resData
        if (errno !== 0) {
            // 错误提示
            if (msg){
                message.error(msg)
            }
            throw new Error(msg || '请求失败')
        }
        return data as any
    }
)

export default instance

export type ResType = {
    errno: number,
    data?: any,
    msg?: string,
}

export type ResDataType = {
    [key: string]: any,
}