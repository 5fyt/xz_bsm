import { ref } from 'vue'
type editCallback=(data:any)=>void
export const useDialog = (editBack:editCallback) => {
  const dialogRef = ref()
  const showDialog = () => {
    dialogRef.value?.openDialog(true)
  }
  const editDialog = (itemForm: any) => {
    dialogRef.value?.openDialog(false, itemForm)
    //如果传入回调函数，那么就将调用这个回调
    if(editBack) editBack(itemForm)
  }
  //点击新建添加用户到表格中
  const addUser = () => {
    dialogRef.value?.confirmDialog()
  }
  return { dialogRef, showDialog, editDialog ,addUser}
}
