<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import {ref} from 'vue'

import { userInfoStore} from '@/stores/user';
import { updateAvatarAPI } from '@/apis/user';
import { ElMessage } from 'element-plus';

const uploadRef = ref()

const userInf=userInfoStore()
const imgUrl= ref(userInf.userInfo.user_pic)
const uploadsuccess=(uploadFile)=>{
    const reader=new FileReader()
    reader.readAsDataURL(uploadFile.raw)
    reader.onload=()=>{
        imgUrl.value=reader.result
    }
}
const updateAvatar=async()=>{
    await updateAvatarAPI(imgUrl.value)
    await userInf.getUser()
    ElMessage.success('修改成功')
   
}
</script>

<template>
    <page-container title="更换头像">
       
        <el-row>
            <el-col :span="12">
                <el-upload 
                    ref="uploadRef"
                    class="avatar-uploader" 
                    :show-file-list="false"
                   :auto-upload="false"
                    :on-change="uploadsuccess"
                    >
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <img v-else src="@/assets/default.png"  width="278" />
                </el-upload>
                <br />
                <el-button type="primary" :icon="Plus" size="large"  @click="uploadRef.$el.querySelector('input').click()">
                    选择图片
                </el-button>
                <el-button type="success" :icon="Upload" size="large" @click="updateAvatar">
                    上传头像
                </el-button>
            </el-col>
        </el-row>
    </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
      

        .el-upload {
            border: 1px dashed var(--el-border-color);
            width: 300px;
            height: 300px;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>