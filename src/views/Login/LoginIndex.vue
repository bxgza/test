<script setup>
import {ref,watch} from 'vue'
import {ElMessage} from 'element-plus'
import { registerAPI ,loginAPI} from '@/apis/user';
import { User,Lock } from '@element-plus/icons-vue'
import {userTokenStore} from '@/stores/user'
import {useRouter} from 'vue-router'
const router=useRouter()
const form=ref()
const userToken=userTokenStore()
const registerData=ref({
  username:'',
  password:'',
  repassword:''
})
const checkPassword=(rule,value,callback)=>{
  if(value===''){
    callback(new Error('请再次输入密码'))
  }else if(value!==registerData.value.password){
    callback(new Error('两次密码不一样'))
  }else{
    callback()
  }
}
const rules=ref({
  username:[
    {required:true,message:'请输入账号',trigger:'blur'},
    {pattern: /^\S{6,15}$/,message:'请输入长度为5-16的字符',trigger:'blur'}
  ],
  password:[
  {required:true,message:'请输入密码',trigger:'blur'},
  {pattern: /^\S{6,15}$/,message:'请输入长度为5-16的字符',trigger:'blur'}
  ],
  repassword:[
    {validator:checkPassword,trigger:'blur'}
  ]
})
const isRegister=ref(false)

const getRegister=async()=>{
  await form.value.validate()
  const res=await registerAPI(registerData.value)
  ElMessage.success(res.msg?res.msg:'注册成功')
  isRegister.value=false
  router.push('/')
}

const Login=async()=>{
  await form.value.validate()
  const res=await loginAPI(registerData.value)
  console.log(res)
  userToken.setToken(res.token)
  ElMessage.success(res.msg?res.msg:'登录成功')
  router.push('/')
}
const clearRegisterData=()=>{
  registerData.value={
    username:'',
    password:'',
    repassword:''
  }
}
watch(isRegister, () => {
  registerData.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>
<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <div class="form">
    <el-form ref="form"  size="large" autocomplete="off" v-if="isRegister" :rules="rules" :model="registerData">
      <el-form>
        <h1>注册</h1>
      </el-form>
      <el-form-item :prefix-icon="User" prop="username" required label="账号" placeholder="请输入账号">
        <el-input v-model="registerData.username" />
      </el-form-item>
      <el-form-item :prefix-icon="Lock" prop="password" required label="密码" placeholder="请输入密码">
        <el-input v-model="registerData.password"  type="password" />
      </el-form-item>
      <el-form-item prop="repassword" required label="密码" placeholder="请再次输入密码">
        <el-input :prefix-icon="Lock" v-model="registerData.repassword"  type="password" />
      </el-form-item>
      <el-form-item>
        <el-button class="button" type="primary" auto-insert-space @click="getRegister">
          注册
        </el-button>
      </el-form-item>
      <el-form-item class="flex">
        <el-link type="info" :underline="false" @click="isRegister=false,clearRegisterData()"> 返回</el-link>
       
      </el-form-item>
    </el-form>  
    <el-form ref="form" :model="registerData" :rules="rules" size="large" autocomplete="off" v-else>
      <el-form >
        <h1>登录</h1>
      </el-form>
      <el-form-item prop="username" required label="账号" placeholder="请输入账号">
        <el-input :prefix-icon="User" v-model="registerData.username"  />
      </el-form-item>
      <el-form-item prop="password" required label="密码" placeholder="请输入密码">
        <el-input v-model="registerData.password" name="password"
            :prefix-icon="Lock"
            type="password" show-password  />
      </el-form-item>
      <el-form-item class="flex">
        <div class="flex">
          <el-checkbox>记住我</el-checkbox>
          <el-link type="primary" :underline="false">忘记密码？</el-link>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="button" type="primary" auto-insert-space @click="Login" >
         登录
        </el-button>
      </el-form-item>
      <el-form-item class="flex">
        <el-link type="info" :underline="false" @click="isRegister=true"> 注册-></el-link>
       
      </el-form-item>
    </el-form>  
  </div>
    </el-col>
  </el-row>
  
</template>
<style lang="scss" scoped>
 .login-page{
  height: 100vh;
  background-color: #fff;
  .bg{
    background: url('@/assets/logo2.png')no-repeat 60% center / 240px auto,
    url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form{
    display: flex;
    justify-content: center;
    user-select: none;
    .title{
      margin: 0 auto;
    }
    .button{
      width: 100%;
    }
    .flex{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
 }
</style>