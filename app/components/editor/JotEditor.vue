<script setup lang="ts">
const blocks = ref<any[]>([])

const addText = () => blocks.value.push({ type: 'text', content: '' })
const addVoice = (blob) => blocks.value.push({ type: 'voice', file: blob })
const addSketch = (data) => blocks.value.push({ type: 'sketch', dataUrl: data })
</script>

<template>
  <div class="space-y-4">

    <component
      v-for="(b, i) in blocks"
      :is="`Editor${b.type}`"
      v-model="blocks[i]"
    />

    <div class="flex gap-3">
      <button @click="addText" class="btn-primary">Text</button>
      <button class="btn-outline">Voice</button>
      <button class="btn-outline">Sketch</button>
    </div>

  </div>
</template>
