<script setup lang="ts">
import { defineModel } from '#imports'

const block = defineModel<{ id: string; type: 'text'; content: string }>()
</script>

<template>
  <textarea
    v-model="block.content"
    class="w-full min-h-[140px] p-4 rounded-2xl border border-primary/10 bg-surface"
  />
</template>
