<script setup lang="ts">
const email = ref('')
const submitted = ref(false)
const { $api } = useNuxtApp()

async function sendResetLink() {
  try {
    await $api('/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value }
    })
    submitted.value = true
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-bg text-text">
    <div class="w-full max-w-md space-y-6 bg-surface border border-primary/10 rounded-3xl p-8">
      
      <h1 class="text-2xl font-bold text-center">Forgot Password</h1>
      <p class="text-center opacity-70">Enter your email to receive reset instructions</p>

      <div v-if="!submitted" class="space-y-4">
        <input v-model="email" placeholder="Email" class="input" type="email" />
        <button @click="sendResetLink" class="w-full btn-primary">Send Reset Link</button>
      </div>

      <div v-else class="text-center text-primary">
        ✅ Reset link sent! Check your email.
      </div>

      <NuxtLink to="/auth/login" class="block text-center text-sm text-primary mt-4">
        Back to Login
      </NuxtLink>
    </div>
  </div>
</template>
