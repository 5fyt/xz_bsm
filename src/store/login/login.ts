import { defineStore } from 'pinia'
import { getUserInfo, getUserMenu, login } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { TOKEN_LOGIN, USER_INFO, MENU_INFO } from '@/global/constant'
interface StateType {
  token: string
  userInfo: any
  menuInfo: any
}
const useLoginStore = defineStore('login', {
  state: (): StateType => ({
    token: localCache.getItem(TOKEN_LOGIN) ?? '',
    userInfo: {},
    menuInfo: {}
  }),
  actions: {
    async asyncLoginAction(account: any) {
      const res = await login(account)
      this.token = res.data.token
      localCache.setItem(TOKEN_LOGIN, this.token)

      //存储用户信息
      const users = await getUserInfo(res.data.id)
      this.userInfo = users.data
      localCache.setItem(USER_INFO, this.userInfo)

      //存储菜单信息
      const menu = await getUserMenu(this.userInfo.role.id)
      this.menuInfo = menu.data
      localCache.setItem(MENU_INFO, this.menuInfo)
    }
  }
})
export { useLoginStore }
