import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './config/constant'
import { localCache } from '@/utils/cache'
import { TOKEN_LOGIN } from '@/global/constant'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
//创建第二个实例 实现实例中可以做一个局部拦截
/*

*/
const hyRequest2 = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // console.log('局部请求成功拦截')
      const token = localCache.getItem(TOKEN_LOGIN)
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    },
    requestFailureFn: (err) => {
      // console.log('局部请求失败拦截')
      return err
    },
    responseFailureFn: (err) => {
      // console.log('局部响应失败拦截')
      return err
    },
    responseSuccessFn: (res) => {
      // console.log('局部响应响应成功拦截')
      return res
    }
  }
})
export { hyRequest, hyRequest2 }
