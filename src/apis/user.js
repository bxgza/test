import request from '@/utils/request'
export const registerAPI=({username,password,repassword})=>{
  
  return request.post('/api/reg',{username,password,repassword})
}
export const loginAPI=({username,password})=>{
  
  return request.post('/api/login',{username,password})
}
//获取用户基本信息
export const getUserInfoAPI=()=>{
  console.log("getUserInfo")
  return request.get('/my/userinfo')
}

export const updateUserInfoAPI=({id,nickname,email})=>{
  console.log("用户信息：",id,nickname,email)
  return request.put('/my/userinfo',{id,nickname,email})
}
//更新用户头像
export const updateAvatarAPI=(avatar)=>{
  
  return request.patch('/my/update/avatar',{avatar})
}
export const resetPassword=({old_pwd,new_pwd,re_pwd})=>{
  return request.patch('/my/updatepwd',{old_pwd,new_pwd,re_pwd})
}