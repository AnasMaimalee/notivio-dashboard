<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'

const theme = {
  token: {
    colorPrimary: '#A084D6',
    borderRadius: 12,
    colorBgContainer: '#ffffff',
  },
}
</script>

<template>
  <ConfigProvider :theme="theme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
