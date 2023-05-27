<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <!-- 侧边栏 -->
    <el-aside :width="isFold ? '60px' : '250px'">
      <home-aside :isFold="isFold"></home-aside>
    </el-aside>

    <el-container>
      <!-- 头部布局 -->
      <el-header style="height: 70px">
        <home-header :isFold="isFold" @changeIcon="changeIcon"></home-header>
      </el-header>
      <!-- 主体部分布局 -->
      <el-main> <router-view></router-view> </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import HomeAside from '@/views/main/components/home-aside.vue'
import HomeHeader from '@/views/main/components/home-header.vue'
import { ref } from 'vue'
const isFold = ref(false)
function changeIcon(value) {
  isFold.value = value
}
</script>

<style scoped>
.layout-container-demo {
  height: 100vh !important;
}
.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  transition: width 0.3s ease;
}
.layout-container-demo .el-main {
  padding: 18px 14px;
  background-color: #f1f3f4;
}
</style>
