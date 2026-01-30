<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  subtitle?: string
  back?: boolean
}>()

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-primary/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
  >
    <div class="flex items-center gap-4">
      <button
        v-if="props.back"
        @click="goBack"
        class="p-2 rounded-full hover:bg-primary/10 transition text-primary hover:cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div class="flex flex-col">
        <h1 class="text-xl sm:text-2xl font-semibold text-text">{{ props.title }}</h1>
        <p v-if="props.subtitle" class="text-sm opacity-60">{{ props.subtitle }}</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Optional: keep header above everything for small screens */
</style>
