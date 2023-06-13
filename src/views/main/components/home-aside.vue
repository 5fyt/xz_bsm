<template>
  <div class="aside-container">
    <div class="logo">
      <div class="img">
        <img
          src="../../../assets/img/ad2df598b555795773c1a13509111c62.jpeg"
          alt=""
          class="img"
        />
      </div>

      <h2 class="title">南昌航空科技学院管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :default-openeds="['1']"
      >
        <template v-for="item in menuInfo" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 使用动态组件创建icon -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="item1 in item.children" :key="item1.id">
              <el-menu-item :index="item1.id + ''" @click="goToView(item1)">
                {{ item1.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLoginStore } from '@/store/login/login'
import router from '@/router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMenuPath } from '@/utils/filter'
const loginStore = useLoginStore()
const menuInfo = loginStore.menuInfo
function goToView(item: any) {
  const url = item.url
  router.push(url)
}
const route = useRoute()
const defaultActive = computed(() => {
  const router = getMenuPath(route.path, menuInfo)
  return router.id + ''
})
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
</script>
<style scoped lang="less">
.aside-container {
  background-color: #001529;
  .title {
    color: #fff;
    margin-left: 6px;
    font-size: 14px;
  }
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .img {
    height: 100%;
    margin: 0 6px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }
}
.menu {
  padding: 0 2 0 0px;
}
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  :global(.el-sub-menu__title) {
    // --el-font-size-large
    font-size: 18px !important;
  }
  .el-menu-item {
    padding-left: 50px !important;
    font-size: 16px;
    background-color: #0a1f37;
  }
  .el-menu-item:hover {
    color: #fff;
    background-color: #0078d7;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
