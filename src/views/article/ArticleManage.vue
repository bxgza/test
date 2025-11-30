<script setup>
import { ref } from 'vue'
import {  deleteArticleAPI,  getArticleListAPI } from '@/apis/article';
import CategorySelect from './components/CategorySelect.vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { formatTime } from '@/utils/format.js'
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import ArticleEdit from './components/ArticleEdit.vue'
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
const articleEditRef=ref()

const articles=ref([])

console.log("添加时间搜索")


const total = ref(0)//总条数
const params=ref({
    pagenum:1,
    pagesize:5,
    cate_id:'',
    state:''
})
const getArticle=async()=>{
    const res=await getArticleListAPI(params.value)
    console.log('获取列表结果',res)
    articles.value=res.data
    
    total.value=res.total
    console.log(total)
}

getArticle()
//分页逻辑
const onSizeChange=(size)=>{
    params.value.pagenum=1
    params.value.pagesize=size
    getArticle()
}
const onCurrentChange=(num)=>{
    params.value.pagenum=num
    getArticle()
}
//搜索逻辑
const onSearch=()=>{
    params.value.pagenum=1
    getArticle()
}
//重置逻辑
const onReset=()=>{
    params.value.pagenum=1
    params.value.state=''
    params.value.cate_id=''
    getArticle()
}


const onSuccess=(type)=>{
    if(type==='add'){
        //当添加时，看页数是否需要加1
        const lastPage=Math.ceil((total.value+1)/params.value.pagesize)
        //更新成最大页码
        params.value.pagenum=lastPage
        
    }
    getArticle()
}
//编辑
const editArticle=(row)=>{  
    articleEditRef.value.open(row);
}
//添加
const addArticle = () => {
    
    articleEditRef.value.open({});
};

//删除文章的接口
const deleteArticle=(row)=>{
  ElMessageBox.confirm(
    '你确定删除该文章信息吗？',
    '温馨提示',
    {
      confirmButtonText:'确认',
      cancelButtonText:'取消',
      type:'warning'
    }
  ).then(async()=>{
    //点击确认
    const res=await deleteArticleAPI(row.id)
    ElMessage.success(res.message?res.message:'删除成功')
    getArticle()
  }).catch(()=>{
    ElMessage({
      //点击取消
      type:'info',
      message:'取消删除'
    })
  })
}
</script>
<template>
    <page-container title="文章管理">

        <template #extra>
          
                    <el-button type="primary" @click="addArticle">添加文章</el-button>
              
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            
            <el-form-item label="文章分类：" prop="cate_id">
                <category-select v-model="params.cate_id"></category-select>
            </el-form-item>

            <el-form-item label="发布状态：">
                <el-select placeholder="请选择" v-model="params.state">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">搜索</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="articles" style="width: 100%">
            <el-table-column label="文章标题" width="400" prop="title">
            <template #default="{ row }">
                <el-link type="primary" :underline="false">{{ row.title }}</el-link>
            </template>
            </el-table-column>
                    <el-table-column label="分类" prop="cate_name"></el-table-column>
                    <el-table-column label="发表时间" prop="pub_date">
                        <template #default="{ row }">
                {{ formatTime(row.pub_date) }}
                </template> 
            </el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="editArticle(row) "></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteArticle(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination 
            v-model:current-page="params.pagenum" 
            v-model:page-size="params.pagesize" 
            :page-sizes="[2, 5 ,10, 15]"
            layout="jumper, total, sizes, prev, pager, next" 
            :background="true"
             :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" 
            style="margin-top: 20px; justify-content: flex-end" />

        <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
    </page-container>  
</template>
<style lang="scss">
.page-container {
    min-height: 100%;
    box-sizing: border-box;
.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.el-select{
    width: 200px;
}
    
}


</style>