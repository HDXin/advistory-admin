import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout/Layout'),
      redirect: '/login',
      children: [
        {
          path: '/user',
          name: 'user',
          meta:{
            title: '运营平台用户'
          },
          component: () => import('@/pages/user/User')
        },
        {
          path: '/user/edit/:id',
          name: 'user_edit',
          meta:{
            title: '运营平台用户编辑'
          },
          component: () => import('@/pages/user/Edit')
        },
        {
          path: '/user/create',
          name: 'user_create',
          meta:{
            title: '运营平台用户新增'
          },
          component: () => import('@/pages/user/Edit')
        },
        {
          path: '/carousel',
          name: 'carousel',
          meta:{
            title: '轮播图'
          },
          component: () => import('@/pages/carousel/Carousel')
        },
        {
          path: '/carousel/create',
          name: 'carousel_create',
          meta:{
            title: '轮播图新增'
          },
          component: () => import('@/pages/carousel/Edit')
        },
        {
          path: '/carousel/edit/:id',
          name: 'carousel_edit',
          meta:{
            title: '轮播图编辑'
          },
          component: () => import('@/pages/carousel/Edit')
        },
        {
          path: '/article',
          name: 'article',
          meta:{
            title: '轮播图'
          },
          component: () => import('@/pages/article/Article')
        },
        {
          path: '/article/create',
          name: 'article_create',
          meta:{
            title: '轮播图新增'
          },
          component: () => import('@/pages/article/Edit')
        },
        {
          path: '/article/edit/:id',
          name: 'article_edit',
          meta:{
            title: '轮播图编辑'
          },
          component: () => import('@/pages/article/Edit')
        },
      ]
    },
    {
      path: '/login',
      meta: { title: '登录' },
      component: () => import('@/pages/Login')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
