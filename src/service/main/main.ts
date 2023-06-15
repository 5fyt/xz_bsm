import { hyRequest2 } from ".."
//获取角色列表
export const getRoleList=()=>{
  return hyRequest2.post({
    url:'role/list'
  })
}
//获取部门列表
export const getDepartmentsList=()=>{
  return hyRequest2.post({
    url:'department/list'
  })
}
//获取菜单列表
export function getEntireMenus() {
  return hyRequest2.post({
    url: '/menu/list'
  })
}
