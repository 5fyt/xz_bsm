import { deleteDate, getUserList } from '@/service/system/system'
import { defineStore } from 'pinia'
interface userType {
  userList: any[]
  totalCount: number
}
const useUserStore = defineStore('user', {
  state: (): userType => ({
    userList: [],
    totalCount: 0
  }),
  actions: {
    //获取用户列表数据
    async asyncGetList(query: any) {
      const res = await getUserList(query)
      this.userList = res.data.list
      this.totalCount = res.data.totalCount
    },
    deleteUserDate(id:number) {
      deleteDate(id)
    }
  }
})
export default useUserStore
