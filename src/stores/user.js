import { getUserInfoAPI } from "@/apis/user";
import { defineStore } from "pinia";
import {ref} from 'vue'
export const userTokenStore=defineStore('token',()=>{
  const token=ref('')
  //修改token
  const setToken=(newToken)=>{
    token.value=newToken
  }
  //移除token
  const removeToken=()=>{
    token.value=''
  }
  return{
    token,setToken,removeToken
  }
},
{
  persist:true
})
export const userInfoStore=defineStore('user',()=>{
  const userInfo=ref({})
  const getUser=async()=>{
    const res=await getUserInfoAPI()
    userInfo.value=res.data
  }
  const setUserInfo=(user)=>{
    userInfo.value=user
  }
  const removeUserInfo=()=>{
    userInfo.value=''
  }
  return{
    userInfo,setUserInfo,removeUserInfo,getUser,
    
  }
},
{
  persist:true
} 
)

console.log("feature:user:用户分支部分")