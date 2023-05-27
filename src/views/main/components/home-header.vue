<template>
  <div class="header-container">
    <!-- 左侧导航栏 -->
    <div class="leftNav">
      <div class="menu-icon">
        <el-icon @click="changeIcon" :size="26">
          <component :is="isFold ? Fold : Expand"></component>
        </el-icon>
      </div>
    </div>
    <!-- 右侧导航栏 -->
    <div class="rightNav">
      <div class="crumb">
        <el-breadcrumb :separator-icon="ArrowRight">
          <template v-for="(item, index) in breadCrumbs" :key="index">
            <el-breadcrumb-item :to="item.path">{{
              item.name
            }}</el-breadcrumb-item>
          </template>
          <!-- <el-breadcrumb-item>{{ 面包屑 }}</el-breadcrumb-item> -->
        </el-breadcrumb>
      </div>
      <div class="userInfo">
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import UserInfo from '@/components/main/user-info.vue'
import { ArrowRight, Fold, Expand } from '@element-plus/icons-vue'
// import { ref } from 'vue'
import { useLoginStore } from '@/store/login/login'
import { mapCrumbsMenu } from '@/utils/filter.ts'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const menuStore = useLoginStore()
const menuInfo = menuStore.menuInfo
//动态生成面包屑
const route = useRoute()
console.log('ss', menuInfo)
console.log(route.path)
const breadCrumbs = computed(() => {
  return mapCrumbsMenu(route.path, menuInfo)
})
console.log('s', breadCrumbs)
const isFold = ref(false)
const emit = defineEmits(['changeIcon'])

function changeIcon() {
  isFold.value = !isFold.value
  emit('changeIcon', isFold.value)
}
</script>
<style scoped lang="less">
.header-container {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .rightNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
  .el-breadcrumb {
    font-size: 18px;
  }
}
</style>
