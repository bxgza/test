import Main from '@/views/mainIndex.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/LoginIndex.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import UserAvatar from '@/views/user/UserAvatar.vue'

import ArticleCategory from '@/views/article/ArticleCategory.vue'
import ArticleManage from '@/views/article/ArticleManage.vue'
import UserPassword from '@/views/user/UserPassword.vue'
import ArticlesCharts from '@/views/article/ArticlesCharts.vue'

import Activity from '@/views/activity/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main,
      children:[
        {
          path:'info',
          component:UserInfo
        },
        {
          path:'avatar',
          component:UserAvatar
        },
        {
          path:'password',
          component:UserPassword
        },
        {
          path:'',
          component:ArticleCategory
        },
        {
          path:'articleManage',
          component:ArticleManage
        },
        {
          path:'articlesCharts',
          component:ArticlesCharts
        }
      ]
    },
    {
      path:'/login',
      component:Login
    },
    
    {
      path:'/activity',
      component:Activity
    }
  ],
})

export default router
