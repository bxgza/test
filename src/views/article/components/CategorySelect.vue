<script setup>
import { defineProps,defineEmits } from 'vue';
import { ArticleCategoryAPI } from '@/apis/article';
import {ref} from 'vue'
//父传子
defineProps({
  modelValue:{
    type:[Number,String]
  },
  width:{
    type:String
  }
})
const categoryList=ref([])
//子传父
const emit=defineEmits(['update:modelValue'])
const getCategoryList=async()=>{
  const res=await ArticleCategoryAPI()
  console.log(res)
  categoryList.value=res.data
}
getCategoryList()
</script>
<template>
  <el-select 
  :modelValue="modelValue" 
  @change="emit('update:modelValue',$event)"
  :style="{width}"
  >   
  
      <el-option 
          v-for="c in categoryList" 
          :key="c.id" 
          :label="c.cate_name"
          :value="c.id">
      </el-option>
  </el-select>
</template>