<script setup>
import { resetPassword } from '@/apis/user';
import { ElMessage } from 'element-plus';
import {ref} from 'vue'
import { userInfoStore,userTokenStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const formRef=ref()
const pwdForm=ref({
  old_pwd:'',
  new_pwd:'',
  re_pwd:''
})
const checkDiffrent=(rule,value,callback)=>{
  if(value===pwdForm.value.old_pwd){
    callback(new Error('新密码不能与原密码一样'))
  }else{
    callback()
  }
}
const checkSame=(rule,value,callback)=>{
  if(value!==pwdForm.value.new_pwd){
    callback(new Error('确认密码必须与原密码一样'))
  }else{
    callback()
  }
}
const rules=ref({
  old_pwd:[
    {required:true,message:'请输入原密码',trigger:'blur'},
    {min:6,max:7,message:'原密码长度在6-15之间',trigger:'blur'}
  ],
  new_pwd:[
    {required:true,message:'请输入新密码',trigger:'blur'},
    {min:6,max:7,message:'新密码长度在6-15之间',trigger:'blur'},
    {validator:checkDiffrent,trigger:'blur'}
  ],
  re_pwd:[
    {required:true,message:'请输入确认密码',trigger:'blur'},
    {min:6,max:7,message:'确认密码长度在6-15之间',trigger:'blur'},
    {validator:checkSame,trigger:'blur'}
  ]
})
const router=useRouter()
const token=userTokenStore()
const user=userInfoStore()
const submit=async()=>{
  await formRef.value.validate
  await resetPassword(pwdForm.value)
  ElMessage.success('修改密码成功')
  token.setToken('')
  user.setUserInfo({})
  router.push('/login')
}
const reSet=()=>{
  formRef.value.resetFields()
}
</script>
<template>
  <page-container title="更改密码">
    <el-row>
      <el-col :span="12">
        <el-form 
          ref="formRef"
          :model="pwdForm"
          :rules="rules"
          label-width="100px">
          
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input show-password v-model="pwdForm.new_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="re_pwd">
            <el-input show-password v-model="pwdForm.re_pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">修改密码</el-button>
            <el-button @click="reSet">重置</el-button>
          </el-form-item>
        </el-form>
    </el-col>
    </el-row>
    
  </page-container>
</template>