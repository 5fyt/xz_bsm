<template>
  <div class="login">
    <child-login />
  </div>
</template>
<script setup lang="ts">
import ChildLogin from './components/child-login.vue'
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/login-bg.svg);
}
</style>
