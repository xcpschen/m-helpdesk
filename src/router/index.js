import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Layout from '@/components/layout/index'


Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: 'home', icon: 'dashboard' }
    }]
  },
  {
    path: '/list/:statusName',
    name: 'list',
    component: () => import('@/views/list/index'),
    props: true
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/detail/index'),
    props: true
  },
  {
    path: '/question/:ft',
    name: 'question',
    component: () => import('@/views/question/index'),
    props:true
  },
  {
    path: '/question/edit/:id',
    name: 'question-edit',
    component: () => import('@/views/question/edit'),
    props:true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router