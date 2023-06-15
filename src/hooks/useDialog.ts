import { ref } from 'vue'
export const useDialog = () => {
  const dialogRef = ref()
  const showDialog = () => {
    dialogRef.value?.openDialog(true)
  }
  const editDialog = (itemForm:any) => {
    dialogRef.value?.openDialog(false, itemForm)
  }
  return { dialogRef, showDialog, editDialog }
}
