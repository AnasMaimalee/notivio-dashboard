<script setup lang="ts">
const props = defineProps<{
  block: {
    src?: string | null
  }
}>()

const emit = defineEmits<{
  (e: 'update', value: File | null): void
}>()

function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] || null
  emit('update', file)
}
</script>

<template>
  <div class="space-y-2">
    <input
      type="file"
      accept="audio/*"
      @change="onFile"
    />

    <audio
      v-if="props.block.src"
      controls
      class="w-full"
    >
      <source :src="props.block.src" />
    </audio>
  </div>
</template>
