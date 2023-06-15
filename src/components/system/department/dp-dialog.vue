<template>
  <div class="dialog">
    <el-dialog
      :title="
        titleShow ? prop.dialogConfig?.header?.add : dialogConfig?.header?.edit
      "
      v-model="dialogVisible"
      width="30%"
      center
    >
      <el-form v-model="dialogForm" size="large" label-width="70px">
        <template v-for="(item, index) in dialogConfig.dialogList" :key="index">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="dialogForm[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="dialogForm[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="large"
              />
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                v-model="dialogForm[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option :label="option.label" :value="option.value">
                  </el-option>
                </template>
              </el-select>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </template>
      </el-form>
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
import { ref, defineExpose, reactive, defineProps } from 'vue'
// import useMainStore from '@/store/main/main'
import useDepStore from '@/store/system/department'
interface IProp {
  dialogConfig: {
    pageName: string
    header: {
      add: string
      edit: string
    }
    dialogList: any[]
  }
}
const prop = defineProps<IProp>()
const dialogVisible = ref(false)
const titleShow = ref(false)
const editData = ref()
/**
 * 遍历dialogList 而不是遍历其他的，因为要拿到dialogList里的的每一项prop,而空对象也要通过prop来动态添加属性
 */
const initialVal: any = {}
for (const item of prop.dialogConfig.dialogList) {
  initialVal[item.prop] = item.initialValue ?? ''
}
const dialogForm = reactive(initialVal)
const depStore = useDepStore()
// const mainStore = useMainStore()
// const departmentList = mainStore.departmentId

const cancelDialog = () => {
  dialogVisible.value = false
}
//添加用户到表格中
const confirmDialog = () => {
  //添加数据并重新渲染表格
  if (titleShow.value) {
    depStore.addNewUsers(prop.dialogConfig.pageName, dialogForm)
    dialogVisible.value = false
  } else {
    //更新数据并渲染表格
    depStore.updateUserDate(
      prop.dialogConfig.pageName,
      editData.value.id,
      dialogForm
    )
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
      /*
      将初始化initialValue值替换表单的值，遍历到dialogList里的每一项，将每一项里的initialValue值替换form里面的值
      这里用find方法不用其他方法是，在循环里面，要将每一项发生更改，而find正是找到一项的值
       */
      const item = prop.dialogConfig.dialogList.find(
        (item) => item.prop === key
      )
      console.log(item)
      dialogForm[key] = item.initialValue ? item.initialValue : ''
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
