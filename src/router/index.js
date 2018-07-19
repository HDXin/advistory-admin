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
        }
      ]
    },
    {
      path: '/login',
      meta: { title: '登录' },
      component: () => import('@/pages/Login')
    }
  ]
})
