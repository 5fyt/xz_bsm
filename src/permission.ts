import router from '@/router'
import { TOKEN_LOGIN } from '@/global/constant'
import { localCache } from './utils/cache'
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const token = localCache.getItem(TOKEN_LOGIN)
  const whitePath=['/login','/404']
  if(token){
    if(to.path==='/login'){
      next('/')
    }else{
      next()
    }
  }else{
     if(whitePath.indexOf(to.path)>-1){
       next()
     }else{
       next('/login')
     }
  }
})
