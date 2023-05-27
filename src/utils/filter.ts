import type { RouteRecord } from 'vue-router'
export const getDynamicRouterList = () => {
  const dynamicRoutesList: RouteRecord[] = []
  // Record 类型是glob提示的类型
  const files: Record<string, any> = import.meta.glob('../router/**/*.ts', {
    eager: true //获取全部路由而不是懒加载的形式
  })
  //获取对象中的某个属性添加到新数组里去
  const routes = Object.values(files)
  routes.forEach((route) => dynamicRoutesList.push(route.default))
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
  const dynamicRoutes: any[] = []
  for (const item of userMenu) {
    for (const childItem of item.children) {
      const route = routeList.find(
        (routeItem) => routeItem.path === childItem.url
      )
      //缩小范围确定有值的情况下在添加
      if (route) {
        // 当当前路由不是一级路由时，将一级路由跳转到重定向的二级路由中去，也动态添加到路由中去
        if (!dynamicRoutes.find((itemMenu) => itemMenu.path === item.url)) {
          dynamicRoutes.push({ path: item.url, redirect: route.path })
        }
        dynamicRoutes.push(route)
      }

      if (!firstMenu && route) {
        firstMenu = childItem
      }
    }
  }
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
        //记录菜单的一级路由和二级路由的name和path
        crumbsArray.push({ name: menu.name, path: menu.url })
        crumbsArray.push({ name: childrenMenu.name, path: childrenMenu.url })
      }
    }
  }
  return crumbsArray
}
