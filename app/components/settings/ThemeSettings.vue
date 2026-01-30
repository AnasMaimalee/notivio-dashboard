<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useState, useNuxtApp } from '#app'
const { $api } = useNuxtApp()

const themeForm = reactive({
  primary: '',
  secondary: ''
})

// state to sync with app theme
const theme = useState<any>('theme')
const { $applyTheme } = useNuxtApp()

// fetch current theme from backend on mounted
onMounted(async () => {
  try {
    const res = await $api('/onboarding/theme', {
      method: 'POST',
    })
    themeForm.primary = res.primary_color
    themeForm.secondary = res.secondary_color
  } catch (e) {
    console.error(e)
  }
})

// update backend and apply theme dynamically
async function updateTheme() {
  try {
    await $api('/profile/theme', {
      method: 'POST',
      body: themeForm
    })
    theme.value = themeForm
    $applyTheme(themeForm, 'light')  // or maintain user preference
    alert('Theme updated successfully!')
  } catch (e) {
    console.error(e)
    alert('Failed to update theme')
  }
}
</script>

<template>
  <div class="bg-surface p-6 rounded-2xl border border-primary/10 space-y-4">
    <h2 class="text-xl font-semibold">App Theme</h2>
    <p class="text-sm opacity-70">Pick your primary and secondary colors for the app</p>

    <div class="flex gap-4">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium">Primary Color</label>
        <input type="color" v-model="themeForm.primary" class="w-20 h-10 rounded-lg cursor-pointer" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium">Secondary Color</label>
        <input type="color" v-model="themeForm.secondary" class="w-20 h-10 rounded-lg cursor-pointer" />
      </div>
    </div>

    <button @click="updateTheme" class="btn-primary w-full">Apply Theme</button>
  </div>
</template>
