<template>
  <div class="search">
    <el-form
      label-width="80px"
      :model="searchForm"
      size="large"
      ref="searchRef"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的部门名称"
            /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="领导名称" prop="leader">
            <el-input
              v-model="searchForm.leader"
              placeholder="请输入查询的领导名称"
            /> </el-form-item
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
import type { FormInstance } from 'element-plus'
const searchRef = ref<FormInstance>()
const emit = defineEmits(['refreshBtn', 'queryBtn'])
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})
//点击重置按钮重置表单
const RefreshBtn = () => {
  searchRef.value?.resetFields()
  emit('refreshBtn')
}
//查询
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
