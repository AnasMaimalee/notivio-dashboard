<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'

import TextBlock from '@/components/jotting/TextBlock.vue'
import VoiceBlock from '@/components/jotting/VoiceBlock.vue'
import SketchBlock from '@/components/jotting/SketchBlock.vue'

type BlockType = 'text' | 'voice' | 'sketch'

const blockComponents: Record<BlockType, DefineComponent<{}, {}, any>> = {
  text: TextBlock,
  voice: VoiceBlock,
  sketch: SketchBlock
}
const route = useRoute()
const { $api } = useNuxtApp()

// jotting state
const jotting = ref<{
  id: string
  title: string
  blocks: Array<any>
} | null>(null)

const saving = ref(false)

// fetch jotting via useAsyncData
const { data, pending, error } = useAsyncData('jotting', () => 
  $api(`/jottings/${route.params.id}`)
)

// populate jotting once data loads
if (data.value) jotting.value = data.value

// --- AUTOSAVE BLOCK ---
async function saveBlock(updatedBlock: any) {
  saving.value = true
  try {
    await $api(`/blocks/${updatedBlock.id}`, {
      method: 'PUT',
      body: updatedBlock
    })
  } catch {
    message.error('Failed to save block')
  } finally {
    saving.value = false
  }
}

// --- ADD NEW BLOCK ---
async function addBlock(type: 'text' | 'voice' | 'sketch') {
  if (!jotting.value) return

  try {
    const block = await $api('/blocks', {
      method: 'POST',
      body: {
        jotting_id: jotting.value.id,
        type
      }
    })
    jotting.value.blocks.push(block)
  } catch {
    message.error('Failed to add block')
  }
}

// --- SAFE v-model FOR TITLE ---
const jottingTitle = computed({
  get: () => jotting.value?.title || '',
  set: (val: string) => {
    if (jotting.value) {
      jotting.value.title = val
      // autosave title immediately
      $api(`/jottings/${jotting.value.id}`, {
        method: 'PUT',
        body: { title: val }
      }).catch(() => message.error('Failed to save title'))
    }
  }
})

watch(
  () => jotting.value?.blocks,
  (blocks) => {
    if (!blocks) return
    blocks.forEach((block) => saveBlock(block))
  },
  { deep: true }
)

</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8">

    <!-- Loading -->
    <div v-if="pending" class="opacity-60 text-center py-20">
      Loading jotting…
    </div>

    <template v-else-if="jotting">

      <!-- Title -->
      <input
        v-model="jottingTitle"
        class="w-full text-2xl font-semibold bg-transparent
               border-none focus:ring-0 outline-none"
        placeholder="Untitled jotting"
      />

      <!-- Blocks -->
      <div class="space-y-6">
      <component
        v-for="block in jotting.blocks"
        :key="block.id"
        :is="blockComponents[block.type]"
        :block="block"
        />
      </div>

      <!-- Toolbar -->
      <div
        class="sticky bottom-6 flex justify-center gap-3
               bg-bg/80 backdrop-blur rounded-full p-3"
      >
        <button
          @click="addBlock('text')"
          class="px-4 py-2 rounded-full
                 bg-surface border border-primary/20
                 hover:bg-primary/10"
        >
          ✍️ Text
        </button>

        <button
          @click="addBlock('voice')"
          class="px-4 py-2 rounded-full
                 bg-surface border border-primary/20
                 hover:bg-primary/10"
        >
          🎙 Voice
        </button>

        <button
          @click="addBlock('sketch')"
          class="px-4 py-2 rounded-full
                 bg-surface border border-primary/20
                 hover:bg-primary/10"
        >
          ✏️ Sketch
        </button>
      </div>

      <!-- Saving Indicator -->
      <div
        v-if="saving"
        class="fixed bottom-4 right-6 text-xs opacity-60"
      >
        Saving…
      </div>

    </template>

    <!-- Error -->
    <div v-else class="text-center py-20 opacity-60">
      Failed to load jotting.
    </div>
  </div>
</template>
