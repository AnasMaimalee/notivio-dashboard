<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

definePageMeta({ layout: 'auth' })

const router = useRouter()
const loading = ref(false)
const formState = ref({ email: '' })

const { $api } = useNuxtApp()

async function sendResetLink() {
  if (!formState.value.email.trim()) {
    message.warning('Please enter your email')
    return
  }

  loading.value = true
  try {
    await $api('/auth/forgot-password', {
      method: 'POST',
      body: { email: formState.value.email }
    })
    message.success('✅ Reset link sent! Check your email.')
    formState.value.email = ''
  } catch (e: any) {
    console.error(e)
    message.error(e?.data?.error || 'Failed to send reset link')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-bg text-text">
    <a-card
      class="w-full max-w-md shadow-md"
      :bordered="false"
      :style="{ boxShadow: '0 10px 30px rgba(0,0,0,0.08)', borderRadius: '12px' }"
    >
      <div class="text-center mb-6">
        <h1 class="text-2xl font-semibold mb-1">Forgot Password</h1>
        <p class="text-sm opacity-70">Enter your email to receive reset instructions</p>
      </div>

      <a-form layout="vertical" @submit.prevent="sendResetLink">
        <a-form-item label="Email" required>
          <a-input
            v-model:value="formState.email"
            placeholder="you@example.com"
            size="large"
          />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            size="large"
            block
            :loading="loading"
            :disabled="!formState.email.trim()"
          >
            Send Reset Link
          </a-button>
        </a-form-item>
      </a-form>

      <div class="text-center mt-4 text-sm opacity-70">
        <NuxtLink to="/auth/login" class="font-medium">Back to Login</NuxtLink>
      </div>
    </a-card>
  </div>
</template>
