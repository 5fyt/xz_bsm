import { ref } from 'vue'
// import type { InstanceType } from 'vue'
export const useMain = () => {
  const mainRef = ref()
  //点击新建用户和编辑按钮弹出弹框
  const refreshBtn = () => {
    mainRef.value?.changeCurrentPage({ offset: 0, size: 10 })
  }
  //search子组件传值到父组件，父组件里可以调用同为兄弟组件里的获取表格数据函数
  const queryBtn = (formDate: any) => {
    mainRef.value?.changeCurrentPage(formDate)
  }
  return { mainRef, refreshBtn, queryBtn }
}
