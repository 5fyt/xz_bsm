//利用递归调用，将itemForm.menuList数组里面的id传进定义的数组里
export const mapMenu = (itemForm: any[]) => {
  const menuList: any[] = []
  //itemForm.menuList 是那一个角色的所有menuList的信息不是id值
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
//
export const mapPermission=(menuInfo:any[])=>{
   const permission:any=[]
   function mapPerFn(menuList:any[]){
     for(const item of menuList){
       if(item.type===3){
         permission.push(item.permission)
       }else{
         mapPerFn(item.children??[])
       }
     }
   }
   mapPerFn(menuInfo)
   return permission
}
