<template>
  <div class="list">
    <ListMain :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts" name="menu">
import ListMain from '@/components/system/department/dp-main.vue'
import contentConfig from '@/views/story/list/config/content.config.ts'
</script>

<style scoped>
.list {
  margin-top: 15px;
  background-color: #fff;
  padding: 15px;
}
</style>
