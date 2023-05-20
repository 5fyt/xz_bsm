import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/home',
      component: () => import('../views/main/home.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/NotFound/NotFound.vue')
    }
  ]
})

export default router
