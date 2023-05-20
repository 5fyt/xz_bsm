<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    size="large"
    label-width="60px"
    status-icon
  >
    <el-form-item label="账号" prop="name" class="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import router from '@/router'
import { useLoginStore } from '@/store/login/login'
import { ElMessage } from 'element-plus'
import { PASSWORD_LOGIN, NAME_LOGIN } from '@/global/constant'
import { localCache } from '@/utils/cache'
import type { FormInstance, FormRules } from 'element-plus'
import type { IAccount } from '@/type/Account'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<IAccount>({
  name: localCache.getItem(NAME_LOGIN) ?? '',
  password: localCache.getItem(PASSWORD_LOGIN) ?? ''
})
const loginStore = useLoginStore()
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请您输入账号信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
})
//校验表单
function validateForm(isKeep: boolean) {
  ruleFormRef.value?.validate((isOK: Boolean) => {
    if (isOK) {
      //不直接传ruleForm是因为不想要reactive类型的值
      const name = ruleForm.name
      const password = ruleForm.password
      loginStore.asyncLoginAction<IAccount>({ name, password }).then(() => {
        if (isKeep) {
          //保存账号和密码到本地
          localCache.setItem(NAME_LOGIN, name)
          localCache.setItem(PASSWORD_LOGIN, password)
        } else {
          localCache.removeItem(NAME_LOGIN)
          localCache.removeItem(PASSWORD_LOGIN)
        }
        router.push('/home')
        //提示登入信息
        ElMessage.success({
          message: '登入成功',
          type: 'success'
        })
      })
    } else {
      ElMessage.error('登入失败，请重新输入')
    }
  })
}
//暴露子组件校验表单函数给父组件
defineExpose({
  validateForm
})
</script>
<style scoped lang="less">
.name {
  margin-bottom: 20px;
}
</style>
