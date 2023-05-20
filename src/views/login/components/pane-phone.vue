<template>
  <el-form
    ref="phoneFormRef"
    :model="phoneForm"
    :rules="phoneRules"
    size="large"
    label-width="65px"
    status-icon
  >
    <el-form-item label="手机号" prop="phone" class="name">
      <el-input v-model="phoneForm.phone" />
    </el-form-item>
    <el-form-item label="验证码" prop="sendMsg" class="message">
      <el-input v-model="phoneForm.sendMsg" class="sendInput" />
      <div class="sendMsg" @click="sendCode">
        <span v-if="show">发送验证码</span>
        <span v-else>发送了{{ count }}秒</span>
      </div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import router from '@/router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
const phoneFormRef = ref<FormInstance>()
const show = ref(true)
const count = ref(30)

const phoneForm = reactive({
  phone: '',
  sendMsg: ''
})
const phoneRules = reactive<FormRules>({
  phone: [
    { required: true, message: '请您输入手机号', trigger: 'blur' },
    {
      pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
      message: '手机号格式错误',
      trigger: 'blur'
    }
  ],
  sendMsg: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[0-9]{3,6}$/,
      message: '必须是3位或6位以上数字',
      trigger: 'blur'
    }
  ]
})
//生成随机数
function randomNum() {
  ElMessage.success({ message: '验证码:103043' })
}
//发送验证码倒计时
function sendCode() {
  if (!phoneForm.phone) {
    return
  }
  let timer = null
  timer = setInterval(() => {
    show.value = false
    count.value--
    if (count.value === 25) {
      randomNum()
    }
    if (count.value < 0) {
      clearTimeout(timer)
      show.value = true
    }
  }, 1000)
}

//校验手机注册功能
function validateCode() {
  phoneFormRef.value.validate((isOK: boolean) => {
    if (isOK) {
      ElMessage.success({
        message: '注册成功',
        duration: 6000
      }).then(() => {
        router.push('/home')
      })
    } else {
      ElMessage.error('请重新注册')
    }
  })
}
//暴露函数
defineExpose({
  validateCode
})
</script>
<style scoped lang="less">
.name {
  margin-bottom: 20px;
}
.message {
  display: flex;
  justify-content: space-between !important;
  .sendInput {
    width: 130px;
  }
  .sendMsg {
    background: #409eff;
    padding: 0 10px;
    color: white;
    font-size: 16px;
    margin-left: 68px;
    width: 83px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
