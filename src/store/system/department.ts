import {
  getDepartmentList,
  deleteDep,
  addNewDep,
  updateDep
} from '@/service/system/department'
import useMainStore from '@/store/main/main'
import { defineStore } from 'pinia'
interface userType {
  userList: any[]
  totalCount: number
}
const useDepStore = defineStore('dep', {
  state: (): userType => ({
    userList: [],
    totalCount: 0
  }),
  actions: {
    //获取用户列表数据
    async asyncGetList(pageName: string, query: any) {
      const res = await getDepartmentList(pageName, query)
      this.userList = res.data.list
      this.totalCount = res.data.totalCount
    },
    //删除用户列表中的某个数据
    deleteUserDate(pageName: string, id: number) {
      deleteDep(pageName, id)
      //删除后重新渲染数据
      this.asyncGetList(pageName, { offset: 0, size: 10 })
    },
    //创建新的用户
    async addNewUsers(pageName: string, formDate: any) {
      await addNewDep(pageName, formDate)
      this.asyncGetList(pageName, { offset: 0, size: 10 })

      //获取到完整的角色列表
      const mainStore = useMainStore()
      mainStore.getMenuList()
      mainStore.getRoleIdList()
      mainStore.getDepartmentIdList()
    },
    //修改用户数据
    async updateUserDate(pageName: string, id: number, userForm: any) {
      await updateDep(pageName, id, userForm)
      this.asyncGetList(pageName, { offset: 0, size: 10 })
      //获取到完整的角色列表
      const mainStore = useMainStore()
      mainStore.getMenuList()
      mainStore.getRoleIdList()
      mainStore.getDepartmentIdList()
    }
  }
})
export default useDepStore
