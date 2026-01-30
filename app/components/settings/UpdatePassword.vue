<script setup lang="ts">
import { reactive, computed } from 'vue'
const form = reactive({
  current_password: '',
  new_password: '',
  password_confirmation: ''
})
const { $api } = useNuxtApp()

const rules = computed(() => ({
  length: form.new_password.length >= 8,
  uppercase: /[A-Z]/.test(form.new_password),
  number: /\d/.test(form.new_password),
  special: /[^A-Za-z0-9]/.test(form.new_password)
}))

const strong = computed(() => Object.values(rules.value).every(Boolean))

async function updatePassword() {
  if (!strong.value) return

  try {
    await $api('/profile/change-password', {
      method: 'POST',
      body: form
    })
    alert('Password updated successfully')
    form.current_password = ''
    form.new_password = ''
    form.password_confirmation = ''
  } catch (e) {
    console.error(e)
    alert('Failed to update password')
  }
}
</script>

<template>
  <div class="bg-surface p-6 rounded-2xl border border-primary/10 space-y-4">
    <h2 class="text-xl font-semibold">Update Password</h2>
    <input type="password" placeholder="Current Password" v-model="form.current_password" class="input" />
    <input type="password" placeholder="New Password" v-model="form.new_password" class="input" />
    <input type="password" placeholder="Confirm New Password" v-model="form.password_confirmation" class="input" />

    <ul class="text-xs space-y-1 mb-2">
      <li :class="rules.length ? 'text-primary' : 'opacity-40'">• At least 8 characters</li>
      <li :class="rules.uppercase ? 'text-primary' : 'opacity-40'">• One uppercase letter</li>
      <li :class="rules.number ? 'text-primary' : 'opacity-40'">• One number</li>
      <li :class="rules.special ? 'text-primary' : 'opacity-40'">• One special character</li>
    </ul>

    <button @click="updatePassword" :disabled="!strong" class="btn-primary w-full disabled:opacity-40">Update Password</button>
  </div>
</template>
