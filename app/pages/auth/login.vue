<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '#app'
import { notify } from '@/utils/notify' // <-- global notification helper
import { message } from 'ant-design-vue'
const { $applyTheme } = useNuxtApp()

const router = useRouter()
const theme = useState('theme')

definePageMeta({
    layouts: 'auth',
})
// form state
const email = ref('')
const password = ref('')
const loading = ref(false)

// Biometric login placeholder
function loginBiometric() {
  notify('info', 'FaceID / Touch login triggered')
}
const { $api } = useNuxtApp()

async function login() {
  loading.value = true
  try {
    const auth = useAuthStore()

    await auth.login({
      email: email.value,
      password: password.value,
    })

    // Apply theme if present
    if (auth.theme) {
      $applyTheme(auth.theme, 'light')
    }

    // Redirect
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
  <div class="min-h-screen flex items-center justify-center px-6 bg-bg text-text">
    <div class="max-w-md w-full space-y-6">
      <h1 class="text-3xl font-bold text-center">Welcome Back</h1>
      <p class="text-center text-sm opacity-60">Capture your thoughts, sketches, and voice notes.</p>

      <form @submit.prevent="login" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full p-3 rounded-lg border border-primary/20 focus:border-primary focus:ring focus:ring-primary/20"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full p-3 rounded-lg border border-primary/20 focus:border-primary focus:ring focus:ring-primary/20"
          />
        </div>

        <!-- Forgot password -->
        <div class="flex justify-end text-sm opacity-70">
          <NuxtLink to="/auth/forgot-password" class="hover:text-primary">Forgot password?</NuxtLink>
        </div>

        <!-- Login button -->
        <div class="space-y-2">
            <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition mb-2"
            >
            {{ loading ? 'Logging in...' : 'Login' }}
            </button>
            <div class="mt-2"></div>
            <!-- Biometric login -->
            <button
            type="button"
            @click="loginBiometric"
            class="w-full mt-3 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition"
            >
            Login with FaceID / Touch
            </button>
        </div>
      </form>

      <!-- Register link -->
      <p class="text-center text-sm opacity-70">
        Don’t have an account?
        <NuxtLink to="/auth/register" class="text-primary font-medium hover:underline">Register</NuxtLink>
      </p>
    </div>
  </div>
</template>
