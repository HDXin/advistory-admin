import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout/Layout'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'HelloWorld',
          component: HelloWorld
        }
      ]
    }
  ]
})
