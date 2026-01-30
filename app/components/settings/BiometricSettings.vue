<script setup lang="ts">
import { ref } from 'vue'
const biometricEnabled = ref(false)
const { $api } = useNuxtApp()

// fetch initial state from backend
onMounted(async () => {
  try {
    const res = await $api('/api/profile/security')
    biometricEnabled.value = res.biometric_enabled
  } catch (e) {
    console.error(e)
  }
})

async function toggleBiometric() {
  try {
    await $fetch('/api/profile/security', {
      method: 'POST',
      body: { biometric_enabled: !biometricEnabled.value }
    })
    biometricEnabled.value = !biometricEnabled.value
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="bg-surface p-6 rounded-2xl border border-primary/10 flex justify-between items-center">
    <div>
      <h2 class="text-xl font-semibold">Biometric / Face ID</h2>
      <p class="text-sm opacity-70">Use fingerprint or face recognition for faster login</p>
    </div>
    <button @click="toggleBiometric" class="btn-primary px-4 py-2 rounded-full">
      {{ biometricEnabled ? 'Disable' : 'Enable' }}
    </button>
  </div>
</template>
