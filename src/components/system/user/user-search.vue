<template>
  <div class="search" v-if="Isquery">
    <el-form
      label-width="80px"
      :model="searchForm"
      size="large"
      ref="searchRef"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的用户名"
            /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realName">
            <el-input
              v-model="searchForm.realName"
              placeholder="请输入查询的真实姓名"
            /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入查询的手机号码"
            /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              size="large"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="creatAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large" /></el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button icon="Refresh" @click="RefreshBtn">重置</el-button>
      <el-button type="primary" icon="Search" @click="queryBtn(searchForm)"
        >查询</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, defineEmits } from 'vue'
import { usePermission } from '@/hooks/usePermission'
import type { FormInstance } from 'element-plus'
const searchRef = ref<FormInstance>()
const emit = defineEmits(['refreshBtn', 'queryBtn'])
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})
const Isquery = usePermission(`system:users:query`)
//点击重置按钮重置表单
const RefreshBtn = () => {
  searchRef.value?.resetFields()
  emit('refreshBtn')
}
const queryBtn = (formDate: any) => {
  emit('queryBtn', formDate)
}
</script>
<style scoped lang="less">
.el-form-item {
  margin: 40px;
}
.btn {
  display: flex;
  padding-bottom: 30px;
  margin-right: 50px;
  justify-content: flex-end;
}
</style>
