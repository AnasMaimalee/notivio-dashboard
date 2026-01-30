<script setup lang="ts">
const props = defineProps<{
  content: string
}>()

const emit = defineEmits<{
  (e: 'update', value: string): void
}>()
</script>

<template>
  <textarea
    class="w-full min-h-[200px]
           bg-transparent outline-none resize-none
           text-base leading-relaxed"
    :value="props.content"
    placeholder="Write your thoughts…"
    @input="emit('update', ($event.target as HTMLTextAreaElement).value)"
  />
</template>
