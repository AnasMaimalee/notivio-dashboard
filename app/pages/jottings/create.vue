<script setup lang="ts">
import TextBlock from '@/components/jotting/TextBlock.vue'
import VoiceBlock from '@/components/jotting/VoiceBlock.vue'
import SketchBlock from '@/components/jotting/SketchBlock.vue'

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

/**
 * 🔥 Save to backend (ready)
 */
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
  <div class="max-w-3xl mx-auto space-y-8">

    <!-- Header -->
    <div class="space-y-1">
      <h1 class="text-2xl font-semibold">New Jotting</h1>
      <p class="text-sm opacity-60">
        Mix text, voice notes, and sketches freely.
      </p>
    </div>

    <!-- Blocks -->
    <div class="space-y-6">
     <component
        v-for="(block, index) in blocks"
        :key="block.id"
        :is="resolveBlock(block.type)"
        :model-value="block"
        @update:model-value="blocks[index] = $event"
        />

    </div>

    <!-- Toolbar -->
    <div class="sticky bottom-6 flex justify-center gap-3">

      <button
        @click="addBlock('text')"
        class="px-4 py-2 rounded-full
               bg-surface border border-primary/20
               hover:bg-primary/10 transition"
      >
        ✍️ Text
      </button>

      <button
        @click="addBlock('voice')"
        class="px-4 py-2 rounded-full
               bg-surface border border-primary/20
               hover:bg-primary/10 transition"
      >
        🎙 Voice
      </button>

      <button
        @click="addBlock('sketch')"
        class="px-4 py-2 rounded-full
               bg-surface border border-primary/20
               hover:bg-primary/10 transition"
      >
        ✏️ Sketch
      </button>

      <button
        @click="saveJotting"
        class="px-5 py-2 rounded-full
               bg-primary text-white font-medium
               hover:opacity-90 transition"
      >
        Save
      </button>

    </div>

  </div>
</template>
