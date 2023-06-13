import { defineStore } from 'pinia'
import { getRoleList, getDepartmentsList } from '@/service/main/main'
import { localCache } from '@/utils/cache'
import { DEPARTMENT_LIST, ROLE_LIST } from '@/global/constant'
interface MainType {
  roleId: any[]
  departmentId: any[]
}
const useMainStore = defineStore('main', {
  state: (): MainType => ({
    roleId:localCache.getItem(ROLE_LIST),
    departmentId: localCache.getItem(DEPARTMENT_LIST)
  }),
  actions: {
    async getRoleIdList() {
      const res = await getRoleList()
      this.roleId = res.data.list
      localCache.setItem(ROLE_LIST,this.roleId)
    },
    async getDepartmentIdList() {
      const res = await getDepartmentsList()
      this.departmentId = res.data.list
      localCache.setItem(DEPARTMENT_LIST,this.departmentId)
    }
  }
})
export default useMainStore
