<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ref } from 'vue'
const locale = ref(zhCn)
</script>

<template>
  <el-config-provider :locale="locale">
    <div class="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<style scoped>
.app {
  height: 100vh;
}
</style>
