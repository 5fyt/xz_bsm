<template>
  <div class="table-title">
    <h2 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h2>
    <el-button type="success" size="large" @click="addUserFn">{{
      contentConfig?.header?.handlerBtn ?? '新增数据'
    }}</el-button>
  </div>
  <div class="table-main">
    <el-table :data="userList" border style="width: 100%">
      <template
        v-for="(item, index) in contentConfig.departmentList"
        :key="index"
      >
        <!-- 操作 -->
        <template v-if="item.type === 'handler'">
          <el-table-column :label="item.label" align="center">
            <template #default="scope">
              <el-button
                type="primary"
                icon="Edit"
                @click="editBtn(scope.row)"
                text
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="Delete"
                text
                @click="deleteFn(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
        <!-- 更新时间和创建时间 -->
        <template v-else-if="item.type === 'timer'">
          <el-table-column :prop="item.prop" align="center" :label="item.label">
            <template #default="scope">
              {{ formatDate(scope.row[item.prop]) }}
            </template>
          </el-table-column>
        </template>
        <!-- 自定义模块：可以在表格中插入任何想要插入的东西 -->
        <!-- <template v-else-if="item.type === 'custom'">
          <el-table-column
            :width="item.width"
            :prop="item.prop"
            :label="item.label"
            align="center"
          >
            <template #default="scope">
              <slot
                :name="item.slotName"
                v-bind="scope"
                :prop="item.prop"
              ></slot>
            </template>
          </el-table-column>
        </template> -->
        <!-- 部门名和领导名 -->
        <template v-else>
          <el-table-column
            :type="item.type"
            :width="item.width"
            :prop="item.prop"
            :label="item.label"
            align="center"
          />
        </template>
      </template>
    </el-table>
  </div>
  <div class="table-pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20]"
      :total="totalCount"
      layout="total, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, defineExpose, defineEmits, defineProps } from 'vue'
import useDepStore from '@/store/system/department'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/format'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['showDialog', 'editDialog'])
interface IProps {
  contentConfig: {
    header?: {
      title: string
      handleBtn: string
    }
  }
}
const prop = defineProps<IProps>()
const depStore = useDepStore()
const currentPage = ref(1)
const pageSize = ref(10)

//初始化表格数据
changeCurrentPage()
const { userList, totalCount } = storeToRefs(depStore)
const handleSizeChange = () => {
  changeCurrentPage()
}
const handleCurrentChange = () => {
  changeCurrentPage()
}
//换页时重新请求数据渲染表格
function changeCurrentPage(formDate: any = {}) {
  //计算偏移量
  const offset = (currentPage.value - 1) * pageSize.value
  const size = pageSize.value
  const query = { offset, size }
  depStore.asyncGetList('department', { ...query, ...formDate })
}
//删除表格数据
const deleteFn = (id: number) => {
  depStore.deleteUserDate('department', id)
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
  //删除后重新渲染
  changeCurrentPage()
}
//新建用户
const addUserFn = () => {
  emit('showDialog')
}
//编辑用户
const editBtn = (itemForm) => {
  emit('editDialog', itemForm)
}
defineExpose({ changeCurrentPage })
</script>
<style scoped lang="less">
.table-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
:deep(.el-table__cell) {
  padding: 8px 2px;
}
.table-pagination {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>