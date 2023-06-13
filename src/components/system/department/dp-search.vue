<template>
  <div class="search">
    <el-form
      label-width="80px"
      :model="searchForm"
      size="large"
      ref="searchRef"
    >
      <el-row :gutter="20">
        <template
          v-for="(item, index) in prop.searchConfig.formItem"
          :key="index"
        >
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'selected'">
                <el-select
                  v-model="searchForm[item.prop]"
                  size="large"
                  style="width: 100%"
                >
                  <template v-for="(option, index) in options" :key="index">
                    <el-option
                      :label="option.label"
                      :value="option.value"
                    ></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import { reactive, ref, defineEmits, defineProps } from 'vue'
import type { FormInstance } from 'element-plus'
const searchRef = ref<FormInstance>()
const emit = defineEmits(['refreshBtn', 'queryBtn'])
interface IProps {
  searchConfig: {
    labelWidth: string
    formItem: any[]
  }
}
const prop = defineProps<IProps>()
//定义一个空对象用来将表单的配置初始值，如果某个配置项配置了初始值那这个值应该赋值给这个空对象的对应那个属性
const initialForm: any = {}
for (const item of prop.searchConfig.formItem) {
  initialForm[item.prop] = item.initialValue ?? ''
}

const searchForm = reactive(initialForm)
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
