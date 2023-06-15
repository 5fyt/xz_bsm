<template>
  <div class="menu">
    <MenuMain :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts" name="menu">
import MenuMain from '@/components/system/department/dp-main.vue'
import contentConfig from '@/views/system/menu/content.config.ts'
</script>

<style scoped>
.menu {
  margin-top: 15px;
  background-color: #fff;
  padding: 15px;
}
</style>
