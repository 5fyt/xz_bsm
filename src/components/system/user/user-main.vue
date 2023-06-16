<template>
  <div class="table-title">
    <h2 class="title">用户列表</h2>
    <el-button type="success" size="large" @click="addUserFn" v-if="IsCreate"
      >新建用户</el-button
    >
  </div>
  <div class="table-main">
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="selection" width="70" align="center" />
      <el-table-column type="index" width="70" align="center" label="序号" />
      <el-table-column prop="name" label="用户名" align="center" width="180" />
      <el-table-column
        prop="realname"
        label="真实姓名"
        align="center"
        width="180"
      />
      <el-table-column
        prop="cellphone"
        label="电话号码"
        align="center"
        width="160"
      />
      <el-table-column prop="enable" label="状态" align="center" width="140">
        <template #default="scope">
          <el-button :type="scope.row.enable == 1 ? 'success' : 'danger'" plain>
            {{ scope.row.enable === 1 ? '启用' : '禁用' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createAt" align="center" label="创建时间">
        <template #default="scope">
          {{ formatDate(scope.row.createAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updateAt" align="center" label="更新时间">
        <template #default="scope">
          {{ formatDate(scope.row.updateAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            icon="Edit"
            v-if="IsEdit"
            @click="editBtn(scope.row)"
            text
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="Delete"
            v-if="IsDelete"
            text
            @click="deleteFn(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
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
import { ref, defineExpose, defineEmits } from 'vue'
import useUserStore from '@/store/system/system'
import { usePermission } from '@/hooks/usePermission'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/format'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['showDialog', 'editDialog'])
const userStore = useUserStore()
const currentPage = ref(1)
const pageSize = ref(10)

//初始化表格数据
changeCurrentPage()
const { userList, totalCount } = storeToRefs(userStore)
const handleSizeChange = () => {
  changeCurrentPage()
}
const handleCurrentChange = () => {
  changeCurrentPage()
}
userStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deleteUserDate' ||
      name === 'addNewUsers' ||
      name === 'updateUserDate'
    ) {
      currentPage.value = 1
    }
  })
})
//换页时重新请求数据渲染表格
function changeCurrentPage(formDate: any = {}) {
  //计算偏移量
  const offset = (currentPage.value - 1) * pageSize.value
  const size = pageSize.value
  const query = { offset, size }
  userStore.asyncGetList({ ...query, ...formDate })
}
//删除表格数据
const deleteFn = (id: number) => {
  userStore.deleteUserDate(id)
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
  //删除后重新渲染
  changeCurrentPage()
}
const IsCreate = usePermission(`system:users:create`)
const IsDelete = usePermission(`system:users:delete`)
const IsEdit = usePermission(`system:users:update`)
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
