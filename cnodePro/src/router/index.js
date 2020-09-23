import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Home',
    component: Home,
    children: [
      // 首页
      {
        path: '/index/index',
        name: 'index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/index/index')
      },
      // 重定向首页
      {
        path: '/',
        redirect: '/index/index'
      },
      // 新手指南
      {
        path: '/new/new',
        name: 'new',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "new" */ '../views/new/new')
      },
      // 文章详情
      {
        path: '/articleDetails/articleDetails/:id',
        name: 'articleDetails',
        component: () => import(/* webpackChunkName: "articleDetails" */ '../views/articleDetails/articleDetails')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
