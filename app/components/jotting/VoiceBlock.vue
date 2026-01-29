<script setup lang="ts">
const model = defineModel<{
  id: string
  type: 'voice'
  file: File | null
}>()

function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) model.value.file = file
}
</script>

<template>
  <div class="rounded-2xl p-4 bg-surface border border-primary/10 space-y-2">
    <p class="text-sm font-medium">Voice Note</p>

    <input
      type="file"
      accept="audio/*"
      @change="onFile"
    />

    <p v-if="model.file" class="text-xs opacity-60">
      {{ model.file.name }}
    </p>
  </div>
</template>
