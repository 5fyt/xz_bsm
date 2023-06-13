<template>
  <div class="user">
    <div class="user-search">
      <user-search @refreshBtn="refreshBtn" @queryBtn="queryBtn"></user-search>
    </div>
    <div class="container">
      <UserMain
        ref="mainRef"
        @showDialog="showDialog"
        @editDialog="editDialog"
      ></UserMain>
    </div>
    <div class="dialog">
      <user-dialog ref="dialogRef" @addUser="addUser"></user-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserSearch from '@/components/system/user/user-search.vue'
import UserMain from '@/components/system/user/user-main.vue'
import UserDialog from '@/components/system/user/user-dialog.vue'
import { ref } from 'vue'
import type { IntanceType } from 'vue'

const mainRef = ref<IntanceType<typeof UserMain>>()
const dialogRef = ref<IntanceType<typeof UserDialog>>()
const refreshBtn = () => {
  mainRef.value?.changeCurrentPage({ offset: 0, size: 10 })
}
//search子组件传值到父组件，父组件里可以调用同为兄弟组件里的获取表格数据函数
const queryBtn = (formDate) => {
  mainRef.value?.changeCurrentPage(formDate)
}
//点击新建用户和编辑按钮弹出弹框
const showDialog = () => {
  dialogRef.value?.openDialog(true)
}
const editDialog = (itemForm) => {
  dialogRef.value?.openDialog(false, itemForm)
}
//点击新建添加用户到表格中
const addUser = () => {
  dialogRef.value?.confirmDialog()
}
</script>
<style lang="less" scoped>
.user-search {
  background-color: #fff;
  border-radius: 8px 0;
}
.container {
  margin-top: 15px;
  background-color: #fff;
  padding: 15px;
}
</style>
