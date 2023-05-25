import router from '@/router'
import {  TOKEN_LOGIN } from '@/global/constant'
import { localCache } from './utils/cache'
import { firstMenu } from './utils/filter'
// import { getDynamicRoutes } from '@/utils/filter'
// import notfound from '@/router/NotFound/notfound'
router.beforeEach((to) => {
  // to and from are both route objects. must call `next`.
  const token = localCache.getItem(TOKEN_LOGIN)
   // 只有登录成功(token), 才能真正进入到main页面

   if (to.path.startsWith('/main') && !token) {
     return '/login'
   }

   // 如果是进入到main
   if (to.path === '/main') {
     return firstMenu?.url
   }

})
// const whitePath = ['/login']
// router.beforeEach((to, from, next) => {
//   const token = localCache.getItem(TOKEN_LOGIN)
//   if (token) {
//     if (to.path === '/login') {
//       next(`${firstMenu?.url}`)
//     } else {
//       const menuInfo = localCache.getItem(MENU_INFO)
//       const dynamicRoutes = getDynamicRoutes(menuInfo)
//       router.addRoute(notfound)
//       dynamicRoutes.forEach((route) => router.addRoute('main', route))
//       if (to.path === '/main') {

//         // next({
//         //   ...to,
//         //   replace: true,
//         // });
//       }
//     // next()
//      next({
//           ...to,
//           replace: true,
//         });
//     }
//   } else {
//     if (whitePath.includes(to.path)) {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })
