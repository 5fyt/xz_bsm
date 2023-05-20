import { hyRequest2 } from '..'

export const login = (account: any) => {
  return hyRequest2.post({
    url: '/login',
    data: account
  })
}
export const getUserInfo=(id:number)=>{
  return hyRequest2.get({
     url:`/users/${id}`,
  })
}
export const getUserMenu=(id:number)=>{
  return hyRequest2.get({
    url:`/role/${id}/menu`
  })
}

