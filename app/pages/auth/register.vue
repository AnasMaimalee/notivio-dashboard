<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const { $api } = useNuxtApp()

const rules = computed(() => ({
  length: form.password.length >= 8,
  uppercase: /[A-Z]/.test(form.password),
  number: /\d/.test(form.password),
  special: /[^A-Za-z0-9]/.test(form.password)
}))

const strong = computed(() =>
  Object.values(rules.value).every(Boolean)
)

async function register() {
  if (!strong.value) return

  await $api('/auth/register', {
    method: 'POST',
    body: form
  })

  navigateTo('/onboarding/select')
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center
           bg-bg text-text px-4"
  >
    <div
      class="w-full max-w-md space-y-8
             bg-surface border border-primary/10
             rounded-3xl p-8"
    >
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-bold">Create account</h1>
        <p class="opacity-60">Start your Notivio journey</p>
      </div>

      <form @submit.prevent="register" class="space-y-4">
        <input v-model="form.name" placeholder="Name" class="input" />
        <input v-model="form.email" placeholder="Email" class="input" />

        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="input"
        />

        <input
          v-model="form.password_confirmation"
          type="password"
          placeholder="Confirm Password"
          class="input"
        />

        <!-- Password strength -->
        <ul class="text-xs space-y-1">
          <li :class="rules.length ? 'text-primary' : 'opacity-40'">
            • At least 8 characters
          </li>
          <li :class="rules.uppercase ? 'text-primary' : 'opacity-40'">
            • One uppercase letter
          </li>
          <li :class="rules.number ? 'text-primary' : 'opacity-40'">
            • One number
          </li>
          <li :class="rules.special ? 'text-primary' : 'opacity-40'">
            • One special character
          </li>
        </ul>

        <button
          :disabled="!strong"
          class="w-full btn-primary disabled:opacity-40"
        >
          Register
        </button>
      </form>

      <p class="text-sm text-center opacity-70">
        Already have an account?
        <NuxtLink
          to="/auth/login"
          class="text-primary font-medium"
        >
          Login
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
