import router from '@/router'
import { TOKEN_LOGIN } from '@/global/constant'
import { localCache } from './utils/cache'
import { firstMenu } from './utils/filter'
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
