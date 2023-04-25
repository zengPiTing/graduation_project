//对axios进行二次封装，增加请求和响应拦截器
import axios from 'axios';

//导入默认url地址
import Url from './config';

//配置新的axios
const requests = axios.create({
    baseURL: Url.hostserve, //默认url
    timeout: 5000 //响应时间5秒
})

//配置请求拦截器，在发起请求之前操作
requests.interceptors.request.use((config) => { //config：配置对象，可以在配置对象中配置header请求头等属性
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 配置响应拦截器
axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default requests