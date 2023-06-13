import { hyRequest2 } from '..'
//获取用户列表数据
export const getUserList = (query: any) => {
  return hyRequest2.post({
    url: '/users/list',
    data: query
  })
}
//删除数据
export const deleteDate = (id: number) => {
  return hyRequest2.delete({
    url: `/users/${id}`
  })
}
//创建新的用户
export const addNewUser = (formData: any) => {
  return hyRequest2.post({
    url: '/users',
    data: formData
  })
}
//修改用户的数据
export const updateUser = (id: number, userForm: any) => {
  return hyRequest2.patch({
    url: `/users/${id}`,
    data: userForm
  })
}
