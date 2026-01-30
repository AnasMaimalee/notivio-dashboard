<script setup lang="ts">
import { defineModel } from '#imports'

const block = defineModel<{ id: string; type: 'voice'; file: File | null }>()

function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] || null
  block.file = file
}
</script>

<template>
  <input type="file" accept="audio/*" @change="onFile" />
  <p v-if="block.file">{{ block.file.name }}</p>
</template>
