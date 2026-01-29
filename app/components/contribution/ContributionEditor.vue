<script setup lang="ts">
import TextBlock from '@/components/jotting/TextBlock.vue'
import VoiceBlock from '@/components/jotting/VoiceBlock.vue'
import SketchBlock from '@/components/jotting/SketchBlock.vue'

const model = defineModel<any[]>()

function add(type: 'text' | 'voice' | 'sketch') {
  model.value.push({
    id: crypto.randomUUID(),
    type,
    content: ''
  })
}
</script>

<template>
  <div class="space-y-6">

    <component
      v-for="item in model"
      :key="item.id"
      :is="
        item.type === 'text'
          ? TextBlock
          : item.type === 'voice'
          ? VoiceBlock
          : SketchBlock
      "
      v-model="item.content"
    />

    <div class="flex gap-3 justify-center">
      <button @click="add('text')" class="btn">✍️</button>
      <button @click="add('voice')" class="btn">🎙</button>
      <button @click="add('sketch')" class="btn">✏️</button>
    </div>

  </div>
</template>
