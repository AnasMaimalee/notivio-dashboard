<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

definePageMeta({ layout: 'auth' })

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const formState = ref({
  password: '',
  confirmPassword: ''
})
const token = ref('')

// Grab token from query
onMounted(() => {
  token.value = route.query.token as string || ''
  if (!token.value) {
    message.error('Invalid or missing token')
    router.push('/auth/login')
  }
})

const { $api } = useNuxtApp()

async function resetPassword() {
  if (!formState.value.password || !formState.value.confirmPassword) {
    message.warning('Please fill all fields')
    return
  }
  if (formState.value.password !== formState.value.confirmPassword) {
    message.error('Passwords do not match')
    return
  }

  loading.value = true
  try {
    await $api('/auth/reset-password', {
      method: 'POST',
      body: { token: token.value, password: formState.value.password }
    })
    message.success('✅ Password reset successfully!')
    router.push('/auth/login')
  } catch (e: any) {
    console.error(e)
    message.error(e?.data?.error || 'Failed to reset password')
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
        <h1 class="text-2xl font-semibold mb-1">Reset Password</h1>
        <p class="text-sm opacity-70">Enter your new password</p>
      </div>

      <a-form layout="vertical" @submit.prevent="resetPassword">
        <a-form-item label="New Password" required>
          <a-input-password
            v-model:value="formState.password"
            placeholder="••••••••"
            size="large"
          />
        </a-form-item>

        <a-form-item label="Confirm Password" required>
          <a-input-password
            v-model:value="formState.confirmPassword"
            placeholder="••••••••"
            size="large"
          />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            size="large"
            block
            :loading="loading"
            :disabled="!formState.password || !formState.confirmPassword"
          >
            Reset Password
          </a-button>
        </a-form-item>
      </a-form>

      <div class="text-center mt-4 text-sm opacity-70">
        <NuxtLink to="/auth/login" class="font-medium">Back to Login</NuxtLink>
      </div>
    </a-card>
  </div>
</template>
