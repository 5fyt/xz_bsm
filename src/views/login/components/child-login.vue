<template>
  <div class="login-panel">
    <!-- title -->
    <div class="title">
      <h1>稀正后台管理系统</h1>
    </div>
    <div class="content">
      <!-- tab栏 -->
      <div class="tab">
        <el-tabs type="border-card" stretch v-model="activeValue">
          <el-tab-pane name="account">
            <template #label>
              <div class="label">
                <el-icon><UserFilled /></el-icon>
                <span class="text">账号登录</span>
              </div>
            </template>
            <form-login ref="accountCpm"></form-login>
          </el-tab-pane>
          <el-tab-pane name="phone">
            <template #label>
              <div class="label">
                <el-icon><Phone /></el-icon>
                <span class="text">手机注册</span>
              </div>
            </template>
            <pane-phone ref="phoneCpm"></pane-phone>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="remember">
        <el-checkbox v-model="isKeep" label="记住密码" size="large" />
        <el-link type="primary" :underline="false" @click="goRegister"
          >手机号注册</el-link
        >
      </div>
      <div>
        <el-button
          type="primary"
          class="login-btn"
          size="large"
          @click="handleLogin"
          >立即登录</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FormLogin from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { ref, watch } from 'vue'
import { localCache } from '@/utils/cache'
import type { IntanceType } from 'vue'
const isKeep = ref<Boolean>(localCache.getItem('isKeep') ?? false)
const activeValue = ref('account')
const accountCpm = ref<IntanceType<typeof FormLogin>>()
const phoneCpm = ref<IntanceType<typeof PanePhone>>()
//利用监听器监听isKeep的值，防止记住密码后，没有勾选状态
watch(isKeep, (newValue) => {
  console.log(newValue)
  isKeep.value = newValue
  localCache.setItem('isKeep', newValue)
})

//跳转到注册页
function goRegister() {
  activeValue.value = 'phone'
}
function handleLogin() {
  if (activeValue.value === 'account') {
    console.log('账号登入')
    accountCpm.value?.validateForm(isKeep.value)
  } else {
    phoneCpm.value?.validateCode()
  }
}
</script>
<style lang="less" scoped>
.login-panel {
  width: 400px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .remember {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
