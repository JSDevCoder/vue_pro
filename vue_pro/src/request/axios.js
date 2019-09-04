import { reqPathConfig } from './config.js'
import axios from 'axios'

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 是否使用mock数据
        const isMock = true;

        // 默认超时时间
        config.timeout = 5 * 1000;

        // 设置默认baseURL
        if(isMock && process.env.VUE_APP_MODE === 'development'){
            config.baseURL = reqPathConfig().mockUrl;
        }else{
            config.baseURL = reqPathConfig().baseUrl;
        }

        return config;
    },
    err => {
        return Promise.reject(err); 
    }
);

// 响应拦截器
axios.interceptors.response.use(
    res => {
        console.log(res)
        if(res.status === 200){
            if(res.data.code === 1){
                return res.data;
            }else if(res.data.code === -1){
                console.log('业务逻辑出错')
            }else if(res.data.code === -403){
                console.log('登陆不存在或已失效，重定向到登陆')
            }
        }else if(res.status === 500){
            console.log('服务端出错') 
        }else if(res.status === 404){
            console.log('接口不存在')
        }
    },
    err => {
        return Promise.reject(err);
    }
);


export default axios;

