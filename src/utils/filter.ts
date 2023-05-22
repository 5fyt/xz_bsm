import type { RouteRecord } from 'vue-router'
export const getDynamicRouterList = () => {
  const dynamicRoutesList: RouteRecord[] = []
  // Record 类型是glob提示的类型
  const files: Record<string, any> = import.meta.glob('../router/**/*.ts', {
    eager: true
  })
  //获取对象中的某个属性添加到新数组里去
  const routes = Object.values(files)
  routes.forEach((route) => dynamicRoutesList.push(route.default))
  console.log(dynamicRoutesList)
  // for(const key in files){
  //   const routes=files[key]
  //   dynamicRoutes.push(routes.default)
  // }
  console.log(dynamicRoutesList)
  return dynamicRoutesList
}
//根据路径来显示菜单
export const getMenuPath = (path: string, userMenu: any[]) => {
  for (const menu of userMenu) {
    for (const childrenMenu of menu.children) {
      if (path === childrenMenu.url) {
        return childrenMenu
      }
    }
  }
}
export let firstMenu: any = null
//根据菜单路由进行匹配动态路由
export const getDynamicRoutes = (userMenu: any[]) => {
  const routeList = getDynamicRouterList()
  const dynamicRoutes: RouteRecord[] = []
  for (const item of userMenu) {
    for (const childItem of item.children) {
      const route = routeList.find(
        (routeItem) => routeItem.path === childItem.url
      )
      //缩小范围确定有值的情况下在添加
      if (route) dynamicRoutes.push(route)
      if (!firstMenu && route) {
        firstMenu = childItem
      }
    }
  }
  console.log(dynamicRoutes)
  return dynamicRoutes
}
interface crumbsType {
  path: string
  name: string
}
export const mapCrumbsMenu = (path: string, userMenu: any[]) => {
  const crumbsArray: crumbsType[] = []
  for (const menu of userMenu) {
    for (const childrenMenu of menu.children) {
      if (childrenMenu.url === path) {
        //记录菜单的子路由的name和path
        crumbsArray.push({ name: childrenMenu.name, path: childrenMenu.url })
        crumbsArray.push({ name: menu.name, path: menu.path })
      }
    }
  }
  return crumbsArray
}
