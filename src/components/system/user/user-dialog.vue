<template>
  <div class="dialog">
    <el-dialog
      :title="titleShow ? '新增用户' : '修改用户'"
      v-model="dialogVisible"
      width="30%"
      center
    >
      <el-form v-model="dialogForm" size="large" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dialogForm.name" placeholder="请输出用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input
            v-model="dialogForm.realname"
            placeholder="请输出真实姓名"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="dialogForm.password"
            placeholder="请输出密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="手机号" prop="cellphone">
          <el-input v-model="dialogForm.cellphone" placeholder="请输出手机号" />
        </el-form-item>
      </el-form>
      <el-form-item label="选择角色">
        <el-select
          v-model="dialogForm.roleId"
          placeholder="请选择"
          style="width: 100%"
        >
          <template v-for="item in roleIdList" :key="item.id">
            <el-option :label="item.name" :value="item.id"> </el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门">
        <el-select
          v-model="dialogForm.departmentId"
          placeholder="请选择"
          style="width: 100%"
        >
          <template v-for="item in departmentList" :key="item.id">
            <el-option :label="item.name" :value="item.id"> </el-option>
          </template>
        </el-select>
      </el-form-item>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDialog">取 消</el-button>
          <el-button type="primary" @click="confirmDialog">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, defineExpose, reactive } from 'vue'
import useMainStore from '@/store/main/main'
import useUserStore from '@/store/system/system'
const dialogVisible = ref(false)
const titleShow = ref(false)
const dialogForm = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const editData = ref()
const userStore = useUserStore()
const mainStore = useMainStore()
const roleIdList = mainStore.roleId
const departmentList = mainStore.departmentId
const cancelDialog = () => {
  dialogVisible.value = false
}
//添加用户到表格中
const confirmDialog = () => {
  //添加数据并重新渲染表格
  if (titleShow.value) {
    userStore.addNewUsers(dialogForm)
    dialogVisible.value = false
  } else {
    //更新数据并渲染表格
    userStore.updateUserDate(editData.value.id, dialogForm)
    dialogVisible.value = false
  }
}
const openDialog = (value: boolean, itemForm?: any) => {
  //控制新建弹出层还是编辑弹出层
  titleShow.value = value
  //新建用户
  if (value && !itemForm) {
    dialogVisible.value = value
    for (const key in dialogForm) {
      dialogForm[key] = ''
    }
    editData.value = null
  } else {
    //编辑用户
    dialogVisible.value = !value
    for (const key in dialogForm) {
      dialogForm[key] = itemForm[key]
    }
    //保存id值
    editData.value = itemForm
  }
}
defineExpose({ openDialog, confirmDialog })
</script>
