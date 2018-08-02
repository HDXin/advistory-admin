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
        {
          path: '/subjectInfo',
          name: 'subject_info',
          meta:{
            title: '标的信息'
          },
          component: () => import('@/pages/quotes/SubjectInfo')
        },
        {
          path: '/dailyInfo',
          name: 'daily_info',
          meta:{
            title: '每日数据信息'
          },
          component: () => import('@/pages/quotes/DailyInfo')
        },
        {
          path: '/referenceCurveInfo',
          name: 'referenceCurve_info',
          meta:{
            title: '参考曲线数据信息'
          },
          component: () => import('@/pages/quotes/ReferenceCurveInfo')
        },
        {
          path: '/targetInfo',
          name: 'target_info',
          meta:{
            title: '标的品种信息'
          },
          component: () => import('@/pages/quotes/TargetInfo')
        },
        {
          path: '/timeShareInfo',
          name: 'timeShare_info',
          meta:{
            title: '分时数据信息'
          },
          component: () => import('@/pages/quotes/TimeShareInfo')
        },
        {
          path: '/upDownsInfo',
          name: 'UpDowns_info',
          meta:{
            title: '涨跌预判信息'
          },
          component: () => import('@/pages/quotes/UpDownsInfo')
        },
        {
          path: '/feedback',
          name: 'feedback',
          meta:{
            title: '意见反馈'
          },
          component: () => import('@/pages/feedback/Feedback')
        },
        {
          path: '/vip',
          name: 'vip',
          meta:{
            title: '会员用户'
          },
          component: () => import('@/pages/vip/vipUser')
        },
        {
          path: '/vip/edit/:id',
          name: 'vip_edit',
          meta:{
            title: '会员详情'
          },
          component: () => import('@/pages/vip/Edit')
        },
        {
          path: '/advistory',
          name: 'advistory',
          meta:{
            title: '咨询管理'
          },
          component: () => import('@/pages/advistory/Advistory')
        },
        {
          path: '/advistory/create',
          name: 'advistory',
          meta:{
            title: '咨询管理新增'
          },
          component: () => import('@/pages/advistory/Edit')
        },
        {
          path: '/advistory/edit/:id',
          name: 'advistory_edit',
          meta:{
            title: '咨询管理编辑'
          },
          component: () => import('@/pages/advistory/Edit')
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
