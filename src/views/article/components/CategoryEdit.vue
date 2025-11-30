
<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
import {addCategoryAPI, updateCategoryAPI} from '@/apis/article';
const formRef=ref()
const dialogVisible=ref(false)
const categoryModel=ref({
  cate_name:'',
  cate_alias:''
})
const rules={
  cate_name:[
    {required:true,message:'请输入分类名称',trigger:'blur'}
  ],
  cate_alias:[
    {required:true,message:'请输入分类别名',trigger:'blur'}
  ]
}
const emit = defineEmits(['success'])
const onSubmit=async()=>{
  const isEdit=categoryModel.value.id
  if(isEdit){
    await updateCategoryAPI(categoryModel.value)
    ElMessage.success('编辑成功')
  }else{
    await addCategoryAPI(categoryModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value=false
  emit('success')
}
const open=(row)=>{
  dialogVisible.value=true
  categoryModel.value={...row}
}
defineExpose({
  open
})
</script>
<template>
  <el-dialog v-model="dialogVisible" :title="categoryModel.id?'编辑分类':'添加分类'" width="30%">
  <el-form ref="formRef" :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
      <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="categoryModel.cate_name" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias:">
          <el-input v-model="categoryModel.cate_alias" minlength="1" maxlength="15"></el-input>
      </el-form-item>
  </el-form>
  <template #footer>
      <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
  </template>
</el-dialog>
</template>