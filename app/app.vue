<script setup lang="ts">
import { theme } from 'ant-design-vue'
const { $applyTheme } = useNuxtApp()
const config = useRuntimeConfig()

onMounted(() => {
  $applyTheme(config.public.defaultTheme, 'light')
})
</script>

<template>
  <Html lang="en">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>
