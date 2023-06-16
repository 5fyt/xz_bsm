<template>
  <div class="chat">
    <hy-editor v-model:value="htmlString" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HyEditor from '@/base-ui/editor'
const htmlString = ref('fengyi')
</script>

<style scoped></style>
