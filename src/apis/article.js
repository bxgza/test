import request from '@/utils/request'
export const ArticleCategoryAPI=()=>{
  return request.get('/my/cate/list')
}
export const addCategoryAPI=(categoryModel)=>{
  return request.post('/my/cate/add',categoryModel)
}
export const updateCategoryAPI=(categoryModel)=>{
  return request.put('/my/cate/info',categoryModel)
}
export const deleteCategoryAPI=(id)=>{
  return request.delete('/my/cate/del',{params:{id}})
}//或者:'/category?id='+id
//获取文章列表
export const getArticleListAPI=(params)=>{
  return request.get('/my/article/list',{params})
}
//添加文章接口
//formData格式对象
export const addArticleAPI=(data)=>{
  return request.post('/my/article/add',data)
}
//编辑文章
export const editArticleAPI=(params)=>{
  return request.put('/my/article/info', params)
}
export const deleteArticleAPI=(id)=>{
  return request.delete('/my/article/info',{params:{id}})
}
//夺取文章详情
export const getArticleAPI=(id)=>{
  return request.get('/my/article/info',{params:{id}})
}
