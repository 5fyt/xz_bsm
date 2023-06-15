<template>
  <div class="department">
    <div class="dep-search">
      <dp-search
        @refreshBtn="refreshBtn"
        @queryBtn="queryBtn"
        :searchConfig="searchConfig"
      ></dp-search>
    </div>
    <div class="container">
      <DpMain
        ref="mainRef"
        :contentConfig="contentConfig"
        @showDialog="showDialog"
        @editDialog="editDialog"
      >
        <!-- 自定义内容 -->
        <!-- <template #leader="scope">
          <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
        </template> -->
      </DpMain>
    </div>
    <div class="dialog">
      <dp-dialog
        ref="dialogRef"
        @addUser="addUser"
        :dialogConfig="modalConfig"
      ></dp-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
//高度封装组件
import DpSearch from '@/components/system/department/dp-search.vue'
import DpMain from '@/components/system/department/dp-main.vue'
import DpDialog from '@/components/system/department/dp-dialog.vue'
//配置项
import searchConfig from '@/views/system/department/search.config.ts'
import contentConfig from '@/views/system/department/content.config.ts'
import dialogConfig from '@/views/system/department/dialog.config.ts'
//hooks
import { useMain } from '@/hooks/useMain.ts'
import { useDialog } from '@/hooks/useDialog.ts'
import useMainStore from '@/store/main/main'
import { computed } from 'vue'

/*
筛选更换部门数组的属性 , 将store的部门列表重新插入到新配置项数组options里
因为得到的数据时name，id 属性所以要将它替换掉，采用计算属性是每
*/
const modalConfig = computed(() => {
  const mainStore = useMainStore()
  const departmentList = mainStore.departmentId
  const dialogItem = departmentList.map((item) => {
    return { label: item.name, value: item.id }
  })
  dialogConfig.dialogList.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...dialogItem)
    }
  })
  return dialogConfig
})

//封装了hooks将公用函数利用hooks实现了共享
const { mainRef, refreshBtn, queryBtn } = useMain()
const { dialogRef, showDialog, editDialog, addUser } = useDialog()
</script>
<style lang="less" scoped>
.dep-search {
  background-color: #fff;
  border-radius: 8px 0;
}
.container {
  margin-top: 15px;
  background-color: #fff;
  padding: 15px;
}
</style>
