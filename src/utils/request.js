import router from '@/router';
import axios from 'axios'
import { ElMessage } from 'element-plus'


const baseURL = 'http://big-event-vue-api-t.itheima.net'
const instance = axios.create({ 
    baseURL ,
    timeout: 500000
})



import {userTokenStore} from '@/stores/user.js'
instance.interceptors.request.use(
    (config)=>{
        const tokenStore=userTokenStore()
        if(tokenStore.token){
            config.headers.Authorization=tokenStore.token
        }
        return config
    },
    (err)=>{
        Promise.reject(err)
    }
)
//添加请求拦截器
instance.interceptors.response.use(
    result=>{
        if(result.data.code===0){
            return result.data
        }
        ElMessage.error(result.data.message?result.data.message:'服务异常')
        return Promise.reject(result.data)
    },
    err=>{
        if(err.response.status===401){
            ElMessage.error('请先登录！')
            router.push('/login')
        }else{
            ElMessage.error('服务异常')
        }
        return Promise.reject(err)
    }
 
)

export default instance;
export { baseURL }