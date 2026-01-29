<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'

import TextBlock from '@/components/jotting/TextBlock.vue'
import VoiceBlock from '@/components/jotting/VoiceBlock.vue'
import SketchBlock from '@/components/jotting/SketchBlock.vue'

const route = useRoute()
const { $api } = useNuxtApp()

const jotting = ref<any>(null)
const saving = ref(false)

/**
 * Fetch jotting
 */
const { pending } = await useAsyncData('jotting', async () => {
  jotting.value = await $api(`/jottings/${route.params.id}`)
})

/**
 * Autosave block
 */
async function saveBlock(block: any) {
  saving.value = true
  try {
    await $api(`/blocks/${block.id}`, {
      method: 'PUT',
      body: block
    })
  } catch {
    message.error('Failed to save')
  } finally {
    saving.value = false
  }
}

/**
 * Add new block
 */
async function addBlock(type: 'text' | 'voice' | 'sketch') {
  const block = await $api('/blocks', {
    method: 'POST',
    body: {
      jotting_id: jotting.value.id,
      type
    }
  })
  jotting.value.blocks.push(block)
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8">

    <!-- Loading -->
    <div v-if="pending" class="opacity-60 text-center py-20">
      Loading jotting…
    </div>

    <template v-else>

      <!-- Title -->
      <input
        v-model="jotting.title"
        class="w-full text-2xl font-semibold bg-transparent
               border-none focus:ring-0 outline-none"
        placeholder="Untitled jotting"
      />

      <!-- Blocks -->
      <div class="space-y-6">
        <component
          v-for="block in jotting.blocks"
          :key="block.id"
          :is="
            block.type === 'text'
              ? TextBlock
              : block.type === 'voice'
              ? VoiceBlock
              : SketchBlock
          "
          :block="block"
          @update="saveBlock"
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

  </div>
</template>
