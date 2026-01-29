<script setup lang="ts">
const props = defineProps<{
  modelValue: any
  readonly?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    :value="props.modelValue.content"
    :readonly="readonly"
    @input="emit('update:modelValue', {
      ...props.modelValue,
      content: ($event.target as HTMLTextAreaElement).value
    })"
    class="w-full min-h-[140px] bg-surface rounded-2xl p-4
           border border-primary/10"
  />
</template>
