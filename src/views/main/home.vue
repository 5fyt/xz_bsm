<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <!-- 侧边栏 -->
    <el-aside width="220px"> </el-aside>

    <el-container>
      <!-- 头部布局 -->
      <el-header style="text-align: right; font-size: 12px"> </el-header>
      <!-- 主体部分布局 -->
      <el-main> </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup></script>

<style scoped>
.layout-container-demo {
  height: 100vh !important;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: red;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: blue;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
  background: pink;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
