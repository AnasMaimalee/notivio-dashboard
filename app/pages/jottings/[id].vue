<script setup lang="ts">
import { ref, computed, watch, onMounted, type DefineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'

import TextBlock from '@/components/jotting/TextBlock.vue'
import VoiceBlock from '@/components/jotting/VoiceBlock.vue'
import SketchBlock from '@/components/jotting/SketchBlock.vue'
import PageHeader from '~/components/PageHeader.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const route = useRoute()
const { $api } = useNuxtApp()

/* -----------------------------
   TYPES
----------------------------- */
type BlockType = 'text' | 'voice' | 'sketch'

type VirtualBlock =
  | { id: string; type: 'text'; content: string }
  | { id: string; type: 'voice'; path: string }
  | { id: string; type: 'sketch'; data: any }

/* -----------------------------
   COMPONENT MAP
----------------------------- */
const blockComponents: Record<BlockType, DefineComponent<any, any, any>> = {
  text: TextBlock,
  voice: VoiceBlock,
  sketch: SketchBlock,
}

/* -----------------------------
   STATE
----------------------------- */
const jotting = ref<any>(null)
const pending = ref(true)
const error = ref(false)
const saving = ref(false)

/* -----------------------------
   FETCH JOTTING (FIXED)
----------------------------- */
const fetchJotting = async () => {
  pending.value = true
  error.value = false

  try {
    const res = await $api(`/jottings/${route.params.id}`)
    jotting.value = res
  } catch (e) {
    error.value = true
    message.error('Failed to load jotting')
  } finally {
    pending.value = false
  }
}

onMounted(fetchJotting)

/* -----------------------------
   TITLE (AUTOSAVE)
----------------------------- */
const jottingTitle = computed({
  get: () => jotting.value?.title ?? '',
  set: (val: string) => {
    if (!jotting.value) return
    jotting.value.title = val
    saveJotting()
  }
})

/* -----------------------------
   VIRTUAL BLOCKS
----------------------------- */
const blocks = computed<VirtualBlock[]>(() => {
  if (!jotting.value) return []

  const result: VirtualBlock[] = []

  result.push({
    id: 'text',
    type: 'text',
    content: jotting.value.content ?? '',
  })

  if (jotting.value.voice_path) {
    result.push({
      id: 'voice',
      type: 'voice',
      path: jotting.value.voice_path,
    })
  }

  if (jotting.value.sketch_data) {
    result.push({
      id: 'sketch',
      type: 'sketch',
      data: jotting.value.sketch_data,
    })
  }

  return result
})

/* -----------------------------
   SAVE JOTTING
----------------------------- */
async function saveJotting() {
  if (!jotting.value) return
  saving.value = true

  try {
    await $api(`/jottings/${jotting.value.id}`, {
      method: 'PUT',
      body: {
        title: jotting.value.title,
        content: jotting.value.content,
        voice_path: jotting.value.voice_path,
        sketch_data: jotting.value.sketch_data,
      }
    })
  } catch {
    message.error('Failed to save jotting')
  } finally {
    saving.value = false
  }
}

/* -----------------------------
   BLOCK UPDATES
----------------------------- */
function updateBlock(block: VirtualBlock, payload: any) {
  if (!jotting.value) return

  if (block.type === 'text') jotting.value.content = payload
  if (block.type === 'voice') jotting.value.voice_path = payload
  if (block.type === 'sketch') jotting.value.sketch_data = payload

  saveJotting()
}
</script>


<template>
  <div class="max-w-3xl mx-auto space-y-10">
    <page-header  title="Jotting" back/>
    <!-- Loading -->
    <div v-if="pending" class="text-center py-20 opacity-60">
      Loading jotting…
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20 text-red-500">
      Failed to load jotting
    </div>

    <!-- Content -->
    <template v-else>
      <h1 class="sr-only">
        {{ jotting?.title || 'Jotting' }}
      </h1>

      <input
        v-model="jottingTitle"
        class="w-full text-3xl font-semibold bg-transparent
               outline-none border-none"
        placeholder="Untitled jotting"
      />

      <div class="space-y-8">
        <component
          v-for="block in blocks"
          :key="block.id"
          :is="blockComponents[block.type]"
          v-bind="block"
          @update="val => updateBlock(block, val)"
        />
      </div>

      <div
        v-if="saving"
        class="fixed bottom-6 right-6 text-xs opacity-60"
      >
        Saving…
      </div>
    </template>

  </div>
</template>
