import { createRouter, createWebHashHistory } from 'vue-router'
const constantRoute = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main', //标记main路由，以便添加动态路由时添加的是他的子路由
    component: () => import('../views/main/home.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound/NotFound.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute
})

export default router
