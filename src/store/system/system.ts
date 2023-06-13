import { deleteDate, getUserList , addNewUser,updateUser} from '@/service/system/system'
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
    //删除用户列表中的某个数据
    deleteUserDate(id: number) {
      deleteDate(id)
      //删除后重新渲染数据
      this.asyncGetList({offset:0,size:10})
    },
    //创建新的用户
    async addNewUsers(formDate:any) {
      await addNewUser(formDate)
      this.asyncGetList({offset:0,size:10})
    },
    //修改用户数据
    async updateUserDate(id:number,userForm:any){
      await updateUser(id,userForm)
      this.asyncGetList({offset:0,size:10})
    }
  }
})
export default useUserStore
