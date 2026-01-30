<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { message } from 'ant-design-vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const loading = ref(false)
const { $api } = useNuxtApp()

/* -----------------------------
   PASSWORD RULES
----------------------------- */
const rules = computed(() => ({
  length: form.password.length >= 8,
  uppercase: /[A-Z]/.test(form.password),
  number: /\d/.test(form.password),
  special: /[^A-Za-z0-9]/.test(form.password)
}))

const strong = computed(() =>
  Object.values(rules.value).every(Boolean)
)

/* -----------------------------
   REGISTER
----------------------------- */
async function register() {
  if (!strong.value || loading.value) return

  loading.value = true
  try {
    await $api('/auth/register', {
      method: 'POST',
      body: form
    })

    navigateTo('/auth/login')
  } catch (e: any) {
    message.error(e?.data?.error || 'Registration failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-bg">
    <a-card
      class="w-full max-w-md"
      :bordered="false"
      style="box-shadow: 0 10px 30px rgba(0,0,0,0.08)"
    >
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-semibold">Create account</h1>
        <p class="opacity-60 mt-1">Start your Notivio journey</p>
      </div>

      <!-- Form -->
      <a-form layout="vertical" @finish="register">
        <a-form-item label="Name" required>
          <a-input
            v-model:value="form.name"
            placeholder="Your name"
          />
        </a-form-item>

        <a-form-item label="Email" required>
          <a-input
            v-model:value="form.email"
            type="email"
            placeholder="you@example.com"
          />
        </a-form-item>

        <a-form-item label="Password" required>
          <a-input-password
            v-model:value="form.password"
            placeholder="Password"
          />
        </a-form-item>

        <a-form-item label="Confirm password" required>
          <a-input-password
            v-model:value="form.password_confirmation"
            placeholder="Confirm password"
          />
        </a-form-item>

        <!-- Password strength -->
        <ul class="text-xs mb-4 space-y-1">
          <li :style="{ color: rules.length ? 'var(--ant-primary-color)' : '#999' }">
            • At least 8 characters
          </li>
          <li :style="{ color: rules.uppercase ? 'var(--ant-primary-color)' : '#999' }">
            • One uppercase letter
          </li>
          <li :style="{ color: rules.number ? 'var(--ant-primary-color)' : '#999' }">
            • One number
          </li>
          <li :style="{ color: rules.special ? 'var(--ant-primary-color)' : '#999' }">
            • One special character
          </li>
        </ul>

        <!-- Submit -->
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            block
            :loading="loading"
            :disabled="!strong"
          >
            {{ loading ? 'Creating account…' : 'Register' }}
          </a-button>
        </a-form-item>
      </a-form>

      <!-- Footer -->
      <p class="text-sm text-center opacity-70 mt-4">
        Already have an account?
        <NuxtLink to="/auth/login" class="font-medium">
          Login
        </NuxtLink>
      </p>
    </a-card>
  </div>
</template>
