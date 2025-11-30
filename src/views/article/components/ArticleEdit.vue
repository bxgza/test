<script setup>
import {ref,defineExpose} from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import { Plus } from '@element-plus/icons-vue'

import { addArticleAPI, editArticleAPI, getArticleAPI } from '@/apis/article';
import { baseURL } from '@/utils/request';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import CategorySelect from './CategorySelect.vue';
const formRef=ref()
const visibleDrawer=ref(false)

const defalutForm=ref({
    title:'',
    cate_id:'',
    cover_img:'',
    content:'',
    state:''
})
const articleModel=ref({
    title:'',
    cate_id:'',
    cover_img:'',
    content:'',
    state:''
})
//图片上传
const imgUrl=ref('')
const onSelectFile=(uploadFile)=>{
    imgUrl.value=URL.createObjectURL(uploadFile.raw)//预览图片
    articleModel.value.cover_img=uploadFile.raw//将图片存入对象
}


const editorRef=ref()

// 将网络图片地址转换为 File 对象的函数
async function imageUrlToFileObject(imageUrl, filename) {
  try {
    // 使用 Axios 下载图片数据
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })

    // 将下载的数据转换成 Blob 对象
    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    })

    // 创建 File 对象
    const file = new File([blob], filename, {
      type: response.headers['content-type']
    })

    return file
  } catch (error) {
    console.error('Error converting image URL to File object:', error)
    return null
  }
}
const emit=defineEmits(['success'])

const open=async (row)=>{
    visibleDrawer.value=true
    console.log('添加文章内容',row)
    if(row.id){
        const res=await getArticleAPI(row.id)
        articleModel.value=res.data
        console.log('articleModel的内容')
        console.log(articleModel.value)
        imgUrl.value=baseURL+articleModel.value.cover_img
        const file=await imageUrlToFileObject(
            imgUrl.value,articleModel.value.cover_img
        )
        articleModel.value.cover_img=file
    }else{
        articleModel.value={...defalutForm}
        imgUrl.value=''
        editorRef.value.setHTML('')
        
    }
}
const onPublish=async(state)=>{
    articleModel.value.state=state
    const fd=new FormData()
    for(let key in articleModel.value){
        fd.append(key,articleModel.value[key])
    }
    if(articleModel.value.id){
        await editArticleAPI(fd)

        ElMessage.success('修改成功')
        visibleDrawer.value=false
        emit('success','edit')
    }else{
        console.log('添加文章内容',fd)
        await addArticleAPI(fd)
        ElMessage.success('添加成功')
        visibleDrawer.value=false
        emit('success','add')
    }
}
defineExpose({
  open
});
</script>
<template>
 <el-drawer v-model="visibleDrawer"
    :title="articleModel.id?'编辑文章':'添加文章'"
    direction="rtl"
    size="50%">
    <el-form :model="articleModel" ref="formRef" label-width="100px">
        <el-form-item  label="文章标题" prop="title">
            <el-input  v-model="articleModel.title" ></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
            <category-select
            v-model="articleModel.cate_id"
            width="100%"
            ></category-select>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
            <el-upload 
            class="avatar-uploader"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onSelectFile">
            
                <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="">
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
            <div class="editor">
                <quill-editor
                ref="editorRef"
                v-model:content="articleModel.content"
                content-type="html"
                theme="snow"
                >
                </quill-editor>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
            <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
        </el-form-item>
    </el-form>
 </el-drawer>
</template>

<style>
/* 抽屉样式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
           
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
       
    }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 800px;
  }
}
</style>