import { hyRequest2 } from ".."
//获取用户列表数据
export const getUserList=(query:any)=>{
  return hyRequest2.post({
    url:'/users/list',
    data:query
  })
}
//删除数据
export const deleteDate=(id:number)=>{
  return hyRequest2.delete({
    url:`users/${id}`
  })
}
