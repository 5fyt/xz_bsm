import { defineStore } from 'pinia'
import { getUserInfo, getUserMenu, login } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { TOKEN_LOGIN, USER_INFO, MENU_INFO, PERMISSION_INFO } from '@/global/constant'
import { getDynamicRoutes } from '@/utils/filter'
import { mapPermission } from '@/utils/mapMenu'
import router from '@/router'
import useMainStore from '../main/main'
interface StateType {
  token: string
  userInfo: any
  menuInfo: any
  permission: any[]
}
const useLoginStore = defineStore('login', {
  state: (): StateType => ({
    token: localCache.getItem(TOKEN_LOGIN) ?? '',
    userInfo: localCache.getItem(USER_INFO) ?? {},
    menuInfo: localCache.getItem(MENU_INFO) ?? {},
    permission: localCache.getItem(PERMISSION_INFO)
  }),
  actions: {
    async asyncLoginAction(account: any) {
      const res = await login(account)
      this.token = res.data.token
      localCache.setItem(TOKEN_LOGIN, this.token)
      console.log('login',res)

      //存储用户信息
      const users = await getUserInfo(res.data.id)
      this.userInfo = users.data
      localCache.setItem(USER_INFO, this.userInfo)

      //存储菜单信息
      const menu = await getUserMenu(this.userInfo.role.id)
      this.menuInfo = menu.data
      localCache.setItem(MENU_INFO, this.menuInfo)
      //登入时就开始请求角色列表和部门列表,完整的菜单列表
      const mainStore = useMainStore()
      mainStore.getRoleIdList()
      mainStore.getDepartmentIdList()
      mainStore.getMenuList()

      //获取按钮权限
      const permission = mapPermission(this.menuInfo)
      this.permission = permission
      localCache.setItem(PERMISSION_INFO, this.permission)

      //注册动态路由
      const dynamicRoutes = getDynamicRoutes(this.menuInfo)
      dynamicRoutes.forEach((route) => router.addRoute('main', route))
    },

    //刷新时，三个数据都要保持不变，必须从本地获取到数据，用pinia的数据校验也会被刷新
    asyncLoadRouter() {
      const token = localCache.getItem(TOKEN_LOGIN)
      const menuInfo = localCache.getItem(MENU_INFO)
      const userInfo = localCache.getItem(USER_INFO)
      if (token && menuInfo && userInfo) {
        this.token = token
        this.menuInfo = menuInfo
        this.userInfo = userInfo
        const dynamicRoutes = getDynamicRoutes(this.menuInfo)

        dynamicRoutes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
export { useLoginStore }
