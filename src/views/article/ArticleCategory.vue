<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { ArticleCategoryAPI, deleteCategoryAPI } from '@/apis/article';
import CategoryEdit from './components/CategoryEdit.vue';
const dialog=ref()
const categorys=ref([])
const getCategoryList=async()=>{
  const res=await ArticleCategoryAPI()
  categorys.value=res.data
  console.log(res)
}
getCategoryList()

// console.log("feature分支的修改：按更新时间过滤")
console.log("feature分支：按更新时间过滤")
const deleteCategory = async (row) => {
  await ElMessageBox.confirm(
    '你确定删除该分类信息吗？',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
  
  console.log('点击删除')
  const res = await deleteCategoryAPI(row.id)
  ElMessage.success(res.message ? res.message : '删除成功')
  
  getCategoryList()
}
const onAddCategory=()=>{
  console.log('添加')
  dialog.value.open({})
}
const showDialog=(row)=>{
  dialog.value.open(row)
}
const onSuccess=()=>{
  getCategoryList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddCategory" type="primary">添加分类</el-button>
    </template>
    <el-table :data="categorys" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
          <template #default="{ row,$index }">
              <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row,$index)"></el-button>
              <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row,$index)"></el-button>
          </template>
      </el-table-column>
      <template #empty>
          <el-empty description="没有数据" />
      </template>
    </el-table>

      <!-- 添加分类弹窗 -->
      <category-edit ref="dialog" @success="onSuccess"></category-edit>
 
  </page-container>
 
     
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>