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
      <dp-main
        ref="mainRef"
        :contentConfig="contentConfig"
        @showDialog="showDialog"
        @editDialog="editDialog"
      ></dp-main>
    </div>
    <div class="dialog">
      <dp-dialog
        :dialogConfig="dialogConfig"
        ref="dialogRef"
        :otherInfo="otherInfo"
        @addUser="addUser"
      >
        <template #menulist>
          <el-tree
            ref="treeRef"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheck"
          >
          </el-tree>
        </template>
      </dp-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import DpSearch from '@/components/system/department/dp-search.vue'
import searchConfig from '@/views/system/role/search.config.ts'

import DpMain from '@/components/system/department/dp-main.vue'
import contentConfig from '@/views/system/role/content.config.ts'

import DpDialog from '@/components/system/department/dp-dialog.vue'
import dialogConfig from '@/views/system/role/dialog.config.ts'

import { useMain } from '@/hooks/useMain.ts'
import { useDialog } from '@/hooks/useDialog.ts'

import useMainStore from '@/store/main/main.ts'
import { mapMenu } from '@/utils/mapMenu.ts'
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
const mainStore = useMainStore()
const { menuList } = storeToRefs(mainStore)
const { mainRef, refreshBtn, queryBtn } = useMain()
//更改复选框触发
const otherInfo = ref({})
const treeRef = ref()
const handleCheck = (data1, data2) => {
  const menuId = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuId }
}
const editBack = (itemForm) => {
  nextTick(() => {
    const menuItem = mapMenu(itemForm.menuList)
    console.log(menuItem)
    treeRef.value?.setCheckedKeys(menuItem)
  })
  console.log({ ...itemForm })
}
const { dialogRef, showDialog, editDialog, addUser } = useDialog(editBack)
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
