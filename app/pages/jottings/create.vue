<script setup lang="ts">
import { ref } from 'vue'
import TextBlock from '@/components/jotting/TextBlock.vue'
import VoiceBlock from '@/components/jotting/VoiceBlock.vue'
import SketchBlock from '@/components/jotting/SketchBlock.vue'

definePageMeta({
    middleware: 'auth',
    layout: 'dashboard'
})

type TextBlockType = {
  id: string
  type: 'text'
  content: string
}

type VoiceBlockType = {
  id: string
  type: 'voice'
  file: File | null
  duration?: number
}

type SketchBlockType = {
  id: string
  type: 'sketch'
  data: string | null
}

type Block = TextBlockType | VoiceBlockType | SketchBlockType

const blocks = ref<Block[]>([
  {
    id: crypto.randomUUID(),
    type: 'text',
    content: '',
  },
])

function addBlock(type: Block['type']) {
  if (type === 'text') {
    blocks.value.push({
      id: crypto.randomUUID(),
      type: 'text',
      content: '',
    })
  }

  if (type === 'voice') {
    blocks.value.push({
      id: crypto.randomUUID(),
      type: 'voice',
      file: null,
    })
  }

  if (type === 'sketch') {
    blocks.value.push({
      id: crypto.randomUUID(),
      type: 'sketch',
      data: null,
    })
  }
}

function resolveBlock(type: Block['type']) {
  if (type === 'text') return TextBlock
  if (type === 'voice') return VoiceBlock
  return SketchBlock
}

/** Save jotting */
async function saveJotting() {
  const form = new FormData()

  blocks.value.forEach((block, index) => {
    form.append(`blocks[${index}][id]`, block.id)
    form.append(`blocks[${index}][type]`, block.type)

    if (block.type === 'text') {
      form.append(`blocks[${index}][content]`, block.content)
    }

    if (block.type === 'voice' && block.file) {
      form.append(`blocks[${index}][file]`, block.file)
    }

    if (block.type === 'sketch' && block.data) {
      form.append(`blocks[${index}][data]`, block.data)
    }
  })

  await $fetch('/api/jottings', {
    method: 'POST',
    body: form,
  })
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-8">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">New Jotting</h1>
      <p class="text-sm opacity-60">
        Mix text, voice notes, and sketches freely.
      </p>
    </div>

    <!-- Content Card -->
    <a-card :bordered="false" class="shadow-sm">
      <div class="space-y-6">
        <component
          v-for="(block, index) in blocks"
          :key="block.id"
          :is="resolveBlock(block.type)"
          :model-value="block"
          @update:model-value="blocks[index] = $event"
        />
      </div>
    </a-card>

    <!-- Toolbar -->
    <div
      class="sticky bottom-6 mt-8
             flex justify-center gap-3"
    >
      <a-button @click="addBlock('text')">
        ✍️ Text
      </a-button>

      <a-button @click="addBlock('voice')">
        🎙 Voice
      </a-button>

      <a-button @click="addBlock('sketch')">
        ✏️ Sketch
      </a-button>

      <a-button
        type="primary"
        @click="saveJotting"
      >
        Save
      </a-button>
    </div>

  </div>
</template>
