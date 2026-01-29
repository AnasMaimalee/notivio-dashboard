<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
import { useThemeStore } from '@/stores/theme'
import { message } from 'ant-design-vue'

const router = useRouter()
const { $applyTheme, $fetch } = useNuxtApp()
const themeStore = useThemeStore()

const selectedTheme = ref<{ primary: string; secondary: string } | null>(null)
const themeOptions = ref<Array<{ name: string; primary: string; secondary: string }>>([])

onMounted(async () => {
  try {
    themeOptions.value = await $fetch('/api/themes/colors')
  } catch {
    message.error('Failed to load themes')
  }
})

// live preview (light mode for onboarding)
watch(selectedTheme, (val) => {
  if (val) {
    $applyTheme(
      {
        primary: val.primary,
        secondary: val.secondary,
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#020617'
        },
        dark: {
          bg: '#020617',
          surface: '#020617',
          text: '#F8FAFC'
        }
      },
      'light'
    )
  }
})

function selectTheme(option: { primary: string; secondary: string }) {
  selectedTheme.value = { ...option }
}

async function confirmTheme() {
  if (!selectedTheme.value) return

  try {
    await $fetch('/api/onboarding/theme', {
      method: 'POST',
      body: selectedTheme.value
    })

    themeStore.setTheme(
      selectedTheme.value.primary,
      selectedTheme.value.secondary
    )

    message.success('Theme applied 🎨')
    router.push('/dashboard')
  } catch {
    message.error('Failed to save theme')
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center
           bg-bg text-text px-6 py-12"
  >
    <div class="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">

      <!-- LEFT: TEXT -->
      <div class="space-y-6">
        <h1 class="text-4xl font-bold leading-tight">
          Make Notivio <br />
          <span class="text-primary">feel like yours</span>
        </h1>

        <p class="opacity-70 max-w-md">
          Choose a color style that matches your vibe.
          You can change this anytime from settings.
        </p>

        <!-- Live Preview Card -->
        <div
          class="rounded-2xl p-6 bg-surface
                 border border-primary/20 shadow-sm"
        >
          <p class="text-sm opacity-70 mb-3">Live Preview</p>

          <div class="flex items-center gap-3">
            <button
              class="px-4 py-2 rounded-lg text-white font-medium"
              :style="{ backgroundColor: selectedTheme?.primary }"
            >
              Primary
            </button>

            <button
              class="px-4 py-2 rounded-lg text-white font-medium"
              :style="{ backgroundColor: selectedTheme?.secondary }"
            >
              Secondary
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT: THEMES -->
      <div class="space-y-8">

        <!-- Presets -->
        <div>
          <h3 class="text-sm font-semibold mb-3 opacity-70">
            Recommended palettes
          </h3>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              v-for="option in themeOptions"
              :key="option.name"
              @click="selectTheme(option)"
              class="cursor-pointer rounded-xl p-3 border transition
                     hover:scale-[1.02]"
              :class="
                selectedTheme?.primary === option.primary
                  ? 'border-primary shadow-md'
                  : 'border-primary/10'
              "
            >
              <div
                class="h-16 rounded-lg mb-2"
                :style="{
                  background: `linear-gradient(135deg, ${option.primary}, ${option.secondary})`
                }"
              />
              <p class="text-xs font-medium text-center">
                {{ option.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Custom Picker -->
        <div>
          <h3 class="text-sm font-semibold mb-3 opacity-70">
            Or fine-tune your own
          </h3>

          <div class="flex gap-6">
            <div class="flex flex-col items-center gap-2">
              <label class="text-xs opacity-70">Primary</label>
              <input
                type="color"
                v-model="selectedTheme?.primary"
                class="w-14 h-10 rounded-md border border-primary/30"
              />
            </div>

            <div class="flex flex-col items-center gap-2">
              <label class="text-xs opacity-70">Secondary</label>
              <input
                type="color"
                v-model="selectedTheme?.secondary"
                class="w-14 h-10 rounded-md border border-primary/30"
              />
            </div>
          </div>
        </div>

        <!-- CTA -->
        <button
          @click="confirmTheme"
          :disabled="!selectedTheme"
          class="w-full py-4 rounded-xl text-white font-semibold
                 transition disabled:opacity-40"
          :style="{ backgroundColor: selectedTheme?.primary }"
        >
          PROCEED TO DASHBOARD →
        </button>

      </div>
    </div>
  </div>
</template>
