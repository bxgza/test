<script setup>
import { ref } from 'vue'
import {  updateUserInfoAPI } from '@/apis/user';
import { ElMessage } from 'element-plus';
import { userInfoStore } from '@/stores/user';

const formRef=ref()
const {
  userInfo,
  getUser
} = userInfoStore()

const form = ref({
    username: userInfo?.username || '',
    nickname: userInfo?.nickname || '',
    email: userInfo?.email || '',
    id: userInfo?.id ||''
});

const rules = ref({
    nickname: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '昵称必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ],
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
})
const submitForm=async()=>{
    
    await formRef.value.validate()
    await updateUserInfoAPI(form.value)
    console.log(form.value)
    getUser()
    ElMessage.success('修改成功')
}
</script>
<template>
    <page-container title="基本资料">
        
        <el-row>
            <el-col :span="12">
                <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="登录名称">
                        <el-input v-model="form.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="nickname">
                        <el-input v-model="form.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" prop="email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </page-container>>
</template>