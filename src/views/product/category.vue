<template>
  <div class="role">
    <div class="search">
      <dp-search
        :searchConfig="searchConfig"
        @refreshBtn="refreshBtn"
        @queryBtn="queryBtn"
      ></dp-search>
    </div>
    <div class="container">
      <dp-main ref="mainRef" :contentConfig="contentConfig"></dp-main>
    </div>
  </div>
</template>
<script setup lang="ts">
import DpSearch from '@/components/system/department/dp-search.vue'
import searchConfig from '@/views/product/category/config/search.config.ts'

import DpMain from '@/components/system/department/dp-main.vue'
import contentConfig from '@/views/product/category/config/content.config.ts'

import { useMain } from '@/hooks/useMain.ts'

const { mainRef, refreshBtn, queryBtn } = useMain()
</script>
<style lang="less" scoped>
.search {
  background-color: #fff;
  border-radius: 8px 0;
}
.container {
  margin-top: 15px;
  background-color: #fff;
  padding: 15px;
}
</style>
