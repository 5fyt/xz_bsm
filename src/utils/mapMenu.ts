export const mapMenu = (itemForm: any[]) => {
  const menuList: any[] = []
  function mapMenuFn(itemList:any[]) {
    for (const item of itemList) {
      if (item.children) {
        mapMenuFn(item.children)
      } else {
        menuList.push(item.id)
      }
    }
  }
  mapMenuFn(itemForm)
  return menuList
}
