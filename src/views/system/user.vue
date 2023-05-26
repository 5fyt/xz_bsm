<template>
  <div class="user">
    <div class="user-search">
      <user-search></user-search>
    </div>
    <div class="container">
      <div class="table-title"></div>
      <div class="table-main"></div>
      <div class="table-pagination"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserSearch from '@/components/system/user-search.vue'
</script>
<style lang="less" scoped>
.user-search {
  background-color: #fff;
  border-radius: 8px 0;
}
</style>
