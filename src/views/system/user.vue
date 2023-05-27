<template>
  <div class="user">
    <div class="user-search">
      <user-search @refreshBtn="refreshBtn" @queryBtn="queryBtn"></user-search>
    </div>
    <div class="container">
      <UserMain ref="mainRef"></UserMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserSearch from '@/components/system/user-search.vue'
import UserMain from '@/components/system/user-main.vue'
import { ref } from 'vue'
import type { IntanceType } from 'vue'
const mainRef = ref<IntanceType<typeof UserMain>>()
const refreshBtn = () => {
  mainRef.value?.changeCurrentPage({ offset: 0, size: 10 })
}
//search子组件传值到父组件，父组件里可以调用同为兄弟组件里的获取表格数据函数
const queryBtn = (formDate) => {
  mainRef.value?.changeCurrentPage(formDate)
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
