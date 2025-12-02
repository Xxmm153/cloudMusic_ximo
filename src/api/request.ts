import axios from 'axios'//引入axios
// 创建axios实例
const request = axios.create({
    timeout: 5000//相应延迟
})
//请求拦截器
// 请求拦截器
request.interceptors.request.use((config:any) => {
    // 在发送请求之前做些什么
    return config;
}, (error:any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//响应拦截器
request.interceptors.response.use((data:any) => {
    return data.data
},(error:any) => {
    return Promise.reject(error)
})
// 暴露出去
export default request