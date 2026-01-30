<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

definePageMeta({
  layout: 'auth',
})

const router = useRouter()
const loading = ref(false)

const formState = ref({
  email: '',
  password: '',
})

// Compute if login button should be disabled
const isDisabled = computed(() => {
  return !formState.value.email.trim() || !formState.value.password.trim()
})

function loginBiometric() {
  message.info('FaceID / Touch login triggered')
}

async function login() {
  loading.value = true
  try {
    const auth = useAuthStore()
    await auth.login(formState.value)
    const firstMenu = auth.menus?.[0]?.route || '/dashboard'
    router.push(firstMenu)
  } catch (e: any) {
    message.error(e?.data?.error || 'Login failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <a-card
      class="w-full max-w-md shadow-md"
      :bordered="false"
      :style="{ boxShadow: '0 10px 30px rgba(0,0,0,0.08)', borderRadius: '12px' }"
    >
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-semibold mb-1">Welcome Back</h1>
        <p class="text-sm opacity-70">
          Capture your thoughts, sketches, and voice notes.
        </p>
      </div>

      <!-- Form -->
      <a-form layout="vertical" :model="formState" @finish="login">
        <a-form-item
          label="Email"
          name="email"
          :rules="[{ required: true, type: 'email', message: 'Please enter a valid email' }]"
        >
          <a-input
            v-model:value="formState.email"
            placeholder="you@example.com"
            size="large"
          />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please enter your password' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="••••••••"
            size="large"
          />
        </a-form-item>

        <div class="flex justify-end mb-4">
          <NuxtLink to="/auth/forgot-password" class="text-sm">
            Forgot password?
          </NuxtLink>
        </div>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="loading"
            :disabled="isDisabled"
          >
            Login
          </a-button>
        </a-form-item>

        <a-button
          block
          size="large"
          type="default"
          @click="loginBiometric"
        >
          Login with FaceID / Touch
        </a-button>
      </a-form>

      <!-- Footer -->
      <div class="text-center mt-6 text-sm opacity-70">
        Don’t have an account?
        <NuxtLink to="/auth/register" class="font-medium">
          Register
        </NuxtLink>
      </div>
    </a-card>
  </div>
</template>
