<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const token = route.query.token || ''
const { $api } = useNuxtApp()

const form = reactive({
  email: '',
  password: '',
  password_confirmation: '',
  token
})

const rules = computed(() => ({
  length: form.password.length >= 8,
  uppercase: /[A-Z]/.test(form.password),
  number: /\d/.test(form.password),
  special: /[^A-Za-z0-9]/.test(form.password)
}))

const strong = computed(() => Object.values(rules.value).every(Boolean))

async function resetPassword() {
  if (!strong.value) return

  try {
    await $api('/auth/reset-password', {
      method: 'POST',
      body: form
    })
    navigateTo('/auth/login')
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-bg text-text">
    <div class="w-full max-w-md space-y-6 bg-surface border border-primary/10 rounded-3xl p-8">
      <h1 class="text-2xl font-bold text-center">Reset Password</h1>
      <p class="text-center opacity-70">Enter your new password</p>

      <form @submit.prevent="resetPassword" class="space-y-4">
        <input v-model="form.email" placeholder="Email" class="input" type="email" />
        <input v-model="form.password" placeholder="New Password" class="input" type="password" />
        <input v-model="form.password_confirmation" placeholder="Confirm Password" class="input" type="password" />

        <ul class="text-xs space-y-1 mb-2">
          <li :class="rules.length ? 'text-primary' : 'opacity-40'">• At least 8 characters</li>
          <li :class="rules.uppercase ? 'text-primary' : 'opacity-40'">• One uppercase letter</li>
          <li :class="rules.number ? 'text-primary' : 'opacity-40'">• One number</li>
          <li :class="rules.special ? 'text-primary' : 'opacity-40'">• One special character</li>
        </ul>

        <button :disabled="!strong" class="w-full btn-primary disabled:opacity-40">Reset Password</button>
      </form>

      <NuxtLink to="/auth/login" class="block text-center text-sm text-primary mt-4">
        Back to Login
      </NuxtLink>
    </div>
  </div>
</template>
