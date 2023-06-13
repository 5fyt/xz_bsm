import { hyRequest2 } from '..'
//获取部门列表
export const getDepartmentList = (pageName:string, query:any) => {
  return hyRequest2.post({
    url:`/${pageName}/list`,
    data: query
  })
}
//删除部门数据
export const deleteDep = (pageName:string,id: number) => {
  return hyRequest2.delete({
    url:`/${pageName}/${id}`
  })
}
//创建新的部门
export const addNewDep = (pageName:string,formData: any) => {
  return hyRequest2.post({
    url: `/${pageName}`,
    data: formData
  })
}
//修改部门的数据
export const updateDep = (pageName:string,id: number, userForm: any) => {
  return hyRequest2.patch({
    url: `/${pageName}/${id}`,
    data: userForm
  })
}
